package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Shift {
    int sid;
    int pid;
    String tname; 
    String wd_st;
    String wd_ed;
    String we_st;
    String we_ed;

    public Shift(){}
    public Shift(int sid, int pid, String tname,
      String wd_st, String wd_ed, 
      String we_st, String we_ed) {
        this.sid = sid;
        this.pid = pid;
        this.tname = tname;
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
    public void setPid(int sid) {
        this.pid = pid;
    }

    public String getTname() {
        return tname;
    }
    public void setTname(String tname) {
        this.tname = tname;
    }

    public String getWd_st() {
        return wd_st;
    }
    public void setWd_st(String wd_st) {
        this.wd_st = wd_st;
    }

    public String getWd_ed() {
        return wd_ed;
    }
    public void setWd_ed(String wd_ed) {
        this.wd_ed = wd_ed;
    }

    public String getWe_st() {
        return we_st;
    }
    public void setWe_st(String we_st) {
        this.we_st = we_st;
    }

    public String getWe_ed() {
        return we_ed;
    }
    public void setWe_ed(String we_ed) {
        this.we_ed = we_ed;
    }
}
