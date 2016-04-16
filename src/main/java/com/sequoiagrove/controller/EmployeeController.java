package com.sequoiagrove.controller;

import com.google.gson.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Types;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;

@Controller
public class EmployeeController
{

    // Get All Employees with the availability, positions, and employment history
    @RequestMapping(value = "/employees")
    public String getAllEmployee(Model model) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        String queryStr = "select * from employee_info_view";
        List<Employee> empList = jdbcTemplate.query( queryStr,
            new RowMapper<Employee>() {
                public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Employee employee = new Employee (
                      rs.getInt("id"),
                      rs.getInt("max_hrs_week"),
                      rs.getInt("min_hrs_week"),
                      rs.getBoolean("is_manager"),
                      rs.getInt("clock_number"),
                      rs.getString("first_name"),
                      rs.getString("last_name"),
                      rs.getString("phone_number"),
                      rs.getString("email"),
                      rs.getDate("birth_date"),
                      parseHistory(rs.getString("history")),
                      parsePositions(rs.getString("positions")),
                      parseAvailability(rs.getString("avail")),
                      false);

                      // if the history end is an empty string, employee is current
                      employee.setIsCurrent(
                        employee.getHistory()
                          .get(employee.getHistory().size() - 1)
                          .getEnd() == ""
                      );
                    return employee;
                }
            });
        model.addAttribute("employees", empList);
        return "jsonTemplate";
    }

    // change availability string to java object
    public WeeklyAvail parseAvailability(String avail) {

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
    public List<Duration> parseHistory(String hist) {
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
    public List<String> parsePositions(String pos) {
      if (pos == null) {
        return new ArrayList<String>();
      }
      return new ArrayList<String>(Arrays.asList(pos.split(",")));
    }

    @RequestMapping(value = "/employee/update", method = RequestMethod.POST)
    public String updateEmployee(Model model, @RequestBody String data) throws SQLException {

      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();

      Object[] params = new Object[] {
          jobject.get("firstName").getAsString(),
          jobject.get("lastName").getAsString(),
          jobject.get("isManager").getAsBoolean(),
          jobject.get("birthDate").getAsString(),
          jobject.get("maxHrsWeek").getAsInt(),
          jobject.get("minHrsWeek").getAsInt(),
          jobject.get("phone").getAsString(),
          jobject.get("clock").getAsInt(),
          jobject.get("email").getAsString(),
          jobject.get("id").getAsInt()
      };

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update( "update employee set first_name = ?, "+
          "last_name    = ?, "+
          "is_manager   = ?, "+
          "birth_date   = to_date(?, 'mm-dd-yyyy'), "+
          "max_hrs_week = ?, "+
          "min_hrs_week = ?, "+
          "phone_number = ?, "+
          "clock_number = ?, "+
          "email = ?  "+
          "where id = ?",
         params);

        // return the id
        model.addAttribute("id", jobject.get("id").getAsInt());
        return "jsonTemplate";
    }

    @RequestMapping(value = "/employee/add", method=RequestMethod.POST)
    public String addEmployee(Model model, @RequestBody String data) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        // get id just used to add employee
        int id = jdbcTemplate.queryForObject("select nextval('employee_id_seq')", Integer.class);

        Object[] params = new Object[] {
            id,
            jobject.get("firstName").getAsString(),
            jobject.get("lastName").getAsString(),
            jobject.get("isManager").getAsBoolean(),
            jobject.get("birthDate").getAsString(),
            jobject.get("maxHrsWeek").getAsInt(),
            jobject.get("minHrsWeek").getAsInt(),
            jobject.get("phone").getAsString(),
            jobject.get("clock").getAsInt(),
            jobject.get("email").getAsString(),
        };

        // add employee
        jdbcTemplate.update("insert into employee (id, first_name, last_name," +
            "is_manager, birth_date, max_hrs_week, min_hrs_week, phone_number, clock_number, email) " +
            "values(?, ?, ?, ?, to_date(?, 'mm-dd-yyyy'), ?, ?, ?, ?, ? )", params);

        // activate the employee
        jdbcTemplate.update("insert into employment_history values( ?, current_date, null)", id);

        // return the new id
        model.addAttribute("id", id);
        return "jsonTemplate";
    }

    // Deactivate (un-employ) an employee
    @RequestMapping(value = "/employee/deactivate", method=RequestMethod.POST)
    public String deactivateEmployee(Model model, @RequestBody String data) throws SQLException {
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] params = new Object[] { id };
      Object[] params2 = new Object[] { id, id };


      // if the user tries to unemploy an employee they just re-employed today, delete the row instead
      int count = jdbcTemplate.queryForObject(
        "select count(*) from employment_history where employee_id = ? and date_employed=current_date and date_unemployed is null and " +
        "(select count(*) from employment_history where employee_id = ?) > 1", params2, Integer.class);

      // special case where user tries to unemploy employee they just reemployed today - deletes row instead
      if(count > 0) {
        jdbcTemplate.update(
            "delete from employment_history where employee_id = ? and date_employed=current_date", params);
      }
      // standard procedure, make sure is current then set date unemployed
      else {
          // make sure this employee is current
          count = jdbcTemplate.queryForObject("select count(*) from employment_history " +
              " where employee_id = ? and date_unemployed is null", params, Integer.class);
          // this was a current employee, set date unemployed to today
          if (count > 0){
            jdbcTemplate.update(" update employment_history " +
                "set date_unemployed = current_date " +
                "where employee_id = ? and date_unemployed is null", id);
          }
      }
        return "jsonTemplate";
    }

    // Activate (re-employ) an employee
    @RequestMapping(value = "/employee/activate", method=RequestMethod.POST)
    public String activateEmployee(Model model, @RequestBody String data) throws SQLException {
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] params = new Object[] { id };

      // we are assuming the employee id exists. Might need to add a query to double check
      // "select count(*) from employee where id = ?"

      // see if this employee current
      int count = jdbcTemplate.queryForObject("select count(*) from employment_history " +
          " where employee_id = ? and date_unemployed is null", params, Integer.class);

      // this was NOT a current employee, add a new employment history
      if (count <= 0){
        jdbcTemplate.update(" insert into employment_history " +
            "values( ?, current_date, null) ", id);
      }
        return "jsonTemplate";
    }

}
