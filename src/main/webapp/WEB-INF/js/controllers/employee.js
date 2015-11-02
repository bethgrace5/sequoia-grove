'use strict';

/**
 * Employee Controller
 */
angular.module('sequoiaGroveApp')
  .controller('EmployeeCtrl', function ($http, $scope) {
    $scope.activeTab = 'info';
    $scope.times = {
      // start times start at the earlist shift start and increment by half 
      // hours until the end of the lastest starting shift
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
    }
    $scope.employees=[
    { id:"0", 
      firstName:"",
      lastName:"",
      isManager:"",
      birthDate:"",
      maxHoursPerWeek:"",
      phoneNumber:"",
      clockNumber:"",
      avail:
      { mon:[ ],
        tue:[ ],
        wed:[ ],
        thu:[ ],
        fri:[ ],
        sat:[ ],
        sun:[ ]
      }
    },

    ];
    $scope.current = 0;

    $scope.newAvail = {day:"", start:"", end:""};

    // add a new availability time for an employee
    $scope.addAvail = function() {
      var day = $scope.newAvail.day;
      var start = $scope.newAvail.start;
      var end = $scope.newAvail.end;
      
      // make sure all fields are filled in
      if (day!='' && start!='' && end!='' ) {
        $scope.newAvail.day='';
        $scope.newAvail.start='';
        $scope.newAvail.end='';
        // TODO, setup the selection of available times to not include times
        // encompassed by their current availability times. possibly limit
        // the number of availability objects to two per day?
 
        // TODO send new availability to back end
        // TODO order availabilities in front end by start time

        // update front end
        if (day=='mon') {
          $scope.employees[$scope.current].avail.mon.push( {start:start, end:end});
        }
        else if (day=='tue') {
          $scope.employees[$scope.current].avail.tue.push( {start:start, end:end});
        }
        else if (day=='wed') {
          $scope.employees[$scope.current].avail.wed.push( {start:start, end:end});
        }
        else if (day=='thu') {
          $scope.employees[$scope.current].avail.thu.push( {start:start, end:end});
        }
        else if (day=='fri') {
          $scope.employees[$scope.current].avail.fri.push( {start:start, end:end});
        }
        else if (day=='sat') {
          $scope.employees[$scope.current].avail.sat.push( {start:start, end:end});
        }
        else if (day=='sun') {
          $scope.employees[$scope.current].avail.sun.push( {start:start, end:end});
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
