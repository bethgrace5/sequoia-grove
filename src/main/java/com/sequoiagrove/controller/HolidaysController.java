package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.Scheduled;
import com.sequoiagrove.controller.MainController;

import com.sequoiagrove.model.RequestStatus;
import com.sequoiagrove.model.Holiday;

//BAJS_HOLIDAY
//String
//hdate 
//name
//type

@Controller
public class HolidaysController {
  @RequestMapping(value = "/schedule/get/holidays")
    public String getAllHolidays(Model model){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      /*
      List<Holiday> holidayList = jdbcTemplate.query(
          "select * from bajs_holiday",
          new RowMapper<Holiday>() {
            public Holiday mapRow(ResultSet rs, int rowNum) throws SQLException {
              Holiday es = new Holiday(
                rs.getString("name"),
                rs.getString("hdate"),
                rs.getString("type")
              );
              return es;
            }
          });
      model.addAttribute("holidays", holidayList);
      */
      return "jsonTemplate";
    }
}
