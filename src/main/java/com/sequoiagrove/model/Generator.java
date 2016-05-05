package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Request;

import java.util.*;

public class Generator{
  HashMap
    <String, HashMap<Integer, HashMap<Integer, Integer> > > generator;
    //[Day [ Shift [Employee, number of weeks scheduled] ] ]

  String startDate;
  String endDate;
  Employee employees[];
  Request requests[];
  //Or
  //String date[7]

  public Generator(){
    generator = new HashMap
      <String, HashMap<Integer, HashMap<Integer, Integer> > >();
  }

  public void insert(String  day,
                     Integer shift,
                     Integer employee,
                     Integer amount){

    addDay(day);
    addShift(day, shift);
    addEmployee(day, shift, employee, amount);
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
    addDay(day);
    addShift(day, shift);
    addEmployee(day, shift, employee,  amount);

  } 


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
}
