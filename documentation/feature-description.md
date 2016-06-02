
Feature Description
--

### User Access levels
There are only two levels of users for the system, regular employees, and manager
employees. **employee** refers to a regular employee and **manager** refers to a manager
employee. In practice, a manager in the company is usually the owner, or branch manager.
A supervisor is considered a regular employee and not a manager. There are no 
special user privelages for supverisors, so supervisors will be considered as **employees**.

Employees will be using the system to view the current schedule, submit requests
for days off, and view the status of their own requests previously submitted.

## Positions
Employees work different positions or roles. They may have more than one role, 
and they may be in training for a new role. They will have a primary role. They may
not be able to work well with other employees, so this can be listed so that they can
avoid being scheduled with ones they do not work well with. Emploees may be considered
active or inactive - this is useful for employees that work seasonally, or leave 
and then return.

## Shifts
Employees work shifts. Shifts are increments of time weekly that the employees may
be scheudled for. Shifts may have different weekday and weekend hours. Shifts may be 
named. They require specific roles. For example, a shift may be from 
8:00 AM - 3:00 PM Monday - Friday, and 9:00 AM - 3:30 PM on Saturday and Sunday. 
The shift may be named "register 1", it requires the role of a cashier. 

## Edit Employee
Managers will be able to edit the availibility for employees. Employees may only
work shifts that their role can work. For example, if an employee is a janitor,
their availibility will list all shifts that janitors work. In addition, if the 
employee is cross trained as a cold prep, all of the cold prep shifts will also be 
listed. Managers will click the checkbox of the days of the week that employee is
available to work shifts. For example, if an employee can work morning janitor on 
mondays and wednesdays, those days would be checked as available for that shift.

Managers also will be able to add new employees and edit existing employees. This
means they can change their basic contact information, the roles they can work and 
which role is their primary role. They may also edit restrictions about which 
employees a given employee cannot work well with. 

## Edit Schedule
Managers may edit schedules. They can auto generate a schedule, and make any 
changes to it. They also can manually create a schedule as necessary. The 
schedule editor will make it easy to spot which employees can work which shifts.
It will protect/warn against scheduling an employee where they cannot work. There 
are a few reasons an employee will not be able to work a shift on a specific day;
the employee does not have availibility for that shift, the employee is not trained
in the role that that shift requires, the employee has requested that day off, or
that shift overlaps with one being worked by an employee they do not work well with.
It will be possible to override any warnings given as necessary or practical. To
manually schedule employees, either click an employee or an empty shift for a day.
Clicking an employee highlights all shifts they can possibly work each day, given 
that they are not already placed on the schedule for that day. Clicking a shift
that needs to be filled highlights all employees who are trained in that role, 
who are available for that day, who are not already on the schedule for that day, 
who have not requested that specific day off, where they will not be placed to 
work with employees they cannot work with. Schedules relevant to the current week,
and future weeks will be able to be edited. Schedules for past weeks cannot be 
edited. Live statistics will be shown for the schedule being edited, such as the
number of days each employee is on the schedule, and the number of hours that 
amounts to. Warnings will be shown when an employee is scheduled more than the 
amount of hours they wish to work per a week. When auto generating a schedule, 
priority will be determined by the length of time an employee has been currently
employed for the company, not counting any past lengths of employment.

Screenshots
--
Login 
![login view](screenshots/views/login1.png)
---
View Schedule 
![home view](screenshots/views/home.png)
---
Employee Edit
![employee view](screenshots/views/employee1.png)
![employee view](screenshots/views/employee2.png)
![employee view](screenshots/views/employee3.png)
---
Submit Requests
![request submit view](screenshots/views/request-submit.png)
---
Pending Requests
![request pending view](screenshots/views/request-pending.png)
---
Request History
![request history view](screenshots/views/request-history.png)
---
Manage Requests
![request history view](screenshots/views/request-manage.png)
---
Schedule Edit
![schedule edit view 1](screenshots/views/schedule1.png)
---
Schedule Edit
![schedule edit view 2](screenshots/views/schedule2.png)
---
Schedule Edit
![schedule edit view 2](screenshots/views/schedule2.png)
---
Manage Holiday
![schedule edit view 2](screenshots/views/manage-holiday.png)
---
Manage Shift
![schedule edit view 2](screenshots/views/manage-shift.png)
---
Manage Delivery
![schedule edit view 2](screenshots/views/manage-delivery.png)
---

