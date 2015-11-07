/* Find all cashiers available from 14:00-21:00 on all weekdays */
select distinct *
from (
    (   select h.eid, h.name
        from bajs_std_emp h
        where h.title = 'Cashier'
    )
    natural join
    (   select a.employee_id as eid, a.day
        from bajs_availability a
        where a.startt <= 1400 and
            a.endt >= 2100 and
            (a.day='mon' or a.day='tue' or a.day='wed' or a.day='thu' or a.day='fri')
    )
)
order by day
/
