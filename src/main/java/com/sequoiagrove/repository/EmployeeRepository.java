package com.sequoiagrove.controller;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.sql.Types;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;

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
  public HashMap<Integer, Employee> getEmployeesByLocation(Object[] locations) {
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

    List<Employee> employees = jdbc.query(sql, locations, types, superEmployeeMapper);
    HashMap<Integer, Employee> map = new HashMap<Integer, Employee>();

    // change list to hashmap
    for( Employee u : employees) {
      map.put(u.getId(), u);
    }
    return map;
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

    JdbcTemplate jdbc = Application.getJdbcTemplate();
    jdbc.update(sql, args);

    return true;
  }

  public boolean deactivate(int id, int locationId) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlCount =
      "select count(*) from sequ_employment_history where user_id = ? " +
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
      int count = jdbc.queryForObject(sqlCount, new Object[]{id, id, locationId}, Integer.class);
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
      "where user_id = ? and location_id = ?";

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
