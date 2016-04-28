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

  @RequestMapping(value = "/holiday")
    public String getAllHolidays(Model model){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      List<Holiday> holidayList = jdbcTemplate.query(
          "select * from sequ_holiday",
          new RowMapper<Holiday>() {
            public Holiday mapRow(ResultSet rs, int rowNum) throws SQLException {
              Holiday es = new Holiday(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("hdate"),
                rs.getString("store_open"),
                rs.getString("store_close")
              );
              return es;
            }
          });
      model.addAttribute("holidays", holidayList);
      return "jsonTemplate";
    }

  @RequestMapping(value = "/holiday/add")
    public String sumbitNewHoliday(@RequestBody String data, Model model) throws SQLException {
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();

      Object[] params = new Object[] {
          jobject.get("title").getAsString(),
          jobject.get("date").getAsString(),
          jobject.get("storeOpenVal").getAsString(),
          jobject.get("storeCloseVal").getAsString(),
      };

      jdbcTemplate.update(
          "insert into sequ_holiday "+
          " (title, hdate, store_open, store_close) "+
          " values(?, to_date(?, 'mm-dd-yyyy') , ?, ?) ",
          params);
      return "jsonTemplate";
    }

    @RequestMapping(value = "/holiday/update")
      public String changeRequestDates(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        /*
        Gson gson = new Gson();

        Holiday hol = gson.fromJson(data, Holiday.class);

        String name = hol.getName();
        String newDate = hol.getDate();
        String newType = hol.getType();

        /*
        jdbcTemplate.update(
           " update holiday " +
           " set " +
           " type = " + newType + ", " +
           " date = " + newDate + " "  +
           " where name = " + name
        );
        */
        return "jsonTemplate";
      }

    @RequestMapping(value = "/holiday/remove/{id}")
      public String deleteRequest(@PathVariable("id") int id, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        jdbcTemplate.update( "delete from sequ_holiday where id = ?", id);
        return "jsonTemplate";
      }

    @RequestMapping(value = "/holiday/get/between/{dateStart}/{dateEnd}")
      public String getHolidaysBetween(Model model,
          @PathVariable("dateStart") String dateStart,
          @PathVariable("dateEnd") String dateEnd ) throws SQLException{
        //Make Sure request ID is there too...

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        System.out.println(dateStart + " " + dateEnd);

        Object[] params = new Object[] {
          dateStart,
          dateEnd
        };
        List<Holiday> holidayList = jdbcTemplate.query(
          "select * from sequ_holiday where true " +
          " and hdate >= to_date(?, 'mm-dd-yyyy') " +
          " and hdate <= to_date(?, 'mm-dd-yyyy') ", params,
          new RowMapper<Holiday>() {
            public Holiday mapRow(ResultSet rs, int rowNum) throws SQLException {
              Holiday es = new Holiday(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("hdate"),
                rs.getString("store_open"),
                rs.getString("store_close")
              );
              return es;
            }
          });
       
        model.addAttribute("holidays", holidayList);
        return "jsonTemplate";
      }
}
