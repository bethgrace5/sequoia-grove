'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope, $log) {

  $scope.chartcount = 0 ;

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

  $scope.donGraph.onClick = function(points, evt) {
    //console.log(points, evt);
    //console.log(points[0].value);
    $scope.chartcount = points[0].label.substr(0,1)-1;
    //$scope.chartcount = points[0].value;
  }

  $scope.donGraph.labels = ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days", "7 Days"];
  //$scope.donGraph.data = [1, 2, 3, 4, 5, 6, 7]
  $scope.donGraph.data = [
    $scope.schCount[0].length, 
    $scope.schCount[1].length, 
    $scope.schCount[2].length, 
    $scope.schCount[3].length, 
    $scope.schCount[4].length, 
    $scope.schCount[5].length, 
    $scope.schCount[6].length];




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
