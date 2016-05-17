package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Shift {
    int sid;
    int pid;
    String tname;
    String startDate;
    String endDate;
    String weekdayStart;
    String weekdayEnd;
    String weekendStart;
    String weekendEnd;

    public Shift(){}
    public Shift(int sid, int pid, String tname,
      String startDate, String endDate,
      String weekdayStart, String weekdayEnd, 
      String weekendStart, String weekendEnd) {
        this.sid = sid;
        this.pid = pid;
        this.tname = tname;
        this.startDate = startDate;
        this.endDate = endDate;
        this.weekdayStart = weekdayStart;
        this.weekdayEnd = weekdayEnd;
        this.weekendStart = weekendStart;
        this.weekendEnd = weekendEnd;
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

    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String sDate) {
        this.startDate = sDate;
    }

    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String eDate) {
        this.endDate = eDate;
    }

    public String getWeekdayStart() {
        return weekdayStart;
    }
    public void setWeekdayStart(String weekdayStart) {
        this.weekdayStart = weekdayStart;
    }

    public String getWeekdayEnd() {
        return weekdayEnd;
    }
    public void setWeekdayEnd(String weekdayEnd) {
        this.weekdayEnd = weekdayEnd;
    }

    public String getWeekendStart() {
        return weekendStart;
    }
    public void setWeekendStart(String weekendStart) {
        this.weekendStart = weekendStart;
    }

    public String getWeekendEnd() {
        return weekendEnd;
    }
    public void setWeekendEnd(String weekendEnd) {
        this.weekendEnd = weekendEnd;
    }
}
