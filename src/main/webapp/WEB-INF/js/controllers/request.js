'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope, $log, $rootScope, $location) {


  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
    return;
  }

  $scope.countDisplay = 0 ;

  $scope.donGraph= {
    onClick: function(points, evt) {
        $scope.countDisplay = points[0].label.substr(0,1)-1;
    },
    labels: ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days", "7 Days"],
    data: [
    /*
     * TODO use dayCount instead
      $scope.schCount[0].length, 
      $scope.schCount[1].length, 
      $scope.schCount[2].length, 
      $scope.schCount[3].length, 
      $scope.schCount[4].length, 
      $scope.schCount[5].length, 
      $scope.schCount[6].length
      */
    ]
  };

  $scope.previousRequests = [
    { employee: "John",   startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending" },
    { employee: "Emma",   startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending" },
    { employee: "Emma",   startDate: "May 25", endDate: "May 28", totalDays: "3", status: "pending" },
    { employee: "Andy",   startDate: "May 25", endDate: "May 28", totalDays: "3", status: "approved"},
    { employee: "Sawyer", startDate: "May 20", endDate: "May 20", totalDays: "1", status: "approved"},
    { employee: "Blue",   startDate: "May 15", endDate: "May 15", totalDays: "1", status: "denied"  }
  ];


});
