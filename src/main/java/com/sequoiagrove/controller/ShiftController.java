package com.sequoiagrove.controller;

import com.sequoiagrove.model.Shift;
import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.sequoiagrove.model.Shift;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ShiftController {

    // get all current shift task names
    @RequestMapping(value = "/shift")
    public String listShiftIds(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Shift> list = jdbcTemplate.query(
            "select p.id as pid, s.id as sid, p.title as pname, s.task_name as tname " +
            "from " +
            "bajs_new_shift s " +
            "inner join " + 
            "bajs_position p " +
            "on s.position_id = p.id " +
            "where s.end_date is null",

            new RowMapper<Shift>() {
                public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Shift s = new Shift(
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


}

