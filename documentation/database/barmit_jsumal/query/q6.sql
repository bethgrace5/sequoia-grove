/*
List the employees who have the second earliest request for vacation
*/
create table bajs_result1 as 
(   select *
    from bajs_requests_vacation
    minus
    (   select *
        from bajs_requests_vacation
        minus
        select distinct r1.*
        from bajs_requests_vacation r1, bajs_requests_vacation r2
        where r1.start_date_time > r2.start_date_time
    )
);

select id as rid, requested_by as eid, start_date_time
from
(
    select *
    from bajs_result1 r3
    minus
    (   select distinct r1.*
        from bajs_result1 r1, bajs_result1 r2
        where r1.start_date_time > r2.start_date_time
    )
);

drop table bajs_result1;
purge recyclebin;
