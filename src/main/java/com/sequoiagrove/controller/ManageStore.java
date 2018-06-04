package com.sequoiagrove.controller;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.NotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;
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
    public int addHours(String startHr, String endHr) {

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        int id = 0;
        Object[] obj = new Object[] { startHr, endHr };

        try {
          id = jdbcTemplate.queryForObject(
              "select id from sequ_hours where start_hour=? and end_hour=?",
              obj, Integer.class);

        } catch (EmptyResultDataAccessException e) {
          id = jdbcTemplate.queryForObject(" insert into sequ_hours (id, start_hour, end_hour) " + 
              " values( (select nextval('sequ_hours_sequence')), ?, ?) returning currval('sequ_hours_sequence')", obj, Integer.class );

          //id = jdbcTemplate.queryForObject( "select currval('sequ_hours_sequence')", obj, Integer.class);
        }
        return id;
    }

/* ----- HTTP Mapped Functions ----- */

  // Add new shift
    @RequestMapping(value = "/shift/add", method = RequestMethod.POST)
    public String addShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException, NotFoundException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        int pid;
        int location;
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString(); 
        String weekendStart = weekdayStart;//jobject.get("weekendStart").getAsString();
        String weekendEnd = weekdayEnd;//jobject.get("weekendEnd").getAsString();

        if (!validateStrings(tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            pid = jobject.get("pid").getAsInt();
            location = jobject.get("location").getAsInt();
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
                model.addAttribute("invalidTime", true);
                return "jsonTemplate";
                //throw new IllegalArgumentException("Start time >= End Time");
            }
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            model.addAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
            return "jsonTemplate";
            //throw new IllegalArgumentException("Integer field does not contain integer");
        }

        Calendar now = Calendar.getInstance();
        int weekday = now.get(Calendar.DAY_OF_WEEK);

        if (weekday != Calendar.SATURDAY)
        {
          // calculate how much to add
          // the 2 is the difference between Saturday and Sunday
          int days = (Calendar.SATURDAY - weekday + 7) % 7;
          now.add(Calendar.DAY_OF_YEAR, days);
        }

        // now is the date you want
        Date date = now.getTime();
        String saturdayFormat = new SimpleDateFormat("MM-dd-yyyy").format(date);

        now.add(Calendar.DAY_OF_YEAR, 1);
        date = now.getTime();
        String sundayFormat = new SimpleDateFormat("MM-dd-yyyy").format(date);

        Object[] params = new Object[] { 
            pid, 
            tname, 
            sundayFormat,
            addHours(weekdayStart, weekdayEnd), 
            addHours(weekendStart, weekendEnd),
            location
        };

        int id = jdbcTemplate.queryForObject( "insert into sequ_shift(id, position_id, task_name, start_date, end_date, weekday_id, weekend_id, index, location_id) " +
            "values((select nextval('sequ_shift_sequence')), ?, ?, to_date(?, 'mm-dd-yyyy'), null, ?, ?, 99, ?) returning currval('sequ_shift_sequence')", params, Integer.class);

        model.addAttribute("sid", id);

        return "jsonTemplate";
    }

  // Update currently selected shift
    @RequestMapping(value = "/shift/update", method = RequestMethod.POST)
    public String updateShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        int sid;
        int pid;
        int location;
        int index = 99;
        String tname = jobject.get("tname").getAsString();
        String weekdayStart = jobject.get("weekdayStart").getAsString();
        String weekdayEnd = jobject.get("weekdayEnd").getAsString();
        String weekendStart = weekdayStart;//jobject.get("weekendStart").getAsString();
        String weekendEnd = weekdayEnd;;//jobject.get("weekendEnd").getAsString();

        if (!validateStrings(tname, weekdayStart, weekdayEnd, weekendStart, weekendEnd)) {
            model.addAttribute("invalidField", true);
            throw new NotFoundException("One or more fields empty");
        }
        try {
            sid = jobject.get("sid").getAsInt();
            pid = jobject.get("pid").getAsInt();
            location = jobject.get("location").getAsInt();
            index = jobject.get("index").getAsInt();
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                model.addAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
                return "jsonTemplate";
                //throw new IllegalArgumentException("Start time >= End Time");
            }
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            model.addAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
            return "jsonTemplate";
            //throw new IllegalArgumentException("Integer field does not contain integer");
        }

        Calendar now = Calendar.getInstance();
        int weekday = now.get(Calendar.DAY_OF_WEEK);

        if (weekday != Calendar.SATURDAY)
        {
          // calculate how much to add
          // the 2 is the difference between Saturday and Sunday
          int days = (Calendar.SATURDAY - weekday + 7) % 7;
          now.add(Calendar.DAY_OF_YEAR, days);
        }

        // now is the date you want
        Date date = now.getTime();
        String saturdayFormat = new SimpleDateFormat("MM-dd-yyyy").format(date);

        now.add(Calendar.DAY_OF_YEAR, 1);
        date = now.getTime();
        String sundayFormat = new SimpleDateFormat("MM-dd-yyyy").format(date);

        jdbcTemplate.update( "update sequ_shift set "+
          "end_date = to_date(?, 'mm-dd-yyyy') "+
          "where id = ?",
        saturdayFormat,
        sid);

        Object[] params = new Object[] { 
            pid, 
            tname, 
            sundayFormat,
            addHours(weekdayStart, weekdayEnd), 
            addHours(weekendStart, weekendEnd),
            index,
            location 
        };

        int id = jdbcTemplate.queryForObject( 
            "insert into sequ_shift(id, position_id, task_name, start_date, end_date, weekday_id, weekend_id, index, location_id) " +
            "values((select nextval('sequ_shift_sequence')), ?, ?, to_date(?, 'mm-dd-yyyy'), null, ?, ?, ?, ?) returning currval('sequ_shift_sequence')", params, Integer.class);

        return "jsonTemplate";
    }

  // Delete currently selected shift
    @RequestMapping(value = "/shift/delete", method = RequestMethod.POST)
    public String deleteShift(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
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
            model.addAttribute("status", HttpServletResponse.SC_BAD_REQUEST);
            return "jsonTemplate";
            //throw new IllegalArgumentException("Integer field does not contain integer");
        }

        Calendar now = Calendar.getInstance();
        int weekday = now.get(Calendar.DAY_OF_WEEK);

        if (weekday != Calendar.SATURDAY)
        {
          // calculate how much to add
          // the 2 is the difference between Saturday and Sunday
          int days = (Calendar.SATURDAY - weekday + 7) % 7;
          now.add(Calendar.DAY_OF_YEAR, days);
        }

        // now is the date you want
        Date date = now.getTime();
        String saturdayFormat = new SimpleDateFormat("MM-dd-yyyy").format(date);

        now.add(Calendar.DAY_OF_YEAR, 1);
        date = now.getTime();

        jdbcTemplate.update( "update sequ_shift set "+
          "end_date = to_date(?, 'mm-dd-yyyy') "+
          "where id = ?",
        saturdayFormat,
        sid);

        return "jsonTemplate";
    }
}

