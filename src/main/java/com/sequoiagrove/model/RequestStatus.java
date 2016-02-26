package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class RequestStatus {
  int requestID;
  int employeeID;
  int approverID;
  String status;
  String startDate;
  String endDate;
  String employeeFirstName;
  String employeeLastName;
  String approverFirstName;
  String approverLastName;

  public RequestStatus(){}

  public RequestStatus(int requestID, int employeeID, int approverID,
      String status, String startDate, String endDate,
      String employeeFirstName, String employeeLastName,
      String approverFirstName, String approverLastName) {

    this.requestID = requestID;
    this.employeeID = employeeID;
    this.approverID = approverID;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.employeeFirstName = employeeFirstName;
    this.employeeLastName  = employeeLastName;
    this.approverFirstName = approverFirstName;
    this.approverLastName  = approverLastName;
  }

  public void setRequestID(int requestID){
    this.requestID = requestID;
  }
  public int getRequestID(){
    return requestID;
  }

  public void setEmployeeID(int employeeID) {
    this.employeeID = employeeID;
  }
  public int getEmployeeID() {
    return employeeID;
  }

  public void setApproverID(int approverID){
    this.approverID= approverID;
  }
  public int getApproverID(){
    return approverID;
  }

  public void setStatus(String status){
    this.status= status;
  }
  public String getStatus(){
    return status;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }
  public String getStartDate() {
    return this.startDate;
  }

  public void setEndDate(String startDate) {
    this.endDate = endDate;
  }
  public String getEndDate(){
    return this.endDate;
  }

  public void setEmployeeFirstName(String employeeFirstName){
    this.employeeFirstName =  employeeFirstName;
  }
  public String getEmployeeFirstName(){
    return this.employeeFirstName;
  }
  public void setEmployeeLastName(String employeeLastName){
    this.employeeLastName =  employeeLastName;
  }
  public String getEmployeeLastName(){
    return this.employeeLastName;
  }

  public void setApproverFirstName(String approverFirstName){
    this.approverFirstName = approverFirstName;
  }
  public String getApproverFirstName(){
    return this.approverFirstName;
  }
  public void setApproverLastName(String approverLastName){
    this.approverLastName = approverLastName;
  }
  public String getApproverLastName(){
    return this.approverLastName;
  }

}
