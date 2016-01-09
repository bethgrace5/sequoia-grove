
package com.sequoiagrove.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class User {
    int id;
    String fullname;
    String firstname;
    String lastname;
    String email;
    boolean isManager;

    public User(){}
    public User(int id, String fullname, String firstname, String lastname, String email, boolean isManager) {
        this.id = id;
        this.fullname = fullname;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.isManager = isManager;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
      this.fullname = fullname;
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

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
      this.email = email;
    }

    public void setIsManager(boolean isManager) {
        this.isManager = isManager;
    }
    public boolean getIsManager() {
        return isManager;
    }
}
