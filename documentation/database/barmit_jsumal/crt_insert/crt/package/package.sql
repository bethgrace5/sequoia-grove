/*  
 * Package Specification Section
 */
create or replace package bajs_pkg as 

-- Procedure Prototypes
procedure add_holiday( mmdd varchar2, n varchar2, t varchar2);
procedure delete_ingredient(iid number);
procedure schedule( eid number, sid number, day varchar2);

-- Type Definitions
type sch_record_type 
is record
(
    sid         bajs_is_scheduled_for.shift_id%type,
    tname       bajs_new_shift.task_name%type,
    wd_st       bajs_hours.start_hour%type,
    wd_ed       bajs_hours.end_hour%type,
    we_st       bajs_hours.start_hour%type,
    we_ed       bajs_hours.end_hour%type,
    location    bajs_position.location%type,
    position    bajs_position.title%type,
    mon         bajs_employee.first_name%type,
    tue         bajs_employee.first_name%type,
    wed         bajs_employee.first_name%type,
    thu         bajs_employee.first_name%type,
    fri         bajs_employee.first_name%type,
    sat         bajs_employee.first_name%type,
    sun         bajs_employee.first_name%type,
    mon_eid     bajs_employee.id%type,
    tue_eid     bajs_employee.id%type,
    wed_eid     bajs_employee.id%type,
    thu_eid     bajs_employee.id%type,
    fri_eid     bajs_employee.id%type,
    sat_eid     bajs_employee.id%type,
    sun_eid     bajs_employee.id%type
);

type sch_record is table of sch_record_type;

-- Function Prototypes
function get_schedule( 
    mon varchar2,
    tue varchar2,
    wed varchar2,
    thu varchar2,
    fri varchar2,
    sat varchar2,
    sun varchar2
) return sch_record pipelined;


end bajs_pkg;
/

/* * Package Body Section */
create or replace package body bajs_pkg as

    -- Delete an Ingredent from being used in a menu item by supplying the ingredient id
    procedure delete_ingredient (iid number) is
    begin
        delete from bajs_used_in u
        where u.ingredient_id = iid;
    end delete_ingredient;

    -- Create a new Holiday Record
    procedure add_holiday( mmdd varchar2, n varchar2, t varchar2) is
    begin
        -- TODO give the type a default, and
        --insert into BAJS_HOLIDAY values( mmdd, name, t);
        /*
        merge into bajs_holiday h
            using (select n name from dual) s
            on (h.name = s.name)
        when matched then update set h.name = s.name
        when not matched then insert (hdate, name, type) values (mmdd, n, t);
        */
        insert into bajs_holiday(hdate, name, type) values(mmdd, n, t);
        exception
        when DUP_VAL_ON_INDEX then
            update bajs_holiday
            set name = n, type = t
            where hdate = mmdd;
    end add_holiday;

    -- Schedule or update is_scheduled_for record
    procedure schedule( eid number, sid number, day varchar2) is
    begin
        insert into bajs_is_scheduled_for(employee_id, shift_id, on_date) 
        values(eid, sid, to_date(day, 'dd-mm-yyyy'));
        exception
        when DUP_VAL_ON_INDEX then
            update bajs_is_scheduled_for
            set employee_id = eid
            where on_date = to_date(day, 'dd-mm-yyyy') and shift_id=sid;
    end schedule;

    -- input date strings as 'dd/mm/yyyy' for each corresponding weekday
    -- function expects the correct weekdays in the order of monday to sunday

    -- returns columns (sid, tname, we_st, we_ed, wd_st, wd_ed, mon, tue, wed, thu,
    --                  fri, sat, sun, location)
    function get_schedule( 
        mon varchar2,
        tue varchar2,
        wed varchar2,
        thu varchar2,
        fri varchar2,
        sat varchar2,
        sun varchar2
    ) return sch_record
    pipelined as

    -- Define Cursor
    cursor temp_cur is 
    (
    select m_sid as sid, tname, we_st, we_ed, wd_st, wd_ed, location, position,
        mon,     tue,     wed,     thu,     fri,     sat,     sun, 
        mon_eid, tue_eid, wed_eid, thu_eid, fri_eid, sat_eid, sun_eid
    from (
        -- Monday
        /*  monday gathers the shift information for the week, while subsequent days
         *  only gather the names for the employees scheduled based on the shift
         */
        select s.sid as m_sid, s.tname, s.we_st, s.we_ed, s.wd_st, s.wd_ed, s.location, 
            s.position, h.fname as mon, h.eid as mon_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( mon, 'dd-mm-yyyy')
    )
    full outer join
    (
        -- Tuesday
        select s.sid as t_sid, h.fname as tue, h.eid as tue_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( tue, 'dd-mm-yyyy')
    )
    on m_sid = t_sid
    full outer join
    (
        -- Wednesday
        select s.sid as w_sid, h.fname as wed, h.eid as wed_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( wed, 'dd-mm-yyyy')
    )
    on m_sid = w_sid
    full outer join
    (
        -- Thursday
        select s.sid as th_sid, h.fname as thu, h.eid as thu_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( thu, 'dd-mm-yyyy')
    )
    on m_sid = th_sid
    full outer join
    (
        -- Friday
        select s.sid as f_sid, h.fname as fri, h.eid as fri_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( fri, 'dd-mm-yyyy')
    )
    on m_sid = f_sid
    full outer join
    (
        -- Saturday
        select s.sid as sa_sid, h.fname as sat, h.eid as sat_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( sat, 'dd-mm-yyyy')
    )
    on m_sid = sa_sid
    full outer join
    (
        -- Sunday
        select s.sid as su_sid, h.fname as sun, h.eid as sun_eid
        from bajs_sch_template s
        left outer join
        bajs_sch_hist h
        on s.sid=h.sid and h.day = to_date( sun, 'dd-mm-yyyy')
    )
    on m_sid = su_sid
    --order by wd_st, location, we_st

    ); -- End Cursor Definition
    begin
        -- Iterate Cursor to return rows
        for cur_rec in temp_cur loop
        pipe row(cur_rec);
        end loop;
    end get_schedule;

end bajs_pkg;
/

