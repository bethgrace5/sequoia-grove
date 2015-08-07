
package com.sequoiagrove.model;
import java.util.Date;

public class Shift {
    int id;
    String title; 
    Date weekdayStart;
    Date weekdayEnd;
    Date weekendStart;
    Date weekendEnd;

    public Shift(){}
    public Shift(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getWeekdayStart() {
        return weekdayStart;
    }

    public void setWeekdayStart(Date weekdayStart) {
        this.weekdayStart = weekdayStart;
    }

    public Date getWeekdayEnd() {
        return weekdayEnd;
    }

    public void setWeekdayEnd(Date weekdayEnd) {
        this.weekdayEnd = weekdayEnd;
    }

    public Date getWeekendStart() {
        return weekendStart;
    }

    public void setWeekendStart(Date weekendStart) {
        this.weekendStart = weekendStart;
    }

    public Date getWeekendEnd() {
        return weekendEnd;
    }

    public void setWeekendEnd(Date weekendEnd) {
        this.weekendEnd = weekendEnd;
    }
}
