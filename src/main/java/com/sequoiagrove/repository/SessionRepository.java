package com.sequoiagrove.controller;

import java.sql.Types;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.sequoiagrove.model.Session;
import com.sequoiagrove.controller.Application;

@Repository
public class SessionRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  public boolean getSession(int id) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "select * from sequ_session where user_id = ?";
    boolean hasSession = false;
    List<Session> sessions = new ArrayList<Session>();

      try {
        sessions = jdbc.query(sql, new Object[]{id}, sessionMapper);
      } catch (EmptyResultDataAccessException e) {
        System.out.println("LOGIN_NO_SESSION_EMPTY");
      } catch (NullPointerException e) {
        System.out.println("LOGIN_NO_SESSION_NULL");
      }

      if (sessions.size() >= 1) {
        //TODO check if session is expired, if expired, delete it from the database
        hasSession = true;
        // TODO, if they have a valid session, update the expiration date
        // to a fixed amount of time.
      }

    return hasSession;
  }

  private static final RowMapper<Session> sessionMapper = new RowMapper<Session>() {
    public Session mapRow(ResultSet rs, int rowNum) throws SQLException {
      Session s = new Session();
      s.setId(rs.getInt("user_id"));
      s.setToken(rs.getString("token"));
      //s.setExpiration();
      return s;
    }
  };

}
