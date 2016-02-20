

create or replace view bajs_employee_position_view as (
    select id, pid
    from bajs_employee e
    full outer join
    (
    select employee_id as eid, LISTAGG(position_id, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS pid
    from bajs_has_position p
    where p.date_removed is null
    group by employee_id
    ) pos
    on e.id = pos.eid
)


/
