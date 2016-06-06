package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Shift {
    int sid;
    int pid;
    String tname;
    Duration active;
    Duration weekday;
    Duration weekend;

    public Shift(){
        this.active = new Duration();
        this.weekday = new Duration();
        this.weekend = new Duration(); 
    }

    public Shift(
      int sid, int pid, String tname,
      String startDate, String endDate,
      String weekdayStart, String weekdayEnd, 
      String weekendStart, String weekendEnd) {
        this.sid = sid;
        this.pid = pid;
        this.tname = tname;
        this.active = new Duration();
        this.weekday = new Duration();
        this.weekend = new Duration();
        this.active.setStartDate(startDate);
        this.active.setEndDate(endDate);
        this.weekday.setStartNum(weekdayStart);
        this.weekday.setEndNum(weekdayEnd);
        this.weekend.setStartNum(weekendStart);
        this.weekend.setEndNum(weekendEnd);
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
    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getTname() {
        return tname;
    }
    public void setTname(String tname) {
        this.tname = tname;
    }

    public int getWeekdayStart() {
        return weekday.getStartNum();
    }
    public void setWeekdayStart(String weekdayStart) {
        this.weekday.setStartNum(weekdayStart);
    }
    public void setWeekdayStart(int weekdayStart) {
        this.weekday.setStartNum(weekdayStart);
    }

    public int getWeekdayEnd() {
        return weekday.getEndNum();
    }
    public void setWeekdayEnd(String weekdayEnd) {
        this.weekday.setEndNum(weekdayEnd);
    }
    public void setWeekdayEnd(int weekdayEnd) {
        this.weekday.setEndNum(weekdayEnd);
    }

    public int getWeekendStart() {
        return weekend.getStartNum();
    }
    public void setWeekendStart(String weekendStart) {
        this.weekend.setStartNum(weekendStart);
    }
    public void setWeekendStart(int weekendStart) {
        this.weekend.setStartNum(weekendStart);
    }

    public int getWeekendEnd() {
        return weekend.getEndNum();
    }
    public void setWeekendEnd(String weekendEnd) {
        this.weekend.setEndNum(weekendEnd);
    }
    public void setWeekendEnd(int weekendEnd) {
        this.weekend.setEndNum(weekendEnd);
    }

    public Duration getActive() {
        return this.active;
    }
    public void setActive(Duration active) {
        this.active = active;
    }
}
