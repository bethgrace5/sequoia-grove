create table BAJS_MENU_ITEM (
	id number(5),
	name varchar2(30) default '',
	type varchar2(30) default '',
    price number(4,2),
    photo raw(1024),
        CONSTRAINT pk_menu_item_id PRIMARY KEY(id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
