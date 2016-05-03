package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import java.sql.Date;
import java.sql.Types;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.sql.ResultSet;
import org.springframework.jdbc.core.SqlParameterValue;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.Scheduled;
import com.sequoiagrove.controller.MainController;
import org.springframework.transaction.TransactionStatus;


@Controller
public class ScheduleGeneratorController {
  //Schedule Page
  //  for each slot (day, pid) check a given amount of  weeks
  //    for each employee who work that day. 
  //    i think it would look like this
  //    slot 1 [ eid, day, pid, amounts of time works on that slot]
  //           [ 001, mon, 1  , 3]
  //           [ 003, mon, 1  , 2]
  //
  //    or this
  //
  //    slot 1 [pid, amounts]
  //           [001, 3      ]
  //           [003, 2      ]
  //
  //???Wide Range(but It wont be used)
  //    slot 1 [ eid, day, pid, amounts of time works on that slot]
  //           [ 001, mon, 1  , 3]
  //           [ 003, mon, 1  , 2]
  //           [ 004, mon, 2  , 5]
  //           [ 005, mon, 3  , 4]
  //           [ 006, mon, 3  , 1]
  //           [ 001, tue, 1  , 1]
  //           [ 003, tue, 1  , 4]
  void generate(){
    //Hashmap testing 
    //      [key date [key pid [key eid, amount of times work] ] ]

  }

  void listEmployeeOnSlot(String date, int pid){
    //Function to input data into a hashtable
  }
  void insert(String date){

  }

  void placeHolder123(){
    /*
       select shift_id as shift, STRING_AGG(employee_id || '', ',' ORDER BY shift_id)
       AS eids
       from employee_shift_view p
       where p.on_date >= '2016-03-21' AND p.on_date <= '2016-04-30' AND p.day = '1'
       group by shift_id
    */
  }

}

