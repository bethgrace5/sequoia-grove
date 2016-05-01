package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class DayShiftEmployee{
    Integer day;
    Integer shift;
    Integer employee;
    Integer worked;

    public DayShiftEmployee(){}
    public DayShiftEmployee(Integer day, Integer shift, Integer employee, Integer worked) {
      this.day = day;
      this.shift = shift;
      this.employee = employee;
      this.worked = worked;
    }

    public Integer getDay(){
      return this.day;
    }
    public void setDay(Integer day){
      this.day = day;
    }

    public Integer getShift(){
      return this.shift;
    }
    public void setShift(Integer shift){
      this.shift = shift;
    }

    public Integer getEmployee(){
      return this.employee;
    }
    public void setEmployee(Integer employee){
      this.employee = employee;
    }

    public Integer getWorked(){
      return this.worked;
    }
    public void setWorked(Integer worked){
      this.worked = worked;
    }
  }
