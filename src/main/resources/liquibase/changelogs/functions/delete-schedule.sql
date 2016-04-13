
create or replace function delete_schedule(sid integer, d varchar)
returns void as
$BODY$
BEGIN
  if exists (SELECT 1 FROM is_scheduled_for WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid) 
    then 
    delete from is_scheduled_for
    WHERE on_date=to_date(d, 'dd-mm-yyyy') and shift_id = sid;
  end if;
END
$BODY$
language plpgsql;
