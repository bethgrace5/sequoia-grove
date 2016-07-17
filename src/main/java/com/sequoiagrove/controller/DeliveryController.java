package com.sequoiagrove.controller;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.controller.MainController;

@Controller
public class DeliveryController {

  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }

  // get list of all deliveries
  @RequestMapping(value = "/delivery/{locations}")
    public String getDelivery(Model model,
        @PathVariable("locations") String locations,
        @ModelAttribute("scope") List<String> permissions) {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

      // change location string to list of java integers
      ArrayList<Integer> loc = new ArrayList<Integer>();
      for (String item : new ArrayList<String>(Arrays.asList(locations.split(",")))){
          loc.add(Integer.parseInt(item));
      }

      Map<Integer, List<Delivery>> deliveries = new HashMap<Integer, List<Delivery>>();

      for(Integer l : loc) {
        List<Delivery> deliveryList = jdbcTemplate.query(
            "select * from sequ_delivery where location_id = ?",
            new Object[]{l},
            new RowMapper<Delivery>() {
              public Delivery mapRow(ResultSet rs, int rowNum) throws SQLException {
                Delivery del = new Delivery(
                  rs.getString("name"),
                  rs.getBoolean("mon"),
                  rs.getBoolean("tue"),
                  rs.getBoolean("wed"),
                  rs.getBoolean("thu"),
                  rs.getBoolean("fri"),
                  rs.getBoolean("sat"),
                  rs.getBoolean("sun"),
                  rs.getInt("id"));
                return del;
              }
            });
          deliveries.put(l, deliveryList);
      }
      model.addAttribute("delivery", deliveries);
      return "jsonTemplate";
    }

  //delete a delivery
  @RequestMapping(value = "/delivery/delete/{id}")
    public String updateSchedule(@PathVariable ("id") String id, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

      // the token did not have the required permissions, return 403 status
      if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
        model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
        return "jsonTemplate";
      }
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

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
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

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
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
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

      // update/add to database
      Object[] obj = new Object[] {name, mon, tue, wed, thu, fri, sat, sun, id};
      jdbcTemplate.update("insert into sequ_delivery(name,mon,tue,wed,thu,fri,sat,sun,id) values(?,?,?,?,?,?,?,?,?)",
          obj);

      model.addAttribute("id", id);
      return "jsonTemplate";
    }
}

