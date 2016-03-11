package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Holiday {
    String name;
    String date;
    String type;

    public Holiday(){}
    public Holiday(String name, String date, String type) {
        this.name = name;
        this.date = date;
        this.type = type;
    }

    public void setName(String name){
      this.name = name;
    }
    public String getName(){
      return this.name;
    }

    public void setDate(String date){
      this.date = date;
    }
    public String getDate(){
      return this.date;
    }

    public void setType(String type){
      this.type = type;
    }
    public String getType(){
      return this.type;
    }
}
