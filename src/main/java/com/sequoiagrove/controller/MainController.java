package com.sequoiagrove.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;

import com.sequoiagrove.dao.DatabaseDAO;


@Controller
public class MainController {

    @RequestMapping(value="/", method = RequestMethod.GET)
        public String goHome(ModelMap model) {
        DatabaseDAO.listHotels();
            return "/WEB-INF/index.jsp";
        }

}
