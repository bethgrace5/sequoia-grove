
package com.sequoiagrove.model;

public class Duration{
    String start;
    String end;

    public Duration(){}
    public Duration(String start, String end) {
      this.start = start;
      this.end = end;
    }
    public Duration(String start) {
      this.start = start;
      this.end = "";
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
