insert into SEQU_CLASSIFICATION values( 1, 'employee');
insert into SEQU_CLASSIFICATION values( 2, 'manager');
insert into SEQU_CLASSIFICATION values( 3, 'account_holder');
insert into SEQU_CLASSIFICATION values( 4, 'admin');

-- set all users as classification employee
update sequ_user set classification_id = 1;

-- update later users to be classification admin
update sequ_user set classification_id = 4
where id > 50;
