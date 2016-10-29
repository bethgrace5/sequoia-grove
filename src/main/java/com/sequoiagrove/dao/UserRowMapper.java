package com.sequoiagrove.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.sequoiagrove.model.User;
import org.springframework.jdbc.core.RowMapper;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;

public class UserRowMapper implements RowMapper {

  // custom row mapper for user
  public User mapRow(ResultSet rs, int rowNum) throws SQLException {
    System.out.println("MAP ROW");
    User user = new User();
    user.setId(rs.getInt("id"));
    //user.setBusinessId(rs.getInt("business_id"));
    //user.setClockNumber(rs.getInt("clock_number"));
    //user.setMaxHours(rs.getInt("max_hrs_week"));
    //user.setMinHours(rs.getInt("min_hrs_week"));
    //user.setBirthDate(rs.getString("birth_date"));
    //user.setFullname(rs.getString("first_name") + " " + rs.getString("last_name"));
    //user.setFirstname(rs.getString("first_name"));
    //user.setLastname(rs.getString("last_name"));
    user.setEmail(rs.getString("email"));
    //user.setIsCurrent((rs.getInt("is_current") >= 1)? true: false);
    //user.setPermissions(parsePermissions(rs.getString("permissions")));
    //user.setLocations(rs.getString("loc"));
    //user.setClassificationTitle(rs.getString("classification_title"));
    //user.setClassificationId(rs.getInt("classification_id"));
    return user;
  }

  // change location string to list of java integers
  public static ArrayList<Integer> stringToIntArray(String str) {
    ArrayList<Integer> loc = new ArrayList<Integer>();
    for (String item : new ArrayList<String>(Arrays.asList(str.split(",")))){
      loc.add(Integer.parseInt(item));
    }
    return loc;
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

  // change Permissions string to list of java objects
  public static List<String> parsePermissions(String permissions) {
    if (permissions == null) {
      return new ArrayList<String>();
    }
    return new ArrayList<String>(Arrays.asList(permissions.split(",")));
  }
}

