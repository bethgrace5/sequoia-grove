package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Request {
    int eid;
    Duration timeOff;

    public Request(){
        this.timeOff = new Duration();
    }
    public Request(int eid, Duration timeOff) {
        this.eid = eid;
        this.timeOff = timeOff;
    }
    public Request(int eid, String startDate, String endDate) {
        this.eid = eid;
        this.timeOff = new Duration(startDate, endDate);
    }

    // ----- Getters & Setters -----
    public void setEid(int id) {this.eid = eid;}
    public int getEid() {return eid;}

    public void setTimeOff(Duration timeOff) {this.timeOff = timeOff;}
    public Duration getTimeOff() {return this.timeOff;}

    public String getStartDateString() {
        return this.timeOff.startDate.toString();
    }
    public void setStartDate(String startDate) {
        this.timeOff.setStartDate(startDate);
    }

    public String getEndDateString() {
        return this.timeOff.endDate.toString();
    }
    public void setEndDate(String endDate) {
        this.timeOff.setEndDate(endDate);
    }
}
