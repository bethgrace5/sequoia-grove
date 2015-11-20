package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.sequoiagrove.model.Position;

public class Availability{
    String day;
    int startHr;
    int startMin;
    int endHr;
    int endMin;

    public Availability(){}
    public Availability(String d, int sh, int sm, int eh, int em) {
      day = d;
      startHr = sh;
      startMin = sm;
      endHr = eh;
      endMin = em;
    }

    public String getDay() {
      return day;
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
    public void setDay(String d) {
      day = d;
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
