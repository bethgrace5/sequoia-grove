notes on tables for database

| employee  |                 |
| :---------|:----------------|
| int       | employeeID      |
| string    | firstname       |
| string    | lastname        |
| date      | dateEmployed    |
| date      | dateUnemployed _shows as previous employee in application_  |
| date      | birthday        |
| int       | maxHoursPerWeek |
| string    | phoneNumber     |
 
| requestsOff |                 |
| :-----------|:----------------|
| int         | id              | 
| int         | requestedBy (employeeId) |
| int         | grantedBy (employeeId)   |
| date        | day              |
_(requests off will not allow requests for partial days)_

| role   |       |
| :------|:------|
| int    | employeeID |
| string | role  |

| position _(employee-role)_|              |     |
| :-------|:-------------|:----|
| int     | id           |     |
| int     | employeeId   |     |
| int     | roleId       |     |
| date    | dateAcquired |     |
| date    | dateRemoved  |     |
| int     | rank         |(primary, secondary, etc.) |
| int     | daysPerWeek  |(restrict number of days this employee works this position per week) |


| shift   |           |
| :------ |:--------- |
| int     | id        |
| int     | roleId    |
| int     | startTime |
| int     | stopTime  |
| set     | weekdays  |
| string  | location _(front, kitchen, janitor)_ |
| string  | color     |

| availability _(employee-shift)_| |
| :---------- |:------------ |
| int         | employeeId   |
| int         | shiftId      |
| int         | daysPerWeek  |
| int         | hoursPerWeek |


| weeklyDeliveries |         |
| :--------------- |:------- |
| int              | id      |
| string           | title   |
| string           | weekday |
| string           | color   |
_(scheduled deliveries more than once per week are entered as separate entries per day)_

| scheduledShift |            |
| :------------- |:---------- |
| int            | id         |
| int            | employeeId |
| int            | shiftId    |
| date           | day        |
_(match employees to scheduled shifts) - TODO: research better ways to organize schedule_

TODO:system login information?

