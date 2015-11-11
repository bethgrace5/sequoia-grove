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
    $scope.selectedName = '';


    $scope.newDelivery = '';


    $scope.removeDelivery = function(index) {
      // remove delivery from dummy list for now
      $scope.deliveries.splice(index, 1);
    }

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


    $scope.selectName = function(name) {
      $log.debug(name);
      $scope.selectedName = name;
    }

    // validation for schedule edit input
    $scope.inputStatus = function(name, weekday, shiftId) {
      var style = 'form-control schedule-edit-input';

      if (name == $scope.selectedName) {
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

    $scope.alteredTitle = '';

    $scope.changeShift = function() {}


  });
