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
import javax.ws.rs.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.Scheduled;
import com.sequoiagrove.controller.MainController;

import com.sequoiagrove.model.RequestStatus;
import com.sequoiagrove.model.Holiday;

@Controller
public class ManageStore {

  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }

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
        int count = jdbcTemplate.queryForObject("select count(*) from sequ_hours " +
            " where start_hour = ? and end_hour = ?", obj, Integer.class);
        return (count > 0);
    }

    public int addHours(String startHr, String endHr) {

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        int id = 0;
        Object[] obj = new Object[] { startHr, endHr };
        if ( checkHoursExist(startHr, endHr) ) {
          id = jdbcTemplate.queryForObject(
              "select id from sequ_hours where start_hour=? and end_hour=?",
              obj, Integer.class);
        }
        else {
          id = jdbcTemplate.queryForObject(
              "select nextval('sequ_hours_sequence')", Integer.class);
          jdbcTemplate.update(" insert into sequ_hours (id, start_hour, end_hour) " +
              "values( ?, ?, ?) ", id, startHr, endHr);
        }
        return id;
    }

/* ----- HTTP Mapped Functions ----- */

  // Add new shift
    @RequestMapping(value = "/shift/add", method = RequestMethod.POST)
    public String addShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException, NotFoundException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        int pid;
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString();
        String weekendStart = jobject.get("weekendStart").getAsString();
        String weekendEnd = jobject.get("weekendEnd").getAsString();

        if (!validateStrings(tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            pid = jobject.get("pid").getAsInt();
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                throw new IllegalArgumentException("Start time >= End Time");
            }
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        int weekdayHourId = addHours(weekdayStart, weekdayEnd);
        int weekendHourId = addHours(weekendStart, weekendEnd);
        int sid = jdbcTemplate.queryForObject("select nextval('sequ_shift_sequence')", Integer.class);
            //"values(?, ?, ?, current_date, null, ?, ?)", params);

        Object[] params = new Object[] {
            sid,
            pid,
            tname,
            weekdayHourId,
            weekendHourId
        };


        model.addAttribute("sid", sid);

        return "jsonTemplate";
    }

  // Update currently selected shift
    @RequestMapping(value = "/shift/update", method = RequestMethod.POST)
    public String updateShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        int sid;
        int pid;
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString();
        String weekendStart = jobject.get("weekendStart").getAsString();
        String weekendEnd = jobject.get("weekendEnd").getAsString();

        if (!validateStrings(tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            sid = jobject.get("sid").getAsInt();
            pid = jobject.get("pid").getAsInt();
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                throw new IllegalArgumentException("Start time >= End Time");
            }
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        int weekdayHourId = addHours(weekdayStart, weekdayEnd);
        int weekendHourId = addHours(weekendStart, weekendEnd);

        Object[] params = new Object[] {
            pid,
            tname,
            weekdayHourId,
            weekendHourId,
            sid
        };

        jdbcTemplate.update( "update sequ_shift set "+
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
    public String deleteShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();
        int sid;

        //model.addAttribute("error", false);
        if (!validateStrings(jobject.get("sid").getAsString())) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            sid = jobject.get("sid").getAsInt();
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            throw new IllegalArgumentException("Integer field does not contain integer");
        }

        jdbcTemplate.update( "update sequ_shift set "+
          "end_date = current_date "+
          "where id = ?",
        sid);

        return "jsonTemplate";
    }
}

