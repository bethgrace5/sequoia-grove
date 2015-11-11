

create or replace view bajs_sch_hist as
select * from (
    select sid, eid, fname, day/*, to_char(to_date(day,'dd/mm/yyyy'), 'DAY') as weekday*/
    from
        (
            select * 
            from bajs_sch_template
        )
        natural join
        (
            select i.employee_id as eid, i.shift_id as sid, i.on_date as day
            from bajs_is_scheduled_for i
        )
        natural join
        (
            select e.id as eid, e.first_name as fname
            from bajs_employee e
        )
    order by day
)
--where day = to_date('07/11/2015', 'dd/mm/yyyy')

--select * from bajs_sch_hist










/
