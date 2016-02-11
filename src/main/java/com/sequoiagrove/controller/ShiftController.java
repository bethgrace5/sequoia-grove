package com.sequoiagrove.controller;

import com.google.gson.*;
import com.sequoiagrove.model.HasShift;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.sequoiagrove.model.HasShift;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ShiftController {

    // get all current shift task names
    @RequestMapping(value = "/shift")
    public String listShiftIds(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<HasShift> list = jdbcTemplate.query(
            "select p.id as pid, s.id as sid, p.title as pname, s.task_name as tname " +
            "from " +
            "bajs_new_shift s " +
            "inner join " +
            "bajs_position p " +
            "on s.position_id = p.id " +
            "where s.end_date is null",
            new RowMapper<HasShift>() {
                public HasShift mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HasShift s = new HasShift(
                      rs.getInt("sid"),
                      rs.getInt("pid"),
                      rs.getString("tname"),
                      rs.getString("pname")
                    );
                    return s;
                }
        });
        model.addAttribute("shift", list);
        return "jsonTemplate";
    }

    // Add new availability (or update end time if the availability for the
    //   day and time already existed)
    @RequestMapping(value = "/avail/add")
     public String addAvail(Model model, @RequestBody String data) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        System.out.println("add availability");

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
            "select count(*) from bajs_availability where employee_id = ?"+
            " and day = ? and startt = ?", eid, day, start);

        // we found a match, update the end time
        if (count > 0) {
           jdbcTemplate.update(" update bajs_availability set endt = ? " +
           " where employee_id = ? and day = ? and startt = ?", end, eid, day, start);
        }
        // no match was found, add new availability
        else {
           jdbcTemplate.update(" insert into  bajs_availability " +
               "( employee_id, day, startt, endt ) values(?, ?, ?, ?)",
               eid, day, start, end);
        }

          return "jsonTemplate";
    }

    @RequestMapping(value = "/avail/remove/{eid}/{day}/{startt}")
    public String removeAvail(Model model,
          @PathVariable("eid") int eid,
          @PathVariable("day") String day,
          @PathVariable("startt") String startt) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("delete from bajs_availability " +
        "where employee_id = ? and day = ? and startt = ?", eid, day, startt);

        return "jsonTemplate";
    }

}

