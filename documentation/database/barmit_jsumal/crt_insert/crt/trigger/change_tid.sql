/*
    Make sure employee_id foreign key is removed before removing employee 
*/
create or replace trigger bajs_change_tid
before update on bajs_transaction
for each row
when (old.id != new.id)
begin
    update bajs_sold_in set transaction_id = :new.id
    where :old.id = transaction_id;
end;
/
commit;
