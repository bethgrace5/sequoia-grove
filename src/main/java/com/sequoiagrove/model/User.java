
package com.sequoiagrove.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class User {
    int id;
    String username;
    String password;

    public User(){}
    public User(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
