'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('ScheduleCtrl', function ($http, $scope, $rootScope, $translate, $log, $filter) {
    $scope.activeTab = 'schedule';
    $scope.selectedId = 0;
    $scope.newDelivery = '';
    $scope.updateShifts = [];
    $scope.employees = [];


    $scope.selectEid = function(id) {
      $scope.selectedId = id;
    }

    // validation for schedule edit input
    $scope.inputStatus = function(id, weekday, shiftId) {
      var style = 'form-control schedule-edit-input';

      if (id == $scope.selectedId) {
        style += ' schedule-edit-highlight';
      }
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
        $log.error(status + " Error obtaining schedule template main: " + data);
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


});
