
package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import com.sequoiagrove.model.Position;

public class Employee extends User{
    int id;
    int maxHoursPerWeek;
    String firstname;
    String lastname;
    String primaryPhone;
    String secondaryPhone;
    Date dateEmployed;
    Date dateUnemployed;;
    Date birthday;

    List<Position> positions = new ArrayList<Position>();

    public Employee(){}
    public Employee(int id, String firstname, String lastname) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

//TODO implement the rest of toString
//loop through positions list of position objects
//@Override
    //public String toString() {
        //return "Employee [id=" + id + ", firstName=" + firstName
            //+ ", lastName=" + lastName + ", email=" + email + "]";
    //}



    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public void addPosition(Position position) {
        this.positions.add(position);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMaxHoursPerWeek() {
        return maxHoursPerWeek;
    }

    public void setMaxHoursPerWeek(int maxHoursPerWeek) {
        this.maxHoursPerWeek = maxHoursPerWeek;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPrimaryPhone() {
        return primaryPhone;
    }

    public void setPrimaryPhone(String primaryPhone) {
        this.primaryPhone = primaryPhone;
    }

    public String getSecondaryPhone() {
        return secondaryPhone;
    }

    public void setSecondaryPhone(String secondaryPhone) {
        this.secondaryPhone = secondaryPhone;
    }

    public Date getDateEmployed() {
        return dateEmployed;
    }

    public void setDateEmployed(Date dateEmployed) {
        this.dateEmployed = dateEmployed;
    }

    public Date getDateUnemployed() {
        return dateUnemployed;
    }

    public void setDateUnemployed(Date dateUnemployed) {
        this.dateUnemployed = dateUnemployed;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
