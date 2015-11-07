/*
    Employees
    id, first_name, last_name, is_manager, birth_date, max_hours_per_week, phone_number, clock_number
*/

/* Supervisors */
insert into BAJS_employee values( 1, 'John',    'Doe',     1, to_date('12/04/1999', 'mm/dd/yyyy'), 40, '1234567890', 1 );
insert into BAJS_employee values( 2, 'Jane',    'Akachi',  1, to_date('12/04/1998', 'mm/dd/yyyy'), 40, '1234567890', 2 );
insert into BAJS_employee values( 3, 'Bob',     'Ping',    0, to_date('12/04/1997', 'mm/dd/yyyy'), 40, '1234567890', 3 );
insert into BAJS_employee values( 4, 'Susan',   'Jordan',  0, to_date('12/04/1996', 'mm/dd/yyyy'), 40, '1234567890', 4 );
insert into BAJS_employee values( 5, 'Chris',   'Tumelo',  0, to_date('12/04/1995', 'mm/dd/yyyy'), 40, '1234567890', 5 );

/* Kitchen Supervisors */
insert into BAJS_employee values( 6, 'Kamala',  'Agrippa', 0, to_date('12/04/1994', 'mm/dd/yyyy'), 40, '1234567890', 6 );
insert into BAJS_employee values( 7, 'Lei',     'Lindsey', 0, to_date('12/04/1993', 'mm/dd/yyyy'), 40, '1234567890', 7 );

/* Cold Prep */
insert into BAJS_employee values( 8, 'Sal',     'Finley',  0, to_date('12/04/1992', 'mm/dd/yyyy'), 40, '1234567890', 8 );
insert into BAJS_employee values( 9, 'Taonga',  'Noam',    0, to_date('12/04/1991', 'mm/dd/yyyy'), 40, '1234567890', 9 );
insert into BAJS_employee values( 10, 'Aston',  'Francis', 0, to_date('12/04/1990', 'mm/dd/yyyy'), 40, '1234567890', 10 );
insert into BAJS_employee values( 11, 'Mavuto', 'Leigh',   0, to_date('12/04/1989', 'mm/dd/yyyy'), 40, '1234567890', 11 );
insert into BAJS_employee values( 12, 'Steph',  'Vivian',  0, to_date('12/04/1988', 'mm/dd/yyyy'), 40, '1234567890', 12 );

/* Cashiers */
insert into BAJS_employee values( 13, 'Maria',  'Shiori',  0, to_date('12/04/1987', 'mm/dd/yyyy'), 40, '1234567890', 13 );
insert into BAJS_employee values( 14, 'Deniz',  'Romilda', 0, to_date('12/04/1986', 'mm/dd/yyyy'), 40, '1234567890', 14 );
insert into BAJS_employee values( 15, 'Jules',  'Riley',   0, to_date('12/04/1985', 'mm/dd/yyyy'), 40, '1234567890', 15 );
insert into BAJS_employee values( 16, 'Li',     'Yuki',    0, to_date('12/04/1984', 'mm/dd/yyyy'), 40, '1234567890', 16 );
insert into BAJS_employee values( 17, 'Sammie', 'Maayan',  0, to_date('12/04/1983', 'mm/dd/yyyy'), 40, '1234567890', 17 );
insert into BAJS_employee values( 18, 'Hadley', 'Khurshid',0, to_date('12/04/1982', 'mm/dd/yyyy'), 40, '1234567890', 18 );
insert into BAJS_employee values( 19, 'Chike',  'Rayan',   0, to_date('12/04/1981', 'mm/dd/yyyy'), 40, '1234567890', 19 );
insert into BAJS_employee values( 20, 'Udo',    'Hilary',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 20 );
insert into BAJS_employee values( 21, 'Udo',    'Hilary',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 21 );

/* Janitors */
insert into BAJS_employee values( 22, 'Udo',    'Hilary',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 22 );
insert into BAJS_employee values( 23, 'Lenny',  'Teo',     0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 23 );

/* Bakery */
insert into BAJS_employee values( 24, 'Zephyrus','Titu',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 24 );
insert into BAJS_employee values( 25, 'Shyama',  'Lennox', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 25 );
insert into BAJS_employee values( 26, 'Ulyses',  'Stiofan',0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 26 );
insert into BAJS_employee values( 27, 'Paora',   'Drusus', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 27 );

/* Grill */
insert into BAJS_employee values( 28, 'Ade',     'Anar',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 28 );
insert into BAJS_employee values( 29, 'Egill',   'Aldin',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 29 );
insert into BAJS_employee values( 30, 'Marcelli','Jerald', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 30 );
insert into BAJS_employee values( 31, 'Kasey',   'Kastor', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 31 );

/* Salads */
insert into BAJS_employee values( 32, 'Gina',    'Foster', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 32 );
insert into BAJS_employee values( 33, 'Aminta',  'Owain',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 33 );
insert into BAJS_employee values( 34, 'Devraj',  'Zaki',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 34 );
insert into BAJS_employee values( 35, 'Nikolas', 'Mudiwa', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 35 );

/* Other Kitchen */
insert into BAJS_employee values( 36, 'Gerhard', 'Flurry', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 36 );
insert into BAJS_employee values( 37, 'Vinzent', 'Ealaed', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 37 );

/* Bussers */
insert into BAJS_employee values( 38, 'Earl',    'Hearl',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 38 );
insert into BAJS_employee values( 39, 'Ash',     'Sash',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 39 );

/* Previous Employees */
insert into BAJS_employee values( 40, 'NEAyden',   'Vijlem', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 40 );
insert into BAJS_employee values( 41, 'NEAlpin',   'Edward', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 41 );
insert into BAJS_employee values( 42, 'NELevi',    'Mattaus',0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 42 );
insert into BAJS_employee values( 43, 'NEVolya',   'Kunibet',0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 43 );
insert into BAJS_employee values( 44, 'NEBoran',   'Thijs',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 44 );
insert into BAJS_employee values( 45, 'NETheodor', 'Meade',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 45 );
insert into BAJS_employee values( 46, 'NEIndra',   'Lugel',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 46 );
insert into BAJS_employee values( 47, 'NELoic',    'Olav',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 47 );
insert into BAJS_employee values( 48, 'NERoel',    'Yuki',   0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 48 );
insert into BAJS_employee values( 49, 'NECamden',  'Ghassen',0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 49 );
insert into BAJS_employee values( 50, 'NERob',     'Eemen',  0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, '1234567890', 50 );


commit;
/                                       
