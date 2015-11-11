
create table BAJS_NEW_SHIFT (
	id number(5),
	position_id number(5) references BAJS_POSITION(id),
	task_name varchar2(30) default '',
	start_date date,
    end_date  date,
	weekday_id number(5) references BAJS_HOURS(id),
	weekend_id  number(5)references BAJS_HOURS(id),
        CONSTRAINT pk_new_shift_id PRIMARY KEY(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
