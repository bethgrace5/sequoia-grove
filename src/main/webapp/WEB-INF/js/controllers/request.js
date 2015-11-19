'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope) {


  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  /*
    $scope.previousRequests = [
      { employee: "John", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Emma", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Emma", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending"},
      { employee: "Andy", startDate: "May 25", endDate: "May 28", totalDays: "3", status: "approved"},
      { employee: "Sawyer", startDate: "May 20", endDate: "May 20", totalDays: "1", status: "approved"},
      { employee: "Blue", startDate: "May 15", endDate: "May 15", totalDays: "1", status: "denied"}
    ];
    */


});
