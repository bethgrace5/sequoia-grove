package com.sequoiagrove.model;

import java.sql.Date;

public class Session {
  int id;
  String token;
  Date expiration;

  public Session(){}
  public Session(int id, String token, Date expiration){
    this.id = id;
    this.token = token;
    this.expiration = expiration;
  }

  public void setId(int id) {
    this.id = id;
  }
  public int getId() {
    return id;
  }

  public void setToken(String token) {
    this.token = token;
  }
  public String getToken() {
    return token;
  }

  public void setExpiration(Date expiration) {
    this.expiration = expiration;
  }
  public Date getExpiration() {
    return expiration;
  }
};
