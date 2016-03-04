package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class AvailabilityController {

    // Add new availability (or update end time if the availability for the
    //   day and time already existed)
    @RequestMapping(value = "/avail/add")
     public String addAvail(Model model, @RequestBody String data) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        String day = jobject.get("day").getAsString();
        String eid = jobject.get("eid").getAsString();
        String start = jobject.get("start").getAsString();
        String end = jobject.get("end").getAsString();

        // TODO make sure this availability isn't overlapping with the availability
        // time this employee already has for this day (if any)

        // see if this is a current position that the employee has
        int count = jdbcTemplate.queryForInt(
            "select count(*) from availability where employee_id = ?"+
            " and day = ? and startt = ?", eid, day, start);

        // we found a match, update the end time
        if (count > 0) {
           jdbcTemplate.update(" update availability set endt = ? " +
           " where employee_id = ? and day = ? and startt = ?", end, eid, day, start);
        }
        // no match was found, add new availability
        else {
           jdbcTemplate.update(" insert into  availability " +
               "( employee_id, day, startt, endt ) values(?, ?, ?, ?)",
               eid, day, start, end);
        }
        return "jsonTemplate";
    }

    // Remove availability
    @RequestMapping(value = "/avail/remove/{eid}/{day}/{startt}")
    public String removeAvail(Model model,
          @PathVariable("eid") int eid,
          @PathVariable("day") String day,
          @PathVariable("startt") String startt) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("delete from availability " +
        "where employee_id = ? and day = ? and startt = ?", eid, day, startt);

        return "jsonTemplate";
    }
}

