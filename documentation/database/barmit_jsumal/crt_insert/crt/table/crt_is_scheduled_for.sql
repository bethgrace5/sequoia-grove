create table BAJS_IS_SCHEDULED_FOR (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	shift_id number(5) references BAJS_SHIFT(id),
	on_date date,
        CONSTRAINT pk_is_scheduled_for PRIMARY KEY(employee_id, shift_id, on_date)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
