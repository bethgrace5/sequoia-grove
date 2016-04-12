package com.sequoiagrove.controller; 
import com.google.gson.*;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import javax.ws.rs.NotFoundException;
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

@Controller
public class ManageStore {

/* ----- Pure Functions ----- */
   public boolean validateStrings(String... args) {
        for (String arg : args) {
            if (arg.isEmpty() || arg == null) {
                return false;
            }
        }
        return true;
    }

/* ----- Helper JDBC Functions ----- */
    public boolean checkHoursExist(String startHr, String endHr) {

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        Object[] obj = new Object[] { startHr, endHr };
        int count = jdbcTemplate.queryForObject("select count(*) from bajs_hours " +
            " where start_hour = ? and end_hour = ?", obj, Integer.class);
        return (count > 0);
    }

    public int addHours(String startHr, String endHr) {

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        int id = 0;
        Object[] obj = new Object[] { startHr, endHr };
        if ( checkHoursExist(startHr, endHr) ) {
          id = jdbcTemplate.queryForObject(
              "select id from bajs_hours where start_hour=? and end_hour=?",
              obj, Integer.class);
        }
        else {
          id = jdbcTemplate.queryForObject(
              "select bajs_hours_id_sequence.nextval from dual", Integer.class);
          jdbcTemplate.update(" insert into bajs_hours (id, start_hour, end_hour) " +
              "values( ?, ?, ?) ", id, startHr, endHr);
        }
        return id;
    }

/* ----- HTTP Mapped Functions ----- */

  // Add new shift
    @RequestMapping(value = "/shift/add", method = RequestMethod.POST)
    public String addShift(@RequestBody String data, Model model) throws SQLException, NotFoundException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
 
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        String pid = jobject.get("pid").getAsString();
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString();
        String weekendStart = jobject.get("weekendStart").getAsString();
        String weekendEnd = jobject.get("weekendEnd").getAsString();

        if (!validateStrings(pid, tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                throw new IllegalArgumentException("Start time >= End Time");
            }
            Integer.parseInt(pid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        int weekdayHourId = addHours(weekdayStart, weekdayEnd);
        int weekendHourId = addHours(weekendStart, weekendEnd);
        int sid = jdbcTemplate.queryForObject("select bajs_shift_id_sequence.nextval from dual", Integer.class);

        String[] params = {
            sid + "",
            pid,
            tname,
            weekdayHourId + "",
            weekendHourId + ""
        };

        jdbcTemplate.update("insert into bajs_shift " +
            "(id, position_id, task_name, start_date, end_date, weekday_id, weekend_id) " +
            "values(?, ?, ?, (select current_date from dual), null, ?, ?)", params);

        model.addAttribute("sid", sid);

        return "jsonTemplate";
    }

  // Update currently selected shift
    @RequestMapping(value = "/shift/update", method = RequestMethod.POST)
    public String updateShift(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
 
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        String sid = jobject.get("sid").getAsString();
        String pid = jobject.get("pid").getAsString();
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString();
        String weekendStart = jobject.get("weekendStart").getAsString();
        String weekendEnd = jobject.get("weekendEnd").getAsString();

        if (!validateStrings(
          sid, pid, tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                throw new IllegalArgumentException("Start time >= End Time");
            }
            Integer.parseInt(pid);
            Integer.parseInt(sid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        int weekdayHourId = addHours(weekdayStart, weekdayEnd);
        int weekendHourId = addHours(weekendStart, weekendEnd);

        String[] params = {
            pid,
            tname,
            weekdayHourId + "",
            weekendHourId + "",
            sid
        };

        jdbcTemplate.update( "update BAJS_shift set "+
          "position_id = ?, "+
          "task_name = ?, "+
          "weekday_id = ?, "+
          "weekend_id = ? "+
          "where id = ?",
         params);

        return "jsonTemplate";
    }

  // Delete currently selected shift
    @RequestMapping(value = "/shift/delete", method = RequestMethod.POST)
    public String deleteShift(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
 
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        String sid = jobject.get("sid").getAsString();

        //model.addAttribute("error", false);
        if (!validateStrings(sid)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            Integer.parseInt(sid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        jdbcTemplate.update( "update BAJS_shift set "+
          "end_date = (select current_date from dual) "+
          "where id = ?",
        sid);

        return "jsonTemplate";
    }
}

