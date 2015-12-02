/*
    Make sure employee_id foreign key is removed before removing employee 
*/
create or replace trigger bajs_emp_delete
before delete on bajs_employee
for each row
when (old.id > 0)
begin
    delete from bajs_user u
    where :old.id = u.employee_id;

    delete from bajs_requests_vacation r
    where :old.id = r.requested_by;

    update bajs_requests_vacation r set r.responded_by = null
    where :old.id = r.responded_by;

    delete from bajs_is_scheduled_for i
    where :old.id = i.employee_id;

    delete from bajs_has_position h
    where :old.id = h.employee_id;

    delete from bajs_employment_history eh
    where :old.id = eh.employee_id;

    delete from bajs_cannot_work_with c
    where :old.id = c.employee1_id or :old.id = c.employee2_id;

    delete from bajs_availability a
    where :old.id = a.employee_id;
end;
/
commit;
