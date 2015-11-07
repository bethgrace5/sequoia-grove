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

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.dao.DeliveryDAO;
import com.sequoiagrove.controller.MainController;


@Controller
public class DeliveryController {

    @RequestMapping(value = "/deliveries")
    public String getAllEmployeesJSON(Model model) {
        model.addAttribute("deliveries", DeliveryDAO.getDelivery());
        return "jsonTemplate";
    }

    @RequestMapping(value = "/hotel")
    public String listHotels(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        int rowCount = jdbcTemplate.queryForObject("select count(*) from BAJS_EMPLOYEE", Integer.class);

        List<String> stringList = jdbcTemplate.query(
            "select * from BAJS_EMPLOYEE",
            //"select * from hotel",
            new RowMapper<String>() {
                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                    String str = new String(rs.getString("first_name"));
                    return str;
                }
        });
        model.addAttribute("name", stringList);
        return "jsonTemplate";
    }

}

