package com.sequoiagrove.controller;

import com.sequoiagrove.model.Shift;
import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.sequoiagrove.model.Shift;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;

@Controller
public class ShiftController {

  @RequestMapping(value = "/shifts")
    public String getAllPositions(Model model)
    {
        //model.addAttribute("shifts", ShiftDAO.getShift());
        return "jsonTemplate";
    }

    // Get a week starting on the supplied parameter, which
    // is a monday. The front end makes it a monday, but it would
    // be good to also check that it is a monday here.
    //
    // TODO - check that this schedule is a published one
    @RequestMapping(value = "/schedule/week/{startDate}")
    public String listHotels(Model model, @PathVariable("startDate") String start){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Shift> shifts = null;

        int mm = Integer.parseInt(start.substring(0, 2));
        int dd = Integer.parseInt(start.substring(3, 5));
        int yyyy = Integer.parseInt(start.substring(6, 10));
        int [] days = {dd, dd+1, dd+2, dd+3, dd+4, dd+5, dd+6};
        String [] dayString = new String [7];

        for( int i=0; i<7; i++) {
          if (days[i] <10) {
            dayString[i] = "0" + days[i];
          }
          else {
            dayString[i] = "" + days[i];
          }

          dayString[i] = mm + "/" + dayString[i] + "/" + yyyy;

        }
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[0] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[1] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[2] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[3] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[4] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[5] +"', 'mm/dd/yyyy')");
        System.out.println("select * from BAJS_SCHEDULE where day=to_date('" +dayString[6] +"', 'mm/dd/yyyy')");

        for (int i=0; i<7; i++) {
          shifts = jdbcTemplate.query(
              "select * from BAJS_SCHEDULE where day=to_date('"+dayString[i]+"', 'mm/dd/yyyy')",
              new RowMapper<Shift>() {
                  public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
                      Shift shift = new Shift(
                          rs.getInt("sid"),
                          rs.getInt("eid"),
                          rs.getInt("pid"),
                          rs.getDate("day"),
                          rs.getString("name"),
                          rs.getString("tname"),
                          rs.getInt("wd_st"),
                          rs.getInt("wd_ed"),
                          rs.getInt("we_st"),
                          rs.getInt("we_ed")
                      );
                      return shift;
                  }
          });
          System.out.println(shifts.size());

          switch(i) {
            case 0:
              model.addAttribute("mon",shifts);
              break;
            case 1:
              model.addAttribute("tue",shifts);
              break;
            case 2:
              model.addAttribute("wed",shifts);
              break;
            case 3:
              model.addAttribute("thu",shifts);
              break;
            case 4:
              model.addAttribute("fri",shifts);
              break;
            case 5:
              model.addAttribute("sat",shifts);
              break;
            case 6:
              model.addAttribute("sun",shifts);
              break;
          }
          //reset array list for next iteration
        }
        return "jsonTemplate";
    }


    /*
    // get all the shifts by id and name for a given day
    @RequestMapping(value = "/schedule/week/{start}")
    public String listHotels(Model model, @PathVariable("start") String start){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Shift> shifts = jdbcTemplate.query(
            "select * from BAJS_SCHEDULE where day=to_date('11/05/2014', 'mm/dd/yyyy')",
            new RowMapper<Shift>() {
                public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Shift shift = new Shift(
                        rs.getInt("sid"),
                        rs.getInt("eid"),
                        rs.getInt("pid"),
                        rs.getDate("day"),
                        rs.getString("name"),
                        rs.getString("tname"),
                        rs.getInt("wd_st"),
                        rs.getInt("wd_ed"),
                        rs.getInt("we_st"),
                        rs.getInt("we_ed")
                    );
                    
                    return shift;
                }
        });
        model.addAttribute(shifts);
        return "jsonTemplate";
    }

    */

}

