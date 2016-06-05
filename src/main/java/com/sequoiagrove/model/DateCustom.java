package com.sequoiagrove.model;

import java.util.*;
import java.lang.IllegalArgumentException;

public class DateCustom {
  public int year;
  public int month;
  public int day;
  private int daysInMonth;

  DateCustom() {
    year = -1;
    month = -1;
    day = -1;
    daysInMonth = -1;
  }

  DateCustom(int year, int month, int day) {
    this.year = year;
    this.month = month;
    this.day = day;
    setDaysInMonth();
  }

  DateCustom(DateCustom source) {
    this.year = source.year;
    this.month = source.month;
    this.day = source.day;
    this.daysInMonth = source.daysInMonth;
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

  public void setDaysInMonth(int daysInMonth) {this.daysInMonth = daysInMonth;}
  public void setDaysInMonth() {
    if (this.month == -1) return;
    if (this.month == 2) {
      if(this.year % 4 == 0) {this.daysInMonth = 29;}
      else {this.daysInMonth = 28;}
    }
    else if (
      this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 ||
      this.month == 8 || this.month == 10 || this.month == 12
    ) {this.daysInMonth = 31;}
    else {this.daysInMonth = 30;}
  }
  public int getDaysInMonth() {return daysInMonth;}

  public void setStringDMY(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[2]);
      this.month = Integer.parseInt(tokens[1]);
      this.day = Integer.parseInt(tokens[0]);
      setDaysInMonth();
  }

  public void setStringMDY(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[2]);
      this.month = Integer.parseInt(tokens[0]);
      this.day = Integer.parseInt(tokens[1]);
      setDaysInMonth();
  }

  public void setStringYMD(String dateStr) {
      if (dateStr == null) return;
      String delims = "[-]+";
      String[] tokens = dateStr.split(delims);
      this.year = Integer.parseInt(tokens[0]);
      this.month = Integer.parseInt(tokens[1]);
      this.day = Integer.parseInt(tokens[2]);
      setDaysInMonth();
  }

  // ----- Arithmetic Functions -----
  public DateCustom add(DateCustom rVal) {
    return new DateCustom(
      this.year + rVal.year,
      this.month + rVal.month,
      this.day + rVal.day
    );
  }

  public DateCustom add(int numDays) {

    if (numDays < 0) throw new IllegalArgumentException("argument: "+numDays);
    if (numDays == 0) return this;
    DateCustom result = new DateCustom(this);
    while (numDays > 0) {
      result.day++;
      if(result.day > result.daysInMonth) {
        result.day = 1;
        result.month++;
        if(result.month > 12) {
          result.month = 1;
          result.year++;
        }
        result.setDaysInMonth();
      }
      numDays--;
    }
    return result;
  }

  public DateCustom subtract(DateCustom rVal) {
    return new DateCustom(
      this.year - rVal.year,
      this.month - rVal.month,
      this.day - rVal.day
    );
  }

  public DateCustom subtract(int numDays) {
    if (numDays < 0) throw new IllegalArgumentException("argument: "+numDays);
    if (numDays == 0) return this;
    DateCustom result = new DateCustom(this);
    while (numDays > 0) {
      result.day--;
      if(result.day <= 0) {
        result.month--;
        if(result.month <= 0) {
          result.month = 12;
          result.year--;
        }
        result.setDaysInMonth();
        result.day = result.getDaysInMonth();
      }
      numDays--;
    }
    return result;
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
