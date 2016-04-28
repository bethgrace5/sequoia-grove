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
        String verificationResponse =
          Authentication.verifyToken(request.getHeader("Authorization"), URI);


        if (verificationResponse.equals("invalid")) {
          return false;
        }
        else {
          Object[] params = new Object[] { verificationResponse };
          try {
            // search for token in database
            id = jdbcTemplate.queryForObject(
                "select user_id from sequ_session where token = ?",
                params, Integer.class);
          } catch (EmptyResultDataAccessException e) {
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
        //TODO handle if id is
        String token = Authentication.getToken((Integer)request.getAttribute("userID"));

        modelAndView.getModelMap().put("auth_token", token);
    }

}
