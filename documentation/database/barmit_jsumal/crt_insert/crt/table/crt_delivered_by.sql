/*
    ingredients delivered by supplier
*/
create table BAJS_DELIVERED_BY (
	supplier_id number(5)  references BAJS_SUPPLIER(id),
	ingredient_id number(5) references BAJS_INGREDIENT(id),
	date_delivered date,
	quantity number(3) default 0,
        CONSTRAINT pk_delivered_by PRIMARY KEY(supplier_id, ingredient_id)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
