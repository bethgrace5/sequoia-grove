'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller for managing employees.
 */
angular.module('sequoiaGroveApp')
  .controller('EmployeeCtrl', function ($http, $log, $scope, $rootScope, $location) {

/************** Login Redirect, Containers and UI settings **************/

    $rootScope.lastPath = '/employee';

    // user is not logged in
    if ($rootScope.loggedIn == false) {
      $location.path('/login');
    }

    $scope.activeTab = 'info';
    $scope.current;
    $scope.selectedEmployee = {id:0};
    $scope.newAvail = {day:'', start:'', end:''};
    $scope.newPos = {};
    $scope.saving = false;

/************** Pure Functions **************/

    $scope.formatEmploymentHistory = function(dateString) {
      if (dateString=='') {
        return 'Present';
      }
      return moment(dateString,'MM-DD-YYYY').format('MMMM Do, YYYY');
    }

    // click existing times to populate input with those times
    $scope.setNewAvailTimes = function(sH, sM, eH, eM) {
      var start = moment({hour:sH, minute:sM}).format('h:mm a');
      var end = moment({hour:eH, minute:eM}).format('h:mm a');
      $scope.newAvail.start = start;
      $scope.newAvail.end = end;
    }

    $scope.selectEmployee = function(id) {
      var length = $scope.employees.length;
      for(var i = 0; i < length; i++) {
        var curid = $scope.employees[i].id;
        if (curid==id) {
          $scope.selectedEmployee = $scope.employees[i];
          break;
        }
      }
    }

/************** HTTP Request Functions **************/

    // add a new availability time for an employee
    $scope.addAvail = function() {
      // guard against double clicking
      if ($scope.saving) {
        return;
      }
      $scope.saving = true;

      var avail = {
        'eid':$scope.selectedEmployee.id,
        'day': $scope.newAvail.day,
        'start': $scope.newAvail.start.val,
        'end': $scope.newAvail.start.val
      }

      // make sure all fields are filled in
      if (avail.day!='' && avail.start!='' && avail.end!='') {

        $http({
            url: '/sequoiagrove/avail/add/'+
                avail.eid + '/' + avail.day + '/' + avail.start + '/' + avail.end,
            method: "POST"
        }).success(function(data, status) {
          // update front end
          $scope.selectedEmployee.avail[day].push(
            {'start':avail.start, 'end':avail.end});
          $scope.saving = false;
        });
      }
    }

    // add a new position for an employee
    $scope.addPos = function() {
      // guard against double clicking
      if ($scope.saving) {
        return;
      }
      $scope.saving = true;
        var pos = $scope.newPos.title;

        // make sure all fields are filled in
        if (pos!='') {
            // reset input
            $scope.newPos = {};

            // check if employee does not already have position
            var empPosLen = $scope.selectedEmployee.positions.length;
            for (var i = 0; i < empPosLen; i++) {
                if ($scope.selectedEmployee.positions[i].title==pos)
                    return;
            }

            var eid = $scope.selectedEmployee.id;
            var pid;
            var len = $scope.positions.length;
            for (var i = 0; i < len; i++) {
                if ($scope.positions[i].title==pos) {
                    pid = $scope.positions[i].id;
                }
            }

            var posObj = {id:pid, title:pos, "location":null};
            // send new position to back end
            $http({
                url: '/sequoiagrove/position/add/'+
                    eid + '/' + pid + '/' +
                    moment().format("DD-MM-YYYY"),
                method: "POST"
            }).success(function(data, status) {
              $scope.saving = false;
              // update front end
              $scope.selectedEmployee.positions.push(posObj);
            });
        }
    }

    // remove an availability for an employee
    $scope.remAvail = function(day, index) {
      // guard against double clicking
      if ($scope.saving) {
        return;
      }
      $scope.saving = true;
        // update front end, and get start_time
        var start = $scope.selectedEmployee.avail[day][index].start;
        $scope.selectedEmployee.avail[day].splice(index, 1);

        // remove availability from database
        $http({
            url: '/sequoiagrove/avail/remove/'+
                $scope.selectedEmployee.id + '/' + day + '/' + start,
            method: "POST"
        }).success(function(data, status) {
          $scope.saving = false;
        });
    }

    $scope.remPos = function(index) {
      // guard against double clicking
      if ($scope.saving) {
        return;
      }
      $scope.saving = true;
        var eid = $scope.selectedEmployee.id;
        var title = $scope.selectedEmployee.positions[index].title;
        var pid;
        var len = $scope.positions.length;
        for (var i = 0; i < len; i++) {
            if ($scope.positions[i].title==title) {
                pid = $scope.positions[i].id;
            }
        }

        // remove position from back end
        $http({
            url: '/sequoiagrove/position/remove/'+
                eid + '/' + pid + '/' +
                moment().format("DD-MM-YYYY"),
            method: "POST"
        }).success(function(data, status) {
          // update front end
          $scope.selectedEmployee.positions.splice(index, 1);
          $scope.saving = false;
        })
    }

    $scope.updateEmployee = function() {
      // guard against double clicking
      if ($scope.saving) {
        return;
      }
      $scope.saving = true;
      $http.post("/sequoiagrove/employee/update", $scope.selectedEmployee).
        success(function(data, status){
          $scope.saving = false;
        });
    }

  });
