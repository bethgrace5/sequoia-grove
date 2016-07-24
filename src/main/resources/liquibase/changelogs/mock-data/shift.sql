/*
    this table represents every SHIFT that occurs on a given day
    it may have weeday hours, weekend hours, or both
    
    id, position_id, task_name, start_date, end_date, weekday_id, weekend_id
*/

 -- CURRENT SHIFTs
/* morning front SHIFTs */
insert into SHIFT values(default, 1, 'Opening Sup/Mgr',      to_date('05/01/2015', 'mm/dd/yyyy'), null, 1, 2);
insert into SHIFT values(default, 1, 'Support Sup/Staff',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, 2, 'Front (tomatoes)',     to_date('05/01/2015', 'mm/dd/yyyy'), null, 3, 3);
insert into SHIFT values(default, 2, 'Front (dressings)',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 4, 4);
insert into SHIFT values(default, 2, 'Front (register 1)',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 5, 5);
insert into SHIFT values(default, 2, 'Front',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 6, 6);
insert into SHIFT values(default, 4,'Busser',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 7, 7);
insert into SHIFT values(default, 3, 'Cheese',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);
insert into SHIFT values(default, 3, 'Meat',                 to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);

/* evening front SHIFTs */
insert into SHIFT values(default, 1, 'Closing Supervisor',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 9, 9);
insert into SHIFT values(default, 3, 'Cold Prep',            to_date('05/01/2015', 'mm/dd/yyyy'), null,10,10);
insert into SHIFT values(default, 2, 'Register 1',           to_date('05/01/2015', 'mm/dd/yyyy'), null,11,11);
insert into SHIFT values(default, 2, 'Expedite',             to_date('05/01/2015', 'mm/dd/yyyy'), null,14,14);

insert into SHIFT values(default, 4, 'Front/Busser',         to_date('05/01/2015', 'mm/dd/yyyy'), null,12,12);

/* morning kitchen SHIFTs */
insert into SHIFT values(default, 5, 'Kitchen Sup or Staff', to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, 6, 'Bakery',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, 7, 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, 8, 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, 9, 'Support Staff',        to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);

/* evening kitchen SHIFTs */
insert into SHIFT values(default, 5, 'Kitchen Sup or Staff', to_date('05/01/2015', 'mm/dd/yyyy'), null,14,14);
insert into SHIFT values(default, 7, 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null,15,15);
insert into SHIFT values(default, 8, 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null,16,16);
insert into SHIFT values(default, 9, 'Support Staff',        to_date('05/01/2015', 'mm/dd/yyyy'), null,15,15);

/* monrning/evening Janitor SHIFTs */
insert into SHIFT values(default, 10, 'Closing Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,16,16);
insert into SHIFT values(default, 10, 'Opening Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,16,16);

-- PAST 
/* morning front SHIFTs */
insert into SHIFT values(default, 1, 'OLD Opening Sup/Mgr',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  1, 1);
insert into SHIFT values(default, 1, 'OLD Support Sup/Staff',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 2);
insert into SHIFT values(default, 2, 'OLD Front (tomatoes)',     to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  3, 3);
insert into SHIFT values(default, 2, 'OLD Front (dressings)',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  4, 4);
insert into SHIFT values(default, 2, 'OLD Front (register 1)',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  5, 5);
insert into SHIFT values(default, 2, 'OLD Front',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  6, 6);
insert into SHIFT values(default, 4,'OLD Busser',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 7);
insert into SHIFT values(default, 3, 'OLD Cheese',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 8);
insert into SHIFT values(default, 3, 'OLD Meat',                 to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 8);

/* evening front SHIFTs */
insert into SHIFT values(default, 1, 'OLD Closing Supervisor',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  9, 9);
insert into SHIFT values(default, 3, 'OLD Cold Prep',            to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 10,10);
insert into SHIFT values(default, 2, 'OLD Register 1',           to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 11,11);
insert into SHIFT values(default, 2, 'OLD Expedite',             to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 14,14);
insert into SHIFT values(default, 4, 'OLD Front/Busser',         to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 12,12);

/* morning kitchen SHIFTs */
insert into SHIFT values(default, 5, 'OLD Kitchen Sup or Staff', to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
insert into SHIFT values(default, 6, 'OLD Bakery',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
insert into SHIFT values(default, 7, 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
insert into SHIFT values(default, 8, 'OLD Salads',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
insert into SHIFT values(default, 9, 'OLD Support Staff',        to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

/* evening kitchen SHIFTs */
insert into SHIFT values(default, 5, 'OLD Kitchen Sup or Staff', to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 14,14);
insert into SHIFT values(default, 7, 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 15,15);
insert into SHIFT values(default, 8, 'OLD Salads',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 16,16);
insert into SHIFT values(default, 9, 'OLD Support Staff',        to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 15,15);

/* monrning/evening Janitor SHIFTs */
insert into SHIFT values(default, 10, 'OLD Closing Janitor',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 16,16);
insert into SHIFT values(default, 10, 'OLD Opening Janitor',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 16,16);

