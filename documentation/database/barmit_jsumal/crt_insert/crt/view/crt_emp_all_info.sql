
create or replace view bajs_emp_all_info as (
    select e.id, first_name, last_name, email, is_manager, birth_date, max_hrs_week,
    phone_number, clock_number, pid as positions, history,
    'mon,' || mon || ' tue,' || tue || ' wed,' || ' thu,' || thu || ' fri,' || fri || ' sat,' || sat || ' sun,' || sun as avail
    from bajs_employee e
    inner join bajs_history h
    on e.id = h.id
    inner join bajs_positions p
    on e.id = p.id
    inner join bajs_avail a
    on e.id = a.id
)


/
