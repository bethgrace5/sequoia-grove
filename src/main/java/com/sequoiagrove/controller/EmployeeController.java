package com.sequoiagrove.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.SQLException;
import java.sql.ResultSet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import com.sequoiagrove.model.EmployeeSimple;
import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.EmpHistory;
import com.sequoiagrove.model.Availability;
import com.sequoiagrove.model.Position;
import com.sequoiagrove.controller.ScheduleController;

@Controller
public class EmployeeController
{
    private HashMap<Integer, ArrayList<EmpHistory>> histMap = new HashMap<Integer, ArrayList<EmpHistory>>();
    private HashMap<Integer, ArrayList<Availability>> availMap = new HashMap<Integer, ArrayList<Availability>>();
    private HashMap<Integer, ArrayList<Position>> posMap = new HashMap<Integer, ArrayList<Position>>();
    // get all of the possible shift ids
    @RequestMapping(value = "/employee")
    public String getEmployee(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<EmployeeSimple> empList = jdbcTemplate.query(
            "select distinct name, eid, pid, title from bajs_std_emp",
            new RowMapper<EmployeeSimple>() {
                public EmployeeSimple mapRow(ResultSet rs, int rowNum) throws SQLException {
                    EmployeeSimple es = new EmployeeSimple (
                      rs.getInt("eid"),
                      rs.getInt("pid"),
                      rs.getString("name"),
                      rs.getString("title")
                    );
                    return es;
                }
        });
        model.addAttribute("employee", empList);
        return "jsonTemplate";
    }

    @RequestMapping(value = "/employee/info")
    public String getAllEmployee(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Employee> empList = jdbcTemplate.query(
            "select distinct employee_id, max_hrs_week, is_manager, first_name, last_name, phone_number, birth_date from bajs_emp_all_info",
            new RowMapper<Employee>() {
                public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                    int id = rs.getInt("employee_id");
                    Employee es = new Employee (
                      id,
                      rs.getInt("max_hrs_week"),
                      rs.getInt("is_manager"),
                      rs.getString("first_name"),
                      rs.getString("last_name"),
                      rs.getString("phone_number"),
                      rs.getDate("birth_date"),
                      null,
                      null,
                      null
                    );
                    return es;
                }
        });

        getEmpHistory();
        getAvail();
        getPositions();

        // loop through all employees, and put their corresponding employment history
        int len = empList.size(); 
        for(int i=0; i<len; i++) {
            int id = empList.get(i).getId();
            empList.get(i).setHistory(histMap.get(id));
            empList.get(i).setAvail(availMap.get(id));
            empList.get(i).setPositions(posMap.get(id));
        }


        /*for all emp, find emp_id in hashmap and insert corresponding data*/
        model.addAttribute("employeeInfo", empList);
        return "jsonTemplate";
    }

    // Populate Employment History Hash Map with all employees and their history
    public void getEmpHistory(){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        jdbcTemplate.query(
            "select employee_id, date_employed, date_unemployed from bajs_emp_all_info",
            new RowMapper<EmpHistory>() {
                public EmpHistory mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Integer id = rs.getInt("employee_id");
                    EmpHistory hist = new EmpHistory (
                      rs.getDate("date_employed"),
                      rs.getDate("date_unemployed")
                    );
                    if(histMap.containsKey(id)) { // key exists, add elem
                        histMap.get(id).add(hist);
                    }
                    else { // key does not exist, add new one plus 1st elem
                        ArrayList<EmpHistory> tempList = new ArrayList<EmpHistory>();
                        tempList.add(hist);
                        histMap.put(id, tempList);
                    }
                    return hist;
                    }
        });
    }

    // Populate Availability Hash Map with all employees and their availability
    public void getAvail(){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        jdbcTemplate.query(
            "select * from bajs_availability",
            new RowMapper<Availability>() {
                public Availability mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Integer id = rs.getInt("employee_id");
                    String startt = ScheduleController.intToLenFourString(rs.getInt("startt"));
                    String endt = ScheduleController.intToLenFourString(rs.getInt("endt"));
                    int starthr=0, startmin=0, endhr=0, endmin=0;
                    if (startt.length() == 4) {
                        starthr = Integer.parseInt(startt.substring(0,2));
                        startmin = Integer.parseInt(startt.substring(2,4));
                    }
                    if (endt.length() == 4) {
                        endhr = Integer.parseInt(endt.substring(0,2));
                        endmin = Integer.parseInt(endt.substring(2,4));
                    }
                    Availability avail = new Availability (
                      rs.getString("day"),
                      starthr, startmin, endhr, endmin
                    );
                    if(availMap.containsKey(id)) { // key exists, add elem
                        availMap.get(id).add(avail);
                    }
                    else { // key does not exist, add new one plus 1st elem
                        ArrayList<Availability> tempList = new ArrayList<Availability>();
                        tempList.add(avail);
                        availMap.put(id, tempList);
                    }
                    return avail;
                    }
        });
    }

    // Populate Positions Hash Map with all employees and their positions
    public void getPositions(){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        jdbcTemplate.query(
            "select distinct employee_id, position_id, title, location from bajs_emp_all_info where position_id is not null",
            new RowMapper<Position>() {
                public Position mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Integer id = rs.getInt("employee_id");
                    Position pos = new Position (
                      rs.getInt("position_id"),
                      rs.getString("title"),
                      rs.getString("location")
                    );
                    if(posMap.containsKey(id)) { // key exists, add elem
                        posMap.get(id).add(pos);
                    }
                    else { // key does not exist, add new one plus 1st elem
                        ArrayList<Position> tempList = new ArrayList<Position>();
                        tempList.add(pos);
                        posMap.put(id, tempList);
                    }
                    return pos;
                    }
        });
    }

}
