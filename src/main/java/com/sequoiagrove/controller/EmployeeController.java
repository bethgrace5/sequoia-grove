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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;

@Controller
public class EmployeeController
{

    @RequestMapping(value = "/employee/info/all")
    public String getAllEmployee(Model model) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        // Get All Employees by Default
        String queryStr = "select * from bajs_emp_all_info";

        List<Employee> empList = jdbcTemplate.query( queryStr,
            new RowMapper<Employee>() {
                public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Employee employee = new Employee (
                      rs.getInt("id"),
                      rs.getInt("max_hrs_week"),
                      rs.getInt("is_manager"),
                      rs.getInt("clock_number"),
                      rs.getString("first_name"),
                      rs.getString("last_name"),
                      rs.getString("phone_number"),
                      rs.getString("email"),
                      rs.getDate("birth_date"),
                      parseHistory(rs.getString("history")),
                      parsePositions(rs.getString("positions")),
                      parseAvailability(rs.getString("avail"))
                    );

                    return employee;
                }
        });

        /*for all emp, find emp_id in hashmap and insert corresponding data*/
        model.addAttribute("employeeInfo", empList);
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
    public String updateEmployee(Model model, @RequestBody String postLoad) throws SQLException {

      JsonElement jelement = new JsonParser().parse(postLoad);
      JsonObject  jobject = jelement.getAsJsonObject();

      String[] params = {
          jobject.get("firstName").getAsString(),
          jobject.get("lastName").getAsString(),
          jobject.get("isManager").getAsString(),
          jobject.get("birthDate").getAsString(),
          jobject.get("maxHrsWeek").getAsString(),
          jobject.get("phone").getAsString(),
          jobject.get("clock").getAsString(),
          jobject.get("id").getAsString()
      };

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update( "update BAJS_employee set first_name = ?, "+
          "last_name    = ?, "+
          "is_manager   = ?, "+
          "birth_date   = to_date(?, 'yyyy-mm-dd'), "+
          "max_hrs_week = ?, "+
          "phone_number = ?, "+
          "clock_number = ?  "+
          "where id = ?",
         params);

        return "jsonTemplate";
    }

    @RequestMapping(value = "/employee/add/{fname}/{lname}/" +
        "{mgr}/{phone}/{bday}/{maxHr}/{clk}")
    public String addEmployee(Model model,
          @PathVariable("fname") String fname,
          @PathVariable("lname") String lname,
          @PathVariable("mgr") int mgr,
          @PathVariable("phone") String phone,
          @PathVariable("bday") String bday,
          @PathVariable("maxHr") int maxHr,
          @PathVariable("clk") int clk) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("insert into BAJS_employee (id, first_name, last_name," +
          "is_manager, birth_date, max_hrs_week, phone_number, clock_number) " +
          "values(0,?,?,?, to_date(?, 'dd-mm-yyyy'), ?, ?, ? )",
          fname, lname, mgr, bday, maxHr, phone, clk);

        return "jsonTemplate";
    }


}
