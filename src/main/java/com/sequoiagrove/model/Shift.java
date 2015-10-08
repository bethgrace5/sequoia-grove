
package com.sequoiagrove.model;
import java.sql.Time;

public class Shift {
    int id;
    int positionId;
    String title; 
    Time weekdayStart;
    Time weekdayEnd;
    Time weekendStart;
    Time weekendEnd;

    public Shift(){}
    public Shift(int id, String title, int positionId, Time weekdayStart, Time weekdayEnd, Time weekendStart, Time weekendEnd) {
        this.weekdayStart = weekdayStart;
        this.weekdayEnd = weekdayEnd;
        this.weekendStart = weekendStart;
        this.weekendEnd = weekendEnd;
        this.id = id;
        this.positionId = positionId;
        this.title = title;
    }

@Override
    public String toString() {
        return "Shift [id=" + id + ", title=" + title + ", weekdayStart=" + 
            weekdayStart + ", weekdayEnd=" + weekendStart + ", weekendEnd=" + 
            weekendEnd + "]";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPositionId() {
        return positionId;
    }

    public void setPositionId(int id) {
        this.positionId = positionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Time getWeekdayStart() {
        return weekdayStart;
    }

    public void setWeekdayStart(Time weekdayStart) {
        this.weekdayStart = weekdayStart;
    }

    public Time getWeekdayEnd() {
        return weekdayEnd;
    }

    public void setWeekdayEnd(Time weekdayEnd) {
        this.weekdayEnd = weekdayEnd;
    }

    public Time getWeekendStart() {
        return weekendStart;
    }

    public void setWeekendStart(Time weekendStart) {
        this.weekendStart = weekendStart;
    }

    public Time getWeekendEnd() {
        return weekendEnd;
    }

    public void setWeekendEnd(Time weekendEnd) {
        this.weekendEnd = weekendEnd;
    }
}
