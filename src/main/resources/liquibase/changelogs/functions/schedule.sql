
create or replace function schedule(eid integer, sid integer, d varchar)
returns void as
$BODY$
BEGIN
  if exists (SELECT 1 FROM is_scheduled_for WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid) 
    then 
    UPDATE is_scheduled_for SET employee_id=eid WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid;
  else 
    INSERT INTO is_scheduled_for (employee_id, shift_id, on_date)
    values( eid, sid, to_date(d, 'dd-mm-yyyy'));
  end if;
END
$BODY$
language plpgsql;
