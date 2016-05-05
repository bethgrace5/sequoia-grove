
package com.sequoiagrove.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper {

    // custom row mapper for user
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        rs.getInt("id"),
        rs.getInt("max_hrs_week"),
        rs.getInt("min_hrs_week"),
        rs.getBoolean("is_manager"),
        rs.getInt("clock_number"),
        rs.getString("first_name"),
        rs.getString("last_name"),
        rs.getString("phone_number"),
        rs.getString("email"),
        rs.getDate("birth_date"),
        parseHistory(rs.getString("history")),
        parsePositions(rs.getString("positions")),
        parseAvailability(rs.getString("avail")),
        false;

        return user;
    }
}

