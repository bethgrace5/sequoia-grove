package com.sequoiagrove.controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
import com.sequoiagrove.model.Scheduled;
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

    @RequestMapping(value = "/schedule/publish")
    public Map<String, Object> publishSchedule(@RequestBody String data) {
      Map<String, Object> model = new HashMap<String, Object>();

      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int eid = jobject.get("eid").getAsInt();
      int locationId = jobject.get("locationId").getAsInt();
      String date = jobject.get("date").getAsString();

      model.put("published", repository.publish(eid, locationId, date));
      return model;
    }

    // Save order of shifts
    @RequestMapping(value = "/schedule/shiftIndices")
      public Map<String, Object> saveShifts( @RequestBody String data) {
        Map<String, Object> model = new HashMap<String, Object>();

        Gson gson = new Gson();
        Scheduled [] shiftChanges = gson.fromJson(data, Scheduled[].class);

        // for now, wipe out all cached schedules - later send parameters
        // just to remove the updated schedule.
        master = new HashMap<Integer, HashMap<String, Schedule>>();

        model.put("updated", repository.updateShifts(shiftChanges));
        return model;
      }

    // Update current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/schedule/update")
      public Map<String, Object> updateSchedule(@RequestBody String data) {
        Map<String, Object> model = new HashMap<String, Object>();
        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);

        // for now, wipe out all cached schedules - later send parameters
        // just to remove the updated schedule.
        master = new HashMap<Integer, HashMap<String, Schedule>>();

        model.put("updated", repository.updateSchedule(scheduleChanges));
        return model;
      }

    // Delete scheduled day dd/mm/yyyy
    @RequestMapping(value = "/schedule/delete")
      public Map<String, Object> deleteSchedule(@RequestBody String data) {
        Map<String, Object> model = new HashMap<String, Object>();
        // Parse the list of params to array of Strings
        Gson gson = new Gson();
        Scheduled [] scheduleChanges = gson.fromJson(data, Scheduled[].class);


        // for now, wipe out all cached schedules - later send parameters
        // just to remove the updated schedule.
        master = new HashMap<Integer, HashMap<String, Schedule>>();

        model.put("updated", repository.deleteSchedule(scheduleChanges));
        return model;
      }

}

