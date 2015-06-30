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

_(requests off will not allow requests for partial days_
| requestsOff |
| :-----------|:----------------|
| int         | id              | 
| int         | requestedBy (employeeId) |
| int         | grantedBy (employeeId)   |
| date        | day              |

| role   |       |
| :------|:------|
| int    | id    |
| string | role  |

_(employee-role)_
| position|              |
| :-------|:-------------|
| int     | id           |
| int     | employeeId   |
| int     | roleId       |
| date    | dateAcquired |
| date    | dateRemoved  |
| int     | rank         |(primary, secondary, etc.)
| int     | daysPerWeek  |(restrict number of days this employee works this position per week)

| shift   |           |
| :------ |:--------- |
| int     | id        |
| int     | roleId    |
| int     | startTime |
| int     | stopTime  |

_(employee-shift)_
| availability|              |
| :---------- |:------------ |
| int         | employeeId   |
| int         | shiftId      |
| int         | daysPerWeek  |
| int         | hoursPerWeek |

_(scheduled deliveries more than once per week are entered as separate entries per day)_
| weeklyDeliveries |         |
| :--------------- |:------- |
| int              | id      |
| string           | title   |
| string           | weekday |

_(match employees to scheduled shifts) - TODO: research better ways to organize schedule_
| scheduledShift |            |
| :------------- |:---------- |
| int            | id         |
| int            | employeeId |
| int            | shiftId    |
| date           | day        |

TODO:system login information?

