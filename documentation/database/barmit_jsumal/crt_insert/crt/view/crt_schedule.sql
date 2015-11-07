

/* All of the employee names scheduled for the given day
with the task name, and shift hours for weekends and weekdays */

create view bajs_schedule as (
    select sid, eid, pid, day, name, tname, wd_st, wd_ed, we_st, we_ed, location
        from (
            /* get all shifts */
            select distinct i.employee_id as eid, i.shift_id as sid, i.on_date as day
            from bajs_is_scheduled_for i
        )
        natural join
        ( 
            /* get names of employees */
            select e.id as eid, e.first_name as name
            from bajs_employee e
        )
        natural join
        ( 
            /* get task name for shift */
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

/

