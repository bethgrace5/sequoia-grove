
/* sequences */
create sequence bajs_employee_id_sequence
minvalue 1
maxvalue 99999
start with 1
increment by 1
cache 20;

/* sequences */
create sequence bajs_request_id_sequence
minvalue 1
maxvalue 99999
start with 1
increment by 1
cache 20;

/* base tables */
@crt/table/hours.sql
@crt/table/employee.sql
@crt/table/holiday.sql
@crt/table/employment_history.sql
@crt/table/availability.sql
@crt/table/cannot_work_with.sql
@crt/table/position.sql
@crt/table/shift.sql
@crt/table/has_position.sql
@crt/table/is_scheduled_for.sql
@crt/table/requests_vacation.sql
@crt/table/published_schedule.sql

/* views */
@crt/view/schedule_template_view.sql
@crt/view/employee_history_view.sql
@crt/view/schedule_view.sql
@crt/view/standard_employee_view.sql
@crt/view/training_employee_view.sql
@crt/view/employee_availability_view.sql
@crt/view/employee_position_view.sql
@crt/view/employee_info_view.sql
@crt/view/schedule_history_view.sql

/* packages */
@crt/package/package.sql

/* triggers */
/* TODO replace trigger with manual selection from sequence so id is returned.  */
@crt/trigger/request_id_seq.sql

/* we don't delete employees. They are employed or unemployed. should a delete
    option be added to the front end, it would mark the employee as "deleted", but
    not delete the entry in the database */
--@crt/trigger/emp_delete.sql


/* we haven't implemented the ability to set employees as training yet */
--@crt/trigger/before_ins_train.sql

commit;
/
