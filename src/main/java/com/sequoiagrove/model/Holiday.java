package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class Holiday {
    int id;
    int weekday;
    String title;
    String date;
    String storeOpen;
    String storeClose;

    public Holiday(){}
    public Holiday(int id, int weekday, String title, String date, String storeOpen, String storeClose) {
        this.id = id;
        this.weekday = weekday;
        this.title = title;
        this.date = date;
        this.storeOpen = storeOpen;
        this.storeClose = storeClose;
    }

    public void setId(int id){
      this.id = id;
    }
    public int getId(){
      return this.id;
    }

    public void setWeekday(int weekday){
      this.weekday = weekday;
    }
    public int getWeekday(){
      return this.weekday;
    }

    public void setTitle(String title){
      this.title = title;
    }
    public String getTitle(){
      return this.title;
    }

    public void setDate(String date){
      this.date = date;
    }
    public String getDate(){
      return this.date;
    }

    public void setStoreOpen(String storeOpen){
      this.storeOpen = storeOpen;
    }
    public String getStoreOpen(){
      return this.storeOpen;
    }
    public void setStoreClose(String storeClose){
      this.title = storeClose;
    }
    public String getStoreClose(){
      return this.storeClose;
    }
  }
