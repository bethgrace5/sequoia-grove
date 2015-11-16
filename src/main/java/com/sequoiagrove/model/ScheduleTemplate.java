package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// All of the CURRENT existing shifts with their weekday/weekend hours
// The shifts do not yet store the date range they existed as a shift,
// so getting the history will be difficult
//
// This is a representation of a row in the schedule

public class ScheduleTemplate {
  /* Class Variables */
    int sid;
    String tname;
    String location;
    String position;
    String wd_st_h;
    String wd_st_m;
    String wd_ed_h;
    String wd_ed_m;
    String we_st_h;
    String we_st_m;
    String we_ed_h;
    String we_ed_m;
    String mon;
    String tue;
    String wed;
    String thu;
    String fri;
    String sat;
    String sun;

  /* Empty Constructor */
    public ScheduleTemplate(){}
  /* Constructor */
    public ScheduleTemplate(
        int sid,
        String location,
        String tname,
        String position,
        String wd_st_h,
        String wd_st_m,
        String wd_ed_h,
        String wd_ed_m,
        String we_st_h,
        String we_st_m,
        String we_ed_h,
        String we_ed_m,
        String mon,
        String tue,
        String wed,
        String thu,
        String fri,
        String sat,
        String sun) {
            this.sid = sid;
            this.tname = tname;
            this.location = location;
            this.position = position;
            this.wd_st_h = wd_st_h;
            this.wd_st_m = wd_st_m;
            this.wd_ed_h = wd_ed_h;
            this.wd_ed_m = wd_ed_m;
            this.we_st_h = we_st_h;
            this.we_st_m = we_st_m;
            this.we_ed_h = we_ed_h;
            this.we_ed_m = we_ed_m;
            this.mon = mon;
            this.tue = tue;
            this.wed = wed;
            this.thu = thu;
            this.fri = fri;
            this.sat = sat;
            this.sun = sun;
    }// end constructor

    // get shift id
    public int getSid() {
        return sid;
    }
    // set shift id
    public void setSid(int sid) {
        this.sid = sid;
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

    // get weekday start hour
    public String getWd_st_h() {
        return wd_st_h;
    }
    // set weekday start hour
    public void setWd_st_h(String wd_st_h) {
        this.wd_st_h = wd_st_h;
    }
    // get weekday start minute
    public String getWd_st_m() {
        return wd_st_m;
    }
    // set weekday start minute
    public void setWd_st_m(String wd_st_m) {
        this.wd_st_m = wd_st_m;
    }
    // get weekday end hour
    public String getWd_ed_h() {
        return wd_ed_h;
    }
    // set weekday end hour
    public void setWd_ed_h(String wd_ed_h) {
        this.wd_ed_h = wd_ed_h;
    }
    // get weekday end minute
    public String getWd_ed_m() {
        return wd_ed_m;
    }
    // set weekday end minute
    public void setWd_ed_m(String wd_ed_m) {
        this.wd_ed_m = wd_ed_m;
    }


  /* WeekEnd Times */

    // get weekend start hour
    public String getWe_st_h() {
        return we_st_h;
    }
    // set weekend start hour
    public void setWe_st_h(String we_st_h) {
        this.we_st_h = we_st_h;
    }
    // get weekend start minute
    public String getWe_st_m() {
        return we_st_m;
    }
    // set weekend start minute
    public void setWe_st_m(String we_st_m) {
        this.we_st_m = we_st_m;
    }
    // get weekend end hour
    public String getWe_ed_h() {
        return we_ed_h;
    }
    // set weekend end hour
    public void setWe_ed_h(String we_ed_h) {
        this.we_ed_h = we_ed_h;
    }
    // get weekend end minute
    public String getWe_ed_m() {
        return we_ed_m;
    }
    // set weekend end minute
    public void setWe_ed_m(String we_ed_m) {
        this.we_ed_m = we_ed_m;
    }


  /* Days */
    public String getMon() {
        return mon;
    }
    public void setMon(String mon) {
        this.mon = mon;
    }
    public String getTue() {
        return tue;
    }
    public void setTue(String tue) {
        this.tue = tue;
    }
    public String getWed() {
        return wed;
    }
    public void setWed(String wed) {
        this.wed = wed;
    }
    public String getThu() {
        return thu;
    }
    public void setThu(String thu) {
        this.thu = thu;
    }
    public String getFri() {
        return fri;
    }
    public void setFri(String fri) {
        this.fri = fri;
    }
    public String getSat() {
        return sat;
    }
    public void setSat(String sat) {
        this.sat = sat;
    }
    public String getSun() {
        return sun;
    }
    public void setSun(String sun) {
        this.sun = sun;
    }
}
