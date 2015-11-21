/* triggers */
drop trigger BAJS_EMP_DELETE;
drop trigger BAJS_CHANGE_TID;
drop trigger BAJS_UPDATE_TRAIN_EMP;
drop trigger BAJS_EMP_ID_SEQ;

/* views */
drop view  BAJS_SCH_TEMPLATE;
drop view  BAJS_TRAINING_EMP;
drop view  BAJS_STD_EMP;
drop view  BAJS_SCHEDULE;
drop view  BAJS_SCH_HIST;
drop view  BAJS_EMP_ALL_INFO;

/* base tables */
drop table BAJS_HOLIDAY;
drop table BAJS_USER;
drop table BAJS_WEEKDAY_HOURS;
drop table BAJS_WEEKEND_HOURS;
drop table BAJS_ORDERS;
drop table BAJS_REQUESTS_VACATION;
drop table BAJS_SOLD_IN;
drop table BAJS_USED_IN;
drop table BAJS_MENU_ITEM;
drop table BAJS_IS_SCHEDULED_FOR;
drop table BAJS_NEW_SHIFT;
drop table BAJS_HOURS;
drop table BAJS_HAS_POSITION;
drop table BAJS_SHIFT;
drop table BAJS_POSITION;
drop table BAJS_EMPLOYMENT_HISTORY;
drop table BAJS_CANNOT_WORK_WITH;
drop table BAJS_AVAILABILITY;
drop table BAJS_EMPLOYEE;
drop table BAJS_DELIVERED_BY;
drop table BAJS_TRANSACTION;
drop table BAJS_INGREDIENT;
drop table BAJS_SUPPLIER;

/* packages */
drop package BAJS_PKG;

/* sequences */
drop sequence BAJS_EMP_SEQ;

purge recyclebin;
