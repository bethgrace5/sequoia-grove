
package com.sequoiagrove.controller;

import com.google.gson.*;

import info.modprobe.browserid.BrowserIDResponse;
import info.modprobe.browserid.BrowserIDResponse.Status;
import info.modprobe.browserid.Verifier;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.dao.DeliveryDAO;
import com.sequoiagrove.controller.MainController;

@Controller
public class Authentication {
  private final String USER_AGENT = "Mozilla/5.0";

    @RequestMapping(value = "/auth/login/", method = RequestMethod.POST)
    protected String login(Model model, @RequestBody String postLoad) throws ServletException, IOException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

        JsonElement jelement = new JsonParser().parse(postLoad);
        JsonObject  jobject = jelement.getAsJsonObject();
        String assertion = jobject.get("assertion").toString();
        // strip quotes off string
        assertion = (assertion.substring(1, assertion.length()-1 ));
        final String audience = "http://localhost:8080";
        final Verifier verifier = new Verifier();
        final BrowserIDResponse personaResponse = verifier.verify(assertion,audience);
        final Status status = personaResponse.getStatus();

        //System.out.println(status);
        //System.out.println(personaResponse);

        if (status == Status.OK) {
          // Authentication with Persona was successful
          String email = personaResponse.getEmail();
          System.out.println(email + " has sucessfully signed in");
          model.addAttribute("email", email);


        } else {
          // Authentication with Persona failed
          System.out.println("Sign in failed...");

        }
        return "jsonTemplate";
    }
}

