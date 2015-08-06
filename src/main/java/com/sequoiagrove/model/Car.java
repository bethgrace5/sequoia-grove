package com.sequoiagrove.model;


public class Car {
    private String src;
    private String name;

    public Car(){} //Spring needs this constructor
    public Car(String src, String name) {
        this.src = src;
        this.name = name;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
