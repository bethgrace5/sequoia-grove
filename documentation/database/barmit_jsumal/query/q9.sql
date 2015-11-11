/* Find sold menu items that used ingredients ordered between 05/06/15 and 05/08/15. */

select * from (
    (
    select unique mid from (
        (
            select ingredient_id as iid
            from bajs_orders
            where on_date between to_date('05/06/2015', 'mm/dd/yyyy') and to_date('05/08/2015', 'mm/dd/yyyy')
        )
        natural join
        (
            select ingredient_id as iid, menu_item_id as mid
            from bajs_used_in
        )
    )
    natural join
    (
        select menu_item_id as mid
        from bajs_sold_in
    )
    )
    natural join
    (
        select m.id as mid, name
        from bajs_menu_item m
    )
)






/
