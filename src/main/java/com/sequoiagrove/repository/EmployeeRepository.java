package com.sequoiagrove.controller;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;
import com.sequoiagrove.controller.Application;

@Repository
public class EmployeeRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  public static Employee getEmployee(String email) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "select distinct id, business_id, first_name, last_name, email, " +
      "loc, birth_date, max_hrs_week, permissions, notes, phone_number, clock_number, "+
      "positions, history, min_hrs_week, classification_title, classification_id, avail, "+
      "is_current from sequ_user_info_view where email = ?";
    return jdbc.query(sql, new Object[]{email}, employeeMapper).get(0);
  }

  // get employees by location
  public List<Employee> getEmployeesByLocation(Object[] locations) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String qs = "";
    int[] types = new int[locations.length];

    // add integers to Object[] and parallel INTEGER type, a question mark for each parameter
    for(int i=0; i<locations.length; i++) {
      types[i] = Types.INTEGER;
      qs += "?,";
    }

    String sql = "SELECT distinct avail, is_current, birth_date, business_id, classification_id, classification_title, "+
      "clock_number, email, first_name, history, id, last_name, loc, max_hrs_week, min_hrs_week, "+
      "notes, permissions, phone_number, positions "+
      "FROM sequ_user_info_view WHERE location_id IN ("+qs.substring(0, qs.length()-1)+") order by first_name";

    return jdbc.query(sql, locations, types, superEmployeeMapper);
  }

  public boolean update(Object[] args) {
    String sql = "update sequ_user set first_name = ?, "+
      "last_name    = ?, "+
      "birth_date   = to_date(?, 'mm-dd-yyyy'), "+
      "max_hrs_week = ?, "+
      "min_hrs_week = ?, "+
      "phone_number = ?, "+
      "clock_number = ?, "+
      "email = ?, "+
      "classification_id = ?,  "+
      "notes  = ?  "+
      "where id = ?";

    //                id, classification_id
    updatePermissions((int)args[10], (int)args[8]);
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    jdbc.update(sql, args);

    return true;
  }

  public boolean deactivate(int id, int locationId) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlCount =
      "select count(*) from sequ_employment_history where user_id = ? and location_id = ?" +
      "and date_employed=current_date and date_unemployed is null and" +
      "(select count(*) from sequ_employment_history where user_id = ? and location_id = ?) > 1 ";

    String sqlSpecial = "delete from sequ_employment_history where user_id = ? and location_id = ? " +
      "and date_employed=current_date";

    String sqlCurrentCount = "select count(*) from sequ_employment_history " +
      " where user_id = ? and location_id = ? and date_unemployed is null";

    String sqlUpdate = " update sequ_employment_history " +
      "set date_unemployed = current_date " +
      "where user_id = ? and location_id = ? and date_unemployed is null";

    // special case where user tries to unemploy employee they just reemployed today - deletes row instead
    int count = jdbc.queryForObject(sqlCount, new Object[]{id, locationId, id, locationId}, Integer.class);
    if(count > 0) {
      jdbc.update( sqlSpecial, new Object[]{id, locationId});
    }
    // standard procedure, make sure is current then set date unemployed
    else {
      count = jdbc.queryForObject(sqlCurrentCount, new Object[]{id, locationId}, Integer.class);
      if (count > 0){
        jdbc.update(sqlUpdate, new Object[]{id, locationId});
      }
    }

    return true;
  }

  public boolean activate(int id, int locationId) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();

    String sqlCount = "select count(*) from sequ_employment_history " +
      "where user_id = ? and location_id = ? and date_unemployed is null";

    String sqlSpecial = "select count(*) from sequ_employment_history " +
      "where user_id = ? and location_id = ? and date_unemployed = current_date";

    String sqlUpdate = " update sequ_employment_history set date_unemployed = null " +
      "where user_id = ? and location_id = ? and date_unemployed = current_date";

    String sqlInsert = "insert into sequ_employment_history(user_id, location_id, date_employed, date_unemployed) " +
      "values( ?, ?, current_date, null) ";

    // see if this employee current
    int count = jdbc.queryForObject(sqlCount, new Object[]{id, locationId}, Integer.class);

    // this was NOT a current employee, add a new employment history
    if (count <= 0){
      count = jdbc.queryForObject(sqlSpecial, new Object[]{id, locationId}, Integer.class);
      // in the case they were unemployed today, and then reemployed, update
      if(count >0) {
        jdbc.update(sqlUpdate, new Object[]{id, locationId});
      }
      // standard procedure, insert new employment history row
      else {
        jdbc.update(sqlInsert, new Object[]{id, locationId});
      }
    }
    return true;
  }

  public int add(Object[] params, int locationId, int classId) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlAdd = "insert into sequ_user (id, first_name,  last_name, birth_date, " +
      "max_hrs_week, min_hrs_week, phone_number, clock_number, email, classification_id, notes)  " +
      "values((select nextval('sequ_user_sequence')), ?, ?, to_date(?, 'mm-dd-yyyy'), ?, ?, ?, ?, ?, ?, ?) " +
      "returning currval('sequ_user_sequence')";
    String sqlActivate = "insert into sequ_employment_history values( ?, current_date, null, ?)";

    // add the employee
    int id = jdbc.queryForObject(sqlAdd, params, Integer.class);

    // activate the employee
    jdbc.update(sqlActivate, id, locationId);
    updatePermissions(id, classId);

    return id;
  }

  // permissions
  // 1:admin  2:submit-reuquests-off 3:manage-employees 4:manage-requests 5:manage-schedule
  // 6:get-other-store-info 7:manage-store 8:edit-user-permissions 9:admin
  // no way to add a user as an admin, that must be done manually
  // update sequ_user set classification_id = 4 where id = ?
  public int[] updatePermissions(int id, int classId) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlDelete = "delete from sequ_user_permission where user_id = ?";
    String sql =
      "INSERT INTO sequ_user_permission (user_id, permission_id) SELECT ?, ? " +
      "WHERE NOT EXISTS ( " +
      "SELECT * FROM sequ_user_permission WHERE user_id = ? and permission_id = ? " +
      ");";

    List<Integer> list = new ArrayList<Integer>();

    // add permissions
    if (classId == 1) { // employee
      list = (Arrays.asList(2));
    }
    if (classId == 2) { // manager
      list = (Arrays.asList(2, 3, 4, 5, 7));
    }
    if (classId == 3) { // account holder
      list = (Arrays.asList(2, 3, 4, 5, 6, 7, 8, 9));
    }

    final List<Integer> permissions = list;

    // delete any existing permissions
    jdbc.update(sqlDelete, id);

    // add new permissions
    int[] updateCounts = jdbc.batchUpdate(sql,
        new BatchPreparedStatementSetter() {
          public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setInt(1, id);
            ps.setInt(2, permissions.get(i));
            ps.setInt(3, id);
            ps.setInt(4, permissions.get(i));
          }
          public int getBatchSize() {
            return permissions.size();
          }
        });
    return updateCounts;
  }

  private static final RowMapper<Employee> employeeMapper = new RowMapper<Employee>() {
    public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
      Employee e = new Employee();
      e.setId(rs.getInt("id"));
      e.setBusinessId(rs.getInt("business_id"));
      e.setClockNumber(rs.getInt("clock_number"));
      e.setMaxHours(rs.getInt("max_hrs_week"));
      e.setMinHours(rs.getInt("min_hrs_week"));
      e.setBirthDate(rs.getString("birth_date"));
      e.setFullname(rs.getString("first_name") + " " + rs.getString("last_name"));
      e.setFirstname(rs.getString("first_name"));
      e.setLastname(rs.getString("last_name"));
      e.setEmail(rs.getString("email"));
      e.setIsCurrent((rs.getInt("is_current") >= 1)? true: false);
      e.setPermissions(stringToList(rs.getString("permissions")));
      e.setLocations(rs.getString("loc"));
      e.setClassificationTitle(rs.getString("classification_title"));
      e.setClassificationId(rs.getInt("classification_id"));
      return e;
    }
  };
  private static final RowMapper<Employee> superEmployeeMapper = new RowMapper<Employee>() {
    public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
      Employee e = new Employee();
      e.setId(rs.getInt("id"));
      e.setBusinessId(rs.getInt("business_id"));
      e.setMaxHours(rs.getInt("max_hrs_week"));
      e.setMinHours(rs.getInt("min_hrs_week"));
      e.setClockNumber(rs.getInt("clock_number"));
      e.setFirstname(rs.getString("first_name"));
      e.setLastname(rs.getString("last_name"));
      e.setPhone(rs.getString("phone_number"));
      e.setEmail(rs.getString("email"));
      e.setBirthDate(rs.getString("birth_date"));
      e.setHistory( parseHistory(rs.getString("history")));
      e.setPositions(stringToList(rs.getString("positions")));
      e.setAvail(parseAvailability(rs.getString("avail")));
      e.setIsCurrent((rs.getInt("is_current") >= 1)? true: false);
      e.setPermissions( stringToList(rs.getString("permissions")));
      e.setClassificationId(rs.getInt("classification_id"));
      e.setClassificationTitle(rs.getString("classification_title"));
      e.setNotes(rs.getString("notes"));
      e.setLocations(rs.getString("loc"));
      return e;
    }
  };

  // change Permissions string to list of java objects
  public static List<String> stringToList(String permissions) {
    ArrayList<String> list = new ArrayList<String>();
    try {
      list = new ArrayList<String>(Arrays.asList(permissions.split(",")));
    }
    catch (NullPointerException e) {
      // do nothing
    }
    return list;
  }

  // change availability string to java object
  public static WeeklyAvail parseAvailability(String avail) {
    WeeklyAvail entireAvail = new WeeklyAvail();
    // split string into array with one string per day
    String[] weekdays = avail.split("\\s+");
    // for each day, add it to the weekly availability
    for (String d : weekdays) {
      String[] day = d.split(",");
      for(int i=1; i<day.length; i++) {
        String[] times = day[i].split(":");
        entireAvail.add(day[0], times[0], times[1]);
      }
    }
    return entireAvail;
  }

  // change History string to list of java objects
  // "1!12-24-2008|2!10-27-2016"
  public static List<Duration> parseHistory(String hist) {
    List<Duration> historyList = new ArrayList<Duration>();
    String[] all = hist.split("\\|");
    for (String a : all) {
      String[] locations = a.split("\\!");
      Integer locationId = Integer.parseInt(locations[0]);
      String[] histories = locations[1].split(",");
      for (String h : histories) {
        String[] times = h.split(":");
        if(times.length == 2) {
          historyList.add(new Duration(locationId, times[0], times[1]));
        }
        else {
          historyList.add(new Duration(locationId, times[0]));
        }
      }
    }
    return historyList;
  }

}
