create table BAJS_WEEKDAY_HOURS (
	shift_id number(5) references BAJS_SHIFT(id),
	start_hour number(4, 0),
	end_hour number(4, 0)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
