package com.sequoiagrove.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;


@Controller
public class MainController {
    @RequestMapping(value="/", method = RequestMethod.GET)
        public String goHome(ModelMap model) {
            return "/WEB-INF/index.jsp";
        }

}
