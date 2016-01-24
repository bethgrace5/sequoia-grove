package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// simple list to create objects to insert into is_scheduled_for

public class Scheduled {
    int sid;
    int eid;
    String date; // dd-mm-yyyy


    public Scheduled(){}
    public Scheduled(int sid, int eid, String date) {
        this.sid = sid;
        this.eid = eid;
        this.date = date;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
      this.date = date;
    }

}
