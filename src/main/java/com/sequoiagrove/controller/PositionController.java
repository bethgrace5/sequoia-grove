package com.sequoiagrove.controller;

/*
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.sequoiagrove.model.Position;
*/
import org.springframework.web.bind.annotation.RequestBody;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.RestController;

@RestController
public class PositionController {
  @Autowired
    private PositionRepository positions;

    // Get Basic position info (id, title and area)
    @RequestMapping(value = "/position/{locations}")
    public Map<String, Object> getPositions( @ModelAttribute("scope") ArrayList<String> permissions,
        @PathVariable("locations") Object[] locations){
      Map<String,Object> model = new HashMap<String,Object>();
      model.put("positions", positions.getPositionsByLocation(locations));
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

        model.put("added", positions.add(pid, eid));
        return model;
    }

    /*
    private HashMap<Integer, ArrayList<Integer>> posKeyMap = new HashMap<Integer, ArrayList<Integer>>();
  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }



    // Remove a current position from an employee
    @RequestMapping(value = "/position/remove/")
    public String removePosition(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();

        // Parse the body to position object
        Gson gson = new Gson();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject ep = jelement.getAsJsonObject();

        int pid = ep.get("pid").getAsInt();
        int eid = ep.get("eid").getAsInt();

        // see if this is a current position that the employee has
        Object[] obj = new Object[] { eid, pid };
        int count = jdbcTemplate.queryForObject(
            "select count(*) from sequ_has_position where user_id = ?"+
            " and position_id = ? and date_removed is null", obj, Integer.class);

        // this employee currently has this position. remove it.
        if (count > 0) {
           jdbcTemplate.update(" update sequ_has_position " +
           " set date_removed = current_date " +
           " where user_id = ? and position_id = ? and date_removed is null", eid, pid);
        }
        return "jsonTemplate";
    }

    */
}

