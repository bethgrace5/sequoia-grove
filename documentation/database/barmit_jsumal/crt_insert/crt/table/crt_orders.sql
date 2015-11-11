create table BAJS_ORDERS (
	employee_id number(5) references BAJS_EMPLOYEE(id),
	ingredient_id number(5) references BAJS_INGREDIENT(id),
    on_date date,
    quantity number(3, 0)
)
	PCTFree 5
	PCTUSED 15
	TABLESPACE CS342
/
