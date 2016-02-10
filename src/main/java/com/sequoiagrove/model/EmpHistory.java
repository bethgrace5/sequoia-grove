package com.sequoiagrove.model;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.sequoiagrove.model.Position;

public class EmpHistory {
    Date start; 
    Date end;

    public EmpHistory(){}
    public EmpHistory(
      Date start,
      Date end
    ) {
        this.start = start;
        this.end = end;
    }

    public Date getStart() {
        return start;
    }
    public Date getEnd() {
        return end;
    }
    public void setStart(Date start) {
        this.start = start;
    }
    public void setEnd(Date end) {
        this.end = end;
    }
}
