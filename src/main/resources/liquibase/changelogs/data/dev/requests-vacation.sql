-- employees submit requests for vacation
insert into REQUESTS_VACATION values(default,  1 , null, true,
    to_date('04-29-2016','mm-dd-yyyy'),
    to_date('04-30-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  2 , null, false,
    to_date('04-28-2016','mm-dd-yyyy'),
    to_date('04-29-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  3 , null, false,
    to_date('04-10-2016','mm-dd-yyyy'),
    to_date('04-12-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  4 , 14, true,
    to_date('04-12-2016','mm-dd-yyyy'),
    to_date('04-15-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  5 , 17, false,
    to_date('04-11-2016','mm-dd-yyyy'),
    to_date('04-12-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  6 , 20, false,
    to_date('04-09-2016','mm-dd-yyyy'),
    to_date('04-09-2016','mm-dd-yyyy'));
insert into REQUESTS_VACATION values(default,  7 , 4 , true,
    to_date('04-19-2016','mm-dd-yyyy'),
    to_date('04-22-2016','mm-dd-yyyy'));
