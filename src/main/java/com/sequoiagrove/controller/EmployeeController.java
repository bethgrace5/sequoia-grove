package com.sequoiagrove.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import com.sequoiagrove.model.WeeklyAvail;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController
{
  @Autowired
    private UserRepository users;

  // Get All Employees with the availability, positions, and employment history
  @RequestMapping(value = "/employees/{locations}") public Map<String, Object> getAllEmployee(
      @ModelAttribute("scope") ArrayList<String> permissions,
      @PathVariable("locations") String locations) {
    Map<String,Object> model = new HashMap<String,Object>();
    JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

    System.out.println(locations);

    // the token did not have the required permissions, return 403 status
    //if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
      //model.put("status", HttpServletResponse.SC_FORBIDDEN);
      //return model;
    //}

    String[] tmp = locations.split(",");
    int[] loc = new int[tmp.length];

    for(int i=0; i<tmp.length; i++) {
      loc[i] = Integer.parseInt(tmp[i]);
    }

    model.put("employees", users.getUsersByLocation(loc));

    return model;
  }
  /*
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

    */

    /*

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
          jobject.get("notes").getAsString(),
          jobject.get("id").getAsInt()
      };

      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
      jdbcTemplate.update( "update sequ_user set first_name = ?, "+
          "last_name    = ?, "+
          "birth_date   = to_date(?, 'mm-dd-yyyy'), "+
          "max_hrs_week = ?, "+
          "min_hrs_week = ?, "+
          "phone_number = ?, "+
          "clock_number = ?, "+
          "email = ?, "+
          "classification_id = ?,  "+
          "notes  = ?  "+
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
        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        // get id just used to add employee

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
            jobject.get("notes").getAsString()
        };

        // add employee
        int id = jdbcTemplate.queryForObject(
            "insert into sequ_user ( " +
            "id, " +
            "first_name,   " +
            "last_name,    " +
            "birth_date,   " +
            "max_hrs_week, " +
            "min_hrs_week, " +
            "phone_number, " +
            "clock_number, " +
            "email,        " +
            "classification_id, " +
            "notes)        " +
            "values((select nextval('sequ_user_sequence')), ?, ?, to_date(?, 'mm-dd-yyyy'), ?, ?, ?, ?, ?, ?, ?) returning currval('sequ_user_sequence')", params, Integer.class);

        // activate the employee
        jdbcTemplate.update("insert into sequ_employment_history values( ?, current_date, null, ?)", id, jobject.get("locationId").getAsInt());

        // give default permissions
        int classid = jobject.get("classificationId").getAsInt();

        // User permissions
         // 1: admin
         // 2: submit-reuquests-off
         // 3: manage-employees
         // 4: manage-requests
         // 5: manage-schedule
         // 6: get-other-store-info
         // 7: manage-store
         // 8: edit-user-permissions
         // 9: admin
         //
        int [] employeePermissions = {2};
        int [] managerPermissions = {2, 3, 4, 5, 7,};
        int [] accountHolderPermissions = {2, 3, 4, 5, 6, 7, 8, 9};

        String addPermissionSQL =
            "INSERT INTO sequ_user_permission (user_id, permission_id) SELECT ?, ? " +
            "WHERE NOT EXISTS ( " +
              "SELECT * FROM sequ_user_permission WHERE user_id = ? and permission_id = ? " +
            ");";

        if (classid == 1) { // employee was added
          for(int i=0; i<employeePermissions.length; i++) {
            jdbcTemplate.update( addPermissionSQL, id, employeePermissions[i], id, employeePermissions[i]);
          }
        }
        if (classid == 2) { // manager was added
          for(int i=0; i<managerPermissions.length; i++) {
            jdbcTemplate.update( addPermissionSQL, id, managerPermissions[i], id, managerPermissions[i]);
          }
        }
        if (classid == 3) { // account holder was added
          //TODO when add multiple location, this means a new account was setup.
          for(int i=0; i<accountHolderPermissions.length; i++) {
            jdbcTemplate.update( addPermissionSQL, id, accountHolderPermissions[i], id, accountHolderPermissions[i]);
          }
        }
        // no way to add a user as an admin, that must be done manually
        // update sequ_user set classification_id = 4 where id = ?

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
      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
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
      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
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
    */

}
