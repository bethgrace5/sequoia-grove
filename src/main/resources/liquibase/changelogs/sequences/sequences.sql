-- reset sequences
ALTER SEQUENCE hours_id_seq    RESTART WITH 1 MAXVALUE 1000;
ALTER SEQUENCE employee_id_seq RESTART WITH 1 MAXVALUE 1000;
ALTER SEQUENCE position_id_seq RESTART WITH 1 MAXVALUE 1000;
ALTER SEQUENCE shift_id_seq    RESTART WITH 1 MAXVALUE 1000;
ALTER SEQUENCE requests_id_seq RESTART WITH 1 MAXVALUE 1000;

-- add sequences to their corresponding columns
ALTER TABLE hours             ALTER COLUMN  id SET DEFAULT nextval('hours_id_seq');
ALTER TABLE employee          ALTER COLUMN  id SET DEFAULT nextval('employee_id_seq');
ALTER TABLE position          ALTER COLUMN  id SET DEFAULT nextval('position_id_seq');
ALTER TABLE shift             ALTER COLUMN  id SET DEFAULT nextval('shift_id_seq');
ALTER TABLE requests_vacation ALTER COLUMN  id SET DEFAULT nextval('requests_id_seq');
