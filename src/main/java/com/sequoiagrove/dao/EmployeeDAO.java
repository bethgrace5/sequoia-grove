
package com.sequoiagrove.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.sql.Time;

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Position;
import com.sequoiagrove.model.Shift;

public class EmployeeDAO {

    public static HashMap<String, Boolean> getEmployeeAvailability(int id) {
        // select from is_available where employeeId = employeeId

        String ava = "1111111";
        System.out.println(id);

        return Employee.availabilityToString(ava, id);

    }

    public static ArrayList<Employee> getEmployee() {
        // select * from Employee

        ArrayList<Employee> employees = new ArrayList<Employee>();

        Position supervisor = new Position(1, "supervisor");
        Position cashier = new Position(2, "cashier");
        Position coldprep = new Position(3, "coldprep");
        Position kitchen = new Position(4, "kitchen");
        Position bakery = new Position(5, "bakery");
        Position janitor = new Position(6, "janitor");

        employees.add(new Employee(1,"John","Johnton"));
        /*
        employees.add(new Employee(2,"Sue","Sueton").addPosition(janitor)
            .addPosition(coldprep));
         employees.add(new Employee(3,"Eli","Eliton").addPosition(coldprep));
         employees.add(new Employee(4,"Mark","Markton").addPosition(coldprep));
         employees.add(new Employee(5,"Sandy","Sandyton").addPosition(cashier));
         employees.add(new Employee(6,"Danny","Dannyton").addPosition(cashier));
         employees.add(new Employee(7,"Heidi","Heiditon").addPosition(cashier));
         employees.add(new Employee(8,"Debra","Debraton").addPosition(cashier));
         employees.add(new Employee(9,"Lynne","Lynneton").addPosition(cashier));
         employees.add(new Employee(10,"Dawn","Dawnton").addPosition(kitchen));
         employees.add(new Employee(11,"Shawn","Shawnton").addPosition(kitchen));
         employees.add(new Employee(12,"Lawn","Lawnton").addPosition(kitchen));
         employees.add(new Employee(12,"Tracie","Tracieton").addPosition(kitchen));
         employees.add(new Employee(12,"Bela","Belaton").addPosition(kitchen));
         employees.add(new Employee(12,"Cassie","Cassieton").addPosition(kitchen));
         employees.add(new Employee(12,"Frank","Frankton").addPosition(kitchen));
         employees.add(new Employee(12,"George","Georgeton").addPosition(kitchen));
         */

        return employees;
    }

}

