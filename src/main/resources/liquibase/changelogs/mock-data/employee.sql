/*
    Employees
    id, first_name, last_name, email, is_manager, birth_date, max_hours_per_week, phone_number, clock_number
*/

/* Supervisors */
insert into employee values(default, 'John',    'Doe',     'email01@gmail.com', true, to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 1 );
insert into employee values(default, 'Jane',    'Akachi',  'email02@gmail.com', true, to_date('12/04/1998', 'mm/dd/yyyy'), 40, 0, '1234567890', 2 );
insert into employee values(default, 'Bob',     'Ping',    'email03@gmail.com', false, to_date('12/04/1997', 'mm/dd/yyyy'), 40, 0, '1234567890', 3 );
insert into employee values(default, 'Susan',   'Jordan',  'email04@gmail.com', false, to_date('12/04/1996', 'mm/dd/yyyy'), 40, 0, '1234567890', 4 );
insert into employee values(default, 'Chris',   'Tumelo',  'email05@gmail.com', false, to_date('12/04/1995', 'mm/dd/yyyy'), 40, 0, '1234567890', 5 );

/* Kitchen Supervisors */
insert into employee values(default, 'Kamala',  'Agrippa', 'email06@gmail.com', false, to_date('12/04/1994', 'mm/dd/yyyy'), 40, 0, '1234567890', 6 );
insert into employee values(default, 'Lei',     'Lindsey', 'email07@gmail.com', false, to_date('12/04/1993', 'mm/dd/yyyy'), 40, 0, '1234567890', 7 );

/* Cold Prep */
insert into employee values(default, 'Sal',     'Finley',  'email08@gmail.com', false, to_date('12/04/1992', 'mm/dd/yyyy'), 40, 0, '1234567890', 8 );
insert into employee values(default, 'Taonga',  'Noam',    'email09@gmail.com', false, to_date('12/04/1991', 'mm/dd/yyyy'), 40, 0, '1234567890', 9 );
insert into employee values(default, 'Aston',  'Francis', 'email10@gmail.com', false, to_date('12/04/1990', 'mm/dd/yyyy'), 40, 0, '1234567890', 10 );
insert into employee values(default, 'Mavuto', 'Leigh',   'email11@gmail.com', false, to_date('12/04/1989', 'mm/dd/yyyy'), 40, 0, '1234567890', 11 );
insert into employee values(default, 'Steph',  'Vivian',  'email12@gmail.com', false, to_date('12/04/1988', 'mm/dd/yyyy'), 40, 0, '1234567890', 12 );

/* Cashiers */
insert into employee values(default, 'Maria',  'Shiori',  'email13@gmail.com', false, to_date('12/04/1987', 'mm/dd/yyyy'), 40, 0, '1234567890', 13 );
insert into employee values(default, 'Deniz',  'Romilda', 'email14@gmail.com', false, to_date('12/04/1986', 'mm/dd/yyyy'), 40, 0, '1234567890', 14 );
insert into employee values(default, 'Jules',  'Riley',   'email15@gmail.com', false, to_date('12/04/1985', 'mm/dd/yyyy'), 40, 0, '1234567890', 15 );
insert into employee values(default, 'Li',     'Yuki',    'email16@gmail.com', false, to_date('12/04/1984', 'mm/dd/yyyy'), 40, 0, '1234567890', 16 );
insert into employee values(default, 'Sammie', 'Maayan',  'email17@gmail.com', false, to_date('12/04/1983', 'mm/dd/yyyy'), 40, 0, '1234567890', 17 );
insert into employee values(default, 'Hadley', 'Khurshid','email18@gmail.com', false, to_date('12/04/1982', 'mm/dd/yyyy'), 40, 0, '1234567890', 18 );
insert into employee values(default, 'Chike',  'Rayan',   'email19@gmail.com', false, to_date('12/04/1981', 'mm/dd/yyyy'), 40, 0, '1234567890', 19 );
insert into employee values(default, 'Udo',    'Hilary',  'email20@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 20 );
insert into employee values(default, 'Jin',    'Oivind',  'email21@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 21 );

/* Janitors */
insert into employee values(default, 'Borya',   'Yared',  'email22@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 22 );
insert into employee values(default, 'Lenny',  'Teo',     'email23@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 23 );

/* Bakery */
insert into employee values(default, 'Zephyrus','Titu',   'email24@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 24 );
insert into employee values(default, 'Shyama',  'Lennox', 'email25@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 25 );
insert into employee values(default, 'Ulyses',  'Stiofan','email26@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 26 );
insert into employee values(default, 'Paora',   'Drusus', 'email27@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 27 );

/* Grill */
insert into employee values(default, 'Ade',     'Anar',   'email28@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 28 );
insert into employee values(default, 'Egill',   'Aldin',  'email29@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 29 );
insert into employee values(default, 'Marcelli','Jerald', 'email30@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 30 );
insert into employee values(default, 'Kasey',   'Kastor', 'email31@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 31 );

/* Salads */
insert into employee values(default, 'Gina',    'Foster', 'email32@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 32 );
insert into employee values(default, 'Aminta',  'Owain',  'email33@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 33 );
insert into employee values(default, 'Devraj',  'Zaki',   'email34@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 34 );
insert into employee values(default, 'Nikolas', 'Mudiwa', 'email35@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 35 );

/* Other Kitchen */
insert into employee values(default, 'Gerhard', 'Flurry', 'email36@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 36 );
insert into employee values(default, 'Vinzent', 'Ealaed', 'email37@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 37 );

/* Bussers */
insert into employee values(default, 'Earl',    'Hearl',  'email38@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 38 );
insert into employee values(default, 'Ash',     'Sash',   'email39@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 39 );

/* Previous Employees */
insert into employee values(default, 'Ayden',   'Vijlem', 'email40@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 40 );
insert into employee values(default, 'Alpin',   'Edward', 'email41@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 41 );
insert into employee values(default, 'Levi',    'Mattaus','email42@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 42 );
insert into employee values(default, 'Volya',   'Kunibet','email43@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 43 );
insert into employee values(default, 'Boran',   'Thijs',  'email44@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 44 );
insert into employee values(default, 'Theodor', 'Meade',  'email45@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 45 );
insert into employee values(default, 'Indra',   'Lugel',  'email46@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 46 );
insert into employee values(default, 'Loic',    'Olav',   'email47@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 47 );
insert into employee values(default, 'Roel',    'Yuki',   'email48@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 48 );
insert into employee values(default, 'Camden',  'Ghassen','email49@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 49 );
insert into employee values(default, 'Rob',     'Eemen',  'email50@gmail.com', false, to_date('12/04/1980', 'mm/dd/yyyy'), 40, 0, '1234567890', 50 );

/* real test users */
insert into employee values(default, 'Beth',  'Armitage','bethgrace5@gmail.com', true, to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 51 );
insert into employee values(default, 'Sunny', 'Sumal','sunnysumal@gmail.com', true,    to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 52 );
insert into employee values(default, 'Ted',   'Pascua','tedlpascua@gmail.com', true,   to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 53 );
insert into employee values(default, 'AJ',    'Silva','therealajsilva@gmail.com', true,to_date('12/04/1999', 'mm/dd/yyyy'), 40, 0, '1234567890', 54 );

