package com.sequoiagrove.model;

public class Availability{
    int startHr;
    int startMin;
    int endHr;
    int endMin;

    public Availability(){}
    public Availability(int sh, int sm, int eh, int em) {
      startHr = sh;
      startMin = sm;
      endHr = eh;
      endMin = em;
    }

    public int getStartHr() {
      return startHr;
    }
    public int getEndHr() {
      return endHr;
    }
    public int getStartMin() {
      return startMin;
    }
    public int getEndMin() {
      return endMin;
    }
    public void setStartHr(int st) {
      startHr = st;
    }
    public void setEndHr(int et) {
      endHr = et;
    }
    public void setStartMin(int st) {
      startMin = st;
    }
    public void setEndMin(int et) {
      endMin = et;
    }
};