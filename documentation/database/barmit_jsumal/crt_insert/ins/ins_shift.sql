/*
    this table represents every shift that occurs on a given day
    it may have weeday hours, weekend hours, or both
    
    id, position_id, task_name

*/

/* morning front shifts */
insert into BAJS_SHIFT values( 1 , 1, 'Opening Sup/Mgr');
insert into BAJS_SHIFT values( 2 , 1, 'Support Sup/Staff');
insert into BAJS_SHIFT values( 3 , 2, 'Front (tomatoes)');
insert into BAJS_SHIFT values( 4 , 2, 'Front (dressings)');
insert into BAJS_SHIFT values( 5 , 2, 'Front (register 1)');
insert into BAJS_SHIFT values( 6,  2, 'Front');
insert into BAJS_SHIFT values( 7 , 10,'Busser');
insert into BAJS_SHIFT values( 8 , 3, 'Cheese');
insert into BAJS_SHIFT values( 9 , 3, 'Meat');

/* evening front shifts */
insert into BAJS_SHIFT values( 10, 1, 'Closing Supervisor');
insert into BAJS_SHIFT values( 11, 3, 'Cold Prep');
insert into BAJS_SHIFT values( 12, 2, 'Register 1');
insert into BAJS_SHIFT values( 13, 2, 'Expedite');
insert into BAJS_SHIFT values( 14, 2, 'Front/Busser');

/* morning kitchen shifts */
insert into BAJS_SHIFT values( 15, 4, 'Kitchen Sup or Staff');
insert into BAJS_SHIFT values( 16, 5, 'Bakery');
insert into BAJS_SHIFT values( 17, 6, 'Grill');
insert into BAJS_SHIFT values( 18, 7, 'Salads');
insert into BAJS_SHIFT values( 25, 8, 'Support Staff');

/* evening kitchen shifts */
insert into BAJS_SHIFT values( 19, 7, 'Kitchen Sup or Staff');
insert into BAJS_SHIFT values( 20, 6, 'Grill');
insert into BAJS_SHIFT values( 21, 7, 'Salads');
insert into BAJS_SHIFT values( 22, 8, 'Support Staff');

/* monrning/evening Janitor shifts */
insert into BAJS_SHIFT values( 23, 9, 'Closing Janitor');
insert into BAJS_SHIFT values( 24, 9, 'Opening Janitor');

commit;
/                                       
