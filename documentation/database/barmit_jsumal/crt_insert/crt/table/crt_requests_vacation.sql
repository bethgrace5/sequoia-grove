create table BAJS_REQUESTS_VACATION (
    id number(5),
    requested_by number(5) references BAJS_EMPLOYEE(id),
    responded_by number(5) references BAJS_EMPLOYEE(id),
    is_approved number(1),
    start_date_time timestamp,
    end_date_time timestamp,
        CONSTRAINT pk_requests_vacation_id PRIMARY KEY(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
