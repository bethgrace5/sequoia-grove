package com.sequoiagrove.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import javax.servlet.http.HttpServletResponse;
import java.security.GeneralSecurityException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.JsonFactory;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.Map;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.math.BigInteger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sequoiagrove.model.User;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import com.sequoiagrove.model.UserRowMapper;
import com.sequoiagrove.controller.MainController;
import org.springframework.util.StringUtils;

import com.stripe.model.Invoice;
import com.stripe.model.InvoiceCollection;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.RateLimitException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.StripeException;

@Controller
public class BillingController {

    @ModelAttribute("userID")
    public Integer getId(HttpServletRequest request) {
      return (Integer) request.getAttribute("userID");
    }

    @RequestMapping(value = "/billingDetails", method = RequestMethod.GET)
    protected String billingDetails(Model model, @RequestBody String postLoad) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(postLoad);
        //JsonObject  jobject = jelement.getAsJsonObject();

        //String location = jobject.get("locationId").getAsString();

        String customerId = "";

        //if (location == "4") {
          //customerId = "";
        //}

        try {
          // Use Stripe's library to make requests...
          Stripe.apiKey = "";

          HashMap<String, Object> invoiceParams = new HashMap<String, Object>();
          invoiceParams.put("limit", "10");
          invoiceParams.put("customer", customerId);

          InvoiceCollection result = Invoice.list(invoiceParams);

          model.addAttribute("billingDetails", result + "");

        } catch (CardException e) {
          // Since it's a decline, CardException will be caught
          //System.out.println("Status is: " + e.getCode());
          //System.out.println("Message is: " + e.getMessage());

        } catch (RateLimitException e) {
          // Too many requests made to the API too quickly
        } catch (InvalidRequestException e) {
          // Invalid parameters were supplied to Stripe's API
        } catch (AuthenticationException e) {
          // Authentication with Stripe's API failed
          // (maybe you changed API keys recently)
        } catch (APIConnectionException e) {
          // Network communication with Stripe failed
        } catch (StripeException e) {
          // Display a very generic error to the user, and maybe send
          // yourself an email
        } catch (Exception e) {
          // Something else happened, completely unrelated to Stripe
        }

        return "jsonTemplate";
    }

}
