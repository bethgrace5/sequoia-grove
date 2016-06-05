package com.sequoiagrove.model;

import java.util.*;
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

    public List<Duration> getDayAvail(String day) {

      if (day.equals("mon")) {
        return this.mon;
      }
      else if (day.equals("tue")) {
        return this.tue;
      }
      else if (day.equals("wed")) {
        return this.wed;
      }
      else if (day.equals("thu")) {
        return this.thu;
      }
      else if (day.equals("fri")) {
        return this.fri;
      }
      else if (day.equals("sat")) {
        return this.sat;
      }
      else if (day.equals("sun")) {
        return this.sun;
      }
      else throw new IllegalArgumentException("argument: "+day);
    }

    public List<Duration> getDayAvail(int day) {

      if (day == 1) {
        return this.mon;
      }
      else if (day == 2) {
        return this.tue;
      }
      else if (day == 3) {
        return this.wed;
      }
      else if (day == 4) {
        return this.thu;
      }
      else if (day == 5) {
        return this.fri;
      }
      else if (day == 6) {
        return this.sat;
      }
      else if (day == 7) {
        return this.sun;
      }
      else throw new IllegalArgumentException("argument: "+day);
    }

    public void add(String day, String start, String end) {

      if (day.equals("mon")) {
        this.mon.add(new Duration(start, end));
      }
      else if (day.equals("tue")) {
        this.tue.add(new Duration(start, end));
      }
      else if (day.equals("wed")) {
        this.wed.add(new Duration(start, end));
      }
      else if (day.equals("thu")) {
        this.thu.add(new Duration(start, end));
      }
      else if (day.equals("fri")) {
        this.fri.add(new Duration(start, end));
      }
      else if (day.equals("sat")) {
        this.sat.add(new Duration(start, end));
      }
      else if (day.equals("sun")) {
        this.sun.add(new Duration(start, end));
      }
      else throw new IllegalArgumentException("argument: "+day);
    }
};
