package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Shift {
    int sid;
    int pid;
    String tname; 
    int wd_st_h;
    int wd_st_m;
    int wd_ed_h;
    int wd_ed_m;
    int we_st_h;
    int we_st_m;
    int we_ed_h;
    int we_ed_m;

    public Shift(){}
    public Shift(int sid, int pid, String tname,
      int wd_st_h, int wd_st_m, int wd_ed_h, int wd_ed_m,
      int we_st_h, int we_st_m, int we_ed_h, int we_ed_m) {
        this.sid = sid;
        this.pid = pid;
        this.tname = tname;
        this.wd_st_h = wd_st_h;
        this.wd_st_m = wd_st_m;
        this.wd_ed_h = wd_ed_h;
        this.wd_ed_m = wd_ed_m;
        this.we_st_h = we_st_h;
        this.we_st_m = we_st_m;
        this.we_ed_h = we_ed_h;
        this.we_ed_m = we_ed_m;
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
    public void setPid(int sid) {
        this.pid = pid;
    }

    public String getTname() {
        return tname;
    }
    public void setTname(String tname) {
        this.tname = tname;
    }

    public int getWd_st_h() {
        return wd_st_h;
    }
    public void setWd_st_h(int wd_st_h) {
        this.wd_st_h = wd_st_h;
    }

    public int getWd_st_m() {
        return wd_st_m;
    }
    public void setWd_st_m(int wd_st_m) {
        this.wd_st_m = wd_st_m;
    }

    public int getWd_ed_h() {
        return wd_ed_h;
    }
    public void setWd_ed_h(int wd_ed_h) {
        this.wd_ed_h = wd_ed_h;
    }

    public int getWd_ed_m() {
        return wd_ed_m;
    }
    public void setWd_ed_m(int wd_ed_m) {
        this.wd_ed_m = wd_ed_m;
    }

    public int getWe_st_h() {
        return we_st_h;
    }
    public void setWe_st_h(int we_st_h) {
        this.we_st_h = we_st_h;
    }

    public int getWe_st_m() {
        return we_st_m;
    }
    public void setWe_st_m(int we_st_m) {
        this.we_st_m = we_st_m;
    }

    public int getWe_ed_h() {
        return we_ed_h;
    }
    public void setWe_ed_h(int we_ed_h) {
        this.we_ed_h = we_ed_h;
    }

    public int getWe_ed_m() {
        return we_ed_m;
    }
    public void setWe_ed_m(int we_ed_m) {
        this.we_ed_m = we_ed_m;
    }
}
