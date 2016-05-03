package com.sequoiagrove.controller;

import java.util.Map;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.EmptyResultDataAccessException;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.controller.MainController;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    // Pre Handler for before request
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        int id = 0;
        String URI = 
        request.getRequestURI();

        Map<String, String> verificationResponse = Authentication.verifyToken(request.getHeader("Authorization"), URI);
        
        String subject = verificationResponse.get("subject");
        String scope = verificationResponse.get("scope");

        if (subject.equals("invalid")) {
            // TODO since token was invalid, remove session so they need to
            // login with username/password, also we need to send back a 400
            // response code so the application knows they were unauthorized
            //JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
            jdbcTemplate.update("delete from sequ_session" +
            " where token=?", subject);
            response.setStatus( HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        else {
          Object[] params = new Object[] { subject };
          try {
            // search for token in database
            // TODO check expirationdate to make sure it's not expired,
            // if it is expired, delete the token from the session table
            // and send back a 400 authorization error
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

        // if valid, generate new token, and update table
        return true;
    }

    // Post Handler for after request
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {

        // Check for any errors, and change status accordingly
        Integer status = (Integer) modelAndView.getModelMap().get("errorStatus");
        if (status != null) {
            response.setStatus(status);
            return;
        }
        String token = Authentication.getToken((Integer)request.getAttribute("userID"), (String)request.getAttribute("scope"));

        modelAndView.getModelMap().put("auth_token", token);
    }

}
