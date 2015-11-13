
/*
    this table represents every NEW_SHIFT that occurs on a given day
    it may have weeday hours, weekend hours, or both
    
    id, position_id, task_name, start_date, end_date, weekday_id, weekend_id

*/

 -- CURRENT NEW_SHIFTs
    /* morning front NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 1 , 1, 'Opening Sup/Mgr',      to_date('05/01/2015', 'mm/dd/yyyy'), null, 1, 2);
    insert into BAJS_NEW_SHIFT values( 2 , 1, 'Support Sup/Staff',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
    insert into BAJS_NEW_SHIFT values( 3 , 2, 'Front (tomatoes)',     to_date('05/01/2015', 'mm/dd/yyyy'), null, 3, 3);
    insert into BAJS_NEW_SHIFT values( 4 , 2, 'Front (dressings)',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 4, 4);
    insert into BAJS_NEW_SHIFT values( 5 , 2, 'Front (register 1)',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 5, 5);
    insert into BAJS_NEW_SHIFT values( 6,  2, 'Front',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 6, 6);
    insert into BAJS_NEW_SHIFT values( 7 , 10,'Busser',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 7, 7);
    insert into BAJS_NEW_SHIFT values( 8 , 3, 'Cheese',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);
    insert into BAJS_NEW_SHIFT values( 9 , 3, 'Meat',                 to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);

    /* evening front NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 10, 1, 'Closing Supervisor',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 9, 9);
    insert into BAJS_NEW_SHIFT values( 11, 3, 'Cold Prep',            to_date('05/01/2015', 'mm/dd/yyyy'), null,10,10);
    insert into BAJS_NEW_SHIFT values( 12, 2, 'Register 1',           to_date('05/01/2015', 'mm/dd/yyyy'), null,11,11);
    insert into BAJS_NEW_SHIFT values( 13, 2, 'Expedite',             to_date('05/01/2015', 'mm/dd/yyyy'), null,14,14);
    insert into BAJS_NEW_SHIFT values( 14, 2, 'Front/Busser',         to_date('05/01/2015', 'mm/dd/yyyy'), null,12,12);

    /* morning kitchen NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 15, 4, 'Kitchen Sup or Staff', to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
    insert into BAJS_NEW_SHIFT values( 16, 5, 'Bakery',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
    insert into BAJS_NEW_SHIFT values( 17, 6, 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
    insert into BAJS_NEW_SHIFT values( 18, 7, 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
    insert into BAJS_NEW_SHIFT values( 25, 8, 'Support Staff',        to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);

    /* evening kitchen NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 19, 7, 'Kitchen Sup or Staff', to_date('05/01/2015', 'mm/dd/yyyy'), null,14,14);
    insert into BAJS_NEW_SHIFT values( 20, 6, 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null,15,15);
    insert into BAJS_NEW_SHIFT values( 21, 7, 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null,16,16);
    insert into BAJS_NEW_SHIFT values( 22, 8, 'Support Staff',        to_date('05/01/2015', 'mm/dd/yyyy'), null,15,15);

    /* monrning/evening Janitor NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 23, 9, 'Closing Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,16,16);
    insert into BAJS_NEW_SHIFT values( 24, 9, 'Opening Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,17,17);

 -- PAST 
    /* morning front NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 31 , 1, 'OLD Opening Sup/Mgr',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  1, 1);
    insert into BAJS_NEW_SHIFT values( 32 , 1, 'OLD Support Sup/Staff',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 2);
    insert into BAJS_NEW_SHIFT values( 33 , 2, 'OLD Front (tomatoes)',     to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  3, 3);
    insert into BAJS_NEW_SHIFT values( 34 , 2, 'OLD Front (dressings)',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  4, 4);
    insert into BAJS_NEW_SHIFT values( 35 , 2, 'OLD Front (register 1)',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  5, 5);
    insert into BAJS_NEW_SHIFT values( 36,  2, 'OLD Front',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  6, 6);
    insert into BAJS_NEW_SHIFT values( 37 , 10,'OLD Busser',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 7);
    insert into BAJS_NEW_SHIFT values( 38 , 3, 'OLD Cheese',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 8);
    insert into BAJS_NEW_SHIFT values( 39 , 3, 'OLD Meat',                 to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 8);

    /* evening front NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 40, 1, 'OLD Closing Supervisor',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  9, 9);
    insert into BAJS_NEW_SHIFT values( 41, 3, 'OLD Cold Prep',            to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 10,10);
    insert into BAJS_NEW_SHIFT values( 42, 2, 'OLD Register 1',           to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 11,11);
    insert into BAJS_NEW_SHIFT values( 43, 2, 'OLD Expedite',             to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 14,14);
    insert into BAJS_NEW_SHIFT values( 44, 2, 'OLD Front/Busser',         to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 12,12);

    /* morning kitchen NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 45, 4, 'OLD Kitchen Sup or Staff', to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
    insert into BAJS_NEW_SHIFT values( 46, 5, 'OLD Bakery',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
    insert into BAJS_NEW_SHIFT values( 47, 6, 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
    insert into BAJS_NEW_SHIFT values( 48, 7, 'OLD Salads',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
    insert into BAJS_NEW_SHIFT values( 49, 8, 'OLD Support Staff',        to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

    /* evening kitchen NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 50, 7, 'OLD Kitchen Sup or Staff', to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 14,14);
    insert into BAJS_NEW_SHIFT values( 51, 6, 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 15,15);
    insert into BAJS_NEW_SHIFT values( 52, 7, 'OLD Salads',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 16,16);
    insert into BAJS_NEW_SHIFT values( 53, 8, 'OLD Support Staff',        to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 15,15);

    /* monrning/evening Janitor NEW_SHIFTs */
    insert into BAJS_NEW_SHIFT values( 54, 9, 'OLD Closing Janitor',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 16,16);
    insert into BAJS_NEW_SHIFT values( 55, 9, 'OLD Opening Janitor',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 17,17);



commit;
/                                       
