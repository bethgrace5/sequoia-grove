/*
    Employment History
*/
create table BAJS_EMPLOYMENT_HISTORY (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	date_employed date,
	date_unemployed date default null,
        CONSTRAINT pk_book PRIMARY KEY(employee_id, date_employed)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
