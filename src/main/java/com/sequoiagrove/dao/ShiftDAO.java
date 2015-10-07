package com.sequoiagrove.dao;

import java.util.ArrayList;
import java.util.List;
import java.sql.Time;

import com.sequoiagrove.model.Shift;

public class ShiftDAO {

    public static ArrayList<Shift> getShift()
    {

        ArrayList<Shift> shifts = new ArrayList<Shift>();

        shifts.add(new Shift(1, "open store", 1, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(2, "open support", 1, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(3, "register 1", 2, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(4, "register 2", 2, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(5, "mid-morning", 2, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(6, "meat slicer", 3, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(7, "cheese slicer", 3, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(8, "bakery", 5, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(9, "soups", 4, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(10, "salads", 4, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(11, "hot sandwich", 4, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(12, "hot sandwich", 4, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(13, "opening janitor", 6, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));
        shifts.add(new Shift(14, "closing janitor", 6, new Time(7, 0, 0), new Time(7, 0, 0), new Time(15, 0, 0), new Time(15, 0, 0)));

        return shifts;
    }

}

