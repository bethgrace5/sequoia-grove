package com.sequoiagrove.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sequoiagrove.model.Employee;

@RestController
public class EmployeeController {
  @Autowired
    private EmployeeRepository repository;

  // Get All Employees with the availability, positions, and employment history
  @RequestMapping(value = "/employees/{locations}")
    public Map<String, Object> getAllEmployee(@PathVariable("locations") Object[] locations) {
      Map<String,Object> model = new HashMap<String,Object>();
      List<Employee> employees = repository.getEmployeesByLocation(locations);

      HashMap<Integer, Employee> map = new HashMap<Integer, Employee>();

      // change list to hashmap
      for( Employee e : employees) {
        map.put(e.getId(), e);
      }

      model.put("list", employees);
      model.put("employees", map);
      return model;
    }

  @RequestMapping(value = "/employee/update", method = RequestMethod.POST)
    public Map<String, Object> updateEmployee(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();

      Object[] args = new Object[] {
        jobject.get("firstname").getAsString(),
          jobject.get("lastname").getAsString(),
          jobject.get("birthDate").getAsString(),
          jobject.get("maxHours").getAsInt(),
          jobject.get("minHours").getAsInt(),
          jobject.get("phone").getAsString(),
          jobject.get("clockNumber").getAsInt(),
          jobject.get("email").getAsString(),
          jobject.get("classificationId").getAsInt(),
          jobject.get("notes").getAsString(),
          id
      };
      repository.update(args);
      model.put("id", id);
      return model;
    }

  @RequestMapping(value = "/employee/deactivate", method=RequestMethod.POST)
    public Map<String, Object> deactivateEmployee(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();
      int locationId = jobject.get("locationId").getAsInt();
      model.put("deactivated", repository.deactivate(id, locationId));
      return model;
    }

  // Activate (re-employ) an employee
  @RequestMapping(value = "/employee/activate", method=RequestMethod.POST)
    public Map<String, Object> activateEmployee(@RequestBody String data) {
      Map<String,Object> model = new HashMap<String,Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      int id = jobject.get("id").getAsInt();
      int locationId = jobject.get("locationId").getAsInt();

      model.put("activated", repository.activate(id, locationId));
      return model;
    }

  @RequestMapping(value = "/employee/add", method=RequestMethod.POST)
    public Map<String, Object> addEmployee(@RequestBody String data) {
      Map<String, Object> model = new HashMap<String, Object>();
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();

      Object[] params = new Object[] {
        jobject.get("firstname").getAsString(),
          jobject.get("lastname").getAsString(),
          jobject.get("birthDate").getAsString(),
          jobject.get("maxHours").getAsInt(),
          jobject.get("minHours").getAsInt(),
          jobject.get("phone").getAsString(),
          jobject.get("clockNumber").getAsInt(),
          jobject.get("email").getAsString(),
          jobject.get("classificationId").getAsInt(),
          jobject.get("notes").getAsString()
      };

      int id = repository.add(params, jobject.get("locationId").getAsInt(),
          jobject.get("classificationId").getAsInt());

      model.put("id", id);
      return model;
    }
}
