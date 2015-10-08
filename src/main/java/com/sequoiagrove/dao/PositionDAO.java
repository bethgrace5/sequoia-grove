package com.sequoiagrove.dao;

import java.util.ArrayList;
import java.util.List;

import com.sequoiagrove.model.Position;

public class PositionDAO {

    public static ArrayList<Position> getPosition()
    {

        // will be query to  select all positions from table position

        ArrayList<Position> positions = new ArrayList<Position>();

        Position position1 = new Position(1, "supervisor");
        Position position2 = new Position(2, "cashier");
        Position position3 = new Position(3, "coldprep");
        Position position4 = new Position(4, "kitchen");
        Position position5 = new Position(5, "bakery");
        Position position6 = new Position(6, "janitor");

        positions.add(position1);
        positions.add(position2);
        positions.add(position3);
        positions.add(position4);
        positions.add(position5);
        positions.add(position6);

        return positions;
    }

}
