package com.sequoiagrove.model;

public class PublishedSchedule{
    int publishedBy;
    int locationId;
    String startDate;
    String datePublished;

    public PublishedSchedule(){}
    public PublishedSchedule(int publishedBy, int locationId, String startDate, String datePublished) {
        this.publishedBy = publishedBy;
        this.locationId = locationId;
        this.startDate = startDate;
        this.datePublished = datePublished;
    }

    public int getPublishedBy() {
        return publishedBy;
    }
    public void setPublishedBy(int publishedBy) {
        this.publishedBy = publishedBy;
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

    public String getDatePublished() {
        return startDate;
    }
    public void setDatePublished(String datePublished) {
        this.datePublished = datePublished;
    }

}
