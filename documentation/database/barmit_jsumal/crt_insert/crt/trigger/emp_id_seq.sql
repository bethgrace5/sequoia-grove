
/*
    Employee Id sequence generator
*/

create or replace trigger bajs_emp_id_seq
before insert on bajs_employee
for each row
begin
    select bajs_emp_seq.nextval
    into :new.id
    from dual;
end;
/
commit;
