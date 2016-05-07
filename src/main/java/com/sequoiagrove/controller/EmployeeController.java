package com.sequoiagrove.controller;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.model.User;
import com.sequoiagrove.model.SuperUserRowMapper;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;
import com.sequoiagrove.controller.EmployeeController;

@Controller
public class EmployeeController
{
  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
        //return Arrays.asList(csvPermissions.split(","));
        List<String> permissions = new ArrayList<String>();
        try {
        permissions =  EmployeeController.parsePermissions(
            request.getAttribute("scope").toString());

        } catch( NullPointerException e) {
          System.out.println("caught null pointer exception get permissions employee controller");
          return null;
        };
        return permissions;
    }

    // Get All Employees with the availability, positions, and employment history
    @RequestMapping(value = "/employees")
    public String getAllEmployee(Model model, @ModelAttribute("scope") List<String> permissions) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        String queryStr = "select * from sequ_user_info_view order by last_name";
        List<User> empList = jdbcTemplate.query( queryStr, new SuperUserRowMapper());
        model.addAttribute("employees", empList);
        return "jsonTemplate";
    }

    // change availability string to java object
    public static WeeklyAvail parseAvailability(String avail) {

      WeeklyAvail entireAvail = new WeeklyAvail();

      // split string into array with one string per day
      String[] weekdays = avail.split("\\s+");

      // for each day, add it to the weekly availability
      for (String d : weekdays) {
        String[] day = d.split(",");

        for(int i=1; i<day.length; i++) {
          String[] times = day[i].split(":");
          entireAvail.add(day[0], times[0], times[1]);
        }
      }
      return entireAvail;
    }

    // change History string to list of java objects
    public static List<Duration> parseHistory(String hist) {
      List<Duration> historyList = new ArrayList<Duration>();

      String[] histories = hist.split(",");
      for (String h : histories) {
        String[] times = h.split(":");
        if(times.length == 2) {
          historyList.add(new Duration(times[0], times[1]));
        }
        else {
          historyList.add(new Duration(times[0]));
        }
      }
      return historyList;
    }

    // change Position string to list of java objects
    public static List<String> parsePositions(String pos) {
      if (pos == null) {
        return new ArrayList<String>();
      }
      return new ArrayList<String>(Arrays.asList(pos.split(",")));
    }

    // change Permissions string to list of java objects
    public static List<String> parsePermissions(String permissions) {
      if (permissions == null) {
        return new ArrayList<String>();
      }
      return new ArrayList<String>(Arrays.asList(permissions.split(",")));
    }

    @RequestMapping(value = "/employee/update", method = RequestMethod.POST)
    public String updateEmployee(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        try {
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        }
        catch (NullPointerException e) {
          System.out.println("No permissions found (interceptor didn't fire)");
          model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
          return "jsonTemplate";
        }

      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();

      Object[] params = new Object[] {
          jobject.get("firstname").getAsString(),
          jobject.get("lastname").getAsString(),
          jobject.get("birthDate").getAsString(),
          jobject.get("maxHours").getAsInt(),
          jobject.get("minHours").getAsInt(),
          jobject.get("phone").getAsString(),
          jobject.get("clockNumber").getAsInt(),
          jobject.get("email").getAsString(),
          jobject.get("classificationId").getAsInt(),
          jobject.get("id").getAsInt()
      };

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update( "update sequ_user set first_name = ?, "+
          "last_name    = ?, "+
          "birth_date   = to_date(?, 'mm-dd-yyyy'), "+
          "max_hrs_week = ?, "+
          "min_hrs_week = ?, "+
          "phone_number = ?, "+
          "clock_number = ?, "+
          "email = ?, "+
          "classification_id = ?  "+
          "where id = ?",
         params);

        // return the id
        model.addAttribute("id", jobject.get("id").getAsInt());
        return "jsonTemplate";
    }

    @RequestMapping(value = "/employee/add", method=RequestMethod.POST)
    public String addEmployee(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!permissions.contains("manage-employees")) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        // get id just used to add employee
        int id = jdbcTemplate.queryForObject("select nextval('sequ_user_sequence')", Integer.class);

        Object[] params = new Object[] {
            id,
            jobject.get("firstname").getAsString(),
            jobject.get("lastname").getAsString(),
            jobject.get("birthDate").getAsString(),
            jobject.get("maxHours").getAsInt(),
            jobject.get("minHours").getAsInt(),
            jobject.get("phone").getAsString(),
            jobject.get("clockNumber").getAsInt(),
            jobject.get("email").getAsString(),
            jobject.get("classificationId").getAsInt()
        };

        // add employee
        jdbcTemplate.update("insert into sequ_user (id, first_name, last_name," +
            " birth_date, max_hrs_week, min_hrs_week, phone_number, clock_number, email, classification_id) " +
            "values(?, ?, ?, ?, to_date(?, 'mm-dd-yyyy'), ?, ?, ?, ?, ?, ? )", params);

        // activate the employee
        jdbcTemplate.update("insert into sequ_employment_history values( ?, current_date, null)", id);

        // return the new id
        model.addAttribute("id", id);
        return "jsonTemplate";
    }

    // Deactivate (un-employ) an employee
    @RequestMapping(value = "/employee/deactivate", method=RequestMethod.POST)
    public String deactivateEmployee(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!permissions.contains("manage-employees")) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] params = new Object[] { id };
      Object[] params2 = new Object[] { id, id };


      // if the user tries to unemploy an employee they just re-employed today, delete the row instead
      int count = jdbcTemplate.queryForObject(
        "select count(*) from sequ_employment_history where user_id = ? and date_employed=current_date and date_unemployed is null and " +
        "(select count(*) from sequ_employment_history where user_id = ?) > 1", params2, Integer.class);

      // special case where user tries to unemploy employee they just reemployed today - deletes row instead
      if(count > 0) {
        jdbcTemplate.update(
            "delete from sequ_employment_history where user_id = ? and date_employed=current_date", params);
      }
      // standard procedure, make sure is current then set date unemployed
      else {
          // make sure this employee is current
          count = jdbcTemplate.queryForObject("select count(*) from sequ_employment_history " +
              " where user_id = ? and date_unemployed is null", params, Integer.class);
          // this was a current employee, set date unemployed to today
          if (count > 0){
            jdbcTemplate.update(" update sequ_employment_history " +
                "set date_unemployed = current_date " +
                "where user_id = ? and date_unemployed is null", id);
          }
      }
        return "jsonTemplate";
    }

    // Activate (re-employ) an employee
    @RequestMapping(value = "/employee/activate", method=RequestMethod.POST)
    public String activateEmployee(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!permissions.contains("manage-employees")) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] params = new Object[] { id };

      // we are assuming the employee id exists. Might need to add a query to double check
      // "select count(*) from employee where id = ?"

      // see if this employee current
      int count = jdbcTemplate.queryForObject("select count(*) from sequ_employment_history " +
          " where user_id = ? and date_unemployed is null", params, Integer.class);

      // this was NOT a current employee, add a new employment history
      if (count <= 0){

        // in the case they were unemployed today, and then reemployed, update instead of insert new.
        count = jdbcTemplate.queryForObject("select count(*) from sequ_employment_history " +
            " where user_id = ? and date_unemployed = current_date", params, Integer.class);

        if(count >0) {
        // in the case they were unemployed today, and then reemployed, update instead of insert new.
          jdbcTemplate.update(" update sequ_employment_history set date_unemployed = null " +
              "where user_id = ?", id);
        }
        else {
          jdbcTemplate.update(" insert into sequ_employment_history " +
              "values( ?, current_date, null) ", id);
        }
      }
        return "jsonTemplate";
    }

}
