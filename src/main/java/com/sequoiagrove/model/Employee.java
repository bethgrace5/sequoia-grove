package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.sequoiagrove.model.Position;

public class Employee extends User{
    int id;
    int maxHrsWeek;
    int isManager;
    String firstName;
    String lastName;
    String phone;
    Date birthDate;
    List<Date> datesEmployed = new ArrayList<Date>();
    List<Date> datesUnemployed = new ArrayList<Date>();
    List<Position> positions = new ArrayList<Position>();


    public Employee(){}
    public Employee(int id, String firstname/*, String lastname*/) {
        this.id = id;
        this.firstname = firstname;
        //this.lastname = lastname;
    }

//TODO implement the rest of toString
//loop through positions list of position objects
//@Override
    //public String toString() {
        //return "Employee [id=" + id + ", firstName=" + firstName
            //+ ", lastName=" + lastName + ", email=" + email + "]";
    //}

    public static HashMap<String, Boolean> availabilityToString(String availabilityString, int id){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    /*

    public int getMaxHoursPerWeek() {
        return maxHoursPerWeek;
    }

    public void setMaxHoursPerWeek(int maxHoursPerWeek) {
        this.maxHoursPerWeek = maxHoursPerWeek;
    }
    */

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    /*

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
    */
}
