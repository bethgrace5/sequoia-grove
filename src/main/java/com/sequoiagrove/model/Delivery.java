package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.Day;

// All of the CURRENT existing shifts with their weekday/weekend hours
// The shifts do not yet store the date range they existed as a shift,
// so getting the history will be difficult
//
// This is a representation of a row in the Delivery

public class Delivery {
  /* Class Variables */
    String name;
    int mon;
    int tue;
    int wed;
    int thu;
    int fri;
    int sat;
    int sun;


  /* Empty Constructor */
    public Delivery(){}
  /* Constructor */
    public Delivery( String name, int mon,int tue, int wed, int thu, int fri, int sat, int sun ) {
            this.name= name;
            this.mon = mon;
            this.tue = tue;
            this.wed = wed;
            this.thu = thu;
            this.fri = fri;
            this.sat = sat;
            this.sun = sun;
    }// end constructor

    // get task name
    public String getName() {
        return name;
    }
    // set task name
    public void setName(String name) {
        this.name = name;
    }


  /* Days */
    public int getMon() {
        return mon;
    }
    public void setMon(int mon) {
        this.mon = mon;
    }
    public int getTue() {
        return tue;
    }
    public void setTue(int tue) {
        this.tue = tue;
    }
    public int getWed() {
        return wed;
    }
    public void setWed(int wed) {
        this.wed = wed;
    }
    public int getThu() {
        return thu;
    }
    public void setThu(int thu) {
        this.thu = thu;
    }
    public int getFri() {
        return fri;
    }
    public void setFri(int fri) {
        this.fri = fri;
    }
    public int getSat() {
        return sat;
    }
    public void setSat(int sat) {
        this.sat = sat;
    }
    public int getSun() {
        return sun;
    }
    public void setSun(int sun) {
        this.sun = sun;
    }
}
