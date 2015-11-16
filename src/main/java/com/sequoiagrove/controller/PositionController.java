package com.sequoiagrove.controller;

import com.sequoiagrove.model.Position;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.util.List;
import java.util.ArrayList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.sequoiagrove.dao.PositionDAO;
import com.sequoiagrove.model.Position;


@Controller
public class PositionController {

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


}

