package com.sequoiagrove.controller;

import com.sequoiagrove.model.Position;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import com.sequoiagrove.dao.PositionDAO;


@Controller
public class PositionController {

    @RequestMapping(value = "/positions")
        public String getAllPositions(Model model)
        {
            model.addAttribute("positions", PositionDAO.getPosition());
            return "jsonTemplate";
        }


}

