
package com.sequoiagrove.dao;

import java.util.ArrayList;
import java.util.List;
import java.sql.Time;

import com.sequoiagrove.model.Employee;
import com.sequoiagrove.model.Position;
import com.sequoiagrove.model.Shift;

public class EmployeeDAO {

    public static ArrayList<Employee> getEmployee() {

        ArrayList<Employee> employees = new ArrayList<Employee>();

        Position supervisor = new Position(1, "supervisor");
        Position cashier = new Position(2, "cashier");
        Position coldprep = new Position(3, "coldprep");
        Position kitchen = new Position(4, "kitchen");
        Position bakery = new Position(5, "bakery");
        Position janitor = new Position(6, "janitor");

        Employee john = new Employee(1,"John","Johnton");
        Employee sue = new Employee(2,"Sue","Sueton");
        Employee eli = new Employee(3,"Eli","Eliton");
        Employee mark = new Employee(4,"Mark","Markton");
        Employee sandy = new Employee(5,"Sandy","Sandyton");
        Employee danny = new Employee(6,"Danny","Dannyton");
        Employee heidi = new Employee(7,"Heidi","Heiditon");
        Employee debra = new Employee(8,"Debra","Debraton");
        Employee lynne = new Employee(9,"Lynne","Lynneton");
        Employee dawn = new Employee(10,"Dawn","Dawnton");
        Employee shawn = new Employee(11,"Shawn","Shawnton");
        Employee lawn = new Employee(12,"Lawn","Lawnton");
        Employee tracie = new Employee(12,"Tracie","Tracieton");
        Employee bela = new Employee(12,"Bela","Belaton");
        Employee cassie = new Employee(12,"Cassie","Cassieton");
        Employee frank = new Employee(12,"Frank","Frankton");
        Employee george = new Employee(12,"George","Georgeton");

        john.addPosition(janitor);
        sue.addPosition(janitor);
        sue.addPosition(coldprep);
        eli.addPosition(coldprep);
        mark.addPosition(coldprep);
        sandy.addPosition(cashier);
        danny.addPosition(cashier);
        heidi.addPosition(cashier);
        debra.addPosition(cashier);
        lynne.addPosition(cashier);
        dawn.addPosition(kitchen);
        shawn.addPosition(kitchen);
        lawn.addPosition(kitchen);
        tracie.addPosition(kitchen);
        bela.addPosition(kitchen);
        cassie.addPosition(kitchen);
        frank.addPosition(kitchen);
        george.addPosition(kitchen);

        employees.add(john);
        employees.add(sue);
        employees.add(eli);
        employees.add(mark);
        employees.add(sandy);
        employees.add(danny);
        employees.add(heidi);
        employees.add(debra);
        employees.add(lynne);
        employees.add(dawn);
        employees.add(shawn);
        employees.add(lawn);
        employees.add(tracie);
        employees.add(bela);
        employees.add(george);

        return employees;
    }

}

