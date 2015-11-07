package com.sequoiagrove.model;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;


// A week starts on a Monday, and ends on a Sunday
public class Week {
    // the starting monday of the schedule
    Date startDate;
    ArrayList<Day> week = new ArrayList<Day>(7);

    public Week(){}
    public Week(Date startDate) {
        this.startDate = startDate;
    }

    public boolean validateWeek() {
        // checks that an employee is not scheduled more than the maximum
        // hours they desire a week, which will be set at the legal limit for
        // underage employees. If the maximum hours per week is null, it will check
        // that the employee is not scheduled over a legal limit of hours,
        // also checks that the employee has at least two consecutive days off. 
        // checks fairness of hours, did an employee not get any hours this 
        // schedule?
        // checks number of days this week this employee is working

        return true;
    }

    public void generateWeek() {
        // algorithm to generate a week considering the validity of individual
        // days and week as a whole
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date date) {
        this.startDate = startDate;
    }

}
