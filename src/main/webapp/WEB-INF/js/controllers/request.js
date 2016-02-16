'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller for requesting vacation
 */
angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope, $log, $rootScope, $http, $location) {

  $rootScope.lastPath = '/schedule';

  $rootScope.lastPath = '/request';

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  //Date Gatherer
  $scope.today = new Date();
  $scope.minDateStart = new Date(
      $scope.today.getFullYear(),
      $scope.today.getMonth(),
      $scope.today.getDate() + 14
    );//14 days/2 weeks in advance

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
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $log.debug(obj);
    $http({
      url: '/sequoiagrove/request/submit/',
      method: "POST",
      data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $log.debug(data);
    })
    .error(function (data, status, headers, config) {
        $log.error('Error submiting request ', status, data);
    });
  }
  
  //Manager's Sumbit Request
  $scope.seeEmployees = 1; //When Manager Wants to see all employees... Test?
  $scope.seeTargetEmployee = 0;
  $scope.selectedEmployee;   //Info On Specific

  $scope.managerSubmitRequest = function(){
    var obj = { "eid": $scope.selectedEmployee.id,
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $log.debug("Managers Request to object:");
    $log.debug(obj);
    $http({
      url: '/sequoiagrove/request/submit/',
      method: "POST",
      data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $log.debug(data);
    })
    .error(function (data, status, headers, config) {
        $log.error('Error submiting request ', status, data);
    });
  }

  //See All Employees
  $scope.changeEmployeeView = function(){
    if($scope.seeEmployees){
      $scope.seeEmployees = 0;
    }
    else{
      $scope.seeEmployees = 1;
    }
  }
  //See One Employee
  $scope.targetEmployee = function(employee){
    $scope.selectedEmployee = employee
    $log.debug($scope.selectedEmployee);
    $scope.seeTargetEmployee = 1;
  }

  //Get All Employees 
    $scope.employees;
    $scope.getEmployees = function() {
    $http({
      url: '/sequoiagrove/employees',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $log.debug("sucess");
        $scope.employees = data.employees;
        $log.debug(data);
    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining position data: " + data);
    });
  }

  //Get All Request
  $scope.getRequests = function() {
    $http({
      url: '/sequoiagrove/request/get',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $log.debug(data);
    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining position data: " + data);
    });
  }

  //Get Request that are pending
  $scope.pendingRequests;
  $scope.getPendingRequests = function() {
    $http({
      url: '/sequoiagrove/request/get/pending',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $log.debug("Pending Requests");
        $log.debug(data);
        $scope.pendingRequests = data.requestStatus;
        $log.debug($scope.pendingRequests);
    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining position data: " + data);
    });
  }


  //Get Current User Requests
  $scope.userRequests;
  $scope.getCurrentEmployeeRequest = function() {
    $http({
      url: '/sequoiagrove/request/get/current/employee/'+
       $rootScope.loggedInUser.id,
      method: "POST"
    }).success(function(data, status) {
      $scope.userRequests = data.request;
      $log.debug($scope.userRequests);
    });
  }

  //Approve Request
  $scope.approveRequest= function() {
    $http({
      url: '/sequoiagrove/request/accept/'+
       $rootScope.loggedInUser.id,
      method: "POST"
    }).success(function(data, status) {
      $log.debug(data);
    });
  }

  //Change Request
  $scope.changeRequest = function($requestID, $approverID, $is_approve) {
    $log.debug("changeRequest activated");
    $http({
      url: '/sequoiagrove/request/update/' + 
      $requestID + '/' + $approverID + '/' + $is_approve,
      method: "POST"
    }).success(function(data, status) {
      $log.debug(data);
      $scope.getPendingRequests();
    });
  }
  $scope.test = function(){
    $log.debug("changeRequest activated"); 
  }

  $scope.totalDays = function(a, b){
    var dog = moment(a);
    var cool = moment(b)
    return cool.diff(dog, 'days');
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

//---------- Initialize Testing Extreme ----------------\\
  $scope.init = function(){
    $log.debug($scope.previousRequests);
    //$scope.changeRequest($rootScope.loggedInUser.id, $rootScope.loggedInUser.id , 1);
    $scope.getCurrentEmployeeRequest();
    $scope.getPendingRequests();
    $log.debug("For Employees List");
    $scope.getEmployees();
  }
  $scope.init();

  //----Temporary Function Location -----




  });
