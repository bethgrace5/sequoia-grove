
package com.sequoiagrove.model;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class Delivery {
    int id;
    String title; 
    Map<String, Boolean> days = new HashMap<String, Boolean>();

    public Delivery(){}
    public Delivery(int id, String title, String days) {
        this.id = id;
        this.title = title;
        this.days = daysToString(days);
    }

@Override
    public String toString() {
        return "Delivery [id=" + id + ", title=" + title + "days=" + days + "]";
    }

    public static Map<String, Boolean> daysToString(String daysString) {

        Map<String, Boolean> daysMap = new HashMap<String, Boolean>();
        daysMap.put("monday",    ((daysString.charAt(0) == '1')? true: false));
        daysMap.put("tuesday",   ((daysString.charAt(1) == '1')? true: false));
        daysMap.put("wednesday", ((daysString.charAt(2) == '1')? true: false));
        daysMap.put("thursday",  ((daysString.charAt(3) == '1')? true: false));
        daysMap.put("friday",    ((daysString.charAt(4) == '1')? true: false));
        daysMap.put("saturday",  ((daysString.charAt(5) == '1')? true: false));
        daysMap.put("sunday",    ((daysString.charAt(6) == '1')? true: false));

        return daysMap;
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

    public Map<String, Boolean> getDays() {
        return days;
    }

    public void setDays(Map<String, Boolean> days) {
        this.days = days;
    }
}
