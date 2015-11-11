/*
Find the employees that were not scheduled for any weekend shifts during November, 2015.
 */
select eid, name
from bajs_std_emp
natural join
(   select eid
    from bajs_std_emp
    minus
    select i.employee_id as eid
    from bajs_is_scheduled_for i
    where exists(
        select w.shift_id
        from bajs_weekend_hours w
        where w.shift_id = i.shift_id
    )
)
/
