-- reset sequences
ALTER SEQUENCE sequ_business_id_seq RESTART WITH 1 MAXVALUE 1000;
ALTER SEQUENCE sequ_location_id_seq RESTART WITH 1 MAXVALUE 1000;

-- add sequences to their corresponding columns
ALTER TABLE sequ_business ALTER COLUMN  id SET DEFAULT nextval('sequ_business_id_seq');
ALTER TABLE sequ_location ALTER COLUMN  id SET DEFAULT nextval('sequ_location_id_seq');
