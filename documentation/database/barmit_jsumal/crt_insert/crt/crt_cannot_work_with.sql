/*
Employee that cannot work with another Employee
*/
create table BAJS_CANNOT_WORK_WITH (
	employee1_id number(5) references BAJS_EMPLOYEE(id),
	employee2_id number(5) references BAJS_EMPLOYEE(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
