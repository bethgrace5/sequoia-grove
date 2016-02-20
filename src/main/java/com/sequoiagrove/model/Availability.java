package com.sequoiagrove.model;

public class Availability{
    String start;
    String end;

    public Availability(){}
    public Availability(String start, String end) {
      this.start = start;
      this.end = end;
    }

    public void setStart(String start) {
      this.start = start;
    }
    public String getStart() {
      return start;
    }

    public void setEnd(String end) {
      this.end = end;
    }
    public String getEnd() {
      return end;
    }
};
