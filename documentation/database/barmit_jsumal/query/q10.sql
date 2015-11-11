
/* Find all employees who have been scheduled exactly four times for a cashier shift */



select distinct eid, count
from (
    select distinct eid, count(eid) as count
    from
    (
        select eid, sid, day
        from (
            (
            select employee_id as eid, shift_id as sid, on_date as day
            from bajs_is_scheduled_for
            )
            natural join 
            (
            select id as sid, position_id as pid
            from bajs_shift
            )
        )
        natural join
        (
            select id as pid, title
            from bajs_position
            where title = 'Cashier'
        )
    )
    group by eid
)
where count = 4











/
