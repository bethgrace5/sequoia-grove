'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope, $log, $rootScope, $http, $location) {


  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
    return;
  }

  //Date Gatherer
  $scope.today = new Date();
  $scope.minDateStart = new Date(
      $scope.today.getFullYear(),
      $scope.today.getMonth(),
      $scope.today.getDate() + 14);//14 days/2 weeks in advance

  $scope.requestDateStart = $scope.minDateStart;
  $scope.requestDateEnd   = $scope.minDateStart;


  $scope.updateEnd = function(){ 

    if(moment($scope.requestDateStart).isAfter($scope.requestDateEnd)){
      $scope.requestDateEnd = $scope.requestDateStart; 
    } 
  }


  //Submit Request
  $scope.submitRequest = function(){
    var obj = { "eid": $rootScope.loggedInUser.id, 
      "start":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "end":moment($scope.requetsDateEnd).format("MM-DD-YYYY")
    }
    $http({
      url: '/sequoiagrove/request/submit/',
      method: "POST",
      data: { 'body': JSON.stringify(obj) }
    })
    .success(function (data, status, headers, config) {
      $log.debug(data);
    })
    .error(function (data, status, headers, config) {
        $log.error('Error submiting request ', status, data);
    });  
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
