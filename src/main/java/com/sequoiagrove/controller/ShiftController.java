package com.sequoiagrove.controller;

import com.sequoiagrove.model.Shift;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import com.sequoiagrove.dao.ShiftDAO;

@Controller
public class ShiftController {

    @RequestMapping(value = "/shifts")
        public String getAllPositions(Model model)
        {
            model.addAttribute("shifts", ShiftDAO.getShift());
            return "jsonTemplate";
        }



}

