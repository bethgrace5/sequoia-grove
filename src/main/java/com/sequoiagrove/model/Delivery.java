
package com.sequoiagrove.model;
import java.util.ArrayList;
import java.util.List;

public class Delivery {
    int id;
    String company; 
    ArrayList<String> days;

    public Delivery(){}
    public Delivery(int id, String company) {
        this.id = id;
        this.company = company;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public ArrayList<String> getDays() {
        return days;
    }

    public void addDay(String day) {
        days.add(day);
    }

    public void removeDay(String day) {
        days.remove(day);
    }
}
