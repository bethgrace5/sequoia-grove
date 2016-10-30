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

import com.sequoiagrove.model.RequestStatus;
import com.sequoiagrove.controller.Application;

@Repository
public class RequestRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  // get users for multiple locations
  public HashMap<Integer, RequestStatus> getRequestsByLocation(Object[] args) {
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
    String sql = "select distinct rid, location_id, requested_by, business_id, is_approved, start_date_time, end_date_time, " +
      "requester_first_name, requester_last_name, responded_by, responder_first_name, responder_last_name " +
      "from sequ_request_view rv " +
      "left outer join " +
      "( " +
      "select * from " +
      "sequ_employment_history where date_unemployed is null " +
      ") eh " +
      "on rv.requested_by = eh.user_id " +
      "left outer join " +
      "sequ_location loc " +
      "on loc.id = eh.location_id " +
      "where location_id IN ("+ qs +")" +
      "order by start_date_time asc ";
    List<RequestStatus> requests = jdbc.query(sql, args, types, requestMapper);
    HashMap<Integer, RequestStatus> map = new HashMap<Integer, RequestStatus>();

    // change list to hashmap
    for( RequestStatus r : requests) {
      map.put(r.getRequestID(), r);
    }
    return map;
  }

  // get users for multiple locations
  public HashMap<Integer, RequestStatus> getRequestsByLocationPending(Object[] args) {
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
    String sql = "select distinct rid, location_id, requested_by, business_id, is_approved, start_date_time, end_date_time, " +
       "requester_first_name, requester_last_name, responded_by, responder_first_name, responder_last_name " +
         "from sequ_request_view rv " +
         "left outer join  " +
         "( " +
          "select * from  " +
          "sequ_employment_history where date_unemployed is null " +
          ") eh " +
         "on rv.requested_by = eh.user_id " +
         "left outer join  " +
         "sequ_location loc " +
         "on loc.id = eh.location_id " +
         "where responded_by IS NULL and end_date_time >= current_date and location_id in("+ qs +")" +
         "order by start_date_time asc ";
    List<RequestStatus> requests = jdbc.query(sql, args, types, requestMapper);
    HashMap<Integer, RequestStatus> map = new HashMap<Integer, RequestStatus>();

    // change list to hashmap
    for( RequestStatus r : requests) {
      map.put(r.getRequestID(), r);
    }
    return map;
  }

  public HashMap<Integer, RequestStatus> getRequestsByEmployee(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();

    String qs = "";
    int[] types = new int[args.length];

    // add integers to Object[] and parallel INTEGER type
    // and a question mark for each parameter
    for(int i=0; i<args.length; i++) {
      types[i] = Types.INTEGER;
      qs += "?,";
    }
    qs = qs.substring(0, qs.length()-3);
      String sql = "select * from sequ_request_view " +
        "left outer join " +
        "( " +
        "select * from " +
        "sequ_employment_history where date_unemployed is null " +
        ") eh " +
        "on requested_by = eh.user_id " +
        "left outer join " +
        "sequ_location loc " +
        "on loc.id = eh.location_id " +
        "where requested_by = ? and end_date_time >= current_date " +
        "and location_id in( "+qs+ ")" +
        "order by start_date_time asc";

    List<RequestStatus> requests = jdbc.query(sql, args, types, requestMapper);
    HashMap<Integer, RequestStatus> map = new HashMap<Integer, RequestStatus>();

    // change list to hashmap
    for( RequestStatus r : requests) {
      map.put(r.getRequestID(), r);
    }
    return map;
  }

  private static final RowMapper<RequestStatus> requestMapper = new RowMapper<RequestStatus>() {
    public RequestStatus mapRow(ResultSet rs, int rowNum) throws SQLException {
      RequestStatus r = new RequestStatus();
      r.setRequestID(rs.getInt("rid"));
      r.setLocationId(rs.getInt("location_id"));
      r.setEmployeeID(rs.getInt("requested_by"));
      r.setApproverID(rs.getInt("responded_by"));
      r.setStatus(checkStatus(rs.getInt("responded_by"), rs.getBoolean("is_approved")));
      r.setStartDate(rs.getString("start_date_time"));
      r.setEndDate(rs.getString("end_date_time"));
      r.setEmployeeFirstName(rs.getString("requester_first_name"));
      r.setEmployeeLastName(rs.getString("requester_last_name"));
      r.setApproverFirstName(rs.getString("responder_first_name"));
      r.setApproverLastName(rs.getString("responder_last_name"));
      return r;
    }
  };

  public static String checkStatus(Integer responder, boolean approval){
    // System.out.println(responder + " and request is " +  approval);
    if (responder == null | responder == 0) return "Pending";
    else{
      if(approval == true) return "Approved";
      else return "Denied";
    }
  }

}
