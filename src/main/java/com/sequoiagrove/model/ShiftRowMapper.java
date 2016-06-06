package com.sequoiagrove.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.sequoiagrove.model.Shift;

public class ShiftRowMapper implements RowMapper {

    public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
        Shift temp = new Shift(); 
        temp.setSid(rs.getInt("sid"));
        temp.setPid(rs.getInt("pid"));
        temp.setTname(rs.getString("task_name"));
        temp.active.setStartDate(rs.getString("start_date"));
        temp.active.setEndDate(rs.getString("end_date"));
        temp.setWeekdayStart(rs.getString("weekday_start"));
        temp.setWeekdayEnd(rs.getString("weekday_end"));
        temp.setWeekendStart(rs.getString("weekend_start"));
        temp.setWeekendEnd(rs.getString("weekend_end"));
        return temp;
    }
}
