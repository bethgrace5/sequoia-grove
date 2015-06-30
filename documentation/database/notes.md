notes on tables to refine for database

| employee | |
| :---------|:----------|
| int | id |
| string | firstname |
| string | lastname |
| date | dateEmployed |
| date | dateUnemployed |
| date | birthday |
| int | maxHoursPerWeek |
| string | phoneNumber |
| boolean | isTraining |

* requestsOff 
(requests off will not allow requests for partial days)
int | id
int | requestedBy (employeeId)
int | grantedBy (employeeId)
date | day

* role
int | id
string | role

* position 
_(employee-role)_
int | id
int | employeeId
int | roleId
date | dateAcquired
date | dateRemoved
int | rank (primary, secondary, etc.)
int | daysPerWeek (restrict number of days this employee works this position per week)

| shift   |           |
| :------ |:--------- |
| int     | id        |
| int     | roleId    |
| int     | startTime |
| int     | stopTime  |

* availability 
_(employee-shift)_
int | employeeId
int | shiftId
int | daysPerWeek
int | hoursPerWeek

* weeklyDeliveries 
_(scheduled deliveries more than once per week are entered as separate entries per day)_
int | id
string | title
string | weekday

* scheduledShift 
_(match employees to scheduled shifts) - TODO: research better ways to organize schedule_
int | id
int | employeeId
int  | shiftId
date  | day

TODO:_system login information?_

