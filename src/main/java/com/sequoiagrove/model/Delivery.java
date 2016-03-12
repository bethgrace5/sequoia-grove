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
    boolean mon;
    boolean tue;
    boolean wed;
    boolean thu;
    boolean fri;
    boolean sat;
    boolean sun;
    int id;


  /* Empty Constructor */
    public Delivery(){}
  /* Constructor */
    public Delivery( String name, boolean mon,boolean tue, boolean wed, boolean thu, boolean fri, boolean sat, boolean sun, int id ) {
            this.name= name;
            this.mon = mon;
            this.tue = tue;
            this.wed = wed;
            this.thu = thu;
            this.fri = fri;
            this.sat = sat;
            this.sun = sun;
            this.id = id;
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
    public boolean getMon() {
        return mon;
    }
    public void setMon(boolean mon) {
        this.mon = mon;
    }
    public boolean getTue() {
        return tue;
    }
    public void setTue(boolean tue) {
        this.tue = tue;
    }
    public boolean getWed() {
        return wed;
    }
    public void setWed(boolean wed) {
        this.wed = wed;
    }
    public boolean getThu() {
        return thu;
    }
    public void setThu(boolean thu) {
        this.thu = thu;
    }
    public boolean getFri() {
        return fri;
    }
    public void setFri(boolean fri) {
        this.fri = fri;
    }
    public boolean getSat() {
        return sat;
    }
    public void setSat(boolean sat) {
        this.sat = sat;
    }
    public boolean getSun() {
        return sun;
    }
    public void setSun(boolean sun) {
        this.sun = sun;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
}
