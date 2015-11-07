/*Find all employees who have been scheduled to work as a closing janitor.*/

select sid, eid, tname
from 
    (   select s.id as sid, s.task_name as tname
        from bajs_shift s
        where s.task_name = 'Closing Janitor'
    )
    natural join
    (   select i.shift_id as sid, i.employee_id as eid
        from bajs_is_scheduled_for i
    )



/
