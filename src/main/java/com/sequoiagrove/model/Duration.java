package com.sequoiagrove.model;

public class Duration{
    String start;
    String end;
    int startNum;
    int endNum;

    public Duration(){}

    public Duration(String start, String end) {
      this.start = start;
      this.end = end;
      try {
        this.startNum = Integer.parseInt(start);
        this.endNum = Integer.parseInt(end);
      }
      catch(NumberFormatException e) {
        this.startNum = -1;
        this.endNum = -1;
      }
    }

    public Duration(String start, String end, int startNum, int endNum) {
      this.start = start;
      this.end = end;
      this.startNum = startNum;
      this.endNum = endNum;
    }

    public Duration(String start) {
      this.start = start;
      this.end = "";
      try {
        this.startNum = Integer.parseInt(start);
      }
      catch(NumberFormatException e) {
        this.startNum = -1;
      }
      this.endNum = -1;
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

    public void setStartNum(int startNum) {
      this.startNum = startNum;
    }
    public void setStartNum(String startNum) {
      try {
        this.startNum = Integer.parseInt(startNum);
      }
      catch (NumberFormatException e) {
        this.startNum = -1;
      }
    }
    public int getStartNum() {
      return startNum;
    }

    public void setEndNum(int endNum) {
      this.endNum = endNum;
    }
    public void setEndNum(String endNum) {
      try {
        this.endNum = Integer.parseInt(endNum);
      }
      catch (NumberFormatException e) {
        this.endNum = -1;
      }
    }
    public int getEndNum() {
      return endNum;
    }
};
