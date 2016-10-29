package com.sequoiagrove.model;

/*
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sequoiagrove.model.User;
import com.sequoiagrove.controller.EmployeeController;
import org.springframework.jdbc.core.RowMapper;
public class SuperUserRowMapper implements RowMapper {
*/

public class SuperUserRowMapper {

    // custom row mapper for user
    /*
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User(
            rs.getInt("id"),
            rs.getInt("business_id"),
            rs.getInt("max_hrs_week"),
            rs.getInt("min_hrs_week"),
            rs.getInt("clock_number"),
            rs.getString("first_name"),
            rs.getString("last_name"),
            rs.getString("phone_number"),
            rs.getString("email"),
            rs.getString("birth_date"),
            EmployeeController.parseHistory(rs.getString("history")),
            EmployeeController.parsePositions(rs.getString("positions")),
            EmployeeController.parseAvailability(rs.getString("avail")),
            (rs.getInt("is_current") >= 1)? true: false,
            EmployeeController.parsePermissions(rs.getString("permissions")),
            rs.getInt("classification_id"),
            rs.getString("classification_title"),
            rs.getString("notes"));
        user.setLocations(rs.getString("loc"));

        return user;
    }
    */
}

