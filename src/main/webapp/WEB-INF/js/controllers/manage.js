'use strict';
/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:ManageCtrl
 * @description
 * # ManageControler
 * Controller for managing store
 */


angular.module('sequoiaGroveApp')
.controller('ManageCtrl', function ($scope, $log, $rootScope, $http, $location) {

  /****************** Check and Balances ****************************/
  $rootScope.lastPath = '/schedule';
  $rootScope.lastPath = '/request';
  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.deliveries = [];
  $scope.newdelivery = {
      id: 0,
      name:"",
      mon: false,
      tue:false,
      wed:false,
      thu:false,
      fri:false,
      sat:false,
      sun:false 
  }


  // The name of the active tab, by default, it will be the submit section
  $scope.activeTab = "holiday";

  // function to set the class of the tab to active,
  // and
  $scope.isActive = function(tabName) {
    if(tabName === $scope.activeTab) {
        return true;
    }
    return false;
  }


  // get all existing deliveries
  $scope.getdeliveries = function() {
    $http({
      url: '/sequoiagrove/delivery',
      method: "GET"
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear update shifts list
        $scope.deliveries = data.delivery; 
        $log.debug(data.delivery);
      }
    }).error(function (data, status, headers, config) {
      $log.error('Error getting deliveries ', status, data);
    });
  }

  $scope.getdeliveries();

/************** Holidays Functions **********************************/
  $scope.holidayStartDate;
  $scope.holidayEndDate;
  $scope.holidayName;
  $scope.newHolidayName;
  $scope.holidayDate;
  $scope.holidayType;
  $scope.types = ["Half" , "Full"];
  //--------------------------
  //Holiday Minor Functions
  //--------------------------
  $scope.today = new Date();
  $scope.minDateStart = new Date(
    $scope.today.getFullYear(),
    $scope.today.getMonth(),
    $scope.today.getDate()
    );

  $scope.holidayStartDate  = $scope.minDateStart;
  $scope.holidayEndDate =   $scope.minDateStart;

  $scope.updateEnd = function(){
    if(moment($scope.holidayDateStart).isAfter($scope.holidayDateEnd)){
      $scope.holidayEndDate = $scope.holidayStartDate;
    }
  }

  $scope.defaultDate = function(a){
    return moment(a).format("MMMM Do, YYYY");
  }

  $scope.compareDate = function(a, b){
    moment(a).format("MMMM Do, YYYY");
    moment(b).format("MMMM Do, YYYY");
    if(moment(a).isSame(b)){
      return true;
    }
    else{
      return false
    }
  }

  //--------------------------
  //Holiday Major Functions
  //--------------------------
  $scope.addNewHoliday = function(){
    $log.debug($scope.newHolidayName);
    $log.debug($scope.holidayType);
    $log.debug(moment($scope.holidayStartDate).format("MM-DD"));
    var obj = {
      "title":$scope.newHolidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD-YYYY"),
      "storeOpen":"10",
      "storeClose":"10"
    }
    $http({
      url: '/sequoiagrove/schedule/submit/new/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $scope.getAllHolidays();
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting new holiday ', status, data);
    });
  }

  $scope.getAllHolidays = function() {
    $http({
      url: '/sequoiagrove/schedule/get/holidays',
    method: "GET"
    }).success(function (data, status, headers, config) {
      $log.debug("At get All Holidays");
      $scope.allHolidays = data.holidays;
      $log.debug($scope.allHolidays);
    });
  }

  $scope.changeHolidayDates = function(){
    /*
    var obj = { 
      "name":$scope.holidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD"),
      "type":$scope.holidayType
    }
    $http({
      url: '/sequoiagrove/update/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
      $log.error('Error changing Holidays ', status, data);
    });
    */
  }

  $scope.selectHoliday = function(name){
    $scope.holidayName = name;
  }

  $scope.deleteHoliday = function(){
    var obj = { 
      "title":$scope.holidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD-YYYY"),
      "storeOpen":"10",
      "storeClose":"10"
    }
    $http({
      url: '/sequoiagrove/schedule/delete/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $scope.getAllHolidays();
    })
    .error(function (data, status, headers, config) {
      $log.error('Error changing Holidays ', status, data);
    });
  }

  $scope.init = function(){
    $scope.getAllHolidays();
  
  }

  $scope.init();
  


});

