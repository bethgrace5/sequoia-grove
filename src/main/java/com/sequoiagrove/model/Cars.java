package com.sequoiagrove.model;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class Cars {

    private List<Car> carList;

    public Cars(){} //Spring needs this constructor
    public Cars(List<Car> carList) {
        this.carList = carList;
    }

    @Override
        public String toString() {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(this);
        }

    public Cars getSubList(int first, int last){
        List<Car> carAux = new ArrayList<Car>();

        for(int i=first; i < last; i++)
            carAux.add(new Car(this.carList.get(i).getSrc(), this.carList.get(i).getName()));

        return new Cars(carAux);
    }

    public List<Car> getCarList() {
        return carList;
    }

    public void setCarList(List<Car> carList) {
        this.carList = carList;
    }
}
