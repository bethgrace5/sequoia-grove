package com.sequoiagrove.controller;

import com.google.gson.*;
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
import java.net.MalformedURLException;
import java.net.URL;
import java.security.Key;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;
import java.util.Map;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.math.BigInteger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.model.User;
import com.sequoiagrove.model.UserRowMapper;
import com.sequoiagrove.controller.MainController;

@Controller
public class Authentication {
    private static SecureRandom random = new SecureRandom();
    private static Key key = MacProvider.generateKey();

  @ModelAttribute("userID")
    public Integer getId(HttpServletRequest request) {
      return (Integer) request.getAttribute("userID");
    }

    //TODO make method for logout that deletes the user's session from the table
    // ....
    // ....

    // Verify token received
    @RequestMapping(value = "/auth/loginwithtoken", method = RequestMethod.POST)
    protected String loginWithToken(Model model, @ModelAttribute("userID") int id) throws ServletException, IOException, SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        User user = new User(0, 0, 0, 0, "", "", "", "", "", "", "");

        String sql = "select perm.user_id as id, first_name, last_name, email, birth_date, max_hrs_week, min_hrs_week, phone_number, clock_number, permissions, title as classification " +
          "from (  " +
              "select user_id, STRING_AGG(title || '', ',' ORDER BY user_id) AS permissions " +
              "from ( " +
                "select * from " +
                "sequ_user_permission a  " +
                "full outer join " +
                "sequ_permission b " +
                "on a.permission_id = b.id " +
                ") p  " +
              "group by user_id " +
              ") as perm  " +
          "right outer join  " +
          "(  " +
           "select * from sequ_user  " +
           "where id = ?  " +
          ") as sess  " +
          "on perm.user_id = sess.id  " +
          "left outer join  " +
          "(  " +
           "select title, id from sequ_classification  " +
          ") as class  " +
          "on sess.classification_id = class.id ";
        user = (User)jdbcTemplate.queryForObject(sql, new Object[] { id, }, new UserRowMapper());

        // make sure this is a current employee
        Object[] params = new Object[] { id };
        int count = jdbcTemplate.queryForObject(
            "select count(*) from sequ_employment_history " +
            " where user_id = ? and date_unemployed is null",
            params, Integer.class);

        // Success! This employee is currently employed
        if (count > 0) {
            System.out.println(user.getFullname() + " has sucessfully signed in");
            model.addAttribute("user", user);
        }
        else {
            model.addAttribute("userNotCurrent", true);
        }

        // get user info, build user object
        // and get new token to send back
        model.addAttribute("valid", true);

      return "jsonTemplate";
    }

    // Verify token received
    @RequestMapping(value = "/auth/login/", method = RequestMethod.POST)
    protected String login(Model model, @RequestBody String postLoad) throws ServletException, IOException, SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        User user = new User(0, 0, 0, 0, "", "", "", "", "", "", "");
        String email = "";
        String password = "";

        JsonElement jelement = new JsonParser().parse(postLoad);
        JsonObject  jobject = jelement.getAsJsonObject();

        String sql = "select perm.user_id as id, first_name, last_name, email, birth_date, max_hrs_week, min_hrs_week, phone_number, clock_number, permissions, title as classification " +
          "from (  " +
              "select user_id, STRING_AGG(title || '', ',' ORDER BY user_id) AS permissions " +
              "from ( " +
                "select * from " +
                "sequ_user_permission a  " +
                "full outer join " +
                "sequ_permission b " +
                "on a.permission_id = b.id " +
                ") p  " +
              "group by user_id " +
              ") as perm  " +
          "right outer join  " +
          "(  " +
           "select * from sequ_user  " +
           "where email = ? and password = ?" +
          ") as sess  " +
          "on perm.user_id = sess.id  " +
          "left outer join  " +
          "(  " +
           "select title, id from sequ_classification  " +
          ") as class  " +
          "on sess.classification_id = class.id ";
          try {
            email = jobject.get("email").getAsString();
            password = jobject.get("password").getAsString();

            // Blank Email or Password
            if (email.equals("") || password.equals("")) {
              throw new NullPointerException();
            }

            user = (User)jdbcTemplate.queryForObject(
                      sql, new Object[] { email, password }, new UserRowMapper());
          } catch (EmptyResultDataAccessException e) {
            // this user does not exist in the database
            model.addAttribute("invalidEmailOrPassword", true);
            model.addAttribute("email", email);
            return "jsonTemplate";
          } catch (NullPointerException e) {
            // the email or password was blank user does not exist in the database
            model.addAttribute("blankEmailOrPassword", true);
            model.addAttribute("email", email);
            model.addAttribute("password", password);
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
                model.addAttribute("auth_token", getToken(user.getId(), user.getPermissions()));
            }
            else {
                model.addAttribute("userNotCurrent", true);
                model.addAttribute("email", email);
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

        // create a new session for this user

        try {
          count = jdbcTemplate.queryForObject(
              "select count(*) from sequ_session where user_id = ?",
              new Object[] { userId, }, Integer.class);
        } catch(EmptyResultDataAccessException e) {
          // no results found, count is zero
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
