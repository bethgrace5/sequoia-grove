package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ShiftController {

    // get all current shift task names
    /*
    @RequestMapping(value = "/shift")
    public String listShiftIds(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        model.addAttribute("shift", list);
        return "jsonTemplate";
    }
    */
}

