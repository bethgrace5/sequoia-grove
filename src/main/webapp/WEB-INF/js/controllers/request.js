'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope) {

  $scope.lineGraph= {};
  $scope.donGraph= {};

  $scope.lineGraph.labels = ["January", "February", "March", "April", "May", "June", "July"];

  $scope.lineGraph.series = ['Series A', 'Series B'];

  $scope.lineGraph.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  $scope.lineGraph.onClick = function (points, evt) {
    console.log(points, evt);
  };


  $scope.donGraph.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.donGraph.data = [300, 500, 100];




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
