package com.sequoiagrove.model;

import java.io.Serializable;

public class EmployeeVO implements Serializable
{
    private static final long serialVersionUID = 1L;

        private Integer id;
        private String firstName;
        private String lastName;
        private String email;

    public EmployeeVO(Integer id, String firstName, String lastName, String email) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public EmployeeVO(){

    }


@Override
    public String toString() {
        return "EmployeeVO [id=" + id + ", firstName=" + firstName
            + ", lastName=" + lastName + ", email=" + email + "]";
    }

    //Setters and Getters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getFirstname() {
        return firstName;
    }

    public void setFirstname(String firstName) {
        this.firstName = firstName;
    }
    public String getLastname() {
        return lastName;
    }

    public void setLastname(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
