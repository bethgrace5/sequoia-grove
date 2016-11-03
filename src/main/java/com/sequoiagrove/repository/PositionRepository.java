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
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import com.sequoiagrove.model.Position;
import com.sequoiagrove.controller.Application;

@Repository
public class PositionRepository {
  //protected final Logger log = LoggerFactory.getLogger(getClass());

  // get users for multiple locations
  public HashMap<Integer, Position> getPositionsByLocation(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();

    String qs = "";
    int[] types = new int[args.length];

    // add integers to Object[] and parallel INTEGER type
    // and a question mark for each parameter
    for(int i=0; i<args.length; i++) {
      types[i] = Types.INTEGER;
      qs += "?,";
    }

    String sql = "select distinct pid as id, title, business_id, area, location_id from ( " +
      "select id as sid, position_id, task_name, location_id from sequ_shift sh where end_date is null " +
      ") shift " +
      "full outer join ( " +
      "select id as pid, title, area from sequ_position " +
      ") pos " +
      "on pos.pid = shift.position_id " +
      "full outer join ( " +
      "select * from sequ_location " +
      ") loc " +
      "on loc.id = shift.location_id " +
      "where location_id in( "+ qs.substring(0, qs.length()-1) +" ) " +
      "order by area, title";


    List<Position> positions = jdbc.query(sql, args, types, positionMapper);
    HashMap<Integer, Position> map = new HashMap<Integer, Position>();

    // change list to hashmap
    for( Position p : positions) {
      map.put(p.getId(), p);
    }
    return map;
  }

  // add position to employee
  public boolean add(int pid, int eid) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlCount =
      "select count(*) from sequ_has_position where user_id = ? "+
      "and position_id = ? and date_removed is null";
    String sql =
      "insert into sequ_has_position(" +
      "user_id, position_id,date_acquired, date_removed, is_primary, is_training) " +
      "values(?, ?, current_date, null, false, false)";

    // see if this is already a current position that the employee has
    int count = jdbc.queryForObject(sqlCount, new Object[]{eid, pid}, Integer.class);

    // add the position
    if (count <= 0) {
      jdbc.update(sql, eid, pid);
      return true;
    }
    return false;
  }

  public boolean remove(int pid, int eid) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sqlCount =
      "select count(*) from sequ_has_position where user_id = ? "+
      "and position_id = ? and date_removed is null";
    String sql =
      "update sequ_has_position " +
      "set date_removed = current_date " +
      "where user_id = ? and position_id = ? and date_removed is null";

    // see if this employee currently has this position
    int count = jdbc.queryForObject(sqlCount , new Object[]{eid, pid}, Integer.class);

    // remove the position
    if (count > 0) {
       jdbc.update(sql, eid, pid);
       return true;
    }
    return false;
  }

  private static final RowMapper<Position> positionMapper = new RowMapper<Position>() {
    public Position mapRow(ResultSet rs, int rowNum) throws SQLException {
      Position p = new Position();
      p.setId(rs.getInt("id"));
      p.setTitle(rs.getString("title"));
      p.setLocation(rs.getString("area"));
      return p;
    }
  };

}
