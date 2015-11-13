/*
    SQL statements to test triggers and show before/after results 
*/

/*
    Test emp_delete trigger 
*/
/*
select * from bajs_employee where id=12;
select * from bajs_user u where employee_id=12;
select * from bajs_requests_vacation r where requested_by=12 or responded_by=12;
select * from bajs_orders o where employee_id=12;
select * from bajs_is_scheduled_for i where employee_id=12;
select * from bajs_has_position h where employee_id=12;
select * from bajs_employment_history eh where employee_id=12;
select * from bajs_cannot_work_with c where employee1_id=12 or employee2_id=12;
select * from bajs_availability a where employee_id=12;

delete from bajs_employee where id=12;

select * from bajs_employee where id=12;
select * from bajs_user u where employee_id=12;
select * from bajs_requests_vacation r where requested_by=12 or responded_by=12;
select * from bajs_orders o where employee_id=12;
select * from bajs_is_scheduled_for i where employee_id=12;
select * from bajs_has_position h where employee_id=12;
select * from bajs_employment_history eh where employee_id=12;
select * from bajs_cannot_work_with c where employee1_id=12 or employee2_id=12;
select * from bajs_availability a where employee_id=12;
*/

/*
    Test rem_position trigger 
*/
select * from bajs_has_position where employee_id=28 or employee_id=33;

update bajs_has_position set date_removed = to_date('12/02/2013', 'mm/dd/yyyy')
    where employee_id=28 or employee_id=33;

select * from bajs_has_position where employee_id=28 or employee_id=33;
/
commit;
