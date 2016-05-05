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
import com.sequoiagrove.model.Generator;
import com.sequoiagrove.model.DayShiftEmployee;
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
  @RequestMapping(value = "/schedule/autogen")
  public String buildGenerator(@RequestBody String data, Model model){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

      // parse params
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      final String mon = jobject.get("mon").getAsString();
      final String historyStart = jobject.get("historyStart").getAsString();
      final String historyEnd = jobject.get("historyEnd").getAsString();
  /*
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      Generator generator;
      generator = new Generator();
      List<DayShiftEmployee> dayShiftEmployeeList = jdbcTemplate.query(
        " select day, shift_id, employee_id, count(*) AS worked" +
        " from employee_shift_view " +
        " where on_date >= '2016-03-21' AND on_date <= '2016-04-15' " +
        " group by day, shift_id, employee_id " +
        " order by day, shift_id, employee_id ",
      //I need way to build Generator without the DayShiftEmployee
          //"also day might be A String"
          new RowMapper<DayShiftEmployee>() {
            public DayShiftEmployee mapRow(ResultSet rs, int rowNum) throws SQLException {
              DayShiftEmployee es = new DayShiftEmployee(
                rs.getInt("day"),//This Might Be Wrong?
                rs.getInt("shift_id"),
                rs.getInt("employee_id"),
                rs.getInt("worked")
              );

              generator.insert(rs.getInt("day"), rs.getInt("shift_id"),
                               rs.getInt("employee_id"), rs.getInt("worked")
                              );

              return es;
            }
          });
      //model.addAttribute("holidays", holidayList);
  */

      // Add all employees with corresponding Position into hash map for each slot
      // (Already Done????)

      // Trim hash maps by Requests Off and Availabilities

      // Construct schedule template using {mon} to get correct shifts
      // !!!!! all employees are null/0, check if mon is passed correctly !!!!!
      List<ScheduleTemplate> schTempList = jdbcTemplate.query(
        "select * from get_schedule(?)",
        new Object[]{mon},
        new RowMapper<ScheduleTemplate>() {
          public ScheduleTemplate mapRow(ResultSet rs, int rowNum) throws SQLException {

            ScheduleTemplate schTmp = new ScheduleTemplate(
                rs.getInt("sid"),
                rs.getInt("pid"),
                rs.getString("location"),
                rs.getString("tname"),
                rs.getString("pos"),
                rs.getString("wd_st"),// weekday start
                rs.getString("wd_ed"),// weekday end
                rs.getString("we_st"),// weekend start
                rs.getString("we_ed"),// weekend end
                new Day("mon", rs.getString("mon"), rs.getInt("mon_eid")),
                new Day("tue", rs.getString("tue"), rs.getInt("tue_eid")),
                new Day("wed", rs.getString("wed"), rs.getInt("wed_eid")),
                new Day("thu", rs.getString("thu"), rs.getInt("thu_eid")),
                new Day("fri", rs.getString("fri"), rs.getInt("fri_eid")),
                new Day("sat", rs.getString("sat"), rs.getInt("sat_eid")),
                new Day("sun", rs.getString("sun"), rs.getInt("sun_eid")) );

            return schTmp;
          }
        });

      Integer count = jdbcTemplate.queryForObject(
          "SELECT count(*) FROM published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);
      
      // Insert employees into shift slots using AI

      model.addAttribute("ispublished", (count!=null && count > 0));
      model.addAttribute("template", schTempList);

      return "jsonTemplate";
  }
}

