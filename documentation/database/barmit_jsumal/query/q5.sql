/*
find all supervisors who can work the earliest supervisor shift on Saturday or Sunday.
 */
create table bajs_super_shifts as
(   select *
    from (
        (   select p.id as pid
            from bajs_position p
            where p.title = 'Supervisor'
        )
        natural join
        (   select s.id as sid, s.position_id as pid
            from bajs_shift s
        )
    )
    natural join
    (   select w.shift_id as sid, w.start_hour as wstartt, w.end_hour as wendt
        from bajs_weekend_hours w
    )
);

select eid, name, day, astartt as avail_start, aendt as avail_end, sid, wstartt as shift_start, wendt as shift_end
from (
    (   select *
        from bajs_std_emp e
        where e.title = 'Supervisor'
    )
    natural join
    (   select a.employee_id as eid, a.day, a.startt as astartt, a.endt as aendt
        from bajs_availability a
        where day = 'sat' or day = 'sun'
    )
)
natural join
(   select *
    from bajs_super_shifts
    minus
    select s1.*
    from (
        bajs_super_shifts s1
        join
        bajs_super_shifts s2
        on s1.wstartt > s2.wstartt
    )
)
where astartt <= wstartt and aendt >= wendt;

drop table bajs_super_shifts;
purge recyclebin;
