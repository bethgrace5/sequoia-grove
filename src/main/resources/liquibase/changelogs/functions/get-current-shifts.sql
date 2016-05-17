create or replace function sequ_get_current_shifts(suppliedMon varchar)
returns table (
  sid integer,
  pid integer,
  task_name varchar(255),
  start_date date,
  end_date date,
  weekday_start varchar(255),
  weekday_end varchar(255),
  weekend_start varchar(255),
  weekend_end varchar(255)
) AS
$BODY$
SELECT * FROM (
  SELECT id AS sid, position_id AS pid, task_name, start_date, end_date,
  weekday_start, weekday_end, weekend_start, weekend_end FROM (
    SELECT * FROM (
      SELECT * FROM sequ_shift INNER JOIN (
        SELECT id AS weekday_id, start_hour AS weekday_start,
        end_hour AS weekday_end FROM sequ_hours
      ) weekday_hrs USING (weekday_id)
    ) new_shift INNER JOIN (
      SELECT id AS weekend_id, start_hour AS weekend_start,
      end_hour AS weekend_end FROM sequ_hours
    ) weekend_hrs USING (weekend_id)
  ) all_shift_info
) final_shift WHERE (
  start_date <= to_date( suppliedMon, $tokensu$dd-mm-yyyy$tokensu$) AND
  (end_date > to_date( suppliedMon, $tokensu$dd-mm-yyyy$tokensu$) OR end_date is null)
);
$BODY$
language sql;
