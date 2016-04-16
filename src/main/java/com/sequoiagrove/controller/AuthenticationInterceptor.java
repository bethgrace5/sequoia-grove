package com.sequoiagrove.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sequoiagrove.controller.Authentication;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {

    // Pre Handler for before request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //System.out.println(request.getHeader("Authorization"));
        // TODO verify authorization token by checking session table
        String URI = request.getRequestURI();
        System.out.println(URI);
        String subject =
          Authentication.verifyToken(request.getHeader("Authorization"), URI);

        if (subject.equals("invalid")) {
          return false;
        }

        // if valid, generate new token, and update table
        return true;
    }

    // Post Handler for after request
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        // TODO send user's latest token back
        modelAndView.getModelMap().put("api_token", Authentication.getToken("token_subject", "employee"));
    }

}
