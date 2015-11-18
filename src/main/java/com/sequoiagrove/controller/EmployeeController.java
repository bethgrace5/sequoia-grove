package com.sequoiagrove.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.SQLException;
import java.sql.ResultSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import java.util.ArrayList;

import com.sequoiagrove.model.EmployeeSimple;

@Controller
public class EmployeeController
{

    // get all of the possible shift ids
    @RequestMapping(value = "/employee")
    public String getEmployee(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<EmployeeSimple> empList = jdbcTemplate.query(
            "select distinct name, eid, pid, title from bajs_std_emp",
            new RowMapper<EmployeeSimple>() {
                public EmployeeSimple mapRow(ResultSet rs, int rowNum) throws SQLException {
                    EmployeeSimple es = new EmployeeSimple (
                      rs.getInt("eid"),
                      rs.getInt("pid"),
                      rs.getString("name"),
                      rs.getString("title")
                    );
                    return es;
                }
        });
        model.addAttribute("employee", empList);
        return "jsonTemplate";
    }

}
