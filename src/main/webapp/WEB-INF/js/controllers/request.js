'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope) {

    $scope.previousRequests = [
      { employee: "John", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Emma", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Emma", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Andy", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "approved"},
      { employee: "Sawyer", startDate: "May 20", endDate: "May 20", totalDays: "1", status: "approved"},
      { employee: "Blue", startDate: "May 15", endDate: "May 15", totalDays: "1", status: "denied"}
    ];


  });
