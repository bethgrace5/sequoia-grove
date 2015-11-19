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

    // shifts that were changed from old shifts and need to be saved to database
    $scope.updateShifts = [];

    $scope.employees = [];


    $scope.selectEid = function(id) {
      $scope.selectedId = id;
    }

    // validation for schedule edit input
    $scope.inputStatus = function(id, weekday, shiftId) {
      var style = 'form-control schedule-edit-input';

      // Highlight all occurences of the employee that was clicked
      if (id == $scope.selectedId) {
        style += ' schedule-edit-highlight';
      }

      // Dummy Error/Warning Application
      /*
      // apply an error
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
      }
      */
      return style;
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

  // Get The Schedule for the week currently being viewed
  $scope.getEmployees = function() {
    $http({
      url: '/sequoiagrove/employee',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.employees = data.employee;
        //$log.debug(data);

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining emplyees simple : " + data);
    });
  }

  $scope.showSchedule = function() {
    /*
    for(; i<len; i++) {
      sch.push({date: $scope.date.mon.val, sid:$scope.template[0].sid, eid:$scope.template[0].mon.eid});
      sch.push({date: $scope.date.tue.val, sid:$scope.template[0].sid, eid:$scope.template[0].tue.eid});
      sch.push({date: $scope.date.wed.val, sid:$scope.template[0].sid, eid:$scope.template[0].wed.eid});
      sch.push({date: $scope.date.thu.val, sid:$scope.template[0].sid, eid:$scope.template[0].thu.eid});
      sch.push({date: $scope.date.fri.val, sid:$scope.template[0].sid, eid:$scope.template[0].fri.eid});
      sch.push({date: $scope.date.sat.val, sid:$scope.template[0].sid, eid:$scope.template[0].sat.eid});
      sch.push({date: $scope.date.sun.val, sid:$scope.template[0].sid, eid:$scope.template[0].sun.eid});
    }
    */

  }

  $scope.saveSchedule = function(eid, sid, date) {
    $http({
      url: '/sequoiagrove/schedule/update/'+ eid + '/' + sid + '/' + date,
      method: "POST"
    }).success(function (data, status, headers, config) {
        $log.debug(data);
        $log.debug(status);

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error saving schedule " + data);
    });
  }

  $scope.init = function() {
    $scope.getEmployees();
  }

  $scope.init();

  $scope.checkIfShiftExists = function(day, eid, sid) {
              var k=0;
              len = $scope.updateShifts.length;
              var update = true;
              for(; k<len && update; k++) {

                // check that this shift was not already added to the list
                if(($scope.updateShifts[k].date == attrs.date)
                    && ($scope.updateShifts[k].sid == attrs.sid)) {

                  // check if this shift already existed 
                  // before updating
                  if(attrs.day == 'mon') {
                    var len= $scope.oldShifts.mon.length;
                    var j=0;
                    for(; j<len; j++) {
                      if(($scope.oldShifts.mon[j].eid == newId)
                          && ($scope.oldShifts.mon[j].sid == attrs.sid)
                          && ($scope.oldShifts.mon[j].date == attrs.date)) {
                        console.log('duplicate!');
                      }
                    }
                  }

                  // we don't need to add this to the list,
                  // we need to change the employee id for this shift
                  update = false;
                  $scope.updateShifts[k].eid = newId;
                }
              }

              // the shift needs to be added to the list of ones to update
              if (update == true) {
                $scope.updateShifts.push({
                  eid: newId,
                  sid: attrs.sid,
                  date: attrs.date
                });
              }

              $scope.selectEid($scope.employees[i].id);

  }



});
