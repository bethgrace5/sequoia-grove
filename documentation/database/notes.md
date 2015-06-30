notes on tables for database

| employee  |                 |
| :---------|:----------------|
| int       | id              |
| string    | firstname       |
| string    | lastname        |
| date      | dateEmployed    |
| date      | dateUnemployed  |
| date      | birthday        |
| int       | maxHoursPerWeek |
| string    | phoneNumber     |
| boolean   | isTraining      |

| requestsOff |                 |
| :-----------|:----------------|
| int         | id              | 
| int         | requestedBy (employeeId) |
| int         | grantedBy (employeeId)   |
| date        | day              |
(requests off will not allow requests for partial days)

| role   |       |
| :------|:------|
| int    | id    |
| string | role  |

| position|              |     |
| :-------|:-------------|:----|
| int     | id           |     |
| int     | employeeId   |     |
| int     | roleId       |     |
| date    | dateAcquired |     |
| date    | dateRemoved  |     |
| int     | rank         |(primary, secondary, etc.) |
| int     | daysPerWeek  |(restrict number of days this employee works this position per week) |
_(employee-role)_

| shift   |           |
| :------ |:--------- |
| int     | id        |
| int     | roleId    |
| int     | startTime |
| int     | stopTime  |

| availability|              |
| :---------- |:------------ |
| int         | employeeId   |
| int         | shiftId      |
| int         | daysPerWeek  |
| int         | hoursPerWeek |
_(employee-shift)_

| weeklyDeliveries |         |
| :--------------- |:------- |
| int              | id      |
| string           | title   |
| string           | weekday |
_(scheduled deliveries more than once per week are entered as separate entries per day)_

| scheduledShift |            |
| :------------- |:---------- |
| int            | id         |
| int            | employeeId |
| int            | shiftId    |
| date           | day        |
_(match employees to scheduled shifts) - TODO: research better ways to organize schedule_

TODO:system login information?

