package com.sequoiagrove.controller;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import com.sequoiagrove.controller.Application;
import com.sequoiagrove.model.Day;
import com.sequoiagrove.model.ScheduleRow;
import com.sequoiagrove.model.Scheduled;

@Repository
public class ScheduleRepository {
  protected final Logger log = LoggerFactory.getLogger(getClass());

  // get schedule rows by sending starting monday and location id
  public ArrayList<ScheduleRow> getSchedule(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "select * from sequ_get_schedule(?) where location_id = ? order by index";
    return (ArrayList<ScheduleRow>) jdbc.query(sql, args, scheduleRowMapper);
  }

  // determine if schedule is published by sending starting monday and location id
  public boolean isPublished(Object[] args) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "SELECT count(*) FROM sequ_published_schedule WHERE start_date = to_date(?,'mm-dd-yyyy') and location_id = ?";
    int count = jdbc.queryForObject(sql, args, Integer.class);
    return (count>0)? true: false;
  }

  public boolean publish(int eid, int locationId, String date) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "select sequ_publish(?, ?, ?)";
    // update database publish(eid, datestring)
    jdbc.execute(sql,
        new PreparedStatementCallback<Boolean>(){
          @Override
      public Boolean doInPreparedStatement(PreparedStatement ps) throws SQLException, DataAccessException {
        ps.setInt(1, eid);
        ps.setString(2, date);
        ps.setInt(3, locationId);
        return ps.execute();
      }
      });

    return true;
  }

  public boolean updateShifts(Scheduled[] scheduleChanges) {
    JdbcTemplate jdbc = Application.getJdbcTemplate();
    String sql = "update sequ_shift set index = ? where id = ?";
    final List<Scheduled> changes = Arrays.asList(scheduleChanges);

    int[] updateCounts = jdbc.batchUpdate(sql,
        new BatchPreparedStatementSetter() {
          public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setInt(1, changes.get(i).getEid());
            ps.setInt(2, changes.get(i).getSid());
          }
          public int getBatchSize() {
            return changes.size();
          }
        });
    return true;
  }

  private static final RowMapper<ScheduleRow> scheduleRowMapper = new RowMapper<ScheduleRow>() {
    public ScheduleRow mapRow(ResultSet rs, int rowNum) throws SQLException {
      ScheduleRow row = new ScheduleRow();
      row.setIndex(rs.getInt("index"));
      row.setSid(rs.getInt("sid"));
      row.setPid(rs.getInt("pid"));
      row.setLocation(rs.getString("location"));
      row.setTname(rs.getString("tname"));
      row.setPosition(rs.getString("pos"));
      row.setWeekdayStart(rs.getString("wd_st"));// weekday start
      row.setWeekdayEnd(rs.getString("wd_ed"));// weekday end
      row.setWeekendStart(rs.getString("we_st"));// weekend start
      row.setWeekendEnd(rs.getString("we_ed"));// weekend end
      row.setMon( new Day("mon", rs.getString("mon"), rs.getInt("mon_eid")));
      row.setTue(new Day("tue", rs.getString("tue"), rs.getInt("tue_eid")));
      row.setWed(new Day("wed", rs.getString("wed"), rs.getInt("wed_eid")));
      row.setThu(new Day("thu", rs.getString("thu"), rs.getInt("thu_eid")));
      row.setFri(new Day("fri", rs.getString("fri"), rs.getInt("fri_eid")));
      row.setSat(new Day("sat", rs.getString("sat"), rs.getInt("sat_eid")));
      row.setSun(new Day("sun", rs.getString("sun"), rs.getInt("sun_eid")));
      return row;
    }
  };


}
