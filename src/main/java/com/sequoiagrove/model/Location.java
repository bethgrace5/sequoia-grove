package com.sequoiagrove.model;
import java.sql.Date;

public class Location extends Business {

  public Location(){}

  public Location(int id, int addrNumber, String title, String addrStreet,
      String addrCity, String addrState, String phone, Date signupDate,
      Date activeUntil) {
    super(id, addrNumber, title, addrStreet, addrCity, addrState, phone,
        signupDate, activeUntil);
  }

  public Location(int id, String title, Date activeUntil){
    super (id, title, activeUntil);
  }

};
