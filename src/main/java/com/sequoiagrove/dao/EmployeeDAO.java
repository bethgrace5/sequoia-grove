
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
        return Employee.availabilityToString(ava, id);
    }

    public static ArrayList<Employee> getEmployee(int id) {

        // select * from Employee
        ArrayList<Employee> employees = new ArrayList<Employee>();

        Position supervisor = new Position(1, "supervisor");
        Position cashier = new Position(2, "cashier");
        Position coldprep = new Position(3, "coldprep");
        Position kitchen = new Position(4, "kitchen");
        Position bakery = new Position(5, "bakery");
        Position janitor = new Position(6, "janitor");

        Employee emp1 = new Employee(1,"John","Johnton");
        Employee emp2 = new Employee(2,"Sue","Sueton");
        Employee emp3 = new Employee(3,"Eli","Eliton");
        Employee emp4 = new Employee(4,"Mark","Markton");
        Employee emp5 = new Employee(5,"Sandy","Sandyton");
        Employee emp6 = new Employee(6,"Danny","Dannyton");
        Employee emp7 = new Employee(7,"Heidi","Heiditon");
        Employee emp8 = new Employee(8,"Debra","Debraton");
        Employee emp9 = new Employee(9,"Lynne","Lynneton");
        Employee emp10 = new Employee(10,"Dawn","Dawnton");
        Employee emp11 = new Employee(11,"Shawn","Shawnton");
        Employee emp12 = new Employee(12,"Lawn","Lawnton");
        Employee emp13 = new Employee(13,"Tracie","Tracieton");
        Employee emp14 = new Employee(14,"Bela","Belaton");
        Employee emp15 = new Employee(15,"Cassie","Cassieton");
        Employee emp16 = new Employee(16,"Frank","Frankton");
        Employee emp17 = new Employee(17,"George","Georgeton");

        emp1.addPosition(janitor);
        emp2.addPosition(janitor);
        emp2.addPosition(coldprep);
        emp3.addPosition(coldprep);
        emp4.addPosition(coldprep);
        emp5.addPosition(cashier);
        emp6.addPosition(cashier);
        emp7.addPosition(cashier);
        emp8.addPosition(cashier);
        emp9.addPosition(cashier);
        emp10.addPosition(kitchen);
        emp11.addPosition(kitchen);
        emp12.addPosition(kitchen);
        emp13.addPosition(kitchen);
        emp14.addPosition(kitchen);
        emp15.addPosition(kitchen);
        emp16.addPosition(kitchen);
        emp17.addPosition(kitchen);

        employees.add(emp1);
        employees.add(emp2);
        employees.add(emp3);
        employees.add(emp4);
        employees.add(emp5);
        employees.add(emp6);
        employees.add(emp7);
        employees.add(emp8);
        employees.add(emp9);
        employees.add(emp10);
        employees.add(emp11);
        employees.add(emp12);
        employees.add(emp13);
        employees.add(emp14);
        employees.add(emp15);
        employees.add(emp16);
        employees.add(emp17);

        // select specific employee
        if (id <= 17) {

            for (int i=0; i<employees.size(); i++) {
                if (employees.get(i).getId() == id) {
                    Employee tempEmployee = employees.get(i);
                    employees.clear();
                    employees.add(tempEmployee);
                }
            }

        }

        return employees;
    }

}

