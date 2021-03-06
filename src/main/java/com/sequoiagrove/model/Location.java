package com.sequoiagrove.model;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class Location {
    int id;
    int addrNumber;
    String title;
    String addrStreet;
    String addrCity;
    String addrState;
    String phone;
    Date signupDate;
    Date activeUntil;

    public Location(){}
    public Location(int id, int addrNumber, String title, String addrStreet, String addrCity,
        String addrState, String phone, Date signupDate, Date activeUntil){
      this.id = id;
      this.addrNumber = addrNumber;
      this.title = title;
      this.addrStreet = addrStreet;
      this.addrCity = addrCity;
      this.addrState = addrState;
      this.phone = phone;
      this.signupDate = signupDate;
      this.activeUntil = activeUntil;
    }

    public void setId(int id) {
      this.id = id;
    }
    public int getId() {
      return id;
    }

    public void setAddrNumber(int addrNumber) {
      this.addrNumber = addrNumber;
    }
    public int getAddrNumber() {
      return addrNumber;
    }

    public void setTitle(String title) {
      this.title = title;
    }
    public String getTitle() {
      return title;
    }

    public void setAddrStreet(String addrStreet) {
      this.addrStreet = addrStreet;
    }
    public String getAddrStreet() {
      return addrStreet;
    }

    public void setAddrCity(String addrCity) {
      this.addrCity = addrCity;
    }
    public String getAddrCity() {
      return addrCity;
    }

    public void setAddrState(String addrState) {
      this.addrState = addrState;
    }
    public String getAddrState() {
      return addrState;
    }

    public void setPhone(String phone) {
      this.phone = phone;
    }
    public String getPhone() {
      return phone;
    }

    public void setSignupDate(Date signupDate) {
      this.signupDate = signupDate;
    }
    public Date getSignupDate() {
      return signupDate;
    }

    public void setActiveUntil(Date activeUntil) {
      this.activeUntil = activeUntil;
    }
    public Date getActiveUntil() {
      return activeUntil;
    }
};
