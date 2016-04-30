package com.sequoiagrove.controller;

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

    // Pre Handler for before request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        int id = 0;
        // TODO verify authorization token by checking session table
        String URI = request.getRequestURI();
        //System.out.println(URI);
        System.out.println("1. Intercepter recieved Authorization\n\t" + 
            request.getHeader("Authorization") + "\n" + URI);

        String verificationResponse =
          Authentication.verifyToken(request.getHeader("Authorization"), URI);

        System.out.println("2. Verification Response parsed subject as\n\t" + 
            verificationResponse);

        if (verificationResponse.equals("invalid")) {
            // TODO since token was invalid, remove session so they need to
            // login with username/password, also we need to send back a 400
            // response code so the application knows they were unauthorized
            System.out.println("Error: Verification Response was 'invalid'");
            response.setStatus( HttpServletResponse.SC_FORBIDDEN );
            return false;
        }
        else {
          Object[] params = new Object[] { verificationResponse };
          try {
            // search for token in database
            // TODO check expirationdate to make sure it's not expired,
            // if it is expired, delete the token from the session table
            // and send back a 400 authorization error
            // TODO change this query to join with the permissions table, so
            // we can extract the permissions to set on the model, and then
            // use them to verify that the user is allowed to continue
            id = jdbcTemplate.queryForObject(
                "select user_id from sequ_session where token = ?",
                params, Integer.class);
            System.out.println("3. Found session token in table for user\n\t" + id);
          } catch (EmptyResultDataAccessException e) {
            System.out.println("3. No session token found for user\n\t");
            return false;
          }
        }

        // get the user id from the parsed token
        request.setAttribute("userID", id);

        // if valid, generate new token, and update table
        return true;
    }

    // Post Handler for after request
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {
        String token = Authentication.getToken((Integer)request.getAttribute("userID"), "TODO put string permissions here" );
        System.out.println("5. Send back JWT \n\t" + token);
        modelAndView.getModelMap().put("auth_token", token);
    }

}
