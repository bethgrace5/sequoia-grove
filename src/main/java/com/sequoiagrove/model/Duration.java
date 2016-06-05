package com.sequoiagrove.model;

public class Duration{
    String start;
    String end;
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
      this.startDate = new DateCustom();
      this.endDate = new DateCustom();
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

    public boolean usingNums() {
      return (startNum >= 0 && endNum >= 0);
    }

    public boolean usingDates() {
      if(
        this.startDate.year == -1 &&
        this.startDate.month == -1 &&
        this.startDate.day == -1
      ) return false;
      return true;
    }

    private boolean bothUsingNums(Duration rVal) {
      return (this.usingNums() && rVal.usingNums());
    }

    private boolean bothUsingDates(Duration rVal) {
      return (this.usingDates() && rVal.usingDates());
    }

    // ----- Comparison Functions -----
    public boolean timeOverlapsWith(int rvStart, int rvEnd) {
      return (this.startNum <= rvEnd && this.endNum >= rvStart);
    }

    public boolean dateOverlapsWith(DateCustom rvStart, DateCustom rvEnd) {
      return (
        this.startDate.lessThanEqual(rvEnd) &&
        this.endDate.greaterThanEqual(rvStart) );
    }

    public boolean timeIsWithin(int rvStart, int rvEnd) {
      return (this.startNum >= rvStart && this.endNum <= rvEnd);
    }

    public boolean dateIsWithin(DateCustom rvStart, DateCustom rvEnd) {
      return (
        this.startDate.greaterThanEqual(rvStart) &&
        this.endDate.lessThanEqual(rvEnd) );
    }

    public boolean overlapsWith(Duration rVal) {
      if(this.bothUsingNums(rVal)) {
        return timeOverlapsWith(rVal.startNum, rVal.endNum);
      }
      else if(this.bothUsingDates(rVal)) {
        return dateOverlapsWith(rVal.startDate, rVal.endDate);
      }
      throw new IllegalArgumentException(
        "parameter is not using same Duration type as this object");
    }

    public boolean isWithin(Duration rVal) {
      if(this.bothUsingNums(rVal)) {
        return timeIsWithin(rVal.startNum, rVal.endNum);
      }
      else if(this.bothUsingDates(rVal)) {
        return dateIsWithin(rVal.startDate, rVal.endDate);
      }
      throw new IllegalArgumentException(
        "parameter is not using same Duration type as this object");
    }

    public boolean isLonger(Duration rVal) {
      if(this.bothUsingNums(rVal)) {
        return ((this.endNum - this.startNum) > (rVal.endNum - rVal.startNum));
      }
      else if(this.bothUsingDates(rVal)) {
        return(
          this.startDate.subtract(this.endDate).greaterThan(
            rVal.startDate.subtract(rVal.endDate)
          )
        );
      }
      throw new IllegalArgumentException(
        "parameter is not using same Duration type as this object");
    }

    public boolean isShorter(Duration rVal) {
      if(this.bothUsingNums(rVal)) {
        return ((this.endNum - this.startNum) < (rVal.endNum - rVal.startNum));
      }
      else if(this.bothUsingDates(rVal)) {
        return(
          this.startDate.subtract(this.endDate).lessThan(
            rVal.startDate.subtract(rVal.endDate)
          )
        );
      }
      throw new IllegalArgumentException(
        "parameter is not using same Duration type as this object");
    }

    // ----- Getters & Setters -----
    public void setStart(String start) {this.start = start;}
    public String getStart() {return start;}

    public void setEnd(String end) {this.end = end;}
    public String getEnd() {return end;}

    public void setStartNum(int startNum) {this.startNum = startNum;}
    public void setStartNum(String startNum) {
      try {
        this.startNum = Integer.parseInt(startNum);
      }
      catch (NumberFormatException e) {
        this.startNum = -1;
      }
    }
    public int getStartNum() {return startNum;}

    public void setEndNum(int endNum) {this.endNum = endNum;}
    public void setEndNum(String endNum) {
      try {
        this.endNum = Integer.parseInt(endNum);
      }
      catch (NumberFormatException e) {
        this.endNum = -1;
      }
    }
    public int getEndNum() {return endNum;}

    public void setStartDate(DateCustom startDate) {this.startDate = startDate;}
    public void setStartDate(String startDate) {this.startDate = parseDateString(startDate);}
    public DateCustom getStartDate() {return this.startDate;}

    public void setEndDate(DateCustom endDate) {this.endDate = endDate;}
    public void setEndDate(String endDate) {this.endDate = parseDateString(endDate);}
    public DateCustom getEndDate() {return this.endDate;}
};
