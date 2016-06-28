package com.sequoiagrove.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.sequoiagrove.model.RequestStatus;

public class RequestRowMapper implements RowMapper {

    // custom row mapper for requests
    public RequestStatus  mapRow(ResultSet rs, int rowNum) throws SQLException {
      RequestStatus es = new RequestStatus(
        rs.getInt("rid"),
        rs.getInt("requested_by"),
        rs.getInt("responded_by"),
        checkStatus(rs.getInt("responded_by"), rs.getBoolean("is_approved")),
        rs.getString("start_date_time"),
        rs.getString("end_date_time"),
        rs.getString("requester_first_name"),
        rs.getString("requester_last_name"),
        rs.getString("responder_first_name"),
        rs.getString("responder_last_name"));
      return es;
    }

    public String checkStatus(Integer responder, boolean approval){
      // System.out.println(responder + " and request is " +  approval);
      if (responder == null | responder == 0) return "Pending";
      else{
        if(approval == true) return "Approved";
        else return "Denied";
      }
    }

}

