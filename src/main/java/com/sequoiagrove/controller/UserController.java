
package com.sequoiagrove.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sequoiagrove.model.User;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  @Autowired
    private UserRepository users;

  @RequestMapping("test")
    public String test() {
      log.info("Test");
      return "OK";
    }

  @RequestMapping("")
    public User getUser(@RequestParam("id") long id) {
      log.info("Get user");
      return users.getUser(id);
    }

  @RequestMapping("users")
    public List<User> getUsers(@RequestParam("ids") long[] ids) {
      log.info("Get users");
      return users.getUsers(ids);
    }
}


