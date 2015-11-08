/* 8. Find all employees who are trained in exactly 2 different positions, who can work with all other employees - these are more valuable employees */


select eid
from (
    select eid, count(pid) as count
    from bajs_std_emp
    group by eid
)
where count = 2
minus
select employee1_id as eid
from bajs_cannot_work_with
minus
select employee2_id as eid
from bajs_cannot_work_with





/


