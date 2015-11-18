
package com.sequoiagrove.model;

public class EmployeeSimple{
    int id;
    int pid;
    String name;
    String title;

    public EmployeeSimple(){}
    public EmployeeSimple(int id, int pid, String name, String title) {
        this.id = id;
        this.pid = pid;
        this.name = name;
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
