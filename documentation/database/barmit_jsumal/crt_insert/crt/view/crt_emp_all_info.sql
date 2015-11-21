
create or replace view bajs_emp_all_info as (
    select employee_id, first_name, last_name, is_manager, birth_date, max_hrs_week, phone_number, clock_number, day, startt, endt, date_employed, date_unemployed, position_id, title, location from
    (
        (
            select employee_id, first_name, last_name, is_manager, birth_date, max_hrs_week, phone_number, clock_number, day, startt, endt, date_employed, date_unemployed from
            (
                select * from
                (
                    select e.id, e.first_name, e.last_name, e.is_manager, e.birth_date, e.max_hrs_week, e.phone_number, e.clock_number, a.day, a.startt, a.endt
                    from bajs_employee e
                    full outer join
                    bajs_availability a
                    on e.id = a.employee_id
                ) maint
                full outer join
                bajs_employment_history h
                on h.employee_id = maint.id
            )
        ) jd
        full outer join
        (
            select employee_id as eid, position_id, title, location from
            (
                (
                    select distinct employee_id, position_id
                    from bajs_has_position
                    where date_removed is null
                )
                natural join
                (
                    select id as position_id, title, location
                    from bajs_position
                )
            )
        ) pos
        on jd.employee_id = pos.eid
    )
)

/
