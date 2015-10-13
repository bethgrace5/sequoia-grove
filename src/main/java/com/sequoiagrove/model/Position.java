
package com.sequoiagrove.model;

public class Position {
    int id;
    String title; 

@Override
    public String toString() {
        return "Position [id=" + id + ", title=" + title + "]";
    }

    public Position(){}
    public Position(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
