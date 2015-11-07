package com.sequoiagrove.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

    private static DataSource dataSource;
    private static JdbcTemplate jdbcTemplate;

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String goHome(ModelMap model) {
        return "/WEB-INF/index.jsp";
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        System.out.println("setting jdbc template");
    }

    public static JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }


    public void listHotels(){
        int rowCount = this.jdbcTemplate.queryForObject("select count(*) from HOTEL", Integer.class);
        System.out.println(rowCount);
    }

}
