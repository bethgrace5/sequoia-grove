/*
Find all employees who can work the tasked named register1 on Mondays. Include employees still training for the task.
 */
select eid, name
from (
    (   select s.id as sid, s.task_name as tname, s.position_id as pid
        from bajs_shift s
        where s.task_name = 'Register 1'
    )
    natural join
    (   select w.shift_id as sid, w.start_hour, w.start_hour as wstartt, w.end_hour as wendt
        from bajs_weekday_hours w
    )
    natural join
    (   select e.eid, e.pid, e.name 
        from bajs_std_emp e
    )
    natural join
    (   select a.employee_id as eid, a.day, a.startt, a.endt
        from bajs_availability a
        where day = 'mon'
    )
)
where wstartt >= startt and wendt <= endt
/
