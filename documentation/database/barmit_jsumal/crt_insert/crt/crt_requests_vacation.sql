create table BAJS_REQUESTS_VACATION (
    requested_by number(5) references BAJS_EMPLOYEE(id),
    responded_by number(5) references BAJS_EMPLOYEE(id),
    is_approved number(1),
    start_date_time timestamp,
    end_date_time timestamp,
        CONSTRAINT pk_requests_vacation_id PRIMARY KEY(requested_by, responded_by, start_date_time)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
