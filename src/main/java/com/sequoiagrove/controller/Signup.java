package com.sequoiagrove.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import java.io.IOException;
import java.security.GeneralSecurityException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import javax.servlet.ServletException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sequoiagrove.controller.Authentication;
import com.sequoiagrove.model.User;
import com.sequoiagrove.model.SuperUserRowMapper;
import com.sequoiagrove.model.Duration;
import com.sequoiagrove.model.WeeklyAvail;

@Controller
public class Signup {

    @RequestMapping(value = "/signup", method=RequestMethod.POST)
    public String addEmployee(Model model, @RequestBody String data) throws ServletException, IOException, SQLException, GeneralSecurityException {
        JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();
        JsonElement jelement = new JsonParser().parse(data);
        JsonObject  jobject = jelement.getAsJsonObject();

        /*
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
          */

          /*
          String name = (String) payload.get("name");
          String pictureUrl = (String) payload.get("picture");
          String locale = (String) payload.get("locale");
          String familyName = (String) payload.get("family_name");
          String givenName = (String) payload.get("given_name");
          */

          /*
          // check if email verified from payload
          if (emailVerified == false) {
            System.out.println("email was not verified");
            model.addAttribute("loginFailed", true);
            model.addAttribute("message", "Invalid email. " + email +
                "If your company has an account, ask an administrator to verify your email");
            return "jsonTemplate";
          };
        }
        */

        // get id just used to add employee

        /*
        Object[] params = new Object[] {
            jobject.get("firstname").getAsString(),
            jobject.get("lastname").getAsString(),
            jobject.get("email").getAsString()
        };


        Object[] businessParams = new Object[] {
            jobject.get("business").getAsString()
        };

        //Gson googleJson = new Gson();
        ArrayList<String> locations = new Gson().fromJson(
            jobject.get("locations").getAsJsonArray(), ArrayList.class);


        //int businessId = jdbcTemplate.update("insert into sequ_business(id, title, signup_date) " +
            //"values( (select nextval('sequ_business_id_seq')), ?, current_date) returning currval('sequ_business_id_seq')", businessParams);

            */

        /*
        // add account holder
        int userId = jdbcTemplate.queryForObject(
            "insert into sequ_user ( " +
            "id, " +
            "first_name,   " +
            "last_name,    " +
            "email,        " +
            "classification_id, " + //3
            "notes)        " +
            "values((select nextval('sequ_user_sequence')), ?, ?, ?, 3, " +
            "'Hello! you can edit your information here.') returning currval('sequ_user_sequence')", params, Integer.class);

        // activate the employee
        jdbcTemplate.update("insert into sequ_employment_history values( ?, current_date, null, ?)", userId, jobject.get("locationId").getAsInt());
        */

        /* User permissions
         * 1: admin
         * 2: submit-reuquests-off
         * 3: manage-employees
         * 4: manage-requests
         * 5: manage-schedule
         * 6: get-other-store-info
         * 7: manage-store
         * 8: edit-user-permissions
         * 9: admin
         */
        /*
        int [] accountHolderPermissions = {2, 3, 4, 5, 6, 7, 8, 9};

        String addPermissionSQL =
            "INSERT INTO sequ_user_permission (user_id, permission_id) SELECT ?, ? " +
            "WHERE NOT EXISTS ( " +
              "SELECT * FROM sequ_user_permission WHERE user_id = ? and permission_id = ? " +
            ");";

        for(int i=0; i<accountHolderPermissions.length; i++) {
          jdbcTemplate.update( addPermissionSQL, id, accountHolderPermissions[i], id, accountHolderPermissions[i]);
        }
        */
        // return the new id
        model.addAttribute("id", 0);
        return "jsonTemplate";
    }

}
