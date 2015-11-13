package com.sequoiagrove.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.dao.DeliveryDAO;
import com.sequoiagrove.controller.MainController;


@Controller
public class ScheduleController {


  // Get current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/schedule/template/{mon}/{tue}/{wed}/{thu}/{fri}/{sat}/{sun}")
    public String getScheduleTemplate(Model model, 
          @PathVariable("mon") String mon,
          @PathVariable("tue") String tue,
          @PathVariable("wed") String wed,
          @PathVariable("thu") String thu,
          @PathVariable("fri") String fri,
          @PathVariable("sat") String sat,
          @PathVariable("sun") String sun ) {

        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<ScheduleTemplate> schTempList = jdbcTemplate.query(
          "select * from table(bajs_pkg.get_schedule('" + mon + "', '" + 
                                                          tue + "', '" + 
                                                          wed + "', '" + 
                                                          thu + "', '" + 
                                                          fri + "', '" + 
                                                          sat + "', '" + 
                                                          sun + "' ))",
          
            new RowMapper<ScheduleTemplate>() {
                public ScheduleTemplate mapRow(ResultSet rs, int rowNum) throws SQLException {
                    ScheduleTemplate schTmp = new ScheduleTemplate(
                          rs.getInt("sid"), 
                          rs.getString("location"),
                          rs.getString("tname"), 
                          rs.getInt("wd_st"),
                          rs.getInt("wd_ed"),
                          rs.getInt("we_st"),
                          rs.getInt("we_ed"),
                          rs.getString("mon"), 
                          rs.getString("tue"), 
                          rs.getString("wed"), 
                          rs.getString("thu"), 
                          rs.getString("fri"), 
                          rs.getString("sat"), 
                          rs.getString("sun"));

                    return schTmp;
                }
          });

        model.addAttribute("template", schTempList);
        return "jsonTemplate";
    }


}

