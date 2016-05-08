package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.Day;

// All of the CURRENT existing shifts with their weekday/weekend hours
// The shifts do not yet store the date range they existed as a shift,
// so getting the history will be difficult
//
// This is a representation of a row in the schedule

public class ScheduleTemplate {
  /* Class Variables */
    int index;
    int sid;
    int pid;
    String tname;
    String location;
    String position;
    String weekdayStart;
    String weekdayEnd;
    String weekendStart;
    String weekendEnd;

    Day mon;
    Day tue;
    Day wed;
    Day thu;
    Day fri;
    Day sat;
    Day sun;

  /* Empty Constructor */
    public ScheduleTemplate(){}
  /* Constructor */
    public ScheduleTemplate(
        int index,
        int sid,
        int pid,
        String location,
        String tname,
        String position,
        String weekdayStart,
        String weekdayEnd,
        String weekendStart,
        String weekendEnd,
        Day mon,
        Day tue,
        Day wed,
        Day thu,
        Day fri,
        Day sat,
        Day sun) {
            this.index = index;
            this.sid = sid;
            this.pid = pid;
            this.tname = tname;
            this.location = location;
            this.position = position;
            this.weekdayStart = weekdayStart;
            this.weekdayEnd = weekdayEnd;
            this.weekendStart = weekendStart;
            this.weekendEnd = weekendEnd;
            this.mon = mon;
            this.tue = tue;
            this.wed = wed;
            this.thu = thu;
            this.fri = fri;
            this.sat = sat;
            this.sun = sun;
    }// end constructor

    // get shift index
    public int getIndex() {
        return index;
    }
    // set shift id
    public void setIndex(int index) {
        this.index = index;
    }
    // get shift id
    public int getSid() {
        return sid;
    }
    // set shift id
    public void setSid(int sid) {
        this.sid = sid;
    }
    // get position id
    public int getPid() {
        return pid;
    }
    // set position id
    public void setPid(int pid) {
        this.pid = pid;
    }
    // get location
    public String getLocation() {
        return location;
    }
    // set location
    public void setLocation(String location) {
        this.location = location;
    }
    // get position
    public String getPosition() {
        return position;
    }
    // set position
    public void setPosition(String position) {
        this.position = position;
    }
    // get task name
    public String getTname() {
        return tname;
    }
    // set task name
    public void setTname(String tname) {
        this.tname = tname;
    }


  /* WeekDay Times */

    // get weekday start
    public String getWeekdayStart() {
        return weekdayStart;
    }
    // set weekday start hour
    public void setWeekdayStart(String weekdayStart) {
        this.weekdayStart = weekdayStart;
    }
    // get weekday end
    public String getWeekdayEnd() {
        return weekdayEnd;
    }
    // set weekday end
    public void setWeekdayEnd(String weekdayEnd) {
        this.weekdayEnd = weekdayEnd;
    }

  /* WeekEnd Times */

    // get weekend start
    public String getWeekendStart() {
        return weekendStart;
    }
    // set weekend start
    public void setWeekendStart(String weekendStart) {
        this.weekendStart = weekendStart;
    }
    // get weekend end
    public String getWeekendEnd() {
        return weekendEnd;
    }
    // set weekend end
    public void setWeekendEnd(String weekendEnd) {
        this.weekendEnd = weekendEnd;
    }

  /* Days */
    public Day getMon() {
        return mon;
    }
    public void setMon(Day mon) {
        this.mon = mon;
    }
    public Day getTue() {
        return tue;
    }
    public void setTue(Day tue) {
        this.tue = tue;
    }
    public Day getWed() {
        return wed;
    }
    public void setWed(Day wed) {
        this.wed = wed;
    }
    public Day getThu() {
        return thu;
    }
    public void setThu(Day thu) {
        this.thu = thu;
    }
    public Day getFri() {
        return fri;
    }
    public void setFri(Day fri) {
        this.fri = fri;
    }
    public Day getSat() {
        return sat;
    }
    public void setSat(Day sat) {
        this.sat = sat;
    }
    public Day getSun() {
        return sun;
    }
    public void setSun(Day sun) {
        this.sun = sun;
    }
}
