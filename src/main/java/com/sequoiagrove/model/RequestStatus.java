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

    public RequestStatus(){}
    public RequestStatus(int requestID, int employeeID, int approverID,
        String status, String startDate, String endDate) {

      this.requestID = requestID;
      this.employeeID = employeeID;
      this.approverID = approverID;
      this.status = status;
      this.startDate = startDate;
      this.endDate = endDate;
    }

    public void setRequestID(int requestID){
      this.requestID = requestID;
    }
    public int getRequestID(int id){
      return requestID;
    }

    public void setEmployeeID(int requestID) {
        this.employeeID = employeeID;
    }
    public int getEmployeeID() {
        return employeeID;
    }

    public void setApproverID(int requestID){
      this.requestID = requestID;
    }
    public int getApproverID(){
      return requestID;
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
}
