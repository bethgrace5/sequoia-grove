package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Request {
    int eid;
    String startDate;
    String endDate;

    public Request(){}
    public Request(int eid, String startDate, String endDate) {
        this.eid = eid;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void setEid(int id) {
        this.eid = eid;
    }
    public int getEid() {
        return eid;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public String getStartDate() {
      return this.startDate;
    }

    public void setEndDate(String startDate) {
        this.endDate = endDate;
    }
    public String getEndDate(){
      return this.endDate;
    }
}
