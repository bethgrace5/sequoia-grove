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
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.MissingClaimException;
import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.io.IOException;
import java.security.Key;
import java.sql.SQLException;
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
@Controller
public class Authentication {
    private static SecureRandom random = new SecureRandom();
    private static Key key = MacProvider.generateKey();

    @ModelAttribute("userID")
    public Integer getId(HttpServletRequest request) {
      return (Integer) request.getAttribute("userID");
    }

    @RequestMapping(value = "/auth/logout", method = RequestMethod.POST)
    protected String logout(Model model, @ModelAttribute("userID") int id) throws ServletException, IOException, SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        jdbcTemplate.update("delete from sequ_session where user_id=?", id);
        model.addAttribute("status",200);
        return "jsonTemplate";
    }

    // Verify token received
    @RequestMapping(value = "/auth/login/", method = RequestMethod.POST)
    protected String login(Model model, @RequestBody String postLoad) throws ServletException, IOException, SQLException, GeneralSecurityException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(postLoad);
        JsonObject  jobject = jelement.getAsJsonObject();

        User user = new User(0, 0, 0, 0, 0, "", "", "", "", "", new ArrayList<String>(), 0, "");
        //User user;
        String email = "";

        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setAudience(Arrays.asList("723411836118-u5vf0ilcf12gaskc5o7grtrbi5d9nss1.apps.googleusercontent.com"))
            .setIssuer("accounts.google.com")
            .build();
        String idTokenString = jobject.get("idtoken").getAsString();
        GoogleIdToken idToken = verifier.verify(idTokenString);

        if (idToken != null) {
          Payload payload = idToken.getPayload();

          // Print user identifier
          String userId = payload.getSubject();

          // Get profile information from payload
          email = payload.getEmail();
          boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
          /*
          String name = (String) payload.get("name");
          String pictureUrl = (String) payload.get("picture");
          String locale = (String) payload.get("locale");
          String familyName = (String) payload.get("family_name");
          String givenName = (String) payload.get("given_name");
          */

          // check if email verified from payload
          if (emailVerified == false) {
            System.out.println("email was not verified");
            model.addAttribute("loginFailed", true);
            model.addAttribute("message", "Invalid email. " + email +
                "If your company has an account, ask an administrator to verify your email");
            return "jsonTemplate";
          };
        }
        else {
          // google id token invalid
          System.out.println("Invalid Google ID token.");
          model.addAttribute("loginFailed", true);
          model.addAttribute("message", "Invalid Id token.");
          model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
          return "jsonTemplate";
        }

        // query to get user info, by using email as a paramater
        String sql = "select distinct id, business_id, first_name, last_name, email, " +
          "loc, birth_date, max_hrs_week, permissions, notes, phone_number, clock_number, "+
          "positions, history, min_hrs_week, classification_title, classification_id, avail, "+
          "is_current from sequ_user_info_view where email = ?";
          try {
            // execute query to find user by email
            user = (User)jdbcTemplate.queryForObject( sql, new Object[] { email }, new UserRowMapper());
          } catch (EmptyResultDataAccessException e) {
              // user does not exist in the database
              System.out.println("user does not exist in database");
              model.addAttribute("loginFailed", true);
              model.addAttribute("reason", "Invalid email");
              model.addAttribute("message", "If your company has an account, ask an administrator to verify your email");
              model.addAttribute("email", email);
              model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
              return "jsonTemplate";
          } catch (NullPointerException e) {
              // email was blank
              model.addAttribute("loginFailed", true);
              model.addAttribute("message", "Blank email please supply an email to continue.");
              model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
              return "jsonTemplate";
          }

          // found the user in the database
          if(user != null) {
              Object[] params = new Object[] { user.getId() };

              // make sure this is a current employee
              int count = jdbcTemplate.queryForObject(
                  "select count(*) from sequ_employment_history " +
                  " where user_id = ? and date_unemployed is null",
                  params, Integer.class);

              // Success! This employee is currently employed
              if (count > 0) {
                  System.out.println(user.getFullname() + " has sucessfully signed in");
                  model.addAttribute("user", user);
                  //get ArrayList of permissions from user object
                  List<String> permissions = user.getPermissions();
                  //Construct an empty Array of size of that array List
                  String[] param = new String[permissions.size()];
                  //fill in empty array with our array list as an array
                  param = permissions.toArray(param);
                  model.addAttribute("auth_token", getToken(user.getId(),
                      StringUtils.arrayToDelimitedString(param, ",")));
              }
              else {
                  // employee is not current
                  model.addAttribute("loginFailed", true);
                  model.addAttribute("message",
                      "If you are a current employee, ask an administrator to verify your email.");
                  model.addAttribute("email", email);
                  model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
              }

          }
        return "jsonTemplate";
    }

    // Create initial token upon authorization
    protected static String getToken(int userId, String scope) {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        //byte[] key = getSignatureKey();
        // We need a signing key, so we'll create one just for this example. Usually
        // the key would be read from your application configuration instead.
        String crypticSessionId = nextSessionId();
        int count = 0;

        try { // find session for this user
          count = jdbcTemplate.queryForObject(
              "select count(*) from sequ_session where user_id = ?",
              new Object[] { userId, }, Integer.class);
        } catch(EmptyResultDataAccessException e) {
          // no results found, count is zero
          //model.addAttribute("status", HttpServletResponse.SC_UNAUTHORIZED);
        };

        // update session
        if (count > 0 ) {
          jdbcTemplate.update(
              "update sequ_session set expiration_date = (select current_timestamp + interval '18 hours'), " +
              "token = ? where user_id = ? ",
              new Object [] { crypticSessionId, userId });
        }
        // insert new session
        else {
          jdbcTemplate.update(
              "insert into sequ_session (expiration_date, token, user_id ) " +
              "values((select current_timestamp + interval '18 hours'), ?, ?)",
              new Object [] { crypticSessionId, userId });
        }

        String jwt =
          Jwts.builder().setIssuer("localhost:8080/sequoiagrove/")
          .claim("scope", scope)
          .setSubject(crypticSessionId)
          //.setExpiration(expirationDate)
          .signWith(SignatureAlgorithm.HS256,key)
          .compact();

        return jwt;
    }

    public static Map<String, String> verifyToken(String jwt, String URI) {
      Map<String, String> token = new HashMap<String, String>();
      String subject = "HACKER";
        try {
            // Parse jwt
            Jws<Claims> jwtClaims = Jwts.parser().setSigningKey(key).parseClaimsJws(jwt);
            subject = jwtClaims.getBody().getSubject();
            token.put("subject", jwtClaims.getBody().getSubject());
            token.put("scope", jwtClaims.getBody().get("scope").toString());
              //token = jwtClaims.getBody();
            try {
                // Check jwt subject
                //Jwts.parser().require("scope", "this_scope").setSigningKey(key).parseClaimsJws(jwt);
            } catch (MissingClaimException e) {
                // the parsed JWT did not have the subject field
                System.out.println("Missing Claim Exception for " + URI
                    + "\n\t-> No subject field present.");
            token.put("scope", "none");
            token.put("subject", "invalid");
            return token;
            } catch (IncorrectClaimException e) {
                // the parsed JWT had a sub field, but its value was not equal to 'subject'
                System.out.println("Incorrect Claim Exception for " + URI
                    + "\n\t-> Subject field was not what was expected.");
            token.put("scope", "none");
            token.put("subject", "invalid");
            return token;
            }
            //we can trust this JWT, get the subject
        } catch (SignatureException e) {
            //don't trust the JWT!
            System.out.println("Signature Exception: " + URI
                + "\n\t-> cannot trust this token.");
            token.put("scope", "none");
            token.put("subject", "invalid");
            return token;
        } catch (MalformedJwtException e) {
            // Jwt was not formed correctly (needs 2 dots etc.)
            System.out.println("Malformed Jwt: " + URI
                + "\n\t-> needs two dots etc.");
            token.put("scope", "none");
            token.put("subject", "invalid");
            return token;
        } catch (IllegalArgumentException e) {
            // Jwt String cannot be null or empty
            System.out.println("Illegal Argument (Jwt): " + URI
                + "\n\t-> possibly null or empty Jwt.");
            token.put("scope", "none");
            token.put("subject", "invalid");
            return token;
        }
       return(token);
    }

    public static String nextSessionId() {
        return new BigInteger(130, random).toString(32);
    }

}
