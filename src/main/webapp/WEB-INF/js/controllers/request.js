'use strict';

angular.module('sequoiaGroveApp')
.controller('RequestCtrl', function( $scope, $log, $rootScope, $http, $mdDialog, $timeout, $location, localStorageService, loginFactory, requestFactory ){

  localStorageService.set('lastPath', '/request');
  // user is not logged in
  if (loginFactory.isLoggedIn() === false) {
    $location.path('/login');
  }

  /****************** Minor_Functions ****************************/
  $scope.requestDateStart;// = $scope.minDateStart;
  $scope.requestDateEnd;  //= $scope.minDateStart;

  $scope.today = new Date();
  $scope.minDateStart = new Date(
    $scope.today.getFullYear(),
    $scope.today.getMonth(),
    $scope.today.getDate() + 14);

  $scope.updateEnd = function(){
    if(moment($scope.requestDateStart).isAfter($scope.requestDateEnd)){
      $scope.requestDateEnd = $scope.requestDateStart;
    }
  }

  // The name of the active tab, by default, it will be the submit section
  $scope.activeTab = 'submit';
  if(loginFactory.getUser().isManager) {
    $scope.activeTab = 'pending';
  }

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
    return moment(a, 'YYYY-MM-DD').format('MMMM Do, YYYY');
  }

  /****************** Manager_View ****************************/

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

  $scope.managerSubmitRequest = function(ev){
    var obj = { 'eid': $scope.selectedEmployee.id,
      'start':$scope.requestDateStart,
      'end':$scope.requestDateEnd
    }
    requestFactory.submit(obj, ev);
  }

  $scope.submitRequest = function(ev){
    var request = { 'eid': loginFactory.getUser().id,
      'start':$scope.requestDateStart,
      'end':$scope.requestDateEnd
    }
    requestFactory.submit(request, ev);
  }


  $scope.changeRequest = function(request, isApproved) {
    var id = loginFactory.getUser().id;
    var totalDays = $scope.totalDays(request.startDate, request.endDate);
    var approverId = loginFactory.getUser().id;

    requestFactory.updateRequest(request, isApproved, approverId, totalDays);
    return;

    var requestId = request.requestID;
    var title = (isApproved === true)? 'Approve Request for ': 'Deny Request for ';
    title += request.employeeFirstName + '? ';
    title += $scope.totalDays(request.startDate, request.endDate) + 'day(s)';
    var message =
      'from '+  moment(request.startDate).format('MMMM Do, YYYY') +
      ' to ' +  moment(request.endDate).format('MMMM Do, YYYY');

    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title(title)
      .textContent(message)
      .ariaLabel('Request Respond')
      .ok((isApproved === true)? 'Approve':'Deny')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http({
        url: '/sequoiagrove/request/respond',
        method: 'POST',
        data: {'requestId':requestId, 'approverId':approverId, 'isApproved':isApproved}
      }).success(function(data, status) {
        $scope.getCurrentEmployeeRequest().then(function(success) {
          return $scope.getAllRequests();
        }).then(function(success) {
          requestFactory.init().then(function(success) {
            $scope.pendingRequests = success.data.requestStatus;
            console.log($scope.pendingRequests);
            $scope.getAllRequests();
          });
          //return $scope.getPendingRequests();
        });
      });
    }, function() {
      // do nothing
    });

  }

  $scope.changeRequestDates = function(){
    var obj = { 'eid': $scope.selectedRequest.requestID,
      'startDate':moment($scope.requestDateStart).format('MM-DD-YYYY'),
      'endDate':moment($scope.requestDateEnd).format('MM-DD-YYYY')
    }
    $http({
      url: '/sequoiagrove/request/update/dates',
    method: 'POST',
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

});
