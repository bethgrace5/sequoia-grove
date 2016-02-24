package com.sequoiagrove.model;


public class PublishSchedule{
    int eid;
    String date;

    public PublishSchedule(){}
    public PublishSchedule(int eid, String date) {
        this.eid = eid;
        this.date = date;
    }


    public int getEid() {
        return eid;
    }

    public void setEid(int eid) {
        this.eid = eid;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
