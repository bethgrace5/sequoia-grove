create table BAJS_USED_IN (
    menu_item_id number(5) references BAJS_MENU_ITEM(id),
    ingredient_id number(5) references BAJS_INGREDIENT(id),
	quantity number(5)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
