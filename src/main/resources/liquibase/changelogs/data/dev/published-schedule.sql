-- starting monday of schedule weeks that have been published

insert into PUBLISHED_SCHEDULE values( 1, (SELECT current_date - cast(extract(dow from current_date) as int) - 27), to_timestamp('10-SEP-1514:20:10.123000','DD-MON-RRHH24:MI:SS.FF'));
insert into PUBLISHED_SCHEDULE values( 1, (SELECT current_date - cast(extract(dow from current_date) as int) - 20), to_timestamp('10-SEP-1514:20:10.123000','DD-MON-RRHH24:MI:SS.FF'));
insert into PUBLISHED_SCHEDULE values( 2, (SELECT current_date - cast(extract(dow from current_date) as int) - 13), to_timestamp('10-SEP-1514:20:10.123000','DD-MON-RRHH24:MI:SS.FF'));
insert into PUBLISHED_SCHEDULE values( 2, (SELECT current_date - cast(extract(dow from current_date) as int) - 6), to_timestamp('11-SEP-1514:20:10.123000','DD-MON-RRHH24:MI:SS.FF'));
insert into PUBLISHED_SCHEDULE values( 1, (SELECT current_date - cast(extract(dow from current_date) as int) + 1), to_timestamp('11-SEP-1514:20:10.123000','DD-MON-RRHH24:MI:SS.FF'));
