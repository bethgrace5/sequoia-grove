create table BAJS_SOLD_IN (
    menu_item_id number(5) references BAJS_MENU_ITEM(id),
    transaction_id number(5) references BAJS_TRANSACTION(id),
	quantity number(5)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
