package com.sequoiagrove.controller;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public DataSource dataSource;
    public static jdbc jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbc) {
      this.jdbc = jdbc;
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public static void main(String[] args) {
        //System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(Application.class, args);

    }

}
