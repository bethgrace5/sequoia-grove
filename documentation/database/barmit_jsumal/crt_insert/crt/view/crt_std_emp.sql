/* 
standard employees

    current employees 
    and their current positions
    and they are not training
*/

create view bajs_std_emp as (
    select distinct eid, pid, title, name
    from ( 
        ( select h.employee_id as eid
            from bajs_employment_history h
            where h.date_unemployed is null
        )
        natural join 
        ( select e.id as eid, e.first_name as name
            from bajs_employee e
        )
    )
    natural join 
    (   
        select hp.employee_id as eid, hp.position_id as pid
        from bajs_has_position hp
        where hp.date_removed is null and hp.is_training = 0
    )
    natural join 
    (   
        select p.id as pid, p.title as title
        from bajs_position p
    )
)

/
