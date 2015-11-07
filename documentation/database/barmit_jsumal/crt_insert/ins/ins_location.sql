/*
    The possible locations an position can be located
*/

/* Front */
insert into BAJS_LOCATION values('Supervisor',          'front');
insert into BAJS_LOCATION values('Cashier',             'front');
insert into BAJS_LOCATION values('Cold Prep',           'front');

/* kitchen */
insert into BAJS_LOCATION values('Kitchen Supervisor',  'kitchen');
insert into BAJS_LOCATION values('Bakery',              'kitchen');
insert into BAJS_LOCATION values('Grill',               'kitchen');
insert into BAJS_LOCATION values('Salads',              'kitchen');

/* both */
insert into BAJS_LOCATION values('Janitor',             'Kitchen');
insert into BAJS_LOCATION values('Busser',              'Front');

commit;
/                                       
