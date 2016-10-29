package com.sequoiagrove.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.sequoiagrove.model.User;
import com.sequoiagrove.model.UserRowMapper;
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

  //public List<User> getUsers(long[] ids) {
    //String inIds = StringUtils.arrayToCommaDelimitedString(ObjectUtils.toObjectArray(ids));
    //return jdbc.query("SELECT * FROM sequ_user WHERE id IN (" + inIds + ")", userMapper);
  //}

  private static final RowMapper<User> userMapper = new RowMapper<User>() {
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
      System.out.println("MAP ROW");
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
  /*
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
  */

  // change Permissions string to list of java objects
  public static List<String> parsePermissions(String permissions) {
    if (permissions == null) {
      return new ArrayList<String>();
    }
    return new ArrayList<String>(Arrays.asList(permissions.split(",")));
  }

}
