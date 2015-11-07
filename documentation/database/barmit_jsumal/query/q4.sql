/* Find employees who can work every position in the kitchen, where they are not still training for any of them*/
select *
from (
    (   select p.id as pid
        from bajs_position p
        where p.location = 'kitchen'
    )
    natural join
    (   select *
        from bajs_std_emp
    )
)
order by name
/
