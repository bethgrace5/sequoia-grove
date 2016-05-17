package com.sequoiagrove.controller;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.SQLException;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class AvailabilityController {
    // extract scope from request
    @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }

    // Add new availability (or update end time if the availability for the
    // day and time already existed)
    @RequestMapping(value = "/avail/add")
    public String addAvail(Model model, @ModelAttribute("scope")
        List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        String day = jobject.get("day").getAsString();
        int eid = jobject.get("eid").getAsInt();
        String start = jobject.get("start").getAsString();
        String end = jobject.get("end").getAsString();

        // TODO make sure this availability isn't overlapping with the availability
        // time this employee already has for this day (if any)

        // see if this is a current position that the employee has
        int count = jdbcTemplate.queryForInt(
            "select count(*) from sequ_availability where user_id = ?"+
            " and day = ? and startt = ?", eid, day, start);

        // we found a match, update the end time
        if (count > 0) {
           jdbcTemplate.update(" update sequ_availability set endt = ? " +
           " where user_id = ? and day = ? and startt = ?", end, eid, day, start);
        }
        // no match was found, add new availability
        else {
           jdbcTemplate.update(" insert into  sequ_availability " +
               "( user_id, day, startt, endt ) values(?, ?, ?, ?)",
               eid, day, start, end);
        }
        return "jsonTemplate";
    }

    // Remove availability
    @RequestMapping(value = "/avail/remove/{eid}/{day}/{startt}")
    public String removeAvail(Model model,
          @ModelAttribute("scope") List<String> permissions,
          @PathVariable("eid") int eid,
          @PathVariable("day") String day,
          @PathVariable("startt") String startt) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-employees") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("delete from sequ_availability " +
        "where user_id = ? and day = ? and startt = ?", eid, day, startt);

        return "jsonTemplate";
    }
}

