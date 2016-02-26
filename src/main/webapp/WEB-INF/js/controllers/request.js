'use strict';
/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller for requesting vacation
 */
//+---------------
//| Directory
//+--------------
//| Minor_Functions
//|   - Date_Gatherer
//|   - Ease_of_Access
//| Employee_User_Setup
//|   - SubmitGet_Request
//|   - Dates_Collider
//| Manager_View
//|   - Retrieve_Requests
//|   - Manager_Change_Submit_Request
//| Toggles
//| ?????
//| Initialize_Testing_Extreme


angular.module('sequoiaGroveApp')
.controller('RequestCtrl', function ($scope, $log, $rootScope, $http, $location) {

  /****************** Check and Balances ****************************/
  $rootScope.lastPath = '/schedule';
  $rootScope.lastPath = '/request';
  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  /****************** Minor_Functions ****************************/
  //-----------------
  // Date_Gatherer
  //-----------------
  $scope.requestDateStart;// = $scope.minDateStart;
  $scope.requestDateEnd;  //= $scope.minDateStart;

  $scope.today = new Date();
  $scope.minDateStart = new Date(
    $scope.today.getFullYear(),
    $scope.today.getMonth(),
    $scope.today.getDate() + 14
    );

  $scope.updateEnd = function(){
    if(moment($scope.requestDateStart).isAfter($scope.requestDateEnd)){
      $scope.requestDateEnd = $scope.requestDateStart;
    }
  }

  //-----------------
  // Ease_of_Access
  //-----------------
  $scope.totalDays = function(a, b){
    var date1 = moment(a);
    var date2 = moment(b)
    return date2.diff(date1, 'days') + 1;
  }

  //Change Date into a specific format
  $scope.defaultDate = function(a){
    return moment(a).format("MMMM Do, YYYY");
  }

  /****************** Employee_User_Setup ****************************/
  //------------------------------
  //  SubmitGet_Request
  //------------------------------
  $scope.userRequests;

  $scope.getCurrentEmployeeRequest = function() {
    $http({
      url: '/sequoiagrove/request/get/current/employee/'+
      $rootScope.loggedInUser.id,
      method: "POST"
    }).success(function(data, status) {
      $scope.userRequests = data.request;
    });
  }

  $scope.submitRequest = function(){
    if($scope.checkDatesCollide()){
      return;
    }
    var obj = { "eid": $rootScope.loggedInUser.id,
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $http({
      url: '/sequoiagrove/request/submit/',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $scope.getCurrentEmployeeRequest();
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting request ', status, data);
    });
  }

  //---------------
  //Dates_Collider
  //---------------
  /*This will take the requestDateStart / requestDateEnd and compare it
   *to userRequestes, it will return true if it conflicts with eachother */

  $scope.checkDatesCollide = function(){
    $log.debug($scope.userRequests);

    var i = 0;
    var submitStart = moment($scope.requestDateStart);
    var submitEnd = moment($scope.requestDateEnd);

    for(i = 0; i < $scope.userRequests.length; i++){
      //I need more testing with this function...
      var checkStart = moment($scope.userRequests[i].startDate).subtract(1, 'day');
      var checkEnd   = moment($scope.userRequests[i].endDate).add(1, 'day');

      if(moment(submitStart).isBetween(checkStart, checkEnd)){
        //$log.debug("Is S In"); 
        alert("Dates Already Taken");
        return true;
      }
      if(moment(submitEnd).isBetween(checkStart, checkEnd)){
        //$log.debug("Is N In");
        alert("Dates Already Taken");
        return true;
      }
      if(moment(checkStart).isBetween(submitStart, submitEnd)){
        //$log.debug("S Is N");
        alert("Dates Already Taken");
        return true;
      }
      if(moment(checkEnd).isBetween(submitStart, submitEnd)){
        //$log.debug("S In N");
        alert("Dates Already Taken");
        return true;
      }
    }
    return false;
  }

  /****************** Manager_View ****************************/
  //-----------------------------------
  //Retrieve_Requests
  //-----------------------------------
  $scope.allRequests;
  $scope.pendingRequests;

  $scope.getAllRequests = function() {
    $http({
      url: '/sequoiagrove/request/get',
      method: "GET"
    }).success(function (data, status, headers, config) {
      $log.debug(data);
      $scope.allRequests = data.requestStatus;
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error obtaining position data: " + data);
    });
  }

  $scope.getPendingRequests = function() {
    $http({
      url: '/sequoiagrove/request/get/pending',
      method: "GET"
    }).success(function (data, status, headers, config) {
      $scope.pendingRequests = data.requestStatus;
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error obtaining position data: " + data);
    });
  }

  //----------------------------------
  //Manager_Change_Submit_Request
  //----------------------------------
  $scope.selectedEmployee;
  $scope.targetEmployee = function(employee){
    $scope.selectedEmployee = employee
    $scope.seeTargetEmployee = 1;
  }
  $scope.selectedRequest;
  $scope.targetRequest = function(request){
    $scope.selectedRequest = request
    $scope.seeTargetRequest = 1;
  }

  $scope.managerSubmitRequest = function(){
    var obj = { "eid": $scope.selectedEmployee.id,
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $http({
      url: '/sequoiagrove/request/submit/',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting request ', status, data);
    });
  }

  $scope.changeRequest = function($requestID, $approverID, $is_approve) {
    $http({
      url: '/sequoiagrove/request/update/' + 
      $requestID + '/' + $approverID + '/' + $is_approve,
      method: "POST"
    }).success(function(data, status) {
      $scope.getPendingRequests();
    });
  }

  $scope.changeRequestDates = function(){
    var obj = { "eid": $scope.selectedRequest.requestID,
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"), 
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $http({
      url: '/sequoiagrove/request/update/dates',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting request ', status, data);
    });
  }
  //-------------------------
  //Toggles
  //------------------------- 
  $scope.seeEmployees = 1; //When Manager Wants to see all employees... Test?
  $scope.seeTargetEmployee = 1;
  $scope.seeTargetRequest = 0;

  $scope.changeEmployeeView = function(){
    if($scope.seeEmployees){
      $scope.seeEmployees = 0;
    }
    else{
      $scope.seeEmployees = 1;
    }
  }
  $scope.targetPendingEmployee = function(){
    if($scope.seeTargetRequests){
      $scope.seeTargetRequests = 0;
    }
    else{
      $scope.seeTargetRequests = 1;
    }
  }

  //********** Initialize Testing Extreme ***************************\
  $scope.testManager = function(){
    if ($rootScope.loggedInUser.isManager) {
      $log.debug("you are a Manager");
    } 
    else{
      $log.debug("you are a  Employee");
    }
  } 

  $scope.init = function(){
    $log.debug($scope.previousRequests);
    //$scope.changeRequest($rootScope.loggedInUser.id, $rootScope.loggedInUser.id , 1);
    $scope.getAllRequests();
    $scope.getCurrentEmployeeRequest();
    $scope.getPendingRequests();
    $scope.getEmployees();
    $scope.testManager();
  }

  $scope.init();
});
