
/* All of the employee names scheduled for the given day
with the task name, and shift hours for weekends and weekdays 

bajs_schedule(sid, eid, pid, day, name, tname, wd_st, wd_ed, we_st, we_ed, location)
*/


create view bajs_schedule as (
    select * from bajs_sch_template
        natural join
        (
            select * from (
            select sid, fname as mon
            from bajs_sch_hist
            where day = to_date('02/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as tue
            from bajs_sch_hist
            where day = to_date('03/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as wed
            from bajs_sch_hist
            where day = to_date('04/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as thu
            from bajs_sch_hist
            where day = to_date('05/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as fri
            from bajs_sch_hist
            where day = to_date('05/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as sat
            from bajs_sch_hist
            where day = to_date('06/11/2015', 'dd/mm/yyyy')
        )
        natural join
        (
            select sid, fname as sun
            from bajs_sch_hist
            where day = to_date('07/11/2015', 'dd/mm/yyyy')
        )
    )
)
order by sid




/*
create view bajs_schedule as (
    select sid, eid, pid, day, name, tname, wd_st, wd_ed, we_st, we_ed, location
        from (
            select distinct i.employee_id as eid, i.shift_id as sid, i.on_date as day
            from bajs_is_scheduled_for i
        )
        natural join
        ( 
            select e.id as eid, e.first_name as name
            from bajs_employee e
        )
        natural join
        ( 
            select  distinct sid, pid, tname, location
            from (
                select distinct s.id as sid, s.position_id as pid, s.task_name as tname, location
                from bajs_shift s
                inner join bajs_position p
                on p.id=s.position_id
            )
        )
    join
    (
        select distinct wd.shift_id as wd_sid, we.shift_id as we_sid, wd.start_hour as wd_st, 
            wd.end_hour as wd_ed, we.start_hour as we_st, we.end_hour as we_ed
        from bajs_weekday_hours wd
        full outer join bajs_weekend_hours we
        on  wd.shift_id = we.shift_id
    )
    on sid = wd_sid or sid = we_sid
)
order by day
*/

/

