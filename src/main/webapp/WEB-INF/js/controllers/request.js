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
.controller('RequestCtrl', function( $scope, $log, $rootScope, $http, $mdDialog, $timeout, $location, localStorageService, loginFactory, requestFactory ){

  /****************** Check and Balances ****************************/
  localStorageService.set('lastPath', '/request');
  // user is not logged in
  if ($scope.loggedIn == false) {
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

  // The name of the active tab, by default, it will be the submit section
  $scope.activeTab = "submit";

  // function to set the class of the tab to active,
  // and
  $scope.isActive = function(tabName) {
    if(tabName === $scope.activeTab) {
        return true;
    }
    return false;
  }

  //-----------------
  // Ease_of_Access
  //-----------------
  $scope.totalDays = function(a, b){
    var date1 = moment(a,'YYYY-MM-DD');
    var date2 = moment(b,'YYYY-MM-DD')
    return date2.diff(date1, 'days') + 1;
  }

  //Change Date into a specific format
  $scope.defaultDate = function(a){
    return moment(a, 'YYYY-MM-DD').format("MMMM Do, YYYY");
  }

  /****************** Employee_User_Setup ****************************/
  //------------------------------
  //  SubmitGet_Request
  //------------------------------
  $scope.userRequests;

  $scope.getCurrentEmployeeRequest = function() {
    return $http({
      url: '/sequoiagrove/request/get/current/employee/'+
      loginFactory.getUser().id,
      method: "POST"
    }).success(function(data, status) {
      $scope.userRequests = data.request;
    });
  }

  $scope.submitRequest = function(){
    var obj = { "eid": loginFactory.getUser().id,
      "startDate":moment($scope.requestDateStart).format("MM-DD-YYYY"),
      "endDate":moment($scope.requestDateEnd).format("MM-DD-YYYY")
    }
    $http({ url: '/sequoiagrove/request/submit/', method: "POST", data: JSON.stringify(obj)})
      .then(function (success){
        return $scope.getCurrentEmployeeRequest()
      }).then(function(success) {
        if (loginFactory.getUser().isManager) {
          //$scope.getPendingRequests().
          requestFactory.init().
          then(function(success) {
            $scope.pendingRequests = success.requestStatus;
            $scope.getAllRequests();
          });
        }
    });
  }

  $scope.confirmSubmit = function(ev) {
    //if($scope.checkDatesCollide()){
      //$scope.datesCollidePopup(ev);
      //return;
    //}
    var message =
      'from '+  moment($scope.requestDateStart).format("MMMM Do, YYYY") +
      ' to ' +  moment($scope.requestDateEnd).format("MMMM Do, YYYY");

    if($scope.totalDays($scope.requestDateStart, $scope.requestDateEnd ) == 1) {
      message = "Date: " + moment($scope.requestDateStart).format("MMMM Do, YYYY");
    }

    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Would You Like To Submit This Request')
      .textContent(message)
      .ariaLabel('Request Submit')
      .targetEvent(ev)
      .ok('Confirm')
      .cancel('Deny');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Submited Request';
      $scope.submitRequest();
    }, function() {
      $scope.status = 'Request not send.';
    });
  };

  $scope.datesCollidePopup = function(ev){
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    /*
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Request Denied')
        .textContent('Dates Are Already in use')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
    */
  };

  //---------------
  //Dates_Collider
  //---------------
  /*This will take the requestDateStart / requestDateEnd and compare it
   *to userRequests, it will return true if it conflicts with eachother */

  $scope.checkDatesCollide = function(){
    var i = 0;
    var submitStart = moment($scope.requestDateStart);
    var submitEnd = moment($scope.requestDateEnd);

    for(i = 0; i < $scope.userRequests.length; i++){
      //I need more testing with this function...
      var checkStart = moment($scope.userRequests[i].startDate).subtract(1, 'day');
      var checkEnd   = moment($scope.userRequests[i].endDate).add(1, 'day');

      if(moment(submitStart).isBetween(checkStart, checkEnd)){
        return true;
      }
      if(moment(submitEnd).isBetween(checkStart, checkEnd)){
        return true;
      }
      if(moment(checkStart).isBetween(submitStart, submitEnd)){
        return true;
      }
      if(moment(checkEnd).isBetween(submitStart, submitEnd)){
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
    return $http({
      url: '/sequoiagrove/request/get/checked',
      method: "GET"
    }).success(function (data, status, headers, config) {
      $scope.allRequests = data.requestStatus;
    });
  }

  //----------------------------------
  //Manager_Change_Submit_Request
  //----------------------------------
  $scope.selectedEmployee = {'id':0};
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
          requestFactory.init().then(function(success) {
            $scope.pendingRequests = success.requestStatus;
        return $scope.getAllRequests();
      })
    });
  }

  $scope.changeRequest = function($requestID, $approverID, $is_approve) {
    $http({
      url: '/sequoiagrove/request/update/' +
      $requestID + '/' + $approverID + '/' + $is_approve,
    method: "POST"
    }).success(function(data, status) {
      $scope.getCurrentEmployeeRequest().then(function(success) {
        return $scope.getAllRequests();
      }).then(function(success) {
          requestFactory.init().then(function(success) {
            $scope.pendingRequests = success.requestStatus;
          });
        //return $scope.getPendingRequests();
      });
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
    });
  }

  $scope.clearManagerForm = function() {
    $scope.selectedEmployee = {'id':0};
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

  $scope.init = function(){
    //$scope.changeRequest($rootScope.loggedInUser.id, $rootScope.loggedInUser.id , 1);
    if (loginFactory.getUser().isManager) {
      $scope.getAllRequests().then(function(success) {
        return $scope.getCurrentEmployeeRequest();
      }).then(function(success) {
        return requestFactory.init();
      })
    }
    else {
      return $scope.getCurrentEmployeeRequest();
    };
  }

  $scope.init();


});
