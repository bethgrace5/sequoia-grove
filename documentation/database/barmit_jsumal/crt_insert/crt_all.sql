
/* sequences */
create sequence bajs_emp_seq
minvalue 1
maxvalue 99999
start with 1
increment by 1
cache 20;

/* sequences */
create sequence bajs_request_seq
minvalue 1
maxvalue 99999
start with 1
increment by 1
cache 20;

/* base tables */
@crt/table/crt_hours.sql
@crt/table/crt_employee.sql
@crt/table/crt_holiday.sql
@crt/table/crt_employment_history.sql
--@crt/table/crt_user.sql
@crt/table/crt_availability.sql
@crt/table/crt_cannot_work_with.sql
@crt/table/crt_supplier.sql
--@crt/table/crt_ingredient.sql
--@crt/table/crt_delivered_by.sql
@crt/table/crt_position.sql
@crt/table/crt_new_shift.sql
@crt/table/crt_has_position.sql
--@crt/table/crt_shift.sql
@crt/table/crt_is_scheduled_for.sql
--@crt/table/crt_weekday_hours.sql
--@crt/table/crt_weekend_hours.sql
--@crt/table/crt_menu_item.sql
--@crt/table/crt_orders.sql
@crt/table/crt_requests_vacation.sql
--@crt/table/crt_transaction.sql
--@crt/table/crt_sold_in.sql
--@crt/table/crt_used_in.sql
@crt/table/crt_published_schedule.sql

/* views */
@crt/view/crt_sch_template.sql
@crt/view/crt_sch_hist.sql
@crt/view/crt_schedule.sql
@crt/view/crt_std_emp.sql
@crt/view/crt_training_emp.sql
@crt/view/crt_avail.sql
@crt/view/crt_positions.sql
@crt/view/crt_hist.sql
@crt/view/crt_emp_all_info.sql

/* packages */
@crt/package/package.sql

/* triggers */
@crt/trigger/emp_id_seq.sql
@crt/trigger/request_id_seq.sql
@crt/trigger/emp_delete.sql
@crt/trigger/before_ins_train.sql
--@crt/trigger/change_tid.sql

commit;
/
