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
//| Minor_Function
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
    var dog = moment(a);
    var cool = moment(b)
    return cool.diff(dog, 'days');
  }

  //Change Date into a specific format
  $scope.defaultDate = function(a){
    return moment(a).format("MM-DD-YYYY");
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
      $log.debug("Current Requests");
      $log.debug($scope.userRequests);
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
      $log.debug("Sumbiting Request");
      $log.debug(data);
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
  $scope.employees;
  $scope.allRequests;
  $scope.pendingRequests;

  $scope.getEmployees = function() {
    $http({
      url: '/sequoiagrove/employees',
      method: "GET"
    }).success(function (data, status, headers, config) {
      $log.debug("All Employeess");
      $scope.employees = data.employees;
      $log.debug(data);
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error obtaining position data: " + data);
    });
  }

  $scope.getAllRequests = function() {
    $http({
      url: '/sequoiagrove/request/get',
      method: "GET"
    }).success(function (data, status, headers, config) {
      $log.debug("All Requests");
      $scope.allRequests = data.requestStatus;
      $log.debug($scope.allRequests);
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error obtaining position data: " + data);
    });
  }

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

  //----------------------------------
  //Manager_Change_Submit_Request
  //----------------------------------
  $scope.selectedEmployee;
  $scope.targetEmployee = function(employee){
    $scope.selectedEmployee = employee
    $log.debug($scope.selectedEmployee);
    $scope.seeTargetEmployee = 1;
  }
  $scope.selectedRequest;
  $scope.targetRequest = function(request){
    $scope.selectedRequest = request
    $log.debug($scope.selectedRequest);
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
      $log.debug("Managers Request to object:");
      $log.debug(data);
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting request ', status, data);
    });
  }

  $scope.changeRequest = function($requestID, $approverID, $is_approve) {
    $log.debug("changeRequest activated");
    $http({
      url: '/sequoiagrove/request/update/' + 
      $requestID + '/' + $approverID + '/' + $is_approve,
      method: "POST"
    }).success(function(data, status) {
      $log.debug("Request Changed");
      $log.debug(data);
      $scope.getPendingRequests();
    });
  }

  $scope.changeRequestDates = function(){
    $log.debug("changeRequest activated");
    $log.debug($scope.selectedRequest.requestID);
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
      $log.debug(data);
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
    $log.debug("Toggle Dog");
    if($scope.seeTargetRequests){
      $scope.seeTargetRequests = 0;
    }
    else{
      $scope.seeTargetRequests = 1;
    }
  }
  //?????
  //********* Not Sure What this is Placement, but might be important info**************
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
