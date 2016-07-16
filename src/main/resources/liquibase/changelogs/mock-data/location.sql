-- Insert a business
insert into sequ_business(id, title, signup_date, addr_number, addr_street, addr_city, addr_state, addr_zip, phone) 
values((select nextval('sequ_business_id_seq')), 'Sequoia Sandwich', (select current_date), 1234, 'Example St.', 'Bakersfield', 'CA', 93312, '(661) 587-1600');

-- Insert a location
insert into sequ_location(id, business_id, signup_date, addr_number, addr_street, addr_city, addr_state, addr_zip, phone, name)
values((select nextval('sequ_location_id_seq')), (currval('sequ_business_id_seq')), (select current_date),
1234, 'Example St.', 'Bakersfield', 'CA', 93312, '(661) 587-1600', 'Rosedale');

-- make everything belong to that location
update sequ_published_schedule set location_id = (currval('sequ_location_id_seq')) where published_by > 0;
update sequ_employment_history set location_id = (currval('sequ_location_id_seq')) where user_id > 0;
update sequ_shift set location_id = (currval('sequ_location_id_seq')) where id > 0;
update sequ_holiday set location_id = (currval('sequ_location_id_seq')) where id > 0;
update sequ_delivery set location_id = (currval('sequ_location_id_seq')) where id > 0;

-- add another location
insert into sequ_location(id, business_id, signup_date, addr_number, addr_street, addr_city, addr_state, addr_zip, phone, name) 
values((select nextval('sequ_location_id_seq')), (currval('sequ_business_id_seq')), (select current_date),
5434, 'Next St.', 'Bakersfield', 'CA', 94412, '(661) 555-1600', 'Downtown');

-- make some employees have history at second location
insert into sequ_employment_history(user_id, date_employed, date_unemployed, location_id)
 values(1, (select current_date), null, (currval('sequ_location_id_seq')));
insert into sequ_employment_history(user_id, date_employed, date_unemployed, location_id)
 values(2, (select current_date), null, (currval('sequ_location_id_seq')));
insert into sequ_employment_history(user_id, date_employed, date_unemployed, location_id)
 values(3, (select current_date), null, (currval('sequ_location_id_seq')));
insert into sequ_employment_history(user_id, date_employed, date_unemployed, location_id)
 values(4, (select current_date), null, (currval('sequ_location_id_seq')));
insert into sequ_employment_history(user_id, date_employed, date_unemployed, location_id)
 values(51, (select current_date), null, (currval('sequ_location_id_seq')));


insert into sequ_shift values(default, 1, '2Opening Sup/Mgr',      to_date('05/01/2015', 'mm/dd/yyyy'), null, 1, 2, null, currval('sequ_location_id_seq'));
insert into sequ_shift values(default, 1, '2Support Sup/Staff',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 2, 2, null, currval('sequ_location_id_seq'));
insert into sequ_shift values(default, 2, '2Front (tomatoes)',     to_date('05/01/2015', 'mm/dd/yyyy'), null, 3, 3, null, currval('sequ_location_id_seq'));
insert into sequ_shift values(default, 2, '2Front (dressings)',    to_date('05/01/2015', 'mm/dd/yyyy'), null, 4, 4, null, currval('sequ_location_id_seq'));

insert into sequ_holiday values( default, to_date('12/25/2015', 'mm/dd/yyyy'), 'Christmas', '0000', '0000', currval('sequ_location_id_seq'));

insert into sequ_delivery values( default, 'Sysco',          false, true,  false, false, false, true,  false, currval('sequ_location_id_seq'));
insert into sequ_delivery values( default, 'Alpha Produce',  false, true,  true,  true,  false, true,  false, currval('sequ_location_id_seq'));

