package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;
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


@Controller
public class ScheduleController {

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

/* ----- HTTP Mapped Functions -----*/
  // Get current schedule template (current shifts) dd-mm-yyyy
    @RequestMapping(value = "/schedule/template/{mon}")
        public String getScheduleTemplate(Model model, @PathVariable("mon") String mon) {

            JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

            List<ScheduleTemplate> schTempList = jdbcTemplate.query(
                    "select * from table(bajs_pkg.get_schedule('"+ mon +"'))",
                    new RowMapper<ScheduleTemplate>() {
                    public ScheduleTemplate mapRow(ResultSet rs, int rowNum) throws SQLException {
                    ScheduleTemplate schTmp = new ScheduleTemplate(
                          rs.getInt("sid"),
                          rs.getInt("pid"),
                          rs.getString("location"),
                          rs.getString("tname"),
                          rs.getString("position"),
                          rs.getString("wd_st"),// weekday start
                          rs.getString("wd_ed"),// weekday end
                          rs.getString("we_st"),// weekend start
                          rs.getString("we_ed"),// weekend end
                          new Day("mon", rs.getString("mon"), rs.getInt("mon_eid")),
                          new Day("tue", rs.getString("tue"), rs.getInt("tue_eid")),
                          new Day("wed", rs.getString("wed"), rs.getInt("wed_eid")),
                          new Day("thu", rs.getString("thu"), rs.getInt("thu_eid")),
                          new Day("fri", rs.getString("fri"), rs.getInt("fri_eid")),
                          new Day("sat", rs.getString("sat"), rs.getInt("sat_eid")),
                          new Day("sun", rs.getString("sun"), rs.getInt("sun_eid")) );

                return schTmp;
              }
          });

        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM bajs_published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);

        model.addAttribute("ispublished", (count!=null && count > 0));
        model.addAttribute("template", schTempList);
        return "jsonTemplate";
    }

  // Update current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/schedule/update")
    public String updateSchedule(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

        // update database
        for (Scheduled change : scheduleChanges) {
            jdbcTemplate.update("call bajs_pkg.schedule(?, ?, ?)",
                change.getEid(),
                change.getSid(),
                change.getDate());
        }
        return "jsonTemplate";
    }

  // Delete scheduled day dd/mm/yyyy
    @RequestMapping(value = "/schedule/delete")
    public String deleteSchedule(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

        // update database
        for (Scheduled change : scheduleChanges) {
            jdbcTemplate.update("call bajs_pkg.delete_schedule(?, ?)",
                change.getSid(),
                change.getDate());
        }
        return "jsonTemplate";
    }

    @RequestMapping(value = "/schedule/publish")
    public String publishSchedule(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // parse params
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();
        String eid = jobject.get("eid").getAsString();
        String date = jobject.get("date").getAsString();

        // update database
        jdbcTemplate.update("call bajs_pkg.publish(?, ?)", eid, date);
        return "jsonTemplate";
    }

  // Add new shift
    @RequestMapping(value = "/shift/add", method = RequestMethod.POST)
    public String addShift(@RequestBody String data, Model model) throws SQLException {
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
            //return "jsonTemplate";
            return new ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                return "jsonTemplate";
            }
            Integer.parseInt(pid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            return "jsonTemplate";
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
            return "jsonTemplate";
        }
        try {
            if (Integer.parseInt(weekdayStart) >= Integer.parseInt(weekdayEnd) ||
              Integer.parseInt(weekendStart) >= Integer.parseInt(weekendEnd)) {
                model.addAttribute("invalidTime", true);
                return "jsonTemplate";
            }
            Integer.parseInt(pid);
            Integer.parseInt(sid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            return "jsonTemplate";
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
            return "jsonTemplate";
        }
        try {
            Integer.parseInt(sid);
        }
        catch (NumberFormatException e) {
            model.addAttribute("invalidInteger", true);
            return "jsonTemplate";
        }

        jdbcTemplate.update( "update BAJS_shift set "+
          "end_date = (select current_date from dual) "+
          "where id = ?",
        sid);

        return "jsonTemplate";
    }

  // Check with database if is published or not
    @RequestMapping(value = "/schedule/ispublished/{date}")
    public String checkifPublished( @PathVariable("date") String mon, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM bajs_published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);

        boolean isPublished =  (count != null && count > 0);

        model.addAttribute("result", isPublished);    
        return "jsonTemplate";
    }
}

