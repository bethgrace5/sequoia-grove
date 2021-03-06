package com.sequoiagrove.model;

import java.util.List;
import java.util.ArrayList;
import com.sequoiagrove.model.Duration;

public class WeeklyAvail {
    List<Duration> mon = new ArrayList<Duration>();
    List<Duration> tue = new ArrayList<Duration>();
    List<Duration> wed = new ArrayList<Duration>();
    List<Duration> thu = new ArrayList<Duration>();
    List<Duration> fri = new ArrayList<Duration>();
    List<Duration> sat = new ArrayList<Duration>();
    List<Duration> sun = new ArrayList<Duration>();

    public WeeklyAvail(){}
    public WeeklyAvail(
      List<Duration> mon,
      List<Duration> tue,
      List<Duration> wed,
      List<Duration> thu,
      List<Duration> fri,
      List<Duration> sat,
      List<Duration> sun
    ){
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
        this.sun = sun;
    }

    public List<Duration> getMon() {
        return mon;
    }
    public void setMon(List<Duration> mon) {
        this.mon = mon;
    }

    public List<Duration> getTue() {
        return tue;
    }
    public void setTue(List<Duration> tue) {
        this.tue = tue;
    }

    public List<Duration> getWed() {
        return wed;
    }
    public void setWed(List<Duration> wed) {
        this.wed = wed;
    }

    public List<Duration> getThu() {
        return thu;
    }
    public void setThu(List<Duration> thu) {
        this.thu = thu;
    }

    public List<Duration> getFri() {
        return fri;
    }
    public void setFri(List<Duration> fri) {
        this.fri = fri;
    }

    public List<Duration> getSat() {
        return sat;
    }
    public void setSat(List<Duration> sat) {
        this.sat = sat;
    }

    public List<Duration> getSun() {
        return sun;
    }
    public void setSun(List<Duration> sun) {
        this.sun = sun;
    }
    public void add(String day, String start, String end) {

      if (day.equals("mon")) {
        this.mon.add(new Duration(start, end));
      }
      if (day.equals("tue")) {
        this.tue.add(new Duration(start, end));
      }
      if (day.equals("wed")) {
        this.wed.add(new Duration(start, end));
      }
      if (day.equals("thu")) {
        this.thu.add(new Duration(start, end));
      }
      if (day.equals("fri")) {
        this.fri.add(new Duration(start, end));
      }
      if (day.equals("sat")) {
        this.sat.add(new Duration(start, end));
      }
      if (day.equals("sun")) {
        this.sun.add(new Duration(start, end));
      }

    }
};
