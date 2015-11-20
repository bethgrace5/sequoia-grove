package com.sequoiagrove.model;

import java.util.List;
import java.util.ArrayList;
import com.sequoiagrove.model.Availability;

public class WeeklyAvail {
    List<Availability> mon = new ArrayList<Availability>();
    List<Availability> tue = new ArrayList<Availability>();
    List<Availability> wed = new ArrayList<Availability>();
    List<Availability> thu = new ArrayList<Availability>();
    List<Availability> fri = new ArrayList<Availability>();
    List<Availability> sat = new ArrayList<Availability>();
    List<Availability> sun = new ArrayList<Availability>();

    public WeeklyAvail(){}
    public WeeklyAvail(
      List<Availability> mon,
      List<Availability> tue,
      List<Availability> wed,
      List<Availability> thu,
      List<Availability> fri,
      List<Availability> sat,
      List<Availability> sun
    ){
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
        this.sun = sun;
    }

    public List<Availability> getMon() {
        return mon;
    }
    public void setMon(List<Availability> mon) {
        this.mon = mon;
    }

    public List<Availability> getTue() {
        return tue;
    }
    public void setTue(List<Availability> tue) {
        this.tue = tue;
    }

    public List<Availability> getWed() {
        return wed;
    }
    public void setWed(List<Availability> wed) {
        this.wed = wed;
    }

    public List<Availability> getThu() {
        return thu;
    }
    public void setThu(List<Availability> thu) {
        this.thu = thu;
    }

    public List<Availability> getFri() {
        return fri;
    }
    public void setFri(List<Availability> fri) {
        this.fri = fri;
    }

    public List<Availability> getSat() {
        return sat;
    }
    public void setSat(List<Availability> sat) {
        this.sat = sat;
    }

    public List<Availability> getSun() {
        return sun;
    }
    public void setSun(List<Availability> sun) {
        this.sun = sun;
    }
};
