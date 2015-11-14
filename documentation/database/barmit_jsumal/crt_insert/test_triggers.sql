/*
    SQL statements to test triggers and show before/after results 
*/

/*
    Test emp_delete trigger 
*/
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

/*
    Test change_tid trigger 
*/
/*
select * from bajs_transaction order by id;
select * from bajs_sold_in order by transaction_id;

update bajs_transaction set id = 9999
    where id = 9;

select * from bajs_transaction order by id;
select * from bajs_sold_in order by transaction_id;
*/

/*
    Test update_train_emp trigger 
*/
/*
select * from bajs_training_emp order by eid;

delete from bajs_training_emp where eid = 6 and pid = 4;

select * from bajs_training_emp order by eid;
*/

/
commit;
