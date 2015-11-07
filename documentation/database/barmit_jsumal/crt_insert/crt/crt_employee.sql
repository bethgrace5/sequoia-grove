/*
    Employee Table
*/
create table BAJS_EMPLOYEE (
	id number(5),
	first_name varchar2(10) default '',
	last_name varchar2(10) default '',
    is_manager number(1), 
	birth_date date,
	max_hrs_week number(2, 0) default 40,
	phone_number varchar2(10) default '',
	clock_number number(2, 0),
        CONSTRAINT pk_employee_id PRIMARY KEY(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
