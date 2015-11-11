package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/* 
 * A date where an employee was scheduled for a shift 
 *
 */

public class Scheduled {
    int sid;
    int eid;
    String ename; 
    Date day;


    public Scheduled(){}
    public Scheduled(int sid, int eid, String ename, Date day) {
        this.sid = sid;
        this.eid = eid;
        this.day = day;
        this.ename = ename;
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

    public Date getDay() {
        return day;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

}
