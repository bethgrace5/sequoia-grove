
package com.sequoiagrove.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper {

    // custom row mapper for user
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setFullname(rs.getString("first_name") + " " + rs.getString("last_name"));
        user.setFirstname(rs.getString("first_name"));
        user.setLastname(rs.getString("last_name"));
        user.setEmail(rs.getString("email"));
        user.setIsManager(rs.getInt("is_manager") == 1);
        return user;
    }

}

