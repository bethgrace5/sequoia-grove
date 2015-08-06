'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('EmployeeCtrl', function ($scope) {
      $scope.activeTab = 'info';
      $scope.name = "sunny";

      $scope.changeName = function () {
          if ($scope.name == "sunny") {
              $scope.name = "beth";
          }
          else {
              $scope.name = "sunny";
          }

      }


      $scope.seeName = function () {
          return $scope.name;
      }






  });
