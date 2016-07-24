/*
    Employees with positions they've acquired
    employee_id, position_id, date_acquired, date_removed, is_primary, is_training
*/

/* Employees who have Supervisor positions*/
insert into HAS_POSITION values( 1 , 1,  to_date('12/01/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 2 , 1,  to_date('12/01/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 3 , 1,  to_date('12/01/2011', 'mm/dd/yyyy'), null, true, true);
insert into HAS_POSITION values( 4 , 1,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 5 , 1,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Kitchen Supervisor positions*/
insert into HAS_POSITION values( 6 , 5,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, true);
insert into HAS_POSITION values( 7 , 5,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 33 , 5,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 29, 5,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 28, 5,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Cold Prep positions*/
insert into HAS_POSITION values( 8 , 3,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 9 , 3,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, true);
insert into HAS_POSITION values( 10, 3,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 11, 3,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 12, 3,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Cashier positions*/
insert into HAS_POSITION values( 13, 2,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 14, 2,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 15, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 16, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 17, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 18, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 19, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 20, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 21, 2,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 3 , 1,  to_date('12/01/2001', 'mm/dd/yyyy'), to_date('11/20/2011', 'mm/dd/yyyy'), false, false);
insert into HAS_POSITION values( 4 , 1,  to_date('12/02/2001', 'mm/dd/yyyy'), to_date('11/20/2011', 'mm/dd/yyyy'), false, false);
insert into HAS_POSITION values( 5 , 1,  to_date('12/02/2001', 'mm/dd/yyyy'), to_date('11/20/2011', 'mm/dd/yyyy'), false, false);

/* Employees who have Janitor positions*/
insert into HAS_POSITION values( 22, 10,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 23, 10,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, true);
insert into HAS_POSITION values( 11, 10,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 12, 10,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 36, 10,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 37, 10,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Busser positions*/
insert into HAS_POSITION values( 38, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 39, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 15, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 19, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 18, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 21, 4, to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Bakery positions*/
insert into HAS_POSITION values( 24, 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 25, 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 26, 6,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 27, 6,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 32, 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 28, 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 37, 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 6 , 6,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, true);
insert into HAS_POSITION values( 7 , 6,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Grill positions*/
insert into HAS_POSITION values( 28, 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 29, 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 30, 7,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 31, 7,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 32, 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 33, 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 6 , 7,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 7 , 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 34, 7,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Salad positions*/
insert into HAS_POSITION values( 32, 8,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 33, 8,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 34, 8,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 35, 8,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 36, 8,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 30, 8,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 31, 8,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 6 , 8,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 7 , 8,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 37 , 8,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

/* Employees who have Other Kitchen positions*/
insert into HAS_POSITION values( 36, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 37, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 34, 9,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 35, 9,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 30, 9,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 31, 9,  to_date('12/04/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 6 , 9,  to_date('12/02/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 7 , 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 32, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 11, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 22, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 23, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);
insert into HAS_POSITION values( 33, 9,  to_date('12/03/2011', 'mm/dd/yyyy'), null, true, false);

