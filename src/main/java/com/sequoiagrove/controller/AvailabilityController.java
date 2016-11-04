package com.sequoiagrove.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AvailabilityController {
  @Autowired
    private AvailabilityRepository repository;

  // Remove availability
  @RequestMapping(value = "/avail/remove/{eid}/{day}/{startt}")
    public Map<String, Object> removeAvail( @PathVariable("eid") int eid,
        @PathVariable("day") String day, @PathVariable("startt") String startt) {
      Map<String, Object> model = new HashMap<String, Object>();
      model.put("removed", repository.remove(new Object[]{eid, day, startt}));
      return model;
    }

  // Add new availability (or update end time if the availability for the
  // day and time already existed)
  @RequestMapping(value = "/avail/add")
    public Map<String, Object> addAvail(@RequestBody String data) {
      Map <String, Object> model = new HashMap<String, Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();

      String day = jobject.get("day").getAsString();
      int eid = jobject.get("eid").getAsInt();
      String start = jobject.get("start").getAsString();
      String end = jobject.get("end").getAsString();
      model.put("added", repository.add(eid, day, start, end));

      return model;
    }
}

