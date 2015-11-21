package com.sequoiagrove.controller;

import com.sequoiagrove.model.Position;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sequoiagrove.dao.PositionDAO;
import com.sequoiagrove.model.Position;


@Controller
public class PositionController {
    private HashMap<Integer, ArrayList<Integer>> posKeyMap = new HashMap<Integer, ArrayList<Integer>>();

    // Get position info including the id, title and location
    @RequestMapping(value = "/position")
    public String getPositions(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Position> posList = jdbcTemplate.query(
            "select id, title, location from bajs_position order by location, title",
            new RowMapper<Position>() {
                public Position mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Position pos = new Position(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("location"));
                    return pos;
                }
        });

        model.addAttribute("positions", posList);
        return "jsonTemplate";
    }

    // Populates map of position id to a list of employee ids that currently
    // have that position
    @RequestMapping(value = "/position/has")
    public String getHasPositions(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        HashMap<Integer, ArrayList<Integer>> localMap = new HashMap<Integer, ArrayList<Integer>>();

        jdbcTemplate.query(
            "select distinct employee_id as eid, position_id as pid " +
            "from bajs_has_position " +
            "where date_removed is null",
            new RowMapper<String>() {
                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Integer pid = rs.getInt("pid");
                    Integer eid = rs.getInt("eid");
                    if(posKeyMap.containsKey(pid)) { // key exists, add elem
                        posKeyMap.get(pid).add(eid);
                    }
                    else { // key does not exist, add new one plus 1st elem
                        ArrayList<Integer> tempList = new ArrayList<Integer>();
                        tempList.add(eid);
                        posKeyMap.put(pid, tempList);
                    }
                    return "";
                    }
        });

        localMap.putAll(posKeyMap);
        posKeyMap.clear();

        model.addAttribute("hasPositions", localMap);
        return "jsonTemplate";
    }
    // Get only locations (kitchen and front) <- this shouldn't change ever
    @RequestMapping(value = "/position/location")
    public String getLocations(Model model) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<String> locList = new ArrayList<String>();

        locList = jdbcTemplate.query(
            "select distinct location from bajs_position order by location",
            new RowMapper<String>() {
                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                    String str = new String(rs.getString("location"));
                    return str;
                }
        });
        model.addAttribute("locations", locList );
        return "jsonTemplate";
    }

    // Get current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/position/add/{eid}/{pid}/{date}")
    public String getScheduleTemplate(Model model,
          @PathVariable("eid") int eid,
          @PathVariable("pid") int pid,
          @PathVariable("date") String date) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("insert into bajs_has_position( employee_id, "+
          "position_id, date_acquired, date_removed, is_primary, is_training) " +
          "values(?, ?, to_date(?, 'dd-mm-yyyy'), null, 0, 0)", eid, pid, date);
          //"exception "+
          //"when DUP_VAL_ON_INDEX then "+
          //"update bajs_is_scheduled_for "+
          //"set employee_id = eid "+
          //"where on_date = to_date(day, 'dd-mm-yyyy') and shift_id=sid; "+

        return "jsonTemplate";
    }



}

