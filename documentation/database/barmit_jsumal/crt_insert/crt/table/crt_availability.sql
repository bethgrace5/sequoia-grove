/*
Availability
*/
create table BAJS_AVAILABILITY (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	day varchar2(8),
	startt number(4, 0),
	endt number(4, 0),
        CONSTRAINT pk_availability PRIMARY KEY(employee_id, day, startt),
        CONSTRAINT ck_start_end CHECK( endt-startt >=200 )
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
