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
import com.sequoiagrove.model.ShiftRowMapper;

public class Generator{
  //-------------------------
  //  Variables_Hold
  //-------------------------
  HashMap
    <String, HashMap <Integer, HashMap <Integer, Integer>>> generator;
  //[Day [ Shift [Employee, number of weeks scheduled] ] ]
  //

  String startDate;
  String endDate;
  List<DayShiftEmployee> dayShiftEmployeeList;
  List<User> employeeList;
  List<Shift> shifts;
  Request requests[];

  //-----------------------------------
  //  Constructors
  //-----------------------------------
  public Generator(){
    generator = new HashMap
      <String, HashMap <Integer, HashMap <Integer, Integer>>>();
    startDate = "dog";
    endDate = "cat";
  }

  public Generator(
    HashMap
      <String, HashMap <Integer, HashMap <Integer, Integer>>> generator,
    String startDate,
    String endDate,
    List<DayShiftEmployee> dayShiftEmployeeList,
    List<User> employeeList,
    List<Shift> shifts,
    Request requests[]
  ) {
    this.generator = generator;
    this.startDate = startDate;
    this.endDate = endDate;
    this.dayShiftEmployeeList = dayShiftEmployeeList;
    this.employeeList = employeeList;
    this.shifts = shifts;
    this.requests = requests;
  }

  public Generator(
    final String mon, final String historyStart, final String historyEnd
  ) {
    generator = new HashMap
      <String, HashMap <Integer, HashMap <Integer, Integer>>>();
    setDayShiftEmployeeList(getPastInformation(historyStart, historyEnd)); // !!! THROWS EXCEPTION !!!
    fillGenerator();
    setEmployeeList(getEmployeeInformation());
    printEmployeeList();
    setShifts(getShiftInformation(mon));
    // still need to get requests
    startDate = mon;
    //endDate = historyEnd; // ?? not sure if needed ??
  }

  //-----------------------------------
  //  Getters & Setters
  //-----------------------------------
  public void setGenerator(HashMap
    <String, HashMap <Integer, HashMap <Integer, Integer>>> generator)
  {
    this.generator = generator;
  }
  public HashMap getGenerator() {
    return generator;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }
  public String getStartDate() {
    return startDate;
  }

  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
  public String getEndDate() {
    return endDate;
  }

  public void setDayShiftEmployeeList(List<DayShiftEmployee> dayShiftEmployeeList) {
    this.dayShiftEmployeeList = dayShiftEmployeeList;
  }
  public List<DayShiftEmployee> getDayShiftEmployeeList() {
    return dayShiftEmployeeList;
  }

  public void setEmployeeList(List<User> employeeList) {
    this.employeeList = employeeList;
  }
  public List<User> getEmployeeList() {
    return employeeList;
  }

  public void setShifts(List<Shift> shifts) {
    this.shifts = shifts;
  }
  public List<Shift> getShifts() {
    return shifts;
  }

  public void setRequests(Request requests[]) {
    this.requests = requests;
  }
  public Request[] getRequests() {
    return requests;
  }

  //-----------------------------------
  //  Building HashMap
  //-----------------------------------
  public void addDay(String day) {
    if(generator.containsKey(day)) return;
    generator.put(day, new HashMap<Integer, HashMap<Integer, Integer>>());
  }

  public void addShift(String day, Integer shift) {
    if(!generator.containsKey(day)) return;
    if(generator.get(day).containsKey(shift)) return;
    generator.get(day).put(shift, new HashMap<Integer, Integer>());
  }

  public void addEmployee(
      String  day,
      Integer shift,
      Integer employee,
      Integer amount
  ) {
    if(!generator.containsKey(day)) return;
    if(!generator.get(day).containsKey(shift)) return;
    if(generator.get(day).get(shift).containsKey(employee)) return;
    generator.get(day).get(shift).put(employee, amount);
  }

  public void add(
      String  day,
      Integer shift,
      Integer employee,
      Integer amount
  ) {
    //This Is Diffrent from addEmployee, as it calls all other 3
    //function to build while making sure keys exists for eachother
    addDay(day);
    addShift(day, shift);
    addEmployee(day, shift, employee,  amount);
  }

  public void fillGenerator() {
    for (DayShiftEmployee cur : dayShiftEmployeeList) {
      add(convertDay(cur.getDay()),
          cur.getShift(),
          cur.getEmployee(),
          cur.getWorked() );
    }
    //printFormation();
  }

  //----------------------------------
  //  Database_Gathering
  //---------------------------------
  public List<DayShiftEmployee> getPastInformation(String startDate, String endDate) {
    JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
    List<DayShiftEmployee> temp = jdbcTemplate.query(
      " select day, shift_id, user_id, count(*) AS worked" +
      " from sequ_employee_shift_view" +
      " where on_date >= to_date(?, 'dd-mm-yyyy')" +
      " AND on_date <= to_date(?, 'dd-mm-yyyy')" +
      " group by day, shift_id, user_id" +
      " order by day, shift_id, user_id",
      new Object[]{startDate, endDate},
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
      }
    );
    return temp;
  }

  public List<User> getEmployeeInformation(){
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      String queryStr = "select * from sequ_user_info_view";
      List<User> empList = jdbcTemplate.query( queryStr, new SuperUserRowMapper());
      return empList;
  }

  public List<Shift> getShiftInformation(String mon) {
      JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
      String queryStr = "select * from sequ_get_current_shifts(?)";
      List<Shift> shiftList = jdbcTemplate.query(
        queryStr,
        new Object[]{mon},
        new ShiftRowMapper());
      return shiftList;
  }

  public void getRequest(String startDate, String endDate){
    JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
    List<RequestStatus> requestList = jdbcTemplate.query(
        "select * from request_view " +
        " where start_date_time <= to_date(?, 'mm-dd-yyyy' AND" +
        "       end_date_time >= to_date(?, 'mm-dd-yyyy') ",
        new RowMapper<RequestStatus>() {
          public RequestStatus  mapRow(ResultSet rs, int rowNum) throws SQLException {
            RequestStatus es = new RequestStatus(
              rs.getInt("rid"),
              rs.getInt("requested_by"),
              rs.getInt("responded_by"),
              checkStatus(rs.getInt("responded_by"), rs.getBoolean("is_approved")),
              rs.getString("start_date_time"),
              rs.getString("end_date_time"),
              rs.getString("requester_first_name"),
              rs.getString("requester_last_name"),
              rs.getString("responder_first_name"),
              rs.getString("responder_last_name")
              );
            return es;
          }
        }, startDate, endDate);
  }

  public List<RequestStatus> getRequestObject(String startDate, String endDate){
    JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
    List<RequestStatus> requestList = jdbcTemplate.query(
        "select * from request_view " +
        " where start_date_time <= to_date(?, 'mm-dd-yyyy' AND" +
        "       end_date_time >= to_date(?, 'mm-dd-yyyy') ",
        new RowMapper<RequestStatus>() {
          public RequestStatus  mapRow(ResultSet rs, int rowNum) throws SQLException {
            RequestStatus es = new RequestStatus(
              rs.getInt("rid"),
              rs.getInt("requested_by"),
              rs.getInt("responded_by"),
              checkStatus(rs.getInt("responded_by"), rs.getBoolean("is_approved")),
              rs.getString("start_date_time"),
              rs.getString("end_date_time"),
              rs.getString("requester_first_name"),
              rs.getString("requester_last_name"),
              rs.getString("responder_first_name"),
              rs.getString("responder_last_name")
              );
            return es;
          }
        }, startDate, endDate);
    return requestList;
  }

  public String checkStatus(Integer responder, boolean approval){
    // System.out.println(responder + " and request is " +  approval);
    if (responder == null | responder == 0) return "Pending";
    else{
      if(approval == true) return "Approved";
      else return "Denied";
    }
  }

  public WeeklyAvail parseAvailability(String avail) {
    WeeklyAvail entireAvail = new WeeklyAvail();
    // split string into array with one string per day
    String[] weekdays = avail.split("\\s+");
    // for each day, add it to the weekly availability
    for (String d : weekdays) {
      String[] day = d.split(",");
      for(int i=1; i<day.length; i++) {
        String[] times = day[i].split(":");
        entireAvail.add(day[0], times[0], times[1]);
      }
    }
    return entireAvail;
  }

  // change History string to list of java objects
  public List<Duration> parseHistory(String hist) {
    List<Duration> historyList = new ArrayList<Duration>();
    String[] histories = hist.split(",");
    for (String h : histories) {
      String[] times = h.split(":");
      if(times.length == 2) {
        historyList.add(new Duration(times[0], times[1]));
      }
      else {
        historyList.add(new Duration(times[0]));
      }
    }
    return historyList;
  }

  // change Position string to list of java objects
  public List<String> parsePositions(String pos) {
    if (pos == null) {
      return new ArrayList<String>();
    }
    return new ArrayList<String>(Arrays.asList(pos.split(",")));
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
    System.out.println("DAY");
    System.out.println("   SHIFT: {EMP, AMT}, {EMP, AMT}, ...");
    for (String dayKey : generator.keySet()) {
      System.out.println(dayKey);

      for (Integer shiftKey : generator.get(dayKey).keySet()) {
        System.out.printf("   %-5d: ", shiftKey);

        for (Integer empKey : generator.get(dayKey).get(shiftKey).keySet()){
          System.out.printf("{%-3d, %-3d}, ", empKey,
              generator.get(dayKey).get(shiftKey).get(empKey));
        }
        System.out.printf("\n");
      }
    }
  }

  public void printShiftList() {
    System.out.println("SID PID TNAME");
    System.out.println("  STARTDATE   ENDDATE     WDSTART WDEND  WESTART WEEND");
    for (Shift cur : shifts) {
      System.out.printf(
        "\n%-3d %-3d %-30s\n  %-11s %-11s %-6s %-6s %-6s %-6s\n",
        cur.getSid(),
        cur.getPid(),
        cur.getTname(),
        cur.getStartDate(),
        cur.getEndDate(),
        cur.getWeekdayStart(),
        cur.getWeekdayEnd(),
        cur.getWeekendStart(),
        cur.getWeekendEnd()
      );
    }
  }

  public void printDayShiftEmployeeList() {
    System.out.println("DAY SHIFT EMP WORKED");
    for (DayShiftEmployee cur : dayShiftEmployeeList) {
      System.out.printf("%-3d %-5d %-3d %-6d\n",
        cur.getDay(), cur.getShift(), cur.getEmployee(), cur.getWorked()
      );
    }
  }

  public void printEmployeeList() {
    System.out.println("EMP FIRST_NAME LAST_NAME IS_CURRENT");
    System.out.println("  DAY{START-STOP,...} ...");
    System.out.println("  PID,...");
    for (User cur : employeeList) {
      System.out.printf(
        "\n%-3d %-10s %-10s %b\n  ",
        cur.getId(), cur.getFirstname(), cur.getLastname(), cur.getIsCurrent()
      );
      WeeklyAvail avl = cur.getAvail();

      System.out.printf("mon{");
      for (Duration dur : avl.getMon()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("tue{");
      for (Duration dur : avl.getTue()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("wed{");
      for (Duration dur : avl.getWed()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("thu{");
      for (Duration dur : avl.getThu()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("fri{");
      for (Duration dur : avl.getFri()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("sat{");
      for (Duration dur : avl.getSat()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}  ");
      System.out.printf("sun{");
      for (Duration dur : avl.getSun()) {
        System.out.printf("%s-%s, ", dur.getStart(), dur.getEnd());
      }
      System.out.printf("}\n");

      for (String pos : cur.getPositions()) {
        System.out.printf("%s, ", pos);
      }
      System.out.printf("\n");
    }
  }

}
