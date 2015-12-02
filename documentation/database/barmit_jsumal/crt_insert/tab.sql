
/*
select * 
from tab t
where substr(t.tname, 1, 4) = 'BAJS'
*/

select table_name, avg_row_len,  num_rows as space
from all_tables t
where substr(t.table_name, 1, 4) = 'BAJS'

/
