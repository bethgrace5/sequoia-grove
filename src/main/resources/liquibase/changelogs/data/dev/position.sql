/*
    The possible positions/roles an employee can obtain
*/

/* Front Positions */
insert into POSITION values((select nextval('position_id_seq')), 'Supervisor',         'front');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Opening Sup/Mgr',      to_date('05/01/2015', 'mm/dd/yyyy'), null, 1, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Support Sup/Staff',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Closing Supervisor',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 9, 9);
insert into shift values(default, (select currval('position_id_seq')), 'old opening sup/mgr',      to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  1, 1);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Support Sup/Staff',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Closing Supervisor',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  9, 9);

insert into POSITION values((select nextval('position_id_seq')), 'Cashier',            'front');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Front (tomatoes)',     to_date('05/01/2015', 'mm/dd/yyyy'), null, 3, 3);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Front (dressings)',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 4, 4);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Front (register 1)',   to_date('05/01/2015', 'mm/dd/yyyy'), null, 5, 5);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Front',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 6, 6);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Register 1',           to_date('05/01/2015', 'mm/dd/yyyy'), null,11,11);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Expedite',             to_date('05/01/2015', 'mm/dd/yyyy'), null,13,13);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Front (tomatoes)',     to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  3, 3);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Front (dressings)',    to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  4, 4);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Front (register 1)',   to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  5, 5);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Front',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  6, 6);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Register 1',           to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 11,11);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Expedite',             to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 13,13);

insert into POSITION values((select nextval('position_id_seq')), 'Cold Prep',          'front');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Cheese',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Meat',                 to_date('05/01/2015', 'mm/dd/yyyy'), null, 8, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Cold Prep',            to_date('05/01/2015', 'mm/dd/yyyy'), null,10,10);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Cheese',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 8);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Meat',                 to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 8);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Cold Prep',            to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 10,10);

insert into POSITION values((select nextval('position_id_seq')), 'Busser',              'front');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Busser',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 7, 7);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Front/Busser',         to_date('05/01/2015', 'mm/dd/yyyy'), null,12,12);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Busser',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  2, 7);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Front/Busser',         to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 12,12);

/* Kitchen Positions */
insert into POSITION values((select nextval('position_id_seq')), 'Kitchen Supervisor', 'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Kitchen Sup or Staff', to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Kitchen Sup or Staff', to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

insert into POSITION values((select nextval('position_id_seq')), 'Bakery',             'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Bakery',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Bakery',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

insert into POSITION values((select nextval('position_id_seq')), 'Grill',              'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Grill',                to_date('05/01/2015', 'mm/dd/yyyy'), null,14,14);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Grill',                to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'), 14,14);

insert into POSITION values((select nextval('position_id_seq')), 'Salads',             'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Salads',               to_date('05/01/2015', 'mm/dd/yyyy'), null,12,12);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Salads',               to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

insert into POSITION values((select nextval('position_id_seq')), 'Other Kitchen',      'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Support Staff',        to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2);
insert into SHIFT values(default, (select currval('position_id_seq')), 'OLD Support Staff',        to_date('05/01/2014', 'mm/dd/yyyy'),to_date('04/30/2015', 'mm/dd/yyyy'),  8, 2);

insert into POSITION values((select nextval('position_id_seq')), 'Janitor',             'kitchen');
insert into SHIFT values(default, (select currval('position_id_seq')), 'Closing Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,11,11);
insert into SHIFT values(default, (select currval('position_id_seq')), 'Opening Janitor',      to_date('05/01/2015', 'mm/dd/yyyy'), null,12,12);

