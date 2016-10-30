package com.sequoiagrove.controller;

import com.sequoiagrove.controller.DeliveryRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeliveryController {
  @Autowired
    private DeliveryRepository repository;

  // extract scope from request
  //@ModelAttribute("scope")
    //public List<String> getPermissions(HttpServletRequest request) {
      //String csvPermissions = (String) request.getAttribute("scope");
      //return Arrays.asList(csvPermissions.split(","));
    //}

  // get list of all deliveries
  @RequestMapping(value = "/delivery/{locations}")
    public Map<String, Object> getDelivery( @PathVariable("locations") Object[] locations
        /*, @ModelAttribute("scope") List<String> permissions*/) {
      Map<String, Object> model = new HashMap<String, Object>();
      model.put("delivery", repository.getDeliveriesByLocation(locations));
      return model;
    }

  /*
  //delete a delivery
  @RequestMapping(value = "/delivery/delete/{id}")
    public String updateSchedule(@PathVariable ("id") String id, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

      // the token did not have the required permissions, return 403 status
      if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
        model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
        return "jsonTemplate";
      }
      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

      // update database
      jdbcTemplate.update("delete from sequ_delivery where id = ?", Integer.parseInt(id));
      return "jsonTemplate";
    }

  //update a delivery
  @RequestMapping(value = "/delivery/update")
    public String updateDelivery(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

      // the token did not have the required permissions, return 403 status
      if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
        model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
        return "jsonTemplate";
      }
      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

      // parse params
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      boolean mon = jobject.get("mon").getAsBoolean();
      boolean tue = jobject.get("tue").getAsBoolean();
      boolean wed = jobject.get("wed").getAsBoolean();
      boolean thu = jobject.get("thu").getAsBoolean();
      boolean fri = jobject.get("fri").getAsBoolean();
      boolean sat = jobject.get("sat").getAsBoolean();
      boolean sun = jobject.get("sun").getAsBoolean();
      int id = jobject.get("id").getAsInt();
      String name = jobject.get("name").getAsString();

      // update database
      Object[] obj = new Object[] {name, mon, tue, wed, thu, fri, sat, sun, id};
      jdbcTemplate.update("update sequ_delivery set name = ?," +
          "mon = ?, tue = ?, wed = ?, thu = ?, fri = ?, sat = ?, sun = ? where id = ?",
          obj);
      return "jsonTemplate";
    }
  //add a delivery
  @RequestMapping(value = "/delivery/add")
    public String addDelivery(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

      // the token did not have the required permissions, return 403 status
      if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
        model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
        return "jsonTemplate";
      }
      JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
      int id = jdbcTemplate.queryForObject("select nextval('sequ_delivery_sequence')",
          Integer.class);
      // parse params
      JsonElement jelement = new JsonParser().parse(data);
      JsonObject  jobject = jelement.getAsJsonObject();
      String name = jobject.get("name").getAsString();
      boolean mon = jobject.get("mon").getAsBoolean();
      boolean tue = jobject.get("tue").getAsBoolean();
      boolean wed = jobject.get("wed").getAsBoolean();
      boolean thu = jobject.get("thu").getAsBoolean();
      boolean fri = jobject.get("fri").getAsBoolean();
      boolean sat = jobject.get("sat").getAsBoolean();
      boolean sun = jobject.get("sun").getAsBoolean();
      int location = jobject.get("locationId").getAsInt();

      // update/add to database
      Object[] obj = new Object[] {name, mon, tue, wed, thu, fri, sat, sun, id, location};
      jdbcTemplate.update("insert into sequ_delivery(name,mon,tue,wed,thu,fri,sat,sun,id,location_id) values(?,?,?,?,?,?,?,?,?,?)",
          obj);

      model.addAttribute("id", id);
      return "jsonTemplate";
    }
  */
}

