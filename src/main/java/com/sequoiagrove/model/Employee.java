package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.sequoiagrove.model.Position;
import com.sequoiagrove.model.Availability;
import com.sequoiagrove.model.WeeklyAvail;
import com.sequoiagrove.model.EmpHistory;

public class Employee {
    int id;
    int maxHrsWeek;
    int isManager;
    int clock;
    String firstName;
    String lastName;
    String email;
    String phone;
    Date birthDate;
    List<EmpHistory> history = new ArrayList<EmpHistory>();
    List<Position> positions = new ArrayList<Position>();
    WeeklyAvail avail = new WeeklyAvail();


    public Employee(){}
    public Employee(
      int id,
      int maxHrsWeek,
      int isManager,
      int clock,
      String firstName,
      String lastName,
      String phone,
      String email,
      Date birthDate,
      List<EmpHistory> history,
      List<Position> positions,
      WeeklyAvail avail
    ) {
        this.id = id;
        this.maxHrsWeek = maxHrsWeek;
        this.isManager = isManager;
        this.clock = clock;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
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

    public int getIsManager() {
        return isManager;
    }
    public void setIsManager(int isManager) {
        this.isManager = isManager;
    }

    public int getClock() {
        return clock;
    }
    public void setClock(int clock) {
        this.clock = clock;
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

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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

    public List<Position> getPositions() {
        return positions;
    }
    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public WeeklyAvail getAvail() {
        return avail;
    }
    public void setAvail(WeeklyAvail avail) {
        this.avail = avail;
    }
}
