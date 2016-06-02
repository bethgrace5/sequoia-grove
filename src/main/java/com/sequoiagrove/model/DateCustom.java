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
  public String toString() {
    String yrStr = new String(this.year+"");
    String mnStr = new String(this.month+"");
    String dyStr = new String(this.day+"");
    if (this.year == -1) {
      yrStr = "inv";
    }
    if (this.month == -1) {
      mnStr = "inv";
    }
    if (this.day == -1) {
      dyStr = "inv";
    }
    return new String(yrStr + "-" + mnStr + "-" + dyStr);
  }

  // ----- Getters & Setters -----
  public void setYear(int year) {this.year = year;}
  public int getYear() {return year;}

  public void setMonth(int month) {this.month = month;}
  public int getMonth() {return month;}

  public void setDay(int day) {this.day = day;}
  public int getDay() {return day;}
};
