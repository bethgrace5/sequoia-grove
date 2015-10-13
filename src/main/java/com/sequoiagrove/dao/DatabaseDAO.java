package com.sequoiagrove.dao;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

public class DatabaseDAO {
    private static DataSource dataSource;
    //private final JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
        System.out.println(dataSource);
    }

    public static void listHotels(){
        String sql = "SELECT * FROM HOTEL";
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                System.out.print(rs.getInt("HNO") + " ");
                System.out.print(rs.getString("HNAME") + " ");
                System.out.println(rs.getString("CITY"));
            }
            rs.close();
            ps.close();
            return;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }
        //int rowCount = jdbcTemplate.queryForObject("select count(*) from t_actor", Integer.class);
        //System.out.println(rowCount);
    }

}

