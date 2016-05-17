//Generator
//  Info:
//
//-------------------
//Directory
//-------------------
//  Variables_Hold
//  Building
//  Database_Gathering
//  Triming
//  Soon_to_be_Organized
//  Testing
//-------------------
//
package com.sequoiagrove.model;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.sequoiagrove.controller.MainController;
import com.sequoiagrove.model.User;
import com.sequoiagrove.model.UserRowMapper;
import com.sequoiagrove.model.Request;
import com.sequoiagrove.model.Shift;

public class Generator{
  //-------------------------
  //  Variables_Hold
  //-------------------------
  HashMap
    <String, HashMap<Integer, HashMap<Integer, Integer> > > generator;
    //[Day [ Shift [Employee, number of weeks scheduled] ] ]

  String startDate;
  String endDate;
  List<DayShiftEmployee> dayShiftEmployeeList;
  List<Shift> shifts;
  Request requests[];

  //-----------------------------------
  //  Building
  //-----------------------------------
  public Generator(){
    generator = new HashMap
      <String, HashMap<Integer, HashMap<Integer, Integer> > >();
  }

  public void addDay(String day){
    if(generator.containsKey(day)) return;
    generator.put(day, new HashMap<Integer, HashMap<Integer, Integer>>());
  }

  public void addShift(String day, Integer shift){
    if(!generator.containsKey(day)) return;
    if(generator.get(day).containsKey(shift)) return;
    generator.get(day).put(shift, new HashMap<Integer, Integer>());
  }

  public void addEmployee(String  day,
                          Integer shift,
                          Integer employee,
                          Integer amount){

    if(!generator.containsKey(day)) return;
    if(!generator.get(day).containsKey(shift)) return;
    if(generator.get(day).get(shift).containsKey(employee)) return;
    generator.get(day).get(shift).put(employee, amount);
  }

  public void add(String  day,
                          Integer shift,
                          Integer employee,
                          Integer amount){
    //This Is Diffrent from addEmployee, as it calls all other 3
    //function to build while making sure keys exists for eachother
    addDay(day);
    addShift(day, shift);
    addEmployee(day, shift, employee,  amount);

  }

  //----------------------------------
  //  Database_Gathering
  //---------------------------------
  public void getPastInformation(String startDate, String endDate){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      dayShiftEmployeeList = jdbcTemplate.query(
        " select day, shift_id, user_id, count(*) AS worked" +
        " from sequ_employee_shift_view " +
        " where on_date >= '2016-03-21' AND on_date <= '2016-04-15' " +
        " group by day, shift_id, user_id " +
        " order by day, shift_id, user_id ",
          new RowMapper<DayShiftEmployee>() {
            public DayShiftEmployee mapRow(ResultSet rs, int rowNum) throws SQLException {
              DayShiftEmployee es = new DayShiftEmployee(
                rs.getInt("day"),
                rs.getInt("shift_id"),
                rs.getInt("user_id"),
                rs.getInt("worked")
              );
              return es;
            }
      });
      for (int i = 0; i < dayShiftEmployeeList.size(); i++) {
        add(convertDay(dayShiftEmployeeList.get(i).getDay()),
                      dayShiftEmployeeList.get(i).getShift(),
                      dayShiftEmployeeList.get(i).getEmployee(),
                      dayShiftEmployeeList.get(i).getWorked() );
      }
      printFormation();
  }

  public void getEmployeeInformation(String startDate, String endDate){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      String queryStr = "select * from sequ_user_info_view";
      List<User> empList = jdbcTemplate.query( queryStr, new UserRowMapper());
  }

  public void getShiftInformation(String mon) {
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

  }

  public String convertDay(Integer value){
    if(value == 1) return "mon";
    if(value == 2) return "tue";
    if(value == 3) return "wen";
    if(value == 4) return "thu";
    if(value == 5) return "fri";
    if(value == 6) return "sat";
    if(value == 7) return "sun";
    return "---";
  }

 //----------------------------------
 //  Triming
 //---------------------------------
 public void trimByListRestriction(){
 }

 public void trimByRestriction(String person1, String person2){
 }

 public void trimByUnavaliablity(String person1, String date){
 }
 public void trimByRequest(){
  //TODO: Somehow get A Request List and compare to the employees and 
  //      in the week.
 }
 public void removeEmployee(Integer day, Integer shift, Integer employee){
   generator.get(day).get(shift).remove(employee);
 }

 //----------------------------------
 //Soon_to_be_Organized
 //----------------------------------
 // use this as a temporary way place to add function
 //
 public boolean checkEmployeeIf(
                             String  day,
                             Integer shift, 
                             Integer employee1,
                             Integer employee2){
   if(generator.get(day).get(shift).containsKey(employee1) &&
      generator.get(day).get(shift).containsKey(employee2)){

        return true;
      }
   return false;
 }

  //----------------------------------
  // Testing
  //----------------------------------
  //  Used Primarily to Test The Class
  public void printAllDays(){
    for (String key : generator.keySet()) {
      System.out.println(key + " ");
    }
  }

  public void printAllShiftsInDay(String day){
    for (Integer key : generator.get(day).keySet()) {
      System.out.println(key + " ");
    }
  }

 public void printAllEmployeesInShift(String day, Integer shift){
    for (Integer key : generator.get(day).get(shift).keySet()){
      System.out.println(key + " " +
        generator.get(day).get(shift).get(key));
    }
 }

 public void printFormation(){
   for (String dayKey : generator.keySet()) {
     System.out.println(dayKey);

     for (Integer shiftKey : generator.get(dayKey).keySet()) {
       System.out.println("   " + shiftKey);

       for (Integer empKey : generator.get(dayKey).get(shiftKey).keySet()){
         System.out.println("      " + empKey + " " +
             generator.get(dayKey).get(shiftKey).get(empKey));
       }
     }
   }
 }

}
