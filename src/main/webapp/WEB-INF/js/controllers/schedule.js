'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('ScheduleCtrl', function ($timeout, $http, $scope, $rootScope, $translate, $log, $filter) {
    $scope.activeTab = 'schedule';
    $scope.selectedId = 0;
    $scope.newDelivery = '';

    $scope.scheduleEditPosition = 'all';

    // shifts that were changed from old shifts and need to be saved to database
    $scope.updateShifts = [];
    $scope.employees = [];

    $scope.selectEid = function(id) {
      $scope.selectedId = id;
    }

    $scope.switchPos = function(pos) {
      $log.debug(pos);
      $scope.scheduleEditPosition = pos;
    }

    $scope.filterSchedule = function(pos) {
      if($scope.scheduleEditPosition == 'all') {
        return true;
      }
      else if(pos == $scope.scheduleEditPosition) {
        return true;
      }
      return false;
    }

    // validation for schedule edit input
    $scope.inputStatus = function(id, weekday, shiftId) {
      var style = 'form-control schedule-edit-input';

      // Highlight all occurences of the employee that was clicked
      if (id == $scope.selectedId) {
        style += ' schedule-edit-highlight';
      }
      // Dummy Error/Warning Application
      /* // apply an error
      if (weekday=='monday' && shiftId == '3') {
        style += ' schedule-edit-input-error';
      }
      // apply a warning
      else if(weekday=='thursday' && shiftId == '2') {
        style += ' schedule-edit-input-warn';
      }
      // no warnings or errors
      else {
        style += ' schedule-edit-input-highlight';
      } */
      return style;
    }


  // Get The Schedule for the week currently being viewed
  $scope.getEmployees = function() {
    $http({
      url: '/sequoiagrove/employee',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.employees = data.employee;
        $log.debug(data);

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining emplyees simple : " + data);
    });
  }

  // Get The Schedule for the week currently being viewed
  $scope.getShifts = function() {
    $http({
      url: '/sequoiagrove/shift',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.shifts = data.shift;
        $log.debug(data);

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining emplyees simple : " + data);
    });
  }


  $scope.saveSchedule = function() {
    var i=0;
    var len = $scope.updateShifts.length;

    for(;i<len; i++) {
      $http({
        url: '/sequoiagrove/schedule/update/'+ 
            $scope.updateShifts[i].sid + '/' + 
            $scope.updateShifts[i].eid + '/' + 
            $scope.updateShifts[i].date,
        method: "POST"
      }).success(function (data, status, headers, config) {
          //$log.debug(data);
          //$log.debug(status);

          if (status == 200) {
            // clear update shifts list
            $scope.updateShifts.splice(i, 1);
          }
          else {
            $log.error('Error saving schedule ', status, data);
          }

      }).error(function (data, status, headers, config) {
          $log.error(status + " Error saving schedule " + data);
      });
    }
  }


  // adds the shift to the list that needs to be sent to the database for updating
  // if the shift is already in the list, the employee is changed to the new one
  // if the shift was already that way when retrieved from the database, it is
  // not added to the lists of shifts that need to be updated
  $scope.checkIfShiftExists = function(day, eid, sid) {
    var date = '';
    var updateLen = $scope.updateShifts.length
    var oldLen = 0;

    if (day == 'mon') {
      date = $scope.date.mon.val;
      oldLen = $scope.oldShifts.mon.length;
    }
    else if (day == 'tue') {
      date = $scope.date.tue.val;
      oldLen = $scope.oldShifts.tue.length;
    }
    else if (day == 'wed') {
      date = $scope.date.wed.val;
      oldLen = $scope.oldShifts.wed.length;
    }
    else if (day == 'thu') {
      date = $scope.date.thu.val;
      oldLen = $scope.oldShifts.thu.length;
    }
    else if (day == 'fri') {
      date = $scope.date.fri.val;
      oldLen = $scope.oldShifts.fri.length;
    }
    else if (day == 'sat') {
      date = $scope.date.sat.val;
      oldLen = $scope.oldShifts.sat.length;
    }
    else if (day == 'sun') {
      date = $scope.date.sun.val;
      oldLen = $scope.oldShifts.sun.length;
    }


    // first check if this was already in our original list of shifts
    var j=0;
    var duplicate = false;
    for(; j<oldLen && (duplicate == false); j++) {

      if (day == 'mon') {
        if(($scope.oldShifts.mon[j].eid == eid)
            && ($scope.oldShifts.mon[j].sid == sid)
            && ($scope.oldShifts.mon[j].date == date)) {
          duplicate = true;
        }
      }
      if (day == 'tue') {
        if(($scope.oldShifts.tue[j].eid == eid)
            && ($scope.oldShifts.tue[j].sid == sid)
            && ($scope.oldShifts.tue[j].date == date)) {
          duplicate = true;
        }
      }
      if (day == 'wed') {
        if(($scope.oldShifts.wed[j].eid == eid)
            && ($scope.oldShifts.wed[j].sid == sid)
            && ($scope.oldShifts.wed[j].date == date)) {
          duplicate = true;
        }
      }
      if (day == 'thu') {
        if(($scope.oldShifts.thu[j].eid == eid)
            && ($scope.oldShifts.thu[j].sid == sid)
            && ($scope.oldShifts.thu[j].date == date)) {
          duplicate = true;
        }
      }
      if (day == 'fri') {
        if(($scope.oldShifts.fri[j].eid == eid)
            && ($scope.oldShifts.fri[j].sid == sid)
            && ($scope.oldShifts.fri[j].date == date)) {
          duplicate = true;
        }
      }
      if (day == 'sat') {
        if(($scope.oldShifts.sat[j].eid == eid)
            && ($scope.oldShifts.sat[j].sid == sid)
            && ($scope.oldShifts.sat[j].date == date)) {
          duplicate = true; }
      }
      if (day == 'sun') {
        if(($scope.oldShifts.sun[j].eid == eid)
            && ($scope.oldShifts.sun[j].sid == sid)
            && ($scope.oldShifts.sun[j].date == date)) {
          duplicate = true;
        }
      }
    }

    // This shift was not in our original list add it to our update list 
    // if it already was in the update list, but for another employee id,
    // update the employee id. no change for the same employee id
    if(duplicate == false) {
      var i=0;
      var existsInUpdateList = false;
      for(; i<updateLen && (existsInUpdateList == false); i++) {

        // check that this shift was not already added to the update list
        if(($scope.updateShifts[i].date == date)
            && ($scope.updateShifts[i].sid == sid)) {

          // we don't need to add this to the list,
          // we need to change the employee id for this shift
          existsInUpdateList = true;
          $scope.updateShifts[i].eid = eid;
        }
      }

      // the shift needs to be added to the list of ones to update
      if (existsInUpdateList == false) {
        $scope.updateShifts.push({
          eid: eid,
          sid: sid,
          date: date
        });
      }
    }
    // though this was a duplicate in our original list, if it had been
    // previously changed this session, it still would exist in the update
    // list, so it needs to be removed if it exists there.
    if(duplicate == true) {
      $scope.removeFromUpdate(sid, date);
    }
    $scope.selectEid(eid);
    return;
  }

  // check if the shift was updated then reverted back to it was originally
  // it needs to be removed from the update list if it was reverted back
  $scope.removeFromUpdate = function(sid, date) {
    var i=0;
    var len = $scope.updateShifts.length;
    for(; i<len; i++) {
      if(($scope.updateShifts[i].date == date)
          && ($scope.updateShifts[i].sid == sid)) {

        $scope.updateShifts.splice(i, 1);
        break;
      }
    }
  }

  $scope.removeDelivery = function(index) {
    // remove delivery from dummy list for now
    $scope.deliveries.splice(index, 1);
  }

  // add delivery to front end
  $scope.addDelivery = function() {
    if ($scope.newDelivery != '') {
        $scope.deliveries.push(
        { title: $scope.newDelivery,
          days: {
            monday:    false,
            tuesday:   false,
            wednesday: false,
            thursday:  false,
            friday:    false,
            saturday:  false,
            sunday:    false}
        })
        $scope.newDelivery = '';
    }
  }

  $scope.init = function() {
    $scope.getEmployees();
    $scope.getShifts();
  }

  $scope.init();

});
