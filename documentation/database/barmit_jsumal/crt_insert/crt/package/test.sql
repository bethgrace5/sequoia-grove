    
    select m_sid as sid, tname, we_st, we_ed, wd_st, wd_ed, location, position,
        mon,     tue,     wed,     thu,     fri,     sat,     sun, 
        mon_eid, tue_eid, wed_eid, thu_eid, fri_eid, sat_eid, sun_eid
    from (
        -- Monday
        /*  monday gathers the shift information for the week, while subsequent days
         *  only gather the names for the employees scheduled based on the shift
         */
        select s.sid as m_sid, s.tname, s.we_st, s.we_ed, s.wd_st, s.wd_ed, s.location, 
            s.position, h.fname as mon, h.eid as mon_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('23-11-2015', 'dd-mm-yyyy')
    )
    full outer join
    (
        -- Tuesday
        select s.sid as t_sid, h.fname as tue, h.eid as tue_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('24-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = t_sid
    full outer join
    (
        -- Wednesday
        select s.sid as w_sid, h.fname as wed, h.eid as wed_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('25-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = w_sid
    full outer join
    (
        -- Thursday
        select s.sid as th_sid, h.fname as thu, h.eid as thu_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('26-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = th_sid
    full outer join
    (
        -- Friday
        select s.sid as f_sid, h.fname as fri, h.eid as fri_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('27-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = f_sid
    full outer join
    (
        -- Saturday
        select s.sid as sa_sid, h.fname as sat, h.eid as sat_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('28-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = sa_sid
    full outer join
    (
        -- Sunday
        select s.sid as su_sid, h.fname as sun, h.eid as sun_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date('29-11-2015', 'dd-mm-yyyy')
    )
    on m_sid = su_sid
    order by wd_st, location, we_st


/

