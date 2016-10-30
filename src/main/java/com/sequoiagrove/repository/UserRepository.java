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

import com.sequoiagrove.model.User;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;
import com.sequoiagrove.controller.Application;

@Repository
public class UserRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  public static User getUser(String email) {
   JdbcTemplate jdbc = Application.getJdbcTemplate();

    String sql = "select distinct id, business_id, first_name, last_name, email, " +
      "loc, birth_date, max_hrs_week, permissions, notes, phone_number, clock_number, "+
      "positions, history, min_hrs_week, classification_title, classification_id, avail, "+
      "is_current from sequ_user_info_view where email = ?";

    return jdbc.query(sql, new Object[]{email}, userMapper).get(0);
  }

  //// get users for one location
  //public List<User> getUsersByLocation(int id) {
    //JdbcTemplate jdbc = Application.getJdbcTemplate();
    //String sql = "SELECT * FROM sequ_user_info_view WHERE location_id IN (?) order by first_name;";
    //return jdbc.query(sql, new Object[]{id}, superUserMapper);
  //}

  // get users for multiple locations
  public HashMap<Integer, User> getUsersByLocation(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();

    String qs = "";
    int[] types = new int[args.length];

    // add integers to Object[] and parallel INTEGER type
    // and a question mark for each parameter
    for(int i=0; i<args.length; i++) {
      types[i] = Types.INTEGER;
      qs += "?,";
    }

    String sql = "SELECT distinct avail, is_current, birth_date, business_id, classification_id, classification_title, "+
      "clock_number, email, first_name, history, id, last_name, loc, max_hrs_week, min_hrs_week, "+
      "notes, permissions, phone_number, positions "+
      "FROM sequ_user_info_view WHERE location_id IN ("+qs.substring(0, qs.length()-1)+") order by first_name";

    List<User> users = jdbc.query(sql, args, types, superUserMapper);
    HashMap<Integer, User> map = new HashMap<Integer, User>();

    // change list to hashmap
    for( User u : users) {
      map.put(u.getId(), u);
    }
    return map;
  }

  private static final RowMapper<User> userMapper = new RowMapper<User>() {
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
      User user = new User();
      user.setId(rs.getInt("id"));
      user.setBusinessId(rs.getInt("business_id"));
      user.setClockNumber(rs.getInt("clock_number"));
      user.setMaxHours(rs.getInt("max_hrs_week"));
      user.setMinHours(rs.getInt("min_hrs_week"));
      user.setBirthDate(rs.getString("birth_date"));
      user.setFullname(rs.getString("first_name") + " " + rs.getString("last_name"));
      user.setFirstname(rs.getString("first_name"));
      user.setLastname(rs.getString("last_name"));
      user.setEmail(rs.getString("email"));
      user.setIsCurrent((rs.getInt("is_current") >= 1)? true: false);
      user.setPermissions(parsePermissions(rs.getString("permissions")));
      user.setLocations(rs.getString("loc"));
      user.setClassificationTitle(rs.getString("classification_title"));
      user.setClassificationId(rs.getInt("classification_id"));
      return user;
    }
  };
  private static final RowMapper<User> superUserMapper = new RowMapper<User>() {
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
      User user = new User();
      user.setId(rs.getInt("id"));
      user.setBusinessId(rs.getInt("business_id"));
      user.setMaxHours(rs.getInt("max_hrs_week"));
      user.setMinHours(rs.getInt("min_hrs_week"));
      user.setClockNumber(rs.getInt("clock_number"));
      user.setFirstname(rs.getString("first_name"));
      user.setLastname(rs.getString("last_name"));
      user.setPhone(rs.getString("phone_number"));
      user.setEmail(rs.getString("email"));
      user.setBirthDate(rs.getString("birth_date"));
      user.setHistory( parseHistory(rs.getString("history")));
      user.setPositions(parsePositions(rs.getString("positions")));
      user.setAvail(parseAvailability(rs.getString("avail")));
      user.setIsCurrent((rs.getInt("is_current") >= 1)? true: false);
      user.setPermissions( parsePermissions(rs.getString("permissions")));
      user.setClassificationId(rs.getInt("classification_id"));
      user.setClassificationTitle(rs.getString("classification_title"));
      user.setNotes(rs.getString("notes"));
      user.setLocations(rs.getString("loc"));
      return user;
    }
  };

  // change Permissions string to list of java objects
  public static List<String> parsePermissions(String permissions) {
    if (permissions == null) {
      return new ArrayList<String>();
    }
    return new ArrayList<String>(Arrays.asList(permissions.split(",")));
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

  // change Position string to list of java objects
  public static List<String> parsePositions(String pos) {
    if (pos == null) {
      return new ArrayList<String>();
    }
    return new ArrayList<String>(Arrays.asList(pos.split(",")));
  }


}
