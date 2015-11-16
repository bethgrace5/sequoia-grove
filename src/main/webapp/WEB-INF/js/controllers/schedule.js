'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('ScheduleCtrl', function ($scope, $rootScope, $translate, $log) {

    $scope.activeTab = 'schedule';
    $scope.selectedId = 0;
    $scope.newDelivery = '';

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
  $scope.getScheduleTemplate = function() {
    $http({
      url: '/sequoiagrove/employee',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.employees = data.template;
        //$log.debug(data);

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining schedule template main: " + data);
    });
  }

  $scope.showSchedule = function() {
    $log.debug($scope.template);
  }



});
