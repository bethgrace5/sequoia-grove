package com.sequoiagrove.model;

public class Duration{
    String start;
    String end;
    int locationId;
    int startNum;
    int endNum;
    DateCustom startDate;
    DateCustom endDate;

    // ----- Constructors -----
    public Duration(){
      this.startDate = new DateCustom();
      this.endDate = new DateCustom();
    }

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
        startDate = parseDateString(start);
        endDate = parseDateString(end);
      }
    }

    public Duration(int locationId, String start, String end) {
      this.locationId = locationId;
      this.start = start;
      this.end = end;
      try {
        this.startNum = Integer.parseInt(start);
        this.endNum = Integer.parseInt(end);
      }
      catch(NumberFormatException e) {
        this.startNum = -1;
        this.endNum = -1;
        startDate = parseDateString(start);
        endDate = parseDateString(end);
      }
    }

    public Duration(
      String start, String end,
      int startNum, int endNum,
      DateCustom startDate, DateCustom endDate
    ) {
      this.start = start;
      this.end = end;
      this.startNum = startNum;
      this.endNum = endNum;
      this.startDate = startDate;
      this.endDate = endDate;
    }

    public Duration(String start) {
      this.start = start;
      this.end = "";
      try {
        this.startNum = Integer.parseInt(start);
      }
      catch(NumberFormatException e) {
        this.startNum = -1;
        startDate = parseDateString(start);
      }
      this.endNum = -1;
      this.endDate = new DateCustom();
    }

    public Duration(int locationId, String start) {
      this.locationId = locationId;
      this.start = start;
      this.end = "";
      try {
        this.startNum = Integer.parseInt(start);
      }
      catch(NumberFormatException e) {
        this.startNum = -1;
        startDate = parseDateString(start);
      }
      this.endNum = -1;
      this.endDate = new DateCustom();
    }

    // ----- Helper Functions -----
    public DateCustom parseDateString(String dateStr) {
      if (dateStr == null) {
        return new DateCustom();
      }
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      // DateCustom(int year, int month, int day)
      return new DateCustom(
        Integer.parseInt(tokens[2]),
        Integer.parseInt(tokens[0]),
        Integer.parseInt(tokens[1])
      );
    }

    // ----- Getters & Setters -----

    public void setLocationId(int locationId) {
      this.locationId = locationId;
    }
    public int getLocationId(int locationId) {
      return locationId;
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

    public void setStartDate(DateCustom startDate) {
      this.startDate = startDate;
    }
    public void setStartDate(String startDate) {
      this.startDate = parseDateString(startDate);
    }
    public DateCustom getStartDate() {
      return this.startDate;
    }

    public void setEndDate(DateCustom endDate) {
      this.endDate = endDate;
    }
    public void setEndDate(String endDate) {
      this.endDate = parseDateString(endDate);
    }
    public DateCustom getEndDate() {
      return this.endDate;
    }
};
