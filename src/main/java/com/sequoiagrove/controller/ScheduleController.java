package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
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
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.Scheduled;
import com.sequoiagrove.controller.MainController;
import org.springframework.transaction.TransactionStatus;


@Controller
public class ScheduleController {

    // Get current schedule template (current shifts) mm-dd-yyyy
  @RequestMapping(value = "/schedule/template/{mon}")
    public String getScheduleTemplate(Model model, @PathVariable("mon") final String mon) {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      List<ScheduleTemplate> schTempList = jdbcTemplate.query(
        "select * from get_schedule('12-10-2015')",
        new RowMapper<ScheduleTemplate>() {
          public ScheduleTemplate mapRow(ResultSet rs, int rowNum) throws SQLException {

            ScheduleTemplate schTmp = new ScheduleTemplate(
                rs.getInt("sid"),
                rs.getInt("pid"),
                rs.getString("location"),
                rs.getString("tname"),
                rs.getString("pos"),
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
          "SELECT count(*) FROM published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);

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

        // update database schedule(eid, sid, mon)
        for (Scheduled change : scheduleChanges) {
            jdbcTemplate.update("select schedule(?, ?, ?)",
                change.getEid(),
                change.getSid(),
                change.getDate());
        }
        return "jsonTemplate";
    }

    // Delete scheduled day
    @RequestMapping(value = "/schedule/delete")
    public String deleteSchedule(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

        // update database
        for (Scheduled change : scheduleChanges) {
            jdbcTemplate.update("select delete_schedule(?, ?)",
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

        // update database publish(eid, datestring)
        jdbcTemplate.update(" DO $$ BEGIN PERFORM publish((select to_number(?, '99999999')), ?); END$$;" , eid, date);
        return "jsonTemplate";
    }

    // Check with database if is published or not
    @RequestMapping(value = "/schedule/ispublished/{date}")
    public String checkifPublished( @PathVariable("date") String mon, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);

        boolean isPublished =  (count != null && count > 0);

        model.addAttribute("result", isPublished);    
        return "jsonTemplate";
    }

}

