/*
Availability
*/
create table BAJS_PUBLISHED_SCHEDULE (
	published_by number(5) references BAJS_EMPLOYEE(id),
	start_date date,
	date_published timestamp default null,
        CONSTRAINT pk_published PRIMARY KEY(start_date)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
