    drop function sequ_get_schedule(varchar);
    create or replace function sequ_get_schedule(suppliedMon varchar)
    returns table (
      index integer,
      location_id integer,
      sid integer,
      pid integer,
      tname varchar(255),
      we_st varchar(255),
      we_ed varchar(255),
      wd_st varchar(255),
      wd_ed varchar(255),
      location varchar(255),
      pos varchar(255),
      mon varchar(255),
      tue varchar(255),
      wed varchar(255),
      thu varchar(255),
      fri varchar(255),
      sat varchar(255),
      sun varchar(255),
      mon_eid integer,
      tue_eid integer,
      wed_eid integer,
      thu_eid integer,
      fri_eid integer,
      sat_eid integer,
      sun_eid integer
    ) as
    $BODY$
    select index, location_id, m_sid as sid, mm.pid, mm.tname, mm.we_st, mm.we_ed, mm.wd_st, mm.wd_ed,
    mm.area, mm.pos, mm.mon, tt.tue, ww.wed, rr.thu, ff.fri, sa.sat, su.sun,
    mm.mon_eid, tt.tue_eid, ww.wed_eid, rr.thu_eid, ff.fri_eid, sa.sat_eid, su.sun_eid
    from (
      select s.index, s.sid as m_sid, s.tname, s.we_st, s.we_ed, s.wd_st, s.wd_ed, s.area,
      s.position as pos, h.fname as mon, h.eid as mon_eid, s.pid, s.location_id
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenm$dd-mm-yyyy$tokenm$)
    ) mm
    full outer join
    (
      select s.sid as t_sid, h.fname as tue, h.eid as tue_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokent$dd-mm-yyyy$tokent$) + 1
    ) tt
    on m_sid = t_sid
    full outer join
    (
      select s.sid as w_sid, h.fname as wed, h.eid as wed_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenw$dd-mm-yyyy$tokenw$) + 2
    ) ww
    on m_sid = w_sid
    full outer join
    (
      select s.sid as th_sid, h.fname as thu, h.eid as thu_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenth$dd-mm-yyyy$tokenth$) + 3
    ) rr
    on m_sid = th_sid
    full outer join
    (
      select s.sid as f_sid, h.fname as fri, h.eid as fri_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenf$dd-mm-yyyy$tokenf$) + 4
    ) ff
    on m_sid = f_sid
    full outer join
    (
      select s.sid as sa_sid, h.fname as sat, h.eid as sat_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokensa$dd-mm-yyyy$tokensa$) + 5
    ) sa
    on m_sid = sa_sid
    full outer join
    (
      select s.sid as su_sid, h.fname as sun, h.eid as sun_eid
      from sequ_sch_template_view s
      left outer join
      sequ_sch_hist_view h
      on s.sid=h.sid and h.day = to_date( suppliedMon, $tokensu$dd-mm-yyyy$tokensu$) + 6
    )su
    on m_sid = su_sid
    order by index
    $BODY$
    language sql;

    drop function sequ_schedule(integer, integer, varchar);
    create or replace function sequ_schedule(eid integer, sid integer, d varchar)
    returns void as
    $BODY$
    BEGIN
      if exists (SELECT 1 FROM sequ_is_scheduled_for WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid)
        then
        UPDATE sequ_is_scheduled_for SET user_id=eid WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid;
      else
        INSERT INTO sequ_is_scheduled_for (user_id, shift_id, on_date)
        values( eid, sid, to_date(d, 'dd-mm-yyyy'));
      end if;
  END
  $BODY$
  language plpgsql;

  drop function sequ_delete_schedule(integer, varchar);
  create or replace function sequ_delete_schedule(sid integer, d varchar)
  returns void as
  $BODY$
  BEGIN
    if exists (SELECT 1 FROM sequ_is_scheduled_for WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid)
      then
      delete from sequ_is_scheduled_for
      WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid;
    end if;
  END
  $BODY$
  language plpgsql;

  drop function sequ_publish(integer, varchar);
  create or replace function sequ_publish(eid integer, d varchar, loc integer)
  returns void as
  $BODY$
  BEGIN
    if exists (SELECT 1 FROM sequ_published_schedule WHERE date_published=to_date(d, 'dd-mm-yyyy') and location_id = loc)
      then
      update sequ_published_schedule
      set published_by = eid, date_published = (select current_timestamp)
      where start_date = to_date(d, 'dd-mm-yyyy') and location_id = loc;
    else
      insert into sequ_published_schedule(published_by, start_date, date_published, location_id)
      values(eid, to_date(d, 'dd-mm-yyyy'), (select current_timestamp), loc);
    end if;
  END
  $BODY$
  language plpgsql;
