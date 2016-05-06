
package com.sequoiagrove.model;

import com.sequoiagrove.controller.EmployeeController;
import com.sequoiagrove.model.User;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper {

    // custom row mapper for user
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setClocknumber(rs.getInt("clock_number"));
        user.setMaxHours(rs.getInt("max_hrs_week"));
        user.setMinHours(rs.getInt("min_hrs_week"));
        user.setBirthDate(rs.getString("birth_date"));
        user.setFullname(rs.getString("first_name") + " " + rs.getString("last_name"));
        user.setFirstname(rs.getString("first_name"));
        user.setLastname(rs.getString("last_name"));
        user.setEmail(rs.getString("email"));
        user.setPermissions(EmployeeController.parsePermissions(rs.getString("permissions")));
        user.setClassification(rs.getString("classification"));
        return user;
    }
}

