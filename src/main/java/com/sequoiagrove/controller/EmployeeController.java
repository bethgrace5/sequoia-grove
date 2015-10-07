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

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.dao.EmployeeDAO;

@Controller
public class EmployeeController
{

    @RequestMapping(value = "/employees")
        public String getAllEmployeesJSON(Model model)
        {
            model.addAttribute("employees", EmployeeDAO.getEmployee());
            return "jsonTemplate";
        }

    @RequestMapping(value = "/availability/{id}")
        public String getEmployeeAvailability(Model model, @PathVariable("id") int id)
        {
            model.addAttribute("employees", EmployeeDAO.getEmployeeAvailability(id));
            return "jsonTemplate";
        }

    @RequestMapping(value = "/employees/{id}")
        public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") int id)
        {
            if (id <= 3) {
                Employee employee = new Employee(1,"firstname","lastnmae");
                return new ResponseEntity<Employee>(employee, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
}
