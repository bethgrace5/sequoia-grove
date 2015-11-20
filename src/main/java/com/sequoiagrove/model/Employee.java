package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.sequoiagrove.model.Position;
import com.sequoiagrove.model.Availability;
import com.sequoiagrove.model.EmpHistory;

public class Employee {
    int id;
    int maxHrsWeek;
    int isManager;
    String firstName;
    String lastName;
    String phone;
    Date birthDate;
    List<EmpHistory> history = new ArrayList<EmpHistory>();
    List<Position> positions = new ArrayList<Position>();
    List<Availability> avail = new ArrayList<Availability>();


    public Employee(){}
    public Employee(
      int id,
      int maxHrsWeek,
      int isManager,
      String firstName,
      String lastName,
      String phone,
      Date birthDate,
      List<EmpHistory> history,
      List<Position> positions,
      List<Availability> avail
    ) {
        this.id = id;
        this.maxHrsWeek = maxHrsWeek;
        this.isManager = isManager;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthDate = birthDate;
        this.history = history;
        this.positions = positions;
        this.avail = avail;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMaxHrsWeek() {
        return maxHrsWeek;
    }

    public void setMaxHrsWeek(int maxHrsWeek) {
        this.maxHrsWeek =maxHrsWeek;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastname) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
    public List<EmpHistory> getHistory() {
        return history;
    }

    public void setHistory(List<EmpHistory> history) {
        this.history = history;
    }

    public List<Availability> getAvail() {
        return avail;
    }

    public void setAvail(List<Availability> avail) {
        this.avail = avail;
    }
    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }
}
