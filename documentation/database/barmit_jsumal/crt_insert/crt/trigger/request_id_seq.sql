
/*
    Request Id sequence generator
*/

create or replace trigger bajs_request_id_seq
before insert on bajs_requests_vacation
for each row
begin
    select bajs_request_seq.nextval
    into :new.id
    from dual;
end;
/
commit;
