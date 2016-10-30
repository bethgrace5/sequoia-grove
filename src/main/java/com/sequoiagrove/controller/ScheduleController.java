package com.sequoiagrove.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sequoiagrove.model.Schedule;
import com.sequoiagrove.controller.ScheduleRepository;

@RestController
public class ScheduleController {
  @Autowired
    private ScheduleRepository repository;

  //TODO make sure list only contains a fixed number of the most recent schedules
  // location id -> monday string -> schedule
  static HashMap<Integer, HashMap<String, Schedule>> master = new HashMap<Integer, HashMap<String, Schedule>>();

  @RequestMapping(value = "/schedule/{mon}/{location}")
    public Map<String, Object> getScheduleTemplate(
        @PathVariable("mon") String mon,
        @PathVariable("location") int location) {
      Map<String, Object> model = new HashMap<String, Object>();
      Object[] args = new Object[]{mon, location};

      Schedule schedule = new Schedule();
      schedule.setLocationId(location);
      schedule.setStartDate(mon);
      schedule.setPublished(repository.isPublished(args));

      if(schedule.getPublished()) {
        boolean gotSchedule = false;
        if(master.containsKey(location)) {
          if(master.get(location).containsKey(mon)) {
            gotSchedule = true;
          }
        }
        // the schedule is published and already in memory
        if (gotSchedule) {
          schedule = master.get(location).get(mon);
        }
        // the schedule is published, but not available in memory, build it.
        else {
          schedule.setRows(repository.getSchedule(args));

          // add it to the master list
          if (master.containsKey(location)) {
            master.get(location).put(mon, schedule);
          }
          else {
            HashMap<String, Schedule> map = new HashMap<String, Schedule>();
            map.put(mon, schedule);
            master.put(location, map);
          }
        }
      }
      model.put("schedule", schedule);
      return model;
  }

  /*
  // Get current schedule template (current shifts) dd-mm-yyyy
  @RequestMapping(value = "/schedule/shiftIndices")
    public String saveShifts(Model model,  @RequestBody String data, @ModelAttribute("scope") List<String> permissions) {
        // the token did not have the required permissions, return 403 status
        if (!permissions.contains("manage-schedule")) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }
        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

        // Parse the list of params to array of Strings
        // reuse Scheduled class where sid = shift id and eid = index
        Gson gson = new Gson();
        Scheduled [] shiftChanges = gson.fromJson(data, Scheduled[].class);

          for (Scheduled item : shiftChanges) {
            try {
              jdbcTemplate.update("update sequ_shift set index = ? where id = ?",
                  item.getEid(), item.getSid());
            }
            catch(DataIntegrityViolationException e) {
              System.out.println(e);
              // do nothing
            }
          }
        return "jsonTemplate";
  }



  // Update current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/schedule/update")
    public String updateSchedule(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws Exception {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-schedule") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

          // update database schedule(eid, sid, mon)
          for (Scheduled change : scheduleChanges) {
            try {
                jdbcTemplate.update("select sequ_schedule(?, ?, ?)",
                    change.getEid(),
                    change.getSid(),
                    change.getDate());
            }
            catch(DataIntegrityViolationException e) {
              // do nothing
            }
          }
        return "jsonTemplate";
    }

  // Delete scheduled day dd/mm/yyyy
    @RequestMapping(value = "/schedule/delete")
    public String deleteSchedule(@RequestBody String data, @ModelAttribute("scope") List<String> permissions,  Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-schedule") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

          // update database
          for (Scheduled change : scheduleChanges) {
            try {
              jdbcTemplate.update("select sequ_delete_schedule(?, ?)",
                  change.getSid(),
                  change.getDate());
            }
            catch(Exception e) {
              // do nothing
            }
          }
        return "jsonTemplate";
    }

    @RequestMapping(value = "/schedule/publish")
    public String publishSchedule(@RequestBody String data, @ModelAttribute("scope") List<String> permissions,  Model model) throws SQLException {

        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-schedule") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

        // parse params
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();
        final int eid = jobject.get("eid").getAsInt();
        final int locationId = jobject.get("locationId").getAsInt();
        final String date = jobject.get("date").getAsString();

        // update database publish(eid, datestring)
        //try {
        jdbcTemplate.execute("select sequ_publish(?, ?, ?)" ,
          new PreparedStatementCallback<Boolean>(){
              @Override
              public Boolean doInPreparedStatement(PreparedStatement ps)
              throws SQLException, DataAccessException {
                ps.setInt(1, eid);
                ps.setString(2, date);
                ps.setInt(3, locationId);
                return ps.execute();
              }
          });

        return "jsonTemplate";
    }
    */
}

