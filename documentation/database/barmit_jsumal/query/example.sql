/*
select g.*
from guest g, book b, guest jd, book jb
where NOT EXISTS(g.gno = b.gno and jd.gno = “John Doe” and jd.gno = jb.gno and b.hno = jb.hno and g.gno != jd.gno);
*/


/*Find all employees who have been scheduled to work as a closing janitor.*/


/*
select hno, count (*) "No of Rooms"
from hotel natural join room
group by hno
*/

/*
select hotel.hno, hname, count(*)
from hotel left outer join room on hotel.hno = room.hno
group by hotel.hno, hname
*/

/* so it doesn't count the null values */
/*
select hotel.hno, hname, count(room.rno)
from hotel left outer join room on hotel.hno = room.hno
group by hotel.hno, hname
*/

/*
select hname, hno, min(price) "Cheapest Room", max(price) "Most Expensive Room", avg(price) Average 
from hotel natural join room
group by hname, hno
*/

/*
select hname, hno, min(price) "Cheapest Room", max(price) "Most Expensive Room", avg(price) Average 
from hotel natural join room
group by hname, hno
having min(price) > 100
order by hname, hno
*/

/
