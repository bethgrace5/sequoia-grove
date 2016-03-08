create or replace function get_schedule(suppliedMon varchar)
returns table (
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
  select m_sid as sid, mm.pid, mm.tname, mm.we_st, mm.we_ed, mm.wd_st, mm.wd_ed, 
  mm.location, mm.pos, mm.mon, tt.tue, ww.wed, rr.thu, ff.fri, sa.sat, su.sun, 
  mm.mon_eid, tt.tue_eid, ww.wed_eid, rr.thu_eid, ff.fri_eid, sa.sat_eid, su.sun_eid
  from (
    select s.sid as m_sid, s.tname, s.we_st, s.we_ed, s.wd_st, s.wd_ed, s.location,
    s.position as pos, h.fname as mon, h.eid as mon_eid, s.pid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenm$dd-mm-yyyy$tokenm$)
  ) mm
  full outer join
  (
    select s.sid as t_sid, h.fname as tue, h.eid as tue_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokent$dd-mm-yyyy$tokent$) + 1
  ) tt
  on m_sid = t_sid
  full outer join
  (
    select s.sid as w_sid, h.fname as wed, h.eid as wed_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenw$dd-mm-yyyy$tokenw$) + 2
  ) ww
  on m_sid = w_sid
  full outer join
  (
    select s.sid as th_sid, h.fname as thu, h.eid as thu_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenth$dd-mm-yyyy$tokenth$) + 3
  ) rr
  on m_sid = th_sid
  full outer join
  (
    select s.sid as f_sid, h.fname as fri, h.eid as fri_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokenf$dd-mm-yyyy$tokenf$) + 4
  ) ff
  on m_sid = f_sid
  full outer join
  (
    select s.sid as sa_sid, h.fname as sat, h.eid as sat_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokensa$dd-mm-yyyy$tokensa$) + 5
  ) sa
  on m_sid = sa_sid
  full outer join
  (
    select s.sid as su_sid, h.fname as sun, h.eid as sun_eid
    from schedule_template_view s
    left outer join
    schedule_history_view h
    on s.sid=h.sid and h.day = to_date( suppliedMon, $tokensu$dd-mm-yyyy$tokensu$) + 6
  )su
  on m_sid = su_sid;
  $BODY$
language sql;
