/*
    Employee has Position
*/
create table BAJS_HAS_POSITION (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	position_id number(5) references BAJS_POSITION(id),
	date_acquired date,
	date_removed date default null,
    is_primary number(1),
    is_training number(1),
        CONSTRAINT pk_has_position PRIMARY KEY(employee_id, position_id, date_acquired)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
