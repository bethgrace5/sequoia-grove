/* sequences */
drop sequence bajs_employee_id_sequence;
drop sequence bajs_request_id_sequence;

/* views */
drop view  bajs_schedule_template_view;
drop view  bajs_schedule_view;
drop view  bajs_schedule_history_view;
drop view  bajs_employee_info_view;
drop view  bajs_employee_avail_view;
Drop view  bajs_employee_position_view;
drop view  bajs_employee_history_view;

/* packages */
drop package bajs_pkg;

/* base tables */
drop table bajs_holiday;
drop table bajs_requests_vacation;
drop table bajs_is_scheduled_for;
drop table bajs_shift;
drop table bajs_hours;
drop table bajs_has_position;
drop table bajs_position;
drop table bajs_employment_history;
drop table bajs_cannot_work_with;
drop table bajs_availability;
drop table bajs_published_schedule;
drop table bajs_employee;

purge recyclebin;
