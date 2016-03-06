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
      Integer count = 0;

      final JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      TransactionTemplate transactionTemplate = MainController.getTransactionTemplate();

      transactionTemplate.execute(new TransactionCallback<Object>() {
        @Override
        public Object doInTransaction(TransactionStatus status) {


      Integer count = jdbcTemplate.queryForObject(
          "SELECT count(*) FROM published_schedule WHERE start_date = to_date(?,'dd-mm-yyyy')",Integer.class, mon);
      return null;

        }
      });

      model.addAttribute("ispublished", (count!=null && count > 0));
      //model.addAttribute("template", schTempList);
      return "jsonTemplate";
}

          /*
          List<ScheduleTemplate> schTempList = jdbcTemplate.query(
            "begin;" +
            "select * from get_schedule('schedulecursor', '10-12-2015');" +
            "fetch all in \"schedulecursor\"",
            new RowMapper<ScheduleTemplate>() {
              public ScheduleTemplate mapRow(ResultSet rs, int rowNum) throws SQLException {


                System.out.println(rs.getType());
                System.out.println(rs.next());
                System.out.println(rs.getRow());
                //System.out.println(rs.getRowId());
                System.out.println(rs.getStatement());
                System.out.println(rs.getWarnings());
                System.out.println(rs.wasNull());
                System.out.println(rs.getMetaData().getColumnCount());

                for(int i=1; i<= rs.getMetaData().getColumnCount(); i++) {
                  System.out.println("column name: ");
                  System.out.println(rs.getMetaData().getColumnName(i));
                  System.out.println("column type: ");
                  System.out.println(rs.getMetaData().getColumnType(i));
                  System.out.println("table name: ");
                  System.out.println(rs.getMetaData().getTableName(i));
                }

                //System.out.println(rs.getObject(1).toString());


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
            */

    // Update current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/schedule/update")
    public String updateSchedule(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

        // update database
        for (Scheduled change : scheduleChanges) {
            jdbcTemplate.update("call pkg.schedule(?, ?, ?)",
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
            jdbcTemplate.update("call pkg.delete_schedule(?, ?)",
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
        jdbcTemplate.update("call pkg.publish(?, ?)", eid, date);
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

