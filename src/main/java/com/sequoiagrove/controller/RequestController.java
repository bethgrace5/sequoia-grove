
package com.sequoiagrove.controller;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;

import com.sequoiagrove.model.ScheduleTemplate;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.Request;
import com.sequoiagrove.model.Param;
import com.sequoiagrove.model.Scheduled;
import com.sequoiagrove.dao.DeliveryDAO;
import com.sequoiagrove.controller.MainController;


@Controller
public class RequestController{

  // Get current schedule template (current shifts) dd/mm/yyyy
    @RequestMapping(value = "/request/submit")
    public String sumbitRequest(@RequestBody String data, Model model) throws SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        Gson gson = new Gson();
        Request req = gson.fromJson(data, Request.class);

        System.out.println(req.getEid());
        System.out.println(req.getStartDate());
        System.out.println(req.getEndDate());
        return "jsonTemplate";
    }

}

