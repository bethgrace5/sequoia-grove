package com.sequoiagrove.controller;

import com.google.gson.*;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;

import com.sequoiagrove.model.Delivery;
import com.sequoiagrove.controller.MainController;

@Controller
public class DeliveryController {

    // get list of all deliveries
    @RequestMapping(value = "/delivery")
        public String getDelivery(Model model ) {

            JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

            List<Delivery> deliveryList = jdbcTemplate.query(
                    "select * from bajs_delivery",
                    new RowMapper<Delivery>() {
                    public Delivery mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Delivery del = new Delivery(
                        rs.getString("name"),
                        rs.getInt("mon")==1? true: false,
                        rs.getInt("tue")==1? true: false,
                        rs.getInt("wed")==1? true: false,
                        rs.getInt("thu")==1? true: false,
                        rs.getInt("fri")==1? true: false,
                        rs.getInt("sat")==1? true: false,
                        rs.getInt("sun")==1? true: false,
                        rs.getInt("id"));
                    return del;
                    }
                    });
            model.addAttribute("delivery", deliveryList);
            return "jsonTemplate";
        }

    //delete a delivery
    @RequestMapping(value = "/delivery/{id}")
        public String updateSchedule(@PathVariable ("id") String id, Model model) throws SQLException {
            JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

            // update database
            jdbcTemplate.update("delete from bajs_delivery where id = ?");
            return "jsonTemplate";
        }

    //update a delivery
    @RequestMapping(value = "/delivery/update")
        public String UpdateDelivery(@RequestBody String data, Model model) throws SQLException {
            JdbcTemplate jdbcTemplate = MainController.getJdbcTemplate();

            // parse params
            JsonElement jelement = new JsonParser().parse(data);
            JsonObject  jobject = jelement.getAsJsonObject();
            int mon = jobject.get("mon").getAsInt();
            int tue = jobject.get("tue").getAsInt();
            int wed = jobject.get("wed").getAsInt();
            int thu = jobject.get("thu").getAsInt();
            int fri = jobject.get("fri").getAsInt();
            int sat = jobject.get("sat").getAsInt();
            int sun = jobject.get("sun").getAsInt();
            int id = jobject.get("id").getAsInt();
            String name = jobject.get("name").getAsString();

            // update database
            Object[] obj = new Object[] {name, mon, tue, wed, thu, fri, sat, sun, id};
            jdbcTemplate.update("update from bajs_delivery set name = ?," + 
                    "mon = ?, tue = ?, wed = ?, thu = ?, fri = ?, sat = ?, sun = ? where id = ?", 
                    obj);
            return "jsonTemplate";
        }
}
