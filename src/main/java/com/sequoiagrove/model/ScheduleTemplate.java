package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// All of the CURRENT existing shifts with their weekday/weekend hours
// The shifts do not yet store the date range they existed as a shift,
// so getting the history will be difficult

public class ScheduleTemplate {
    int sid;
    String tname; 
    String location;
    int wd_st;
    int wd_ed;
    int we_st;
    int we_ed;
    String mon;
    String tue;
    String wed;
    String thu;
    String fri;
    String sat;
    String sun;

    public ScheduleTemplate(){}
    public ScheduleTemplate(
        int sid, 
        String location, 
        String tname, 
        int wd_st, 
        int wd_ed, 
        int we_st, 
        int we_ed,
        String mon,
        String tue,
        String wed,
        String thu,
        String fri,
        String sat,
        String sun ) {

            this.sid = sid;
            this.tname = tname;
            this.location = location;
            this.wd_st = wd_st;
            this.wd_ed = wd_ed;
            this.we_st = we_st;
            this.we_ed = we_ed;
            this.mon = mon;
            this.tue = tue;
            this.wed = wed;
            this.thu = thu;
            this.fri = fri;
            this.sat = sat;
            this.sun = sun;
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public int getWd_st() {
        return wd_st;
    }

    public void setWd_st(int wd_st) {
        this.wd_st = wd_st;
    }

    public int getWd_ed() {
        return wd_ed;
    }

    public void setWd_ed(int wd_ed) {
        this.wd_ed = wd_ed;
    }

    public int getWe_st() {
        return we_st;
    }

    public void setWe_st(int we_st) {
        this.we_st = we_st;
    }

    public int getWe_ed() {
        return we_ed;
    }

    public void setWe_ed(int we_ed) {
        this.we_ed = we_ed;
    }

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
