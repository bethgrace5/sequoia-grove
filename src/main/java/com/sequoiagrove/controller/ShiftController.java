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

    // Get a week starting on the supplied parameter, which
    // is a monday. The front end makes it a monday, but it would
    // be good to also check that it is a monday here.
    //
    // TODO - check that this schedule is a published one
    @RequestMapping(value = "/schedule/week/{startDate}")
    public String listHotels(Model model, @PathVariable("startDate") String start){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Shift> shifts = null;

        // FIXME maybe seach for the delimiters instead of having to
        // make sure the substring is setup correctly in the front end
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


    // get all of the possible shift ids
    @RequestMapping(value = "/shifts")
    public String listShiftIds(Model model){
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        List<Integer> sidList = jdbcTemplate.query(
            "select s.id as sid, s.position_id as pid, s.task_name as tname" +
              "from bajs_shift s",
            new RowMapper<Integer>() {
                public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Integer sid = new Integer(rs.getInt("sid"));
                    return sid;
                }
        });
        model.addAttribute("sid", sidList);
        return "jsonTemplate";

    }


}

