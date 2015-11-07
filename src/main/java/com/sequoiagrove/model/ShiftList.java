
package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class ShiftList {
    int sid;
    int pid;
    int wd_st;
    int wd_ed;
    int we_st;
    int we_ed;

    public ShiftList(){}
    public ShiftList(int sid, int eid, int pid, Date day, String ename, String tname, int wd_st, int wd_ed, int we_st, int we_ed) {
        this.sid = sid;
        this.eid = eid;
        this.pid = pid;
        this.day = day;
        this.tname = tname;
        this.ename = ename;
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
    public int getEid() {
        return eid;
    }

    public void setEid(int id) {
        this.eid = eid;
    }

    public int getPid() {
        return pid;
    }

    public void setDay(Date day) {
        this.day = day;
    }

    public Date getDay() {
        return day;
    }

    public void setPid(int id) {
        this.pid = pid;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
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
