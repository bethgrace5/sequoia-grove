package com.sequoiagrove.controller;

/*
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.controller.Application;
*/
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {

  /*
    // Pre Handler for before request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
        int id = 0;
        String URI = request.getRequestURI();
        Map<String, String> verificationResponse = Authentication.verifyToken(request.getHeader("Authorization"), URI);
        String subject = verificationResponse.get("subject");
        String scope = verificationResponse.get("scope");

        if (subject.equals("invalid")) {
            jdbcTemplate.update("delete from sequ_session" + " where token=?", subject);
            response.setStatus( HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        else {
          Object[] params = new Object[] { subject };
          try {
              // search for token in database
              id = jdbcTemplate.queryForObject(
                  "select user_id from sequ_session where token=? and expiration_date>current_timestamp",
                  params, Integer.class);
          } catch (EmptyResultDataAccessException e) {
              response.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
              System.out.println("no session token found for user");
              return false;
          }
        }
        // get the user id from the parsed token
        request.setAttribute("userID", id);
        // get the permissions allowed for the token
        request.setAttribute("scope", scope);
        return true;
    }

    // Post Handler for after request
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {
        // Check for any errors, and change status accordingly
        Integer status = (Integer) modelAndView.getModelMap().get("status");
        if (status != null) {
            response.setStatus(status);
            return;
        }
        String token = Authentication.getToken((Integer)request.getAttribute("userID"), (String)request.getAttribute("scope"));
        modelAndView.getModelMap().put("auth_token", token);
    }

    */
}
