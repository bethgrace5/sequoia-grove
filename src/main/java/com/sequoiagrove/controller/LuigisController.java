package com.sequoiagrove.controller;

import com.sequoiagrove.model.Cars;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class LuigisController implements BeanFactoryAware {

    private Cars cars;
    private static final int NUM_CARS = 3;

    public void setBeanFactory(BeanFactory context) {
        cars = (Cars)context.getBean("Cars");
    }

    @RequestMapping(value="/", method = RequestMethod.GET)
        public String goHome(ModelMap model) {
            model.put("cars", cars.getSubList(0, NUM_CARS));
            return "index";
        }

    @RequestMapping(value="/load/{page}", method = RequestMethod.POST)
        public @ResponseBody String getCars(@PathVariable int page){
            //remember that toString() has been overridden
            return cars.getSubList(page*NUM_CARS, (page+1)*NUM_CARS).toString();
        }

}

