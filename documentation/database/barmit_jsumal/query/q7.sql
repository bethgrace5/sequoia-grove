/* List the possible shifts that “John Doe” can work, given his availability and training*/

select *
from
(
    select unique tname, astart, aend, wd_st, wd_ed, we_st, we_ed, sid
    from (
            (
            select *
            from (
                ( select eid, pid
                    from bajs_std_emp
                    where name = 'John'
                )
                natural join
                ( select id as eid, last_name as lname, first_name as fname
                    from  bajs_employee
                )
            )
            where lname = 'Doe' and fname = 'John'
        )
        natural join
        ( 
            select position_id as pid, id as sid, task_name as tname
            from  bajs_shift
        )
        natural join
        ( 
            select employee_id as eid, startt as astart, endt as aend
            from  bajs_availability
        )
    )
    join
    (
        select wd.shift_id as wd_sid, we.shift_id as we_sid, wd.start_hour as wd_st, 
            wd.end_hour as wd_ed, we.start_hour as we_st, we.end_hour as we_ed
        from bajs_weekday_hours wd
        full outer join bajs_weekend_hours we
        on  wd.shift_id = we.shift_id
    )
    on sid = wd_sid or sid = we_sid
)
where (astart <= wd_st and aend  >= wd_ed) or (astart <= we_st and aend>= we_ed)

/
