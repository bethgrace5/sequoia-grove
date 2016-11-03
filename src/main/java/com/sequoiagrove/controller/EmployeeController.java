package com.sequoiagrove.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
  @Autowired
    private EmployeeRepository repository;

  // Get All Employees with the availability, positions, and employment history
  @RequestMapping(value = "/employees/{locations}")
    public Map<String, Object> getAllEmployee(@PathVariable("locations") Object[] locations) {
      Map<String,Object> model = new HashMap<String,Object>();
      model.put("employees", repository.getEmployeesByLocation(locations));
      return model;
    }

  @RequestMapping(value = "/employee/update", method = RequestMethod.POST)
    public Map<String, Object> updateEmployee(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] args = new Object[] {
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
          id
      };
      repository.update(args);
      model.put("id", id);
      return model;
    }

  @RequestMapping(value = "/employee/deactivate", method=RequestMethod.POST)
    public Map<String, Object> deactivateEmployee(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();
      int locationId = jobject.get("locationId").getAsInt();
      model.put("deactivated", repository.deactivate(id, locationId));
      return model;
    }

  /*

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
