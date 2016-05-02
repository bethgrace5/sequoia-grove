package com.sequoiagrove.model;
import java.sql.Date;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

public class Generator{
  HashMap
    <Integer, HashMap<Integer, HashMap<Integer, Integer> > > generator;
    //[Day [ Shift [Employee, amount of time work] ] ]

  String startDate;
  String endDate;
  //Or
  //String date[7]

  public Generator(){
    generator = new HashMap
      <Integer, HashMap<Integer, HashMap<Integer, Integer> > >();
  }
  public void insert(Integer day,
                     Integer shift,
                     Integer employee,
                     Integer amount){

    addDay(day);
    addShift(day, shift);
    addEmployee(day, shift, employee, amount);
  }

  public void addDay(Integer day){
    if(generator.containsKey(day)) return;
    generator.put(day, new HashMap<Integer, HashMap<Integer, Integer>>());
  }

  public void addShift(Integer day, Integer shift){
    if(!generator.containsKey(day)) return;
    if(generator.get(day).containsKey(shift)) return;
    generator.get(day).put(shift, new HashMap<Integer, Integer>());
  }

  public void addEmployee(Integer day,
                          Integer shift,
                          Integer employee,
                          Integer amount){

  if(!generator.containsKey(day)) return;
  if(!generator.get(day).containsKey(shift)) return;
  if(generator.get(day).get(shift).containsKey(employee)) return;

    generator.get(day).get(shift).put(employee, amount);
  }

  public void printAllDays(){
    for (Integer key : generator.keySet()) {
      System.out.println(key + " ");
    }
  }

  public void printAllShiftInADay(String day){
    for (Integer key : generator.get(day).keySet()) {
      System.out.println(key + " ");
    }
  }

 public void printAllEmployeeInAShift(String day, String shift){
    for (Integer key : generator.get(day).get(shift).keySet()){
      System.out.println(key + " " +
          generator.get(day).get(shift).get(key));
    }
 }
 public void printFormation(){
   for (Integer key1 : generator.keySet()) {
     System.out.println(key1 + " ");

     for (Integer key2 : generator.get(key1).keySet()) {
       System.out.println("\t"+ key2 + " ");

       for (Integer key3 : generator.get(key1).get(key2).keySet()){
         System.out.println("\t\t" + key3 + " " +
             generator.get(key1).get(key2).get(key3));
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
 public void removeEmployee(Integer day, Integer shift, Integer employee){
   generator.get(day).get(shift).remove(employee);
 }
 public boolean checkEmployeeIf(
                             Integer day,
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
