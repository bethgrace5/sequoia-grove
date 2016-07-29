package com.sequoiagrove.controller;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.controller.MainController;
import com.sequoiagrove.controller.EmployeeController;
import com.sequoiagrove.model.Holiday;

@Controller
public class HolidaysController {

  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }

  @RequestMapping(value = "/holiday/{locations}")
    public String getAllHolidays(Model model,
        @PathVariable("locations") String locations){

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      // change location string to list of java integers
      ArrayList<Integer> loc = EmployeeController.stringToIntArray(locations);
      Map<Integer, List<Holiday>> holidays = new HashMap<Integer, List<Holiday>>();

      for(Integer l : loc) {
        List<Holiday> holidayList = jdbcTemplate.query(
            "select id, hdate, title, store_open, store_close, to_char(hdate, 'D') as day from sequ_holiday where location_id = ?",
            new Object[]{l},
            new RowMapper<Holiday>() {
              public Holiday mapRow(ResultSet rs, int rowNum) throws SQLException {
                Holiday es = new Holiday(
                  rs.getInt("id"),
                  rs.getInt("day"),
                  rs.getString("title"),
                  rs.getString("hdate"),
                  rs.getString("store_open"),
                  rs.getString("store_close")
                );
                return es;
              }
            });
          holidays.put(l, holidayList);
      }

      model.addAttribute("holidays", holidays);
      return "jsonTemplate";
    }

  @RequestMapping(value = "/holiday/add")
    public String sumbitNewHoliday(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

      // the token did not have the required permissions, return 403 status
      if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
          model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
          return "jsonTemplate";
      }

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
      public String changeRequestDates(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

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
      public String deleteRequest(@PathVariable("id") int id, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        jdbcTemplate.update( "delete from sequ_holiday where id = ?", id);
        return "jsonTemplate";
      }

    @RequestMapping(value = "/holiday/get/between/{dateStart}/{dateEnd}")
      public String getHolidaysBetween(Model model, @ModelAttribute("scope") List<String> permissions,
          @PathVariable("dateStart") String dateStart,
          @PathVariable("dateEnd") String dateEnd ) throws SQLException{

        // the token did not have the required permissions, return 403 status
        //if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            //model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            //return "jsonTemplate";
        //}
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        Object[] params = new Object[] { dateStart, dateEnd };
        List<Holiday> holidayList = jdbcTemplate.query(
          "select id, hdate, title, store_open, store_close, to_char(hdate, 'D') as day " +
          " from sequ_holiday where true " +
          " and hdate >= to_date(?, 'mm-dd-yyyy') " +
          " and hdate <= to_date(?, 'mm-dd-yyyy') ", params,
          new RowMapper<Holiday>() {
            public Holiday mapRow(ResultSet rs, int rowNum) throws SQLException {
              Holiday es = new Holiday(
                rs.getInt("id"),
                rs.getInt("day"),
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
