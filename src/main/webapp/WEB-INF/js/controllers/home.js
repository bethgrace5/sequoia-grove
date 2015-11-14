'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('HomeCtrl', function ($scope, $translate) {
    $scope.showDeliveries = false;
    $scope.highlight = false;

    $scope.$on('translate', function(event, data) {
    }); 


    // types are: all, me, front, kitchen
    $scope.type = 'all';

    $scope.filterByType = function (thisType, user, mon, tue, wed, thu, fri, sat, sun) {
        if ($scope.type == 'all') {
            return true;
        }
        else if ($scope.type==thisType) {
            return true;
        }
        else if ($scope.type=='mine') {
          if (mon == user || tue == user || wed == user || thu == user ||
                fri == user || sat == user || sun == user) {
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
