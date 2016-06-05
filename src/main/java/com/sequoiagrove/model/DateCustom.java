package com.sequoiagrove.model;

public class DateCustom {
  public int year;
  public int month;
  public int day;

  DateCustom() {
    year = -1;
    month = -1;
    day = -1;
  }

  DateCustom(int year, int month, int day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  // ----- Helper Functions -----
  public String toStringYMD() {
    return new String(
      yearToString() + "-" +
      monthToString() + "-" + 
      dayToString()
    );
  }

  public String toStringMDY() {
    return new String(
      monthToString() + "-" +
      dayToString() + "-" + 
      yearToString()
    );
  }

  public String toStringDMY() {
    return new String(
      dayToString() + "-" +
      monthToString() + "-" + 
      yearToString()
    );
  }

  public String yearToString() {
    String yrStr = new String(this.year+"");
    if (this.year == -1) {
      yrStr = "inv";
    }
    return yrStr;
  }

  public String monthToString() {
    String mnStr = new String(this.month+"");
    if (this.month == -1) {
      mnStr = "inv";
    }
    return mnStr;
  }

  public String dayToString() {
    String dyStr = new String(this.day+"");
    if (this.day == -1) {
      dyStr = "inv";
    }
    return dyStr;
  }

  // ----- Getters & Setters -----
  public void setYear(int year) {this.year = year;}
  public int getYear() {return year;}

  public void setMonth(int month) {this.month = month;}
  public int getMonth() {return month;}

  public void setDay(int day) {this.day = day;}
  public int getDay() {return day;}

  public void setStringDMY(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[2]);
      this.month = Integer.parseInt(tokens[1]);
      this.day = Integer.parseInt(tokens[0]);
  }

  public void setStringMDY(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[2]);
      this.month = Integer.parseInt(tokens[0]);
      this.day = Integer.parseInt(tokens[1]);
  }

  public void setStringYMD(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[0]);
      this.month = Integer.parseInt(tokens[1]);
      this.day = Integer.parseInt(tokens[2]);
  }

  // ----- Arithmetic Functions -----
  public DateCustom add(DateCustom rVal) {
    return new DateCustom(
      this.year + rVal.year,
      this.month + rVal.month,
      this.day + rVal.day
    );
  }

  public DateCustom subtract(DateCustom rVal) {
    return new DateCustom(
      this.year - rVal.year,
      this.month - rVal.month,
      this.day - rVal.day
    );
  }

  // ----- Comparison Functions -----
  public boolean lessThan(DateCustom rVal) {
    if (this.year < rVal.year) return true;
    if (this.year > rVal.year) return false;
    if (this.month < rVal.month) return true;
    if (this.month > rVal.month) return false;
    if (this.day < rVal.day) return true;
    return false;
  }

  public boolean greaterThan(DateCustom rVal) {
    if (this.year > rVal.year) return true;
    if (this.year < rVal.year) return false;
    if (this.month > rVal.month) return true;
    if (this.month < rVal.month) return false;
    if (this.day > rVal.day) return true;
    return false;
  }

  public boolean lessThanEqual(DateCustom rVal) {
    if (
      this.year == rVal.year &&
      this.month == rVal.month &&
      this.day == rVal.day
    ) return true;
    if (this.year < rVal.year) return true;
    if (this.year > rVal.year) return false;
    if (this.month < rVal.month) return true;
    if (this.month > rVal.month) return false;
    if (this.day < rVal.day) return true;
    return false;
  }

  public boolean greaterThanEqual(DateCustom rVal) {
    if (
      this.year == rVal.year &&
      this.month == rVal.month &&
      this.day == rVal.day
    ) return true;
    if (this.year > rVal.year) return true;
    if (this.year < rVal.year) return false;
    if (this.month > rVal.month) return true;
    if (this.month < rVal.month) return false;
    if (this.day > rVal.day) return true;
    return false;
  }

  public int compareYear(DateCustom rVal) {
    if(this.year > rVal.year) return 1;
    if(this.year < rVal.year) return -1;
    return 0;
  }

  public int compareMonth(DateCustom rVal) {
    if(this.month > rVal.month) return 1;
    if(this.month < rVal.month) return -1;
    return 0;
  }

  public int compareDay(DateCustom rVal) {
    if(this.day > rVal.day) return 1;
    if(this.day < rVal.day) return -1;
    return 0;
  }

  public int compare(DateCustom rVal) {
    if (this.year == rVal.year) {
      if (this.month == rVal.month) {
        if (this.day == rVal.day) return 0;
        else {
          if (this.day > rVal.day) return 1;
          else return -1;
        }
      }
      else {
        if (this.month > rVal.month) return 1;
        else return -1;
      }
    }
    else {
      if (this.year > rVal.year) return 1;
      else return -1;
    }
  }
};
