package com.sequoiagrove.controller;

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

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.dao.DeliveryDAO;


@Controller
public class DeliveryController {

    @RequestMapping(value = "/deliveries")
        public String getAllEmployeesJSON(Model model) {
            model.addAttribute("deliveries", DeliveryDAO.getDelivery());
            return "jsonTemplate";
        }


}

