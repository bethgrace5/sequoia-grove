package com.sequoiagrove.model;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// simple list to create objects to insert into is_scheduled_for

public class Schedule {
    boolean published;
    int locationId;
    String startDate;
    ArrayList<ScheduleRow> rows = new ArrayList<ScheduleRow>();

    public Schedule(){}
    public Schedule(boolean published, int locationId, String startDate, ArrayList<ScheduleRow> rows) {
        this.published = published;
        this.locationId = locationId;
        this.startDate = startDate;
        this.rows = rows;
    }

    public boolean getPublished() {
      return published;
    }
    public void setPublished(boolean published) {
      this.published = published;
    }

    public ArrayList<ScheduleRow> getRows() {
      return rows;
    }
    public void setRows(ArrayList<ScheduleRow> rows) {
      this.rows = rows;
    }

    public int getLocationId() {
        return locationId;
    }
    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }


}
