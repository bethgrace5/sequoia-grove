
create or replace view bajs_employee_info_view as (
    select e.id, first_name, last_name, email, is_manager, birth_date, max_hrs_week,
    phone_number, clock_number, pid as positions, history,
    'mon,' || mon || ' tue,' || tue || ' wed,' || ' thu,' || thu || ' fri,' || fri || ' sat,' || sat || ' sun,' || sun as avail
    from bajs_employee e
    inner join bajs_employee_history_view h
    on e.id = h.id
    inner join bajs_employee_position_view p
    on e.id = p.id
    inner join bajs_employee_avail_view a
    on e.id = a.id
)


/
