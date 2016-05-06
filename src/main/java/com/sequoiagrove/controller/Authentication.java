package com.sequoiagrove.controller;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
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
    @RequestMapping(value = "/auth/loginwithtoken", method = RequestMethod.POST)
    protected String loginWithToken(Model model, @ModelAttribute("userID") int id) throws ServletException, IOException, SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        User user = new User(0, 0, 0, 0, "", "", "", "", "", new ArrayList<String>() , "");

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
            model.addAttribute("loginFailed", true);
            model.addAttribute("message",
                "If you are a current employee, ask an administrator to verify your email");
        }
        model.addAttribute("valid", true);
        return "jsonTemplate";
    }

    // Verify token received
    @RequestMapping(value = "/auth/login/", method = RequestMethod.POST)
    protected String login(Model model, @RequestBody String postLoad) throws ServletException, IOException, SQLException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        User user = new User(0, 0, 0, 0, "", "", "", "", "", new ArrayList<String>() , "");
        String email = "";
        String password = "";

        JsonElement jelement = new JsonParser().parse(postLoad);
        JsonObject  jobject = jelement.getAsJsonObject();

        //FIXME when session already exists, it throws error from duplicate key

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
            model.addAttribute("loginFailed", true);
            model.addAttribute("message", "Invalid email or password. " + email +
                ". If your company has an account, ask an administrator to verify your email");
            model.addAttribute("email", email);
            return "jsonTemplate";
          } catch (NullPointerException e) {
            // the email or password was blank user does not exist in the database
            model.addAttribute("loginFailed", true);
            model.addAttribute("message", "Blank email or password, please supply an email and password to continue.");
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
                model.addAttribute("loginFailed", true);
                model.addAttribute("message",
                    "If you are a current employee, ask an administrator to verify your email.");
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
