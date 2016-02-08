
create or replace view bajs_avail as (
    select id, mon, tue, wed, thu, fri, sat, sun
    from bajs_employee e
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS mon
    from bajs_availability
    where day = 'mon'
    group by employee_id
    ) m
    on e.id = m.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS tue
    from bajs_availability
    where day = 'tue'
    group by employee_id
    ) t
    on e.id = t.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS wed
    from bajs_availability
    where day = 'wed'
    group by employee_id
    ) w
    on e.id = w.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS thu
    from bajs_availability
    where day = 'thu'
    group by employee_id
    ) th
    on e.id = th.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS fri
    from bajs_availability
    where day = 'fri'
    group by employee_id
    ) f
    on e.id = f.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS sat
    from bajs_availability
    where day = 'sat'
    group by employee_id
    ) sa
    on e.id = sa.eid
    full outer join
    (
    select employee_id as eid, LISTAGG(startt||':'||endt, ',') 
    WITHIN GROUP (ORDER BY employee_id) AS sun
    from bajs_availability
    where day = 'sun'
    group by employee_id
    ) su
    on e.id = su.eid
)

/
