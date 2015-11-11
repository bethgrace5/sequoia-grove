
/*
Trigger

One for deletion and update, one "instead of" triggers which
implement at least two to three level cascaded update and deletions.

Given two tables, Department and Employee, the DID in employee table
is the foreign key indiating which department an employee is working
for. 
*/

    /* 
    Define a "before update DID trigger on department table to 
    update DID in employee table to new DID to.
    */




    /*
    Create a delete trigger for cascaded deletion also. Make sure you
    backup your data.
    */





    /*
    Create a view involved two to three tables, and define a "INSTEAD OF"
    trigger so that when you update the view, the update will be perform by
    trigger, and the updates will be performed on base table.
    */




/
