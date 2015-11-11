create table BAJS_USER (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	email varchar2(30) unique,
	password varchar2(30),
	api_token varchar2(30) unique
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
