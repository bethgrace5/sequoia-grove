
/*  
 * Package Specification Section
 */
create or replace package bajs_pkg as 

-- Procedure Prototypes
procedure add_holiday( mmdd varchar2, name varchar2, t varchar2);
procedure delete_ingredient(iid number);

-- Type Definitions
type sch_record is table of bajs_schedule%rowtype;

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


/*
 * Package Body Section
 */
create or replace package body bajs_pkg as

    -- Delete an Ingredent from being used in a menu item by supplying the ingredient id
    procedure delete_ingredient (iid number) is
    begin
        delete from bajs_used_in u
        where u.ingredient_id = iid;
    end delete_ingredient;

    -- Create a new Holiday Record
    procedure add_holiday( mmdd varchar2, name varchar2, t varchar2) is
    begin
        -- TODO give the type a default, and
        insert into BAJS_HOLIDAY values( mmdd, name, t);
    end add_holiday;

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
    select * from 
    (
        select * from bajs_sch_template
        natural join
        (
            select * from (
              -- Monday
                select sid, fname as mon
                from bajs_sch_hist
                where day = to_date(mon, 'dd-mm-yyyy')
            )
            natural join
            ( -- Tuesday
                select sid, fname as tue
                from bajs_sch_hist
                where day = to_date(tue, 'dd-mm-yyyy')
            )
            natural join
            ( -- Wednesday
                select sid, fname as wed
                from bajs_sch_hist
                where day = to_date(wed, 'dd-mm-yyyy')
            )
            natural join
            ( -- Thursday
                select sid, fname as thu
                from bajs_sch_hist
                where day = to_date(thu, 'dd-mm-yyyy')
            )
            natural join
            ( -- Friday
                select sid, fname as fri
                from bajs_sch_hist
                where day = to_date(fri, 'dd-mm-yyyy')
            )
            natural join
            ( -- Saturday
                select sid, fname as sat
                from bajs_sch_hist
                where day = to_date(sat, 'dd-mm-yyyy')
            )
            natural join
            ( -- Sunday
                select sid, fname as sun
                from bajs_sch_hist
                where day = to_date(sun, 'dd-mm-yyyy')
            )
        )
    ); -- End Cursor Definition
    begin

        -- Iterate Cursor to return rows
        for cur_rec in temp_cur loop
        pipe row(cur_rec);
        end loop;

    end get_schedule;
end bajs_pkg;

/

