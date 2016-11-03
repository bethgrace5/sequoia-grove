package com.sequoiagrove.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PositionController {
  @Autowired
    private PositionRepository repository;

  // Get all positions for the given locations
  @RequestMapping(value = "/position/{locations}")
    public Map<String, Object> getPositions(@PathVariable("locations") Object[] locations){
      Map<String,Object> model = new HashMap<String,Object>();
      model.put("positions", repository.getPositionsByLocation(locations));
      return model;
    }

  // Add a current position for an employee
  @RequestMapping(value = "/position/add/")
    public Map<String, Object> addPosition(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();

      // Parse the body to position object
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject ep = jelement.getAsJsonObject();
      int pid = ep.get("pid").getAsInt();
      int eid = ep.get("eid").getAsInt();

      model.put("added", repository.add(pid, eid));
      return model;
    }

  // Remove a current position from an employee
  @RequestMapping(value = "/position/remove/")
    public Map<String, Object> removePosition(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();

      // Parse the body to position object
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject ep = jelement.getAsJsonObject();
      int pid = ep.get("pid").getAsInt();
      int eid = ep.get("eid").getAsInt();

      model.put("removed", repository.remove(pid, eid));
      return model;
    }
}

