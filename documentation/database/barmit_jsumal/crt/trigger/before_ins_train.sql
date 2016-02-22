/*
    Instead of deleting a training employee from the view, remove their training
    status from the base table has_position.
*/
create or replace trigger bajs_update_train_emp
instead of delete on bajs_training_emp
for each row
begin
    update bajs_has_position p
    set p.is_training =  0
    where p.employee_id = :old.eid and p.position_id = :old.pid;
end;
/
commit;
