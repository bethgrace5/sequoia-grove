package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// All of the CURRENT existing shifts with their weekday/weekend hours
// The shifts do not yet store the date range they existed as a shift,
// so getting the history will be difficult

public class ScheduleTemplate {
    int sid;
    int pid;
    String tname; 
    String location;
    int wd_st;
    int wd_ed;
    int we_st;
    int we_ed;

    public ScheduleTemplate(){}
    public ScheduleTemplate(int sid, int pid, String location, String tname, int wd_st, int wd_ed, int we_st, int we_ed) {
        this.sid = sid;
        this.pid = pid;
        this.tname = tname;
        this.location = location;
        this.wd_st = wd_st;
        this.wd_ed = wd_ed;
        this.we_st = we_st;
        this.we_ed = we_ed;
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int id) {
        this.pid = pid;
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
}
