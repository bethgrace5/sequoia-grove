/*
    Employee Table
*/
create table BAJS_EMPLOYEE (
	id number(5),
	first_name varchar2(50) default '',
	last_name varchar2(50) default '',
    email varchar2(50),
    is_manager number(1) default 0, 
	birth_date date,
	max_hrs_week number(2, 0) default 40,
	--min_hrs_week number(2, 0) default 0,
	phone_number varchar2(20) default '',
	clock_number number(2, 0) default 0,
        CONSTRAINT pk_employee_id PRIMARY KEY(id),
        CONSTRAINT email_unique UNIQUE (email)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
