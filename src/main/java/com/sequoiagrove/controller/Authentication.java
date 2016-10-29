package com.sequoiagrove.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.MissingClaimException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.io.IOException;
import java.math.BigInteger;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.SecureRandom;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sequoiagrove.model.User;
import com.sequoiagrove.controller.UserRepository;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import com.sequoiagrove.model.UserRowMapper;
import org.springframework.util.StringUtils;


@RestController
class Authentication {
    private static SecureRandom random = new SecureRandom();
    private static Key key = MacProvider.generateKey();

  @Autowired
    private static JdbcTemplate jdbcTemplate;
    private UserRepository users;


    @ModelAttribute("userID")
    Integer getId(HttpServletRequest request) {
      return (Integer) request.getAttribute("userID");
    }

    @RequestMapping(value = "/auth/logout", method = RequestMethod.POST)
    protected String logout(Model model, @ModelAttribute("userID") int id) throws ServletException, IOException, SQLException {
        jdbcTemplate.update("delete from sequ_session where user_id=?", id);
        model.addAttribute("status",200);
        return "jsonTemplate";
    }


    String googleAuth(String idToken) throws GeneralSecurityException, IOException {
      String email = "invalidtoken";
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setAudience(Arrays.asList("723411836118-u5vf0ilcf12gaskc5o7grtrbi5d9nss1.apps.googleusercontent.com"))
            .setIssuer("accounts.google.com")
            .build();

        GoogleIdToken verifiedToken = verifier.verify(idToken);

        if (verifiedToken != null) {
          Payload payload = verifiedToken.getPayload();
          String userId = payload.getSubject();
          //String name = (String) payload.get("name");
          //String pictureUrl = (String) payload.get("picture");
          //String locale = (String) payload.get("locale");
          //String familyName = (String) payload.get("family_name");
          //String givenName = (String) payload.get("given_name");
          boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
          if (emailVerified) {
            email = payload.getEmail();
          }
          else {
            email = "unverified";
          }
        }
        return email;
    }

    @RequestMapping(value = "/auth/login/", method = RequestMethod.POST)
      protected Map<String,Object> login(@RequestBody String postLoad)
      throws ServletException, IOException, SQLException, GeneralSecurityException {
      Map<String,Object> model = new HashMap<String,Object>();

      JsonElement jelement = new JsonParser().parse(postLoad);
      JsonObject  jobject = jelement.getAsJsonObject();
      String email = "none";
      String message = "OK";
      String reason = "";
      String token = "";
      int status = HttpServletResponse.SC_OK;
      boolean loginFailed = false;

      try {
        email = googleAuth(jobject.get("idtoken").getAsString());
      }
      catch (GeneralSecurityException e) {
        status = HttpServletResponse.SC_UNAUTHORIZED;
        System.out.println(e);
        loginFailed = true;
      }
      catch (IOException e) {
        status = HttpServletResponse.SC_ACCEPTED;
        System.out.println(e);
        loginFailed = true;
      }
      if (email == "unverified") {
        loginFailed = true;
        message = "LOGIN_ASK_ADMIN_TO_VERIFY_EMAIL";
        status = HttpServletResponse.SC_UNAUTHORIZED;
      }
      if (email == "invalidtoken") {
        loginFailed = true;
        message = "INVALID_ID_TOKEN";
        status = HttpServletResponse.SC_UNAUTHORIZED;
      }

      User user = new User();
      try {
        // find user by email
        user = users.getUser(email);
      } catch (EmptyResultDataAccessException e) {
        System.out.println(e);
        reason = "Needs Account";
        message = "LOGIN_ASK_ADMIN_TO_VERIFY_EMAIL";
        loginFailed = true;
        status = HttpServletResponse.SC_FORBIDDEN;
      } catch (NullPointerException e) {
        // email was blank
        System.out.println("CAUGHT NULL POINTER EXCEPTION " + e);
        loginFailed = true;
        message = "LOGIN_BLANK_EMAIL";
        status = HttpServletResponse.SC_FORBIDDEN;
      }

      // employee is not current
      if(!user.getIsCurrent()) {
        loginFailed = true;
        message = "LOGIN_NOT_CURRENT";
        status = HttpServletResponse.SC_FORBIDDEN;
      }

      if (loginFailed == false) {
        Object[] params = new Object[] { user.getId() };
        System.out.println(user.getFullname() + " has sucessfully signed in");
        List<String> permissions = user.getPermissions();
        String[] param = new String[permissions.size()];
        //fill in empty array with our array list as an array
        param = permissions.toArray(param);
        //token = getToken(user.getId(), StringUtils.arrayToDelimitedString(param, ","));
      }

      model.put("user", user);
      //model.put("auth_token", token);
      model.put("email", email);
      model.put("loginFailed", loginFailed);
      model.put("message", message);
      model.put("status", status);
      model.put("reason", reason);
      return model;

    }

    // Create initial token upon authorization
    protected static String getToken(int userId, String scope) {
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
          Jwts.builder().setIssuer("http://default-environment.6gp6rkd9qv.us-west-2.elasticbeanstalk.com/sequoiagrove")
          .claim("scope", scope)
          .setSubject(crypticSessionId)
          //.setExpiration(expirationDate)
          .signWith(SignatureAlgorithm.HS256,key)
          .compact();

        return jwt;
    }

    static Map<String, String> verifyToken(String jwt, String URI) {
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

    static String nextSessionId() {
        return new BigInteger(130, random).toString(32);
    }

}
