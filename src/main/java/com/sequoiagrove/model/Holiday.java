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

    void setName(String name){
      this.name = name;
    }
    String getName(){
      return this.name;
    }

    void setDate(String date){
      this.date = date;
    }
    String getDate(){
      return this.date;
    }

    void setType(String type){
      this.type = type;
    }
    String getType(){
      return this.type;
    }
}
