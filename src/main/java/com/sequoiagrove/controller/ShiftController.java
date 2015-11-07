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

@Controller
public class ShiftController {

  @RequestMapping(value = "/shifts")
    public String getAllPositions(Model model)
    {
        //model.addAttribute("shifts", ShiftDAO.getShift());
        return "jsonTemplate";
    }

    @RequestMapping(value = "/schedule/week/{start}")
    public String listHotels(Model model, @PathVariable("start") String start){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Shift> shifts = jdbcTemplate.query(
            "select * from BAJS_SCHEDULE where day=to_date('11/05/2014', 'mm/dd/yyyy')",
            new RowMapper<Shift>() {
                public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Shift shift = new Shift(
                        rs.getInt("sid"),
                        rs.getInt("eid"),
                        rs.getInt("pid"),
                        rs.getDate("day"),
                        rs.getString("name"),
                        rs.getString("tname"),
                        rs.getInt("wd_st"),
                        rs.getInt("wd_ed"),
                        rs.getInt("we_st"),
                        rs.getInt("we_ed")
                    );
                    
                    return shift;
                }
        });
        model.addAttribute(shifts);
        return "jsonTemplate";
    }




}

