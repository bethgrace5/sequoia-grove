package com.sequoiagrove.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.sequoiagrove.controller.RequestRepository;

@RestController
public class RequestController {
  @Autowired
  private RequestRepository repository;

  @RequestMapping(value = "/request/pending/{locations}")
  public Map<String, Object> getPendingRequest( @PathVariable("locations") Object[] locations
      /*, @ModelAttribute("scope") List<String> permissions*/){

    // the token did not have the required permissions, return 403 status
    //if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
    //model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
    //return "jsonTemplate";
    //}

    Map<String, Object> model = new HashMap<String, Object>();
    model.put("requestStatus", repository.getRequestsByLocationPending(locations));
    return model;
  }

  @RequestMapping(value = "/request/employee/{eid}/{locations}")
  public Map<String, Object> getCurrentEmployeeRequestl(/* @ModelAttribute("scope") List<String> permissions,*/
      @PathVariable("locations") Object[] locations, @PathVariable("eid") int eid) {

      Map<String, Object> model = new HashMap<String, Object>();
      Object[] args = new Object[locations.length+1];

      args[0] = eid;
      for(int i=1; i<args.length; i++) {
        args[i] = locations[i-1];
      }
      model.put("requestStatus", repository.getRequestsByEmployee(args));
      return model;
  }

  @RequestMapping(value = "/request/{locations}")
  public Map<String, Object> getCheckedRequest(/*@ModelAttribute("scope") List<String> permissions,*/
      @PathVariable("locations") Object[] locations){

    // the token did not have the required permissions, return 403 status
    //if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
      //model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
      //return "jsonTemplate";
    //}

    Map<String, Object> model = new HashMap<String, Object>();
    model.put("requestStatus", repository.getRequestsByLocation(locations));
    return model;
  }


  /*
  // extract scope from request
  @ModelAttribute("scope")
  public List<String> getPermissions(HttpServletRequest request) {
  String csvPermissions = (String) request.getAttribute("scope");
  return Arrays.asList(csvPermissions.split(","));
  }

  // employee submits a request for vacation
  @RequestMapping(value = "/request/submit")
  public String sumbitRequest(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

// the token did not have the required permissions, return 403 status
if (!(permissions.contains("submit-requests-off") || permissions.contains("admin"))) {
model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
return "jsonTemplate";
}

JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
JsonElement jelement = new JsonParser().parse(data);
JsonObject jobject = jelement.getAsJsonObject();

int id = jdbcTemplate.queryForObject("select nextval('sequ_requests_sequence')",
Integer.class);
Object[] params = new Object[] {
id,
jobject.get("eid").getAsInt(),
null, false,
jobject.get("start").getAsString(),
jobject.get("end").getAsString(),
};

jdbcTemplate.update(
"insert into sequ_requests_vacation"+
"(id, requested_by, responded_by, is_approved, start_date_time," +
" end_date_time)" +
"values(?, ?, ?, ?, "+
"to_date(?, 'mm-dd-yyyy'), to_date(?, 'mm-dd-yyyy'))",
params);

return "jsonTemplate";
  }

  @RequestMapping(value = "/request/get")
  public String getRequest( @ModelAttribute("scope") List<String> permissions, Model model){

// the token did not have the required permissions, return 403 status
if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
return "jsonTemplate";
}

JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
String queryStr = "select * from sequ_request_view order by start_date_time asc";
List<RequestStatus> requestList =
jdbcTemplate.query( queryStr, new RequestRowMapper());

model.addAttribute("requestStatus", requestList);
return "jsonTemplate";
  }



// Manager responds to pending request. They approve or deny it.
@RequestMapping(value = "/request/respond")
public String updateRequest(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException{

  // the token did not have the required permissions, return 403 status
  if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
    model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
    return "jsonTemplate";
  }

  JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
  JsonElement jelement = new JsonParser().parse(data);
  JsonObject  jobject = jelement.getAsJsonObject();
  Object[] params = new Object[] {
    jobject.get("isApproved").getAsBoolean(),
      jobject.get("approverId").getAsInt(),
      jobject.get("requestId").getAsInt(),
  };
  jdbcTemplate.update("update sequ_requests_vacation " +
      " set is_approved = ?, responded_by = ? where id = ?", params);

  return "jsonTemplate";
}

@RequestMapping(value = "/request/update/dates")
public String changeRequestDates(@RequestBody String data, @ModelAttribute("scope") List<String> permissions, Model model) throws SQLException {

  // the token did not have the required permissions, return 403 status
  if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
    model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
    return "jsonTemplate";
  }

  JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
  JsonElement jelement = new JsonParser().parse(data);
  JsonObject  jobject = jelement.getAsJsonObject();
  Object[] params = new Object[] {
    jobject.get("eid").getAsInt(),
      jobject.get("startDate").getAsString(),
      jobject.get("endDate").getAsString(),
  };

  /*
     jdbcTemplate.update("update requests_vacation " +
     " set" +
     " start_date_time = " + "to_timestamp(" + start + ", 'yyyy-mm-dd')" +
     " where id = " + eid
     );
     */
  /*
     return "jsonTemplate";
}

@RequestMapping(value = "/request/{start}/{end}/{business}")
public String getRequestInterval(
@PathVariable("business") int business,
@PathVariable("start") String start,
@PathVariable("end") String end,
@ModelAttribute("scope") List<String> permissions,
Model model) throws SQLException {

  // the token did not have the required permissions, return 403 status
  if (!(permissions.contains("manage-requests") || permissions.contains("admin"))) {
  model.addAttribute("status", HttpServletResponse.SC_FORBIDDEN);
  return "jsonTemplate";
  }

  JdbcTemplate jdbcTemplate = Application.getJdbcTemplate();
  List<RequestStatus> requests = new ArrayList<RequestStatus>();

  String queryStr = "select * from ( select * from sequ_request_view left outer join ( select user_id, location_id from sequ_employment_history where date_unemployed is null) eh on requested_by = eh.user_id left outer join sequ_location loc on loc.id = eh.location_id) as requests_with_locations where ((start_date_time <= to_date(?, 'dd-mm-yyyy') and end_date_time >= to_date(?, 'dd-mm-yyyy') ) or (end_date_time >= to_date(?, 'dd-mm-yyyy') and start_date_time <= to_date(?, 'dd-mm-yyyy'))) and is_approved = true and business_id = ?";
  try {
  requests = jdbcTemplate.query( queryStr,
  new Object[] { end, start, start, end, business},
  new RequestRowMapper());
  } catch (EmptyResultDataAccessException e) {
  // there were no requests
  };
  model.addAttribute("requests", requests);
  return "jsonTemplate";
}
*/
}

