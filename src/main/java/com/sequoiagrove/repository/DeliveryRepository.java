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

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.controller.Application;

@Repository
public class DeliveryRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  // get users for multiple locations
  public HashMap<Integer, Delivery> getDeliveriesByLocation(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();

    String qs = "";
    int[] types = new int[args.length];

    // add integers to Object[] and parallel INTEGER type
    // and a question mark for each parameter
    for(int i=0; i<args.length; i++) {
      types[i] = Types.INTEGER;
      qs += "?,";
    }
    qs = qs.substring(0, qs.length()-1);
    String sql = " select * from sequ_delivery where location_id IN("+ qs +")";
    List<Delivery> deliveries = jdbc.query(sql, args, types, deliveryMapper);
    HashMap<Integer, Delivery> map = new HashMap<Integer, Delivery>();

    // change list to hashmap
    for( Delivery d : deliveries) {
      map.put(d.getId(), d);
    }
    return map;
  }

  private static final RowMapper<Delivery> deliveryMapper = new RowMapper<Delivery>() {
    public Delivery mapRow(ResultSet rs, int rowNum) throws SQLException {
      Delivery d = new Delivery();
      d.setName(rs.getString("name"));
      d.setMon(rs.getBoolean("mon"));
      d.setTue(rs.getBoolean("tue"));
      d.setWed(rs.getBoolean("wed"));
      d.setThu(rs.getBoolean("thu"));
      d.setFri(rs.getBoolean("fri"));
      d.setSat(rs.getBoolean("sat"));
      d.setSun(rs.getBoolean("sun"));
      d.setId(rs.getInt("id"));
      return d;
    }
  };

}
