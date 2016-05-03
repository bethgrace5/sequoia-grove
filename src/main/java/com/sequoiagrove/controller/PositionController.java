package com.sequoiagrove.controller;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sequoiagrove.model.Position;


@Controller
public class PositionController {
    private HashMap<Integer, ArrayList<Integer>> posKeyMap = new HashMap<Integer, ArrayList<Integer>>();

  // extract scope from request
  @ModelAttribute("scope")
    public List<String> getPermissions(HttpServletRequest request) {
      String csvPermissions = (String) request.getAttribute("scope");
      return Arrays.asList(csvPermissions.split(","));
    }

    // Get Basic position info (id, title and area)
    @RequestMapping(value = "/position")
    public String getPositions(Model model, @ModelAttribute("scope") List<String> permissions){
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        List<Position> posList = jdbcTemplate.query(
            "select id, title, area from sequ_position order by area, title",
            new RowMapper<Position>() {
                public Position mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Position pos = new Position(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("area"));
                    return pos;
                }
        });
        model.addAttribute("positions", posList);
        return "jsonTemplate";
    }

    // Add a current position for an employee
    @RequestMapping(value = "/position/add/")
    public String addPosition(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        // Parse the body to position object
        Gson gson = new Gson();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject ep = jelement.getAsJsonObject();

        int pid = ep.get("pid").getAsInt();
        int eid = ep.get("eid").getAsInt();

        // see if this is already a current position that the employee has
        Object[] obj = new Object[] { eid, pid };
        int count = jdbcTemplate.queryForObject(
            "select count(*) from sequ_has_position where user_id = ?"+
            " and position_id = ? and date_removed is null", obj, Integer.class);

        // this employee does not currently have this position. add it.
        if (count <= 0) {
            jdbcTemplate.update("insert into sequ_has_position(" +
              "user_id, position_id,date_acquired, date_removed, is_primary, is_training) " +
              "values(?, ?, current_date, null, false, false)", eid, pid);
        }
        return "jsonTemplate";
    }

    // Remove a current position from an employee
    @RequestMapping(value = "/position/remove/")
    public String removePosition(Model model, @ModelAttribute("scope") List<String> permissions, @RequestBody String data) throws SQLException {
        // the token did not have the required permissions, return 403 status
        if (!(permissions.contains("manage-store") || permissions.contains("admin"))) {
            model.addAttribute("errorStatus", HttpServletResponse.SC_FORBIDDEN);
            return "jsonTemplate";
        }

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

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

}

