/*
    Employees
    id, first_name, last_name, is_manager, birth_date, max_hours_per_week, phone_number, clock_number
*/

/* Supervisors */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 1, 'John',    'Doe',     'email01@gmail.com', 1, to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 1 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 2, 'Jane',    'Akachi',  'email02@gmail.com', 1, to_date('12/04/1998', 'mm/dd/yyyy'), 40, 0, '1234567890', 2 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 3, 'Bob',     'Ping',    'email03@gmail.com', 0, to_date('12/04/1997', 'mm/dd/yyyy'), 40, 0, '1234567890', 3 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 4, 'Susan',   'Jordan',  'email04@gmail.com', 0, to_date('12/04/1996', 'mm/dd/yyyy'), 40, 0, '1234567890', 4 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 5, 'Chris',   'Tumelo',  'email05@gmail.com', 0, to_date('12/04/1995', 'mm/dd/yyyy'), 40, 0, '1234567890', 5 );

/* Kitchen Supervisors */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 6, 'Kamala',  'Agrippa', 'email06@gmail.com', 0, to_date('12/04/1994', 'mm/dd/yyyy'), 40, 0, '1234567890', 6 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 7, 'Lei',     'Lindsey', 'email07@gmail.com', 0, to_date('12/04/1993', 'mm/dd/yyyy'), 40, 0, '1234567890', 7 );

/* Cold Prep */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 8, 'Sal',     'Finley',  'email08@gmail.com', 0, to_date('12/04/1992', 'mm/dd/yyyy'), 40, 0, '1234567890', 8 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 9, 'Taonga',  'Noam',    'email09@gmail.com', 0, to_date('12/04/1991', 'mm/dd/yyyy'), 40, 0, '1234567890', 9 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 10, 'Aston',  'Francis', 'email10@gmail.com', 0, to_date('12/04/1990', 'mm/dd/yyyy'), 40, 0, '1234567890', 10 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 11, 'Mavuto', 'Leigh',   'email11@gmail.com', 0, to_date('12/04/1989', 'mm/dd/yyyy'), 40, 0, '1234567890', 11 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 12, 'Steph',  'Vivian',  'email12@gmail.com', 0, to_date('12/04/1988', 'mm/dd/yyyy'), 40, 0, '1234567890', 12 );

/* Cashiers */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 13, 'Maria',  'Shiori',  'email13@gmail.com', 0, to_date('12/04/1987', 'mm/dd/yyyy'), 40, 0, '1234567890', 13 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 14, 'Deniz',  'Romilda', 'email14@gmail.com', 0, to_date('12/04/1986', 'mm/dd/yyyy'), 40, 0, '1234567890', 14 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 15, 'Jules',  'Riley',   'email15@gmail.com', 0, to_date('12/04/1985', 'mm/dd/yyyy'), 40, 0, '1234567890', 15 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 16, 'Li',     'Yuki',    'email16@gmail.com', 0, to_date('12/04/1984', 'mm/dd/yyyy'), 40, 0, '1234567890', 16 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 17, 'Sammie', 'Maayan',  'email17@gmail.com', 0, to_date('12/04/1983', 'mm/dd/yyyy'), 40, 0, '1234567890', 17 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 18, 'Hadley', 'Khurshid','email18@gmail.com', 0, to_date('12/04/1982', 'mm/dd/yyyy'), 40, 0, '1234567890', 18 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 19, 'Chike',  'Rayan',   'email19@gmail.com', 0, to_date('12/04/1981', 'mm/dd/yyyy'), 40, 0, '1234567890', 19 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 20, 'Udo',    'Hilary',  'email20@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 20 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 21, 'Jin',    'Oivind',  'email21@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 21 );

/* Janitors */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 22, 'Borya',   'Yared',  'email22@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 22 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 23, 'Lenny',  'Teo',     'email23@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 23 );

/* Bakery */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 24, 'Zephyrus','Titu',   'email24@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 24 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 25, 'Shyama',  'Lennox', 'email25@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 25 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 26, 'Ulyses',  'Stiofan','email26@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 26 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 27, 'Paora',   'Drusus', 'email27@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 27 );

/* Grill */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 28, 'Ade',     'Anar',   'email28@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 28 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 29, 'Egill',   'Aldin',  'email29@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 29 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 30, 'Marcelli','Jerald', 'email30@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 30 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 31, 'Kasey',   'Kastor', 'email31@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 31 );

/* Salads */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 32, 'Gina',    'Foster', 'email32@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 32 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 33, 'Aminta',  'Owain',  'email33@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 33 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 34, 'Devraj',  'Zaki',   'email34@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 34 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 35, 'Nikolas', 'Mudiwa', 'email35@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 35 );

/* Other Kitchen */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 36, 'Gerhard', 'Flurry', 'email36@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 36 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 37, 'Vinzent', 'Ealaed', 'email37@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 37 );

/* Bussers */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 38, 'Earl',    'Hearl',  'email38@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 38 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 39, 'Ash',     'Sash',   'email39@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 39 );

/* Previous Employees */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 40, 'Ayden',   'Vijlem', 'email40@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 40 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 41, 'Alpin',   'Edward', 'email41@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 41 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 42, 'Levi',    'Mattaus','email42@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 42 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 43, 'Volya',   'Kunibet','email43@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 43 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 44, 'Boran',   'Thijs',  'email44@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 44 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 45, 'Theodor', 'Meade',  'email45@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 45 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 46, 'Indra',   'Lugel',  'email46@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 46 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 47, 'Loic',    'Olav',   'email47@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 47 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 48, 'Roel',    'Yuki',   'email48@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 48 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 49, 'Camden',  'Ghassen','email49@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 49 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 50, 'Rob',     'Eemen',  'email50@gmail.com', 0, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 50 );

/* real test users */
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 51, 'Beth',  'Armitage','bethgrace5@gmail.com', 1, to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 51 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 52, 'Sunny', 'Sumal','sunnysumal@gmail.com', 1,    to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 52 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 53, 'Ted',   'Pascua','tedlpascua@gmail.com', 1,   to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 53 );
select bajs_employee_id_sequence.nextval from dual;
insert into BAJS_employee values( 54, 'AJ',    'Silva','therealajsilva@gmail.com', 1,to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 54 );


commit;
/                                       
