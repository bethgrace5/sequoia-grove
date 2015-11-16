'use strict';

/**
 * Employee Controller
 */
angular.module('sequoiaGroveApp')
  .controller('EmployeeCtrl', function ($http, $log, $scope) {
    $scope.activeTab = 'info';
    $scope.positions = [
      {name: "Cashier"},
      {name: "Supervisor"},
      {name: "Cold Prep"},
      {name: "Janitor"},
      {name: "Kitchen"},
      {name: "Kitchen Supervisor"}
    ];
    $scope.times = {
      // start times start at the earlist shift start and increment by half
      // hours until the end of the lastest starting shift
      // TODO have a smarter way to populate this list
      start:[
        {disp:"5:00 AM", val:"0500"},
        {disp:"5:30 AM", val:"0530"},
        {disp:"6:00 AM", val:"0600"},
        {disp:"6:30 AM", val:"0630"},
        {disp:"7:00 AM", val:"0700"},
        {disp:"7:30 AM", val:"0730"},
        {disp:"8:00 AM", val:"0800"},
        {disp:"8:30 AM", val:"0830"},
        {disp:"9:00 AM", val:"0900"},
        {disp:"9:30 AM", val:"0930"},
        {disp:"10:00 AM", val:"1000"},
        {disp:"10:30 AM", val:"1030"},
        {disp:"11:00 AM", val:"1100"},
        {disp:"11:30 AM", val:"1130"},
        {disp:"12:00 PM", val:"1200"},
        {disp:"12:30 PM", val:"1230"},
        {disp:"1:00 PM", val:"1300"},
        {disp:"1:30 PM", val:"1330"},
        {disp:"2:00 PM", val:"1400"},
        {disp:"2:30 PM", val:"1430"},
        {disp:"3:00 PM", val:"1500"},
        {disp:"3:30 PM", val:"1530"},
        {disp:"4:00 PM", val:"1600"},
        {disp:"4:30 PM", val:"1630"}
      ],
      // end times start at the earlist shift end and increment by half 
      // hours until the end of the lastest ending shift
      // TODO have a smarter way to populate this list
      end:[
        {disp:"1:00 PM", val:"1300"},
        {disp:"1:30 PM", val:"1330"},
        {disp:"2:00 PM", val:"1400"},
        {disp:"2:30 PM", val:"1430"},
        {disp:"3:00 PM", val:"1500"},
        {disp:"3:30 PM", val:"1530"},
        {disp:"4:00 PM", val:"1600"},
        {disp:"4:30 PM", val:"1630"},
        {disp:"5:00 PM", val:"1700"},
        {disp:"5:30 PM", val:"1730"},
        {disp:"6:00 PM", val:"1800"},
        {disp:"6:30 PM", val:"1830"},
        {disp:"7:00 PM", val:"1900"},
        {disp:"7:30 PM", val:"1930"},
        {disp:"8:00 PM", val:"2000"},
        {disp:"8:30 PM", val:"2030"},
        {disp:"9:00 PM", val:"2100"}
      ]
    };
    $scope.employees=[
      { id:"0", 
        firstName:"Billy",
        lastName:"Jean",
        isManager:"0",
        birthDate:"01/01/1995",
        maxHoursPerWeek:"40",
        phoneNumber:"000-000-0000",
        clockNumber:"10",
        avail:
        { mon: [ {startTime:"800", endTime:"2000"}
          ],
          tue:[ {startTime:"800", endTime:"2000"}
          ],
          wed:[ {startTime:"800", endTime:"2000"}
          ],
          thu:[ {startTime:"800", endTime:"2000"}
          ],
          fri:[ {startTime:"800", endTime:"2000"}
          ],
          sat:[ {startTime:"800", endTime:"2000"}
          ],
          sun:[ {startTime:"800", endTime:"2000"}
          ]
        }
      },
      { id:"1", 
        firstName:"Is not",
        lastName:"My Lover",
        isManager:"0",
        birthDate:"02/02/1996",
        maxHoursPerWeek:"50",
        phoneNumber:"111-111-1111",
        clockNumber:"11",
        avail:
        { mon:[ {startTime:"800", endTime:"1900"}
          ],
          tue:[ {startTime:"800", endTime:"1900"}
          ],
          wed:[ {startTime:"800", endTime:"1900"}
          ],
          thu:[ {startTime:"800", endTime:"1900"}
          ],
          fri:[ {startTime:"800", endTime:"1900"}
          ],
          sat:[ {startTime:"800", endTime:"1900"}
          ],
          sun:[ {startTime:"800", endTime:"1900"}
          ]
        }
      },
      { id:"2", 
        firstName:"She's just",
        lastName:"A girl",
        isManager:"1",
        birthDate:"03/03/1991",
        maxHoursPerWeek:"50",
        phoneNumber:"222-222-2222",
        clockNumber:"12",
        avail:
        { mon:[ {startTime:"800", endTime:"2100"}
          ],
          tue:[ {startTime:"800", endTime:"2100"}
          ],
          wed:[ {startTime:"800", endTime:"2100"}
          ],
          thu:[ {startTime:"800", endTime:"2100"}
          ],
          fri:[ {startTime:"800", endTime:"2100"}
          ],
          sat:[ {startTime:"800", endTime:"2100"}
          ],
          sun:[ {startTime:"800", endTime:"2100"}
          ]
        }
      },
      { id:"3", 
        firstName:"Who claims",
        lastName:"That I am",
        isManager:"0",
        birthDate:"04/04/1999",
        maxHoursPerWeek:"40",
        phoneNumber:"333-333-3333",
        clockNumber:"13",
        avail:
        { mon:[ {startTime:"900", endTime:"2000"}
          ],
          tue:[ {startTime:"900", endTime:"2000"}
          ],
          wed:[ {startTime:"900", endTime:"2000"}
          ],
          thu:[ {startTime:"900", endTime:"2000"}
          ],
          fri:[ {startTime:"900", endTime:"2000"}
          ],
          sat:[ {startTime:"900", endTime:"2000"}
          ],
          sun:[ {startTime:"900", endTime:"2000"}
          ]
        }
      },
      { id:"4", 
        firstName:"The",
        lastName:"One",
        isManager:"1",
        birthDate:"05/05/1997",
        maxHoursPerWeek:"40",
        phoneNumber:"444-444-4444",
        clockNumber:"14",
        avail:
        { mon:[ {startTime:"800", endTime:"1930"}
          ],
          tue:[ {startTime:"800", endTime:"1930"}
          ],
          wed:[ {startTime:"800", endTime:"1930"}
          ],
          thu:[ {startTime:"800", endTime:"1930"}
          ],
          fri:[ {startTime:"800", endTime:"1930"}
          ],
          sat:[ {startTime:"800", endTime:"1930"}
          ],
          sun:[ {startTime:"800", endTime:"1930"}
          ]
        }
      }
    ];
/*
    $scope.employees=[
      { id:"0", 
        firstName:"Billy",
        lastName:"Jean",
        isManager:"0",
        birthDate:"01/01/1995",
        maxHoursPerWeek:"40",
        phoneNumber:"000-000-0000",
        clockNumber:"10",
        avail:
        { mon:[ startTime:"800",
                endTime:"2000"
          ],
          tue:[ startTime:"800",
                endTime:"2000"
          ],
          wed:[ startTime:"800",
                endTime:"2000"
          ],
          thu:[ startTime:"800",
                endTime:"2000"
          ],
          fri:[ startTime:"800",
                endTime:"2000"
          ],
          sat:[ startTime:"800",
                endTime:"2000"
          ],
          sun:[ startTime:"800",
                endTime:"2000"
          ]
        }
      },
      { id:"1", 
        firstName:"Is not",
        lastName:"My Lover",
        isManager:"0",
        birthDate:"02/02/1996",
        maxHoursPerWeek:"50",
        phoneNumber:"111-111-1111",
        clockNumber:"11",
        avail:
        { mon:[ startTime:"800",
                endTime:"1900"
          ],
          tue:[ startTime:"800",
                endTime:"1900"
          ],
          wed:[ startTime:"800",
                endTime:"1900"
          ],
          thu:[ startTime:"800",
                endTime:"1900"
          ],
          fri:[ startTime:"800",
                endTime:"1900"
          ],
          sat:[ startTime:"800",
                endTime:"1900"
          ],
          sun:[ startTime:"800",
                endTime:"1900"
          ]
        }
      },
      { id:"2", 
        firstName:"She's just",
        lastName:"A girl",
        isManager:"1",
        birthDate:"03/03/1991",
        maxHoursPerWeek:"50",
        phoneNumber:"222-222-2222",
        clockNumber:"12",
        avail:
        { mon:[ startTime:"800",
                endTime:"2100"
          ],
          tue:[ startTime:"800",
                endTime:"2100"
          ],
          wed:[ startTime:"800",
                endTime:"2100"
          ],
          thu:[ startTime:"800",
                endTime:"2100"
          ],
          fri:[ startTime:"800",
                endTime:"2100"
          ],
          sat:[ startTime:"800",
                endTime:"2100"
          ],
          sun:[ startTime:"800",
                endTime:"2100"
          ]
        }
      },
      { id:"3", 
        firstName:"Who claims",
        lastName:"That I am",
        isManager:"0",
        birthDate:"04/04/1999",
        maxHoursPerWeek:"40",
        phoneNumber:"333-333-3333",
        clockNumber:"13",
        avail:
        { mon:[ startTime:"900",
                endTime:"2000"
          ],
          tue:[ startTime:"900",
                endTime:"2000"
          ],
          wed:[ startTime:"900",
                endTime:"2000"
          ],
          thu:[ startTime:"900",
                endTime:"2000"
          ],
          fri:[ startTime:"900",
                endTime:"2000"
          ],
          sat:[ startTime:"900",
                endTime:"2000"
          ],
          sun:[ startTime:"900",
                endTime:"2000"
          ]
        }
      },
      { id:"4", 
        firstName:"The",
        lastName:"One",
        isManager:"1",
        birthDate:"05/05/1997",
        maxHoursPerWeek:"40",
        phoneNumber:"444-444-4444",
        clockNumber:"14",
        avail:
        { mon:[ startTime:"800",
                endTime:"1930"
          ],
          tue:[ startTime:"800",
                endTime:"1930"
          ],
          wed:[ startTime:"800",
                endTime:"1930"
          ],
          thu:[ startTime:"800",
                endTime:"1930"
          ],
          fri:[ startTime:"800",
                endTime:"1930"
          ],
          sat:[ startTime:"800",
                endTime:"1930"
          ],
          sun:[ startTime:"800",
                endTime:"1930"
          ]
        }
      }
    ];
*/
    $scope.current = 0;

    $scope.newAvail = {day:'', start:'', end:''};

    // add a new availability time for an employee
    $scope.addAvail = function() {
      var day = $scope.newAvail.day;
      var st = $scope.newAvail.start;
      var end = $scope.newAvail.end;

      // make sure all fields are filled in
      if (day!='' && st!='' && end!='' ) {
        // reset availability input
        $scope.newAvail = {day:'', start:'', end:''};

        var newTimes = {
          start:{disp:st.disp, val:st.val}, 
          end:{disp:end.disp, val:end.val}
        };

        // TODO send new availability to back end

        // TODO, setup the selection of available times to not include times
        // encompassed by their current availability times. possibly limit
        // the number of availability objects to two per day?

        // TODO order availabilities in front end by start time

        // update front end
        if (day=='mon') { $scope.employees[$scope.current].avail.mon.push(newTimes); }
        else if (day=='tue') { $scope.employees[$scope.current].avail.tue.push(newTimes); }
        else if (day=='wed') { $scope.employees[$scope.current].avail.wed.push(newTimes); }
        else if (day=='thu') { $scope.employees[$scope.current].avail.thu.push(newTimes); }
        else if (day=='fri') { $scope.employees[$scope.current].avail.fri.push(newTimes); }
        else if (day=='sat') { $scope.employees[$scope.current].avail.sat.push(newTimes); }
        else if (day=='sun') { $scope.employees[$scope.current].avail.sun.push(newTimes); }

      }

    }

    // click existing day to populate input with that day
    $scope.setNewAvailDay = function(day) {
      // there's not often the case where the same day has multiple
      // availabilities
      //$scope.newAvail.day=day;
    }

    // click existing imes to populate input with those times
    $scope.setNewAvailTimes = function(start, end ) {
      var stTimeLen = $scope.times.start.length;
      var edTimeLen = $scope.times.end.length;
      var i=0;

      // find this item in start times and set start input as it
      for(i=0;i<stTimeLen; i++) {
        if (start == $scope.times.start[i].val) {
          $scope.newAvail.start = $scope.times.start[i];
          break;
        }
      }

      // find this item in end times and set end input as it
      for(i=0; i<edTimeLen; i++) {
        if (end == $scope.times.end[i].val) {
          $scope.newAvail.end = $scope.times.end[i];
          break;
        }
      }

    }

    // remove an availability for an employee
    $scope.remAvail = function(day, index) {
      //TODO remove availability on the back end

      // update front end
        if (day=='mon') {
          $scope.employees[$scope.current].avail.mon.splice(index, 1);
        }
        else if (day=='tue') {
          $scope.employees[$scope.current].avail.tue.splice(index, 1);
        }
        else if (day=='wed') {
          $scope.employees[$scope.current].avail.wed.splice(index, 1);
        }
        else if (day=='thu') {
          $scope.employees[$scope.current].avail.thu.splice(index, 1);
        }
        else if (day=='fri') {
          $scope.employees[$scope.current].avail.fri.splice(index, 1);
        }
        else if (day=='sat') {
          $scope.employees[$scope.current].avail.sat.splice(index, 1);
        }
        else if (day=='sun') {
          $scope.employees[$scope.current].avail.sun.splice(index, 1);
        }
    }

    $scope.getAvailability = function() {
      /*
      $http({
        url: '/sequoiagrove/employee/availability/'+employees[current].id,
        method: "GET"
      }).success(function (data, status, headers, config) {
        $log.debug(data);
        $scope.employees = data.employees;
        $scope.data.availability=[
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""},
          {start:""+":"+"", end:""+":"+""}
        ]
      }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining employee data: " + data);
      });
      */

    }

    $scope.getAvailability();



  });
