
create or replace function publish(eid numeric, d varchar)
returns void as
$BODY$
BEGIN
  if exists (SELECT 1 FROM published_schedule WHERE date_published=to_date(d, 'dd-mm-yyyy'))
    then
    update published_schedule
    set published_by = eid, date_published = (select current_timestamp)
    where start_date = to_date(d, 'dd-mm-yyyy');
  else
    insert into published_schedule(published_by, start_date, date_published)
    values(eid, to_date(d, 'dd-mm-yyyy'), (select current_timestamp));
  end if;
END
$BODY$
language plpgsql;
