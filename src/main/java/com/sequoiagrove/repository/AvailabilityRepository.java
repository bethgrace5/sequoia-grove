package com.sequoiagrove.controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.sequoiagrove.model.Availability;
import com.sequoiagrove.controller.Application;

@Repository
public class AvailabilityRepository {
  //protected final Logger log = LoggerFactory.getLogger(getClass());

  // remove availability from employee
  public boolean remove(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
     String sql = "delete from sequ_availability " +
      "where user_id = ? and day = ? and startt = ?";
    jdbc.update(sql, args);
    return true;
  }

  // add availability to employee
  public boolean add(int eid, String day, String start, String end) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlCount = "select count(*) from sequ_availability where user_id = ? "+
      "and day = ? and startt = ?";

    String sqlUpdate = "update sequ_availability set endt = ? " +
      "where user_id = ? and day = ? and startt = ?";

    String sqlInsert =" insert into  sequ_availability " +
      "( user_id, day, startt, endt ) values(?, ?, ?, ?)";

    // TODO make sure this availability isn't overlapping with the availability
    // time this employee already has for this day (if any)

    // see if this is a current availability that the employee has
    int count = jdbc.queryForInt( sqlCount, eid, day, start);

    // we found a match, update the end time
    if (count > 0) {
      jdbc.update(sqlUpdate, end, eid, day, start);
    }
    // no match was found, add new availability
    else {
      jdbc.update(sqlInsert, eid, day, start, end);
    }
    return true;
  }

}
