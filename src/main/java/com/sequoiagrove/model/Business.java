package com.sequoiagrove.model;

import java.sql.Date;
import com.sequoiagrove.model.Location;
import java.util.ArrayList;
import java.util.List;

public class Business extends Location {
    List<Location> locations = new ArrayList<Location>();

    public Business(){}
    public Business(int id, int addrNumber, String title, String addrStreet, String addrCity, 
        String addrState, String phone, Date signupDate, Date activeUntil, List<Location> locations) {
        super(id, addrNumber, title, addrStreet, addrCity, addrState, phone, signupDate, activeUntil);
        this.locations = locations;
    }

    public List<Location> getLocations() {
        return locations;
    }
    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

};
