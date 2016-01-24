'use strict';

angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope, $log, $rootScope, $location) {


  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
    return;
  }
  //Date Gatherer x2
  $scope.requestDateStart = new Date();
  $scope.requestDateEnd = new Date();

  $scope.minDateStart = new Date(
      $scope.requestDateStart.getFullYear(),
      $scope.requestDateStart.getMonth(),
      $scope.requestDateStart.getDate() + 14);//14 days/2 weeks in advance

  $scope.minDateEnd = new Date(
      $scope.requestDateEnd.getFullYear(),
      $scope.requestDateEnd.getMonth(),
      $scope.requestDateEnd.getDate());

    /*$scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }*/

  //Request Status
  //note: should this be more protected?
  $scope.managerMode  = false;
  $scope.employeeMode = true;


  //Temporary 

  //Submit Request
  $scope.submitRequest = function(){
    $log.debug("sumbit request off"); 
    //$log.debug($scope.requestDateStart < $scope.requestDateEnd); 
    //$log.debug(moment('2010-10-20').isAfter('2010-10-19')); 
    $log.debug(moment($scope.requestDateEnd).isAfter($scope.requestDateStart)); 
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
