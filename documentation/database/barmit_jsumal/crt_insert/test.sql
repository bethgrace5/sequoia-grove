

/*
select * from bajs_schedule where day between to_date('11/02/2015','mm/dd/yyyy') and to_date('11/03/2015','mm/dd/yyyy');

*/
/*
select s.id as sid
from bajs_shift s;
*/






/* All of the employee names scheduled for the given day
with the task name, and shift hours for weekends and weekdays */


/* 
standard employees:

    current employees 
    and their current positions
    and they are not training
*/

/*
select *
from (
    ( select *
        from bajs_location
    )
    natural join
    ( select title, id as pid
        from  bajs_position
    )
)
natural join
(
    ( select s.id as sid, s.position_id as pid, task_name as tname
        from bajs_shift s
    )
    natural join
    ( select wd.shift_id as sid, wd.start_hour as wday_start, wd.end_hour as wday_end
        from bajs_weekday_hours wd
    )
    natural join
    ( select we.shift_id as sid, we.start_hour as wend_start, we.end_hour as wend_end
        from bajs_weekend_hours we
    )
)
/


select *
from bajs_schedule s
join
(
    select wd.shift_id as wd_sid, we.shift_id as we_sid, wd.start_hour as wd_st, 
        wd.end_hour as wd_ed, we.start_hour as we_st, we.end_hour as we_ed
    from bajs_weekday_hours wd
    full outer join bajs_weekend_hours we
    on  wd.shift_id = we.shift_id
)
on s.sid = wd_sid or s.sid = we_sid
*/



/* All of the employee names scheduled for the given day
with the task name, and shift hours for weekends and weekdays */

/* All of the employees scheduled for the given day */
/*
select eid, sid, day from (
    select i.employee_id as eid, i.shift_id as sid, i.on_date as day
    from bajs_is_scheduled_for i
)
where day = to_date('12/04/2014', 'mm/dd/yyyy')
order by sid
*/


/* All of the employees scheduled for the given date range */
/*
select eid, sid, day from (
    select i.employee_id as eid, i.shift_id as sid, i.on_date as day
    from bajs_is_scheduled_for i
)
where day between to_date('12/04/2014', 'mm/dd/yyyy') 
              and to_date('12/06/2014', 'mm/dd/yyyy')
order by day
*/


/* All of the employees scheduled for the given day with the task name */
 /*
select distinct s.id as eid, s.task_name as tname, day
    from bajs_shift s 
    natural join 
    (select eid, sid, day 
        from (
            select i.employee_id as eid, i.shift_id as sid, i.on_date as day
            from bajs_is_scheduled_for i
        )
        where day = to_date('12/04/2014', 'mm/dd/yyyy')
    )
order by day
*/

/* All of the employees scheduled for the given day with the task name,
and shift hours for weekends and weekdays */

/*
select distinct s.id as eid, s.task_name as tname, day, wend_st, wend_ed, wday_st, wday_ed
    from bajs_shift s 
    natural join 
    (select eid, sid, day
        from (
            select i.employee_id as eid, i.shift_id as sid, i.on_date as day
            from bajs_is_scheduled_for i
        )
        where day = to_date('12/04/2014', 'mm/dd/yyyy')
    )
    natural join
    (select wend_st, wend_ed, sid
        from (
            select w.start_hour as wend_st, w.end_hour as wend_ed, w.shift_id as sid
            from bajs_weekend_hours w
        )
    )
    natural join
    (select wday_st, wday_ed, sid
        from (
            select w.start_hour as wday_st, w.end_hour as wday_ed, w.shift_id as sid
            from bajs_weekday_hours w
        )
    )
order by day
*/

/* All of the employee names scheduled for the given day
with the task name, and shift hours for weekends and weekdays */

/*
select eid, sid, day, name, wend_st, wend_ed, wday_st, wday_ed, tname
    from (
        select pt.id as pid, pt.task_name
        from bajs_position_tasks pt
    )
    natural join
    ( 
        select p.id as pid
        from bajs_position p
    )
order by sid
*/


/

