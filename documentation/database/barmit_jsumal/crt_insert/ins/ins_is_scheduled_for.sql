/* 
    Schedule

    Each block is employees scheduled for that specific day

    There is exactly one of each shift scheduled per day, except in the case 
    that an employee is training for a shift, but there are never more than two

    There is no more than one employee scheduled for the day, except in the case
    that they work two shifts (overtime), but never more than twice per day

    employee_id, shift_id, on_date
 */

/* 1 Monday */
insert into BAJS_IS_SCHEDULED_FOR values( 1, 1 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 2, 2 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(13, 3 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 4 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(15, 5 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(16, 6 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(38, 7 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 8 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 9, 9 , to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 3, 10, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(10, 11, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 12, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 13, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 14, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 6, 15, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(24, 16, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(28, 17, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 18, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 25, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(31, 19, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(29, 20, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(34, 21, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 22, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 23, to_date('11/02/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(22, 24, to_date('11/02/2015', 'mm/dd/yyyy'));


/* 1 Tuesday */
insert into BAJS_IS_SCHEDULED_FOR values( 1, 1 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 2, 2 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 3 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(15, 4 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 5 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 6 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(38, 7 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 9, 8 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(10, 9 , to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 3, 10, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 11, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 12, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 13, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 14, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 6, 15, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(24, 16, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(30, 17, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 18, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 19, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 7, 20, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(34, 21, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 22, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(23, 23, to_date('11/03/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(12, 24, to_date('11/03/2015', 'mm/dd/yyyy'));

/* 1 Wednesday */
insert into BAJS_IS_SCHEDULED_FOR values( 4, 1 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 5, 2 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(16, 3 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(13, 4 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 5 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 6 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(38, 7 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 8 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 9 , to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 1, 10, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 9, 11, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 12, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 13, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 14, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 6, 15, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(25, 16, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(29, 17, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 18, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(31, 19, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(28, 20, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(34, 21, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 22, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(22, 23, to_date('11/04/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(12, 24, to_date('11/04/2015', 'mm/dd/yyyy'));

/* 1 Thursday */
insert into BAJS_IS_SCHEDULED_FOR values( 3, 1 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 4, 2 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 3 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(15, 4 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 5 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 6 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(39, 7 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(12, 8 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 9 , to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 5, 10, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(10, 11, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 12, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 13, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 14, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 6, 15, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(25, 16, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(31, 17, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(35, 18, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 19, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 20, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(30, 21, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(34, 22, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(22, 23, to_date('11/05/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(23, 24, to_date('11/05/2015', 'mm/dd/yyyy'));

/* 1 Friday */
insert into BAJS_IS_SCHEDULED_FOR values( 1, 1 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 5, 2 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 3 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 4 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 5 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 6 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(39, 7 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(12, 8 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 9 , to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 4, 10, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 11, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 12, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(16, 13, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(15, 14, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 7, 15, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(26, 16, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(28, 17, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(34, 18, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 19, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 20, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(30, 21, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 22, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(23, 23, to_date('11/06/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 24, to_date('11/06/2015', 'mm/dd/yyyy'));

/* 1 Saturday */
insert into BAJS_IS_SCHEDULED_FOR values( 3, 1 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 4, 2 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 3 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(13, 4 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 5 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 6 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(39, 7 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 9, 8 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 9 , to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 5, 10, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 11, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 12, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 13, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 14, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 7, 15, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(27, 16, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 17, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 18, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(31, 19, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(28, 20, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(30, 21, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 22, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(22, 23, to_date('11/07/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(23, 24, to_date('11/07/2015', 'mm/dd/yyyy'));

/* 1 Sunday */
insert into BAJS_IS_SCHEDULED_FOR values( 3, 1 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 4, 2 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(14, 3 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(13, 4 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(20, 5 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(21, 6 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(39, 7 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 9, 8 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 8, 9 , to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 5, 10, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(11, 11, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(18, 12, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(17, 13, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(19, 14, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values( 7, 15, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(27, 16, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(32, 17, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(33, 18, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(37, 25, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(31, 19, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(28, 20, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(30, 21, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(36, 22, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(22, 23, to_date('11/08/2015', 'mm/dd/yyyy'));
insert into BAJS_IS_SCHEDULED_FOR values(23, 24, to_date('11/08/2015', 'mm/dd/yyyy'));

commit;
/                                       
