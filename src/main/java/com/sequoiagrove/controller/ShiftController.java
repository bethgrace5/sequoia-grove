package com.sequoiagrove.controller;

import com.sequoiagrove.model.HasShift;
import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.sequoiagrove.model.HasShift;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ShiftController {

    // get all current shift task names
    @RequestMapping(value = "/shift")
    public String listShiftIds(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<HasShift> list = jdbcTemplate.query(
            "select p.id as pid, s.id as sid, p.title as pname, s.task_name as tname " +
            "from " +
            "bajs_new_shift s " +
            "inner join " + 
            "bajs_position p " +
            "on s.position_id = p.id " +
            "where s.end_date is null",

            new RowMapper<HasShift>() {
                public HasShift mapRow(ResultSet rs, int rowNum) throws SQLException {
                    HasShift s = new HasShift(
                      rs.getInt("sid"),
                      rs.getInt("pid"),
                      rs.getString("tname"),
                      rs.getString("pname")
                    );
                    return s;
                }
        });
        model.addAttribute("shift", list);
        return "jsonTemplate";
    }

    @RequestMapping(value = "/avail/add/{eid}/{day}/{startt}/{endt}")
    public String addAvail(Model model,
          @PathVariable("eid") int eid,
          @PathVariable("day") String day,
          @PathVariable("startt") int startt,
          @PathVariable("endt") int endt) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

      int count = jdbcTemplate.queryForObject( 
          "select count(*) from bajs_availability " +
          " where day = '" + day +
          "' and employee_id = " + eid+
          " and startt = " + startt+
          " and endt = " + endt, Integer.class);

      if(count <= 0 ) {
          jdbcTemplate.update("insert into bajs_availability( " +
              "employee_id, day, startt, endt) "+
              "values(?, ?, ?, ?)", eid, day, startt, endt);
      }

        return "jsonTemplate";
    }

    @RequestMapping(value = "/avail/remove/{eid}/{day}/{startt}")
    public String removeAvail(Model model,
          @PathVariable("eid") int eid,
          @PathVariable("day") String day,
          @PathVariable("startt") int startt) throws SQLException {

      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      jdbcTemplate.update("delete from bajs_availability " +
        "where employee_id = ? and day = ? and startt = ?", eid, day, startt);

        return "jsonTemplate";
    }

}

