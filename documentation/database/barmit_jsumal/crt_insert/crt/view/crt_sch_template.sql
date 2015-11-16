

/* All of the shifts with their hours for the given day
with the task name, and shift hours for weekends and weekdays

 sch_template(sid, pid, tname, location, wd_st, wd_ed, we_st, we_ed)

*/

create or replace view bajs_sch_template as (
    select sid, tname, weekend_start_hour as we_st, weekend_end_hour as we_ed, weekday_start_hour as wd_st, weekday_end_hour as wd_ed, location, position
    from (
        select s.weekday_id as wd_id, s.weekend_id as we_id, s.id as sid, s.position_id as pid, s.task_name as tname, location, p.title as position
        from bajs_new_shift s
        inner join bajs_position p
        on p.id=s.position_id and s.end_date is null
    )
    left outer join
    (
        select h.id as wehid, h.start_hour as weekend_start_hour, h.end_hour as weekend_end_hour
        from bajs_hours h
    )
    on wehid = wd_id
    left outer join
    (
        select h.id as wdhid, h.start_hour as weekday_start_hour, h.end_hour as weekday_end_hour
        from bajs_hours h
    )
    on wdhid = we_id
)
order by sid





/
