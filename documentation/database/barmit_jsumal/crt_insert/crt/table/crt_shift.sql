create table BAJS_SHIFT (
	id number(5),
	position_id number(5) references BAJS_POSITION(id),
	task_name varchar2(30) default '',
        CONSTRAINT pk_shift_id PRIMARY KEY(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342

/
