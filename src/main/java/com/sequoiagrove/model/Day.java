
package com.sequoiagrove.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


public class Day {
    String weekday;
    String name;
    int eid;
    public Day(){}
    public Day(String weekday, String name, int eid) {
        this.eid = eid;
        this.name = name;
        this.weekday = weekday;
    }

    /*
    public void setShifts() {
        // gets all shifts and adds them to the day as empty
        // slots that need to all be filled
    }

    public void scheduleEmployee(Employee employee, Shift shift) {
        // check that this employee is able to work this shift
        // and that they are not already scheduled for this day
        // if the day is a weekday, add weekday hours if the day is a 
        // saturday or sunday, make sure to add those hours insttead
        day.put(employee, shift);
    }

    public void deleteScheduledEmployee(Employee employee) {
        // finds the employee in the list, and deletes that 
        // entry from the map
    }

    public boolean validateDay() {
        // checks that all shifts are filled, only one employee is
        // scheduled per shift, the employee is trained to work the 
        // position that the shift requires, the employee is not 
        // working in a time slot that overlaps with annother employee
        // that they cannot work with, and that this day is not in the 
        // range of any days they have been granted a request off

        return true;
    }

    public void setHoliday(String type) {
        // a day may be a full or half holiday, 
    }
    */

    public String getWeekday(){
      return weekday;
    }
    public void setWeekday(String weekday){
      this.weekday = weekday;
    }

    public String getName(){
      return name;
    }
    public void setName(String name){
      this.name = name;
    }

    public int getEid(){
      return eid;
    }
    public void setEid(int name){
      this.eid = eid;
    }

}
