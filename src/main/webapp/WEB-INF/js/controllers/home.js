'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.showDeliveries = false;
    $scope.highlight = true;

    // types are: all, user, front, kitchen, janitor
    $scope.type = 'all';

    $scope.filterByType = function (type, scheduled, user) {
        if ($scope.type == 'all') {
            return true;
        }
        else if ($scope.type==type) {
            return true;
        }
        else if ($scope.type=='mine') {
            console.log(scheduled.monday + ", " + user);
            console.log(scheduled.monday == user);
            if ( (scheduled.monday    == user) ||
                 (scheduled.tuesday   == user) ||
                 (scheduled.wednesday == user) ||
                 (scheduled.thursday  == user) ||
                 (scheduled.friday    == user) ||
                 (scheduled.saturday  == user) ||
                 (scheduled.sunday    == user)) {
                return true;
            }
            else {
                return false;
            }
        }

        return false;
    }

    $scope.next = function () {

    }
  });
