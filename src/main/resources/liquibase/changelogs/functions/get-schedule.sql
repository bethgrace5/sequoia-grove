create or replace function get_schedule(refcursor, mon varchar)
returns refcursor as '
    begin
    open $1 for
    (
    select m_sid as sid, pid, tname, we_st, we_ed, wd_st, wd_ed, location, position,
        mm.mon,     tt.tue,     ww.wed,     rr.thu,     ff.fri,     sa.sat,     su.sun,
        mon_eid, tue_eid, wed_eid, thu_eid, fri_eid, sat_eid, sun_eid
    from (
        select s.sid as m_sid, s.tname, s.we_st, s.we_ed, s.wd_st, s.wd_ed, s.location,
            s.position, h.fname as mon, h.eid as mon_eid, pid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokenm$dd-mm-yyyy$tokenm$)
    ) mm
    full outer join
    (
        select s.sid as t_sid, h.fname as tue, h.eid as tue_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokent$dd-mm-yyyy$tokent$) + 1
    ) tt
    on m_sid = t_sid
    full outer join
    (
        select s.sid as w_sid, h.fname as wed, h.eid as wed_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokenw$dd-mm-yyyy$tokenw$) + 2
    ) ww
    on m_sid = w_sid
    full outer join
    (
        select s.sid as th_sid, h.fname as thu, h.eid as thu_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokenth$dd-mm-yyyy$tokenth$) + 3
    ) rr
    on m_sid = th_sid
        full outer join
        (
        select s.sid as f_sid, h.fname as fri, h.eid as fri_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokenf$dd-mm-yyyy$tokenf$) + 4
    ) ff
    on m_sid = f_sid
    full outer join
    (
        select s.sid as sa_sid, h.fname as sat, h.eid as sat_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokensa$dd-mm-yyyy$tokensa$) + 5
    ) sa
    on m_sid = sa_sid
    full outer join
    (
        select s.sid as su_sid, h.fname as sun, h.eid as sun_eid
        from schedule_template_view s
        left outer join
        schedule_history_view h
        on s.sid=h.sid and h.day = to_date( mon, $tokensu$dd-mm-yyyy$tokensu$) + 6
    )su
    on m_sid = su_sid
    );
    return $1;
    end;
    ' language plpgsql;

