package com.sequoiagrove.dao;

import java.util.ArrayList;
import java.util.List;

import com.sequoiagrove.model.Delivery;

public class DeliveryDAO {

    public static ArrayList<Delivery> getDelivery() {

        ArrayList<Delivery> deliveries = new ArrayList<Delivery>();

        Delivery delivery1 = new Delivery(1, "Alpha", "1111110");
        Delivery delivery2 = new Delivery(2, "Pepsi", "1000000");
        Delivery delivery3 = new Delivery(3, "Sysco", "0101010");

        deliveries.add(delivery1);
        deliveries.add(delivery2);
        deliveries.add(delivery3);

        return deliveries;
    }

}
