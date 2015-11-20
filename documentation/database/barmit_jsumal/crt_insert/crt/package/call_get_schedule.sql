
/*
 * Call function get_schedule(<params>) from Package bajs_pkg
 */

select * from table(bajs_pkg.get_schedule( 
        '02/11/2015',
        '03/11/2015',
        '04/11/2015',
        '05/11/2015',
        '06/11/2015',
        '07/11/2015',
        '08/11/2015'));


/*
 * Call procedure add_holiday(<params>) from Package bajs_pkg
 */
--exec bajs_pkg.add_holiday('44/44', 'May Day4', 'full');
--select * from bajs_holiday

-- eid, sid, day
--exec bajs_pkg.schedule(8, 1, '16-11-2015');
--select * from bajs_is_scheduled_for
--where on_date = to_date('16-11-2015', 'dd-mm-yyyy')
--8
--1
--16-11-2015


/*
 * Call procedure delete_ingredient(<params>) from Package bajs_pkg
 */


/
