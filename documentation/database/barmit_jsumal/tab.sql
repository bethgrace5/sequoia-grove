
/*
select * 
from tab t
where substr(t.tname, 1, 4) = 'BAJS'
*/

select view_name
from all_views v
where substr(v.view_name, 1, 4) = 'BAJS'
/
select trigger_name, status, table_name
from all_triggers r
where substr(r.trigger_name, 1, 4) = 'BAJS'
/
select sequence_name, cache_size
from all_sequences s
where substr(s.sequence_name, 1, 4) = 'BAJS'
/
select table_name, avg_row_len,  num_rows as space
from all_tables t
where substr(t.table_name, 1, 4) = 'BAJS'
/
