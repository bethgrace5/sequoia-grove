
select * from bajs_has_position;




/*
select * from
(
 select distinct employee_id, max_hrs_week, is_manager,
               first_name, last_name, phone_number, birth_date from bajs_emp_all_info
        ) a
            join
            bajs_employment_history h
            on h.date_unemployed is null and h.employee_id = a.employee_id
            */


/*
    Test package query to get employee front-end data.

    Necessary Fields : Format
    id : int,
    firstName : string,
    lastName : string,
    isManager : int,
    birthDate : "DD-MM-YYYY",
    maxHoursPerWeek : int,
    emplHistory :
    [
        start : "DD-MM-YYYY", end : "DD-MM-YYYY",
        ...
    ],
    positions :
    [
        title : string
        ...
    ],
    phoneNumber : "xxx-xxx-xxxx",
    clockNumber : int,
    avail : {
        mon :
        [
            { startHour: int, startMin: int, endHour: int, endMin: int },
            ...
        ]
        tue : ...
        wed : ...
        thu : ...
        fri : ...
        sat : ...
        sun : ...
    }
*/

/*
select employee_id, first_name, last_name, is_manager, birth_date, max_hrs_week, phone_number, clock_number, startt, endt, date_employed, date_unemployed, title from
(
    (
        select employee_id, first_name, last_name, is_manager, birth_date, max_hrs_week, phone_number, clock_number, startt, endt, date_employed, date_unemployed from
        (
            select * from
            (
                select e.id, e.first_name, e.last_name, e.is_manager, e.birth_date, e.max_hrs_week, e.phone_number, e.clock_number, a.startt, a.endt
                from bajs_employee e
                full join
                bajs_availability a
                on e.id = a.employee_id
            ) maint
            full join
            bajs_employment_history h
            on h.employee_id = maint.id
        )
    ) jd
    full join
    (
        select employee_id as eid, title from
        (
            (
                select distinct employee_id, position_id
                from bajs_has_position
            )
            natural join
            (
                select id as position_id, title
                from bajs_position
            )
        )
    ) pos
    on jd.employee_id = pos.eid
)
order by employee_id
*/
/
