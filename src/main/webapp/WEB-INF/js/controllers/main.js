'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('MainCtrl', function (
      $http,
      $scope,
      $rootScope,
      $route,
      $translate,
      $location,
      $log,
      localStorageService) {

      $scope.getEmployees = function() {
          $http({  
            url: '/sequoiagrove/employees',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.employees = data.employees;
              //$log.debug(data);

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining employee data: " + data);
          });
      }

      $scope.getPositions = function() {
          $http({  
            url: '/sequoiagrove/positions',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.positions = data.positions;

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining position data: " + data);
          });
      }

      $scope.getShifts = function() {
          $http({  
            url: '/sequoiagrove/shifts',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.shifts = data.shifts;
              //$log.debug(data.shifts);

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining shift data: " + data);
          });
      }

      $scope.getDeliveries = function() {
          $http({  
            url: '/sequoiagrove/deliveries',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.deliveries = data.deliveries;
              //$log.debug(data.deliveries);

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining delivery data: " + data);
          });
      }

      $scope.getAvailability = function() {
          $http({  
            url: '/sequoiagrove/employees/availability/1',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.availability = data.availability;
              //$log.debug(data);

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining availability data: " + data);
          });
      }
      $scope.getEmployee = function() {
          $http({  
            url: '/sequoiagrove/employees/2',
            method: "GET"
          }).success(function (data, status, headers, config) {  
              $scope.employee1 = data;
              //$log.debug(data);

          }).error(function (data, status, headers, config) {  
              $log.error(status + " Error obtaining employe id:1 data: " + data);
          });
      }

      $scope.getEmployees();
      $scope.getPositions();
      $scope.getShifts();
      $scope.getDeliveries();
      $scope.getAvailability();
      $scope.getEmployee();


    // Sample Data as JSON
    $scope.user1 = { firstname: "John", lastname: "theManager", type: "manager" };
    $scope.user2 = { firstname: "Smith", lastname: "theEmployee", type: "employee" };
    $scope.lang = 'en';
    $scope.user = $scope.user1;

    localStorageService.set('SequoiaGrove.user', $scope.user);

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $scope.lang = langKey;
      localStorageService.set('SequoiaGrove.lang', langKey);
      $scope.$broadcast('translate');
    };

    // set active tab to
    $scope.changeTab = function(tab) {
        var path = $location.path();
        var length = path.length;
        if(tab == path.substring(0,length)) {
            return "active";
        }
        else {
            return "";
        }
    }

    // set tab to home on page load
    $scope.changeTab('/home');


    $scope.currentSchedule = [
    { date: "Sept-7",  
      weekday: "monday",
      scheduled:[
        {shiftid: "1",  name: "person"},
        {shiftid: "2",  name: "person"},
        {shiftid: "3",  name: "person"},
        {shiftid: "4",  name: "person"},
        {shiftid: "5",  name: "person"},
        {shiftid: "6",  name: "person"},
        {shiftid: "7",  name: "person"},
        {shiftid: "8",  name: "person"},
        {shiftid: "9",  name: "person"},
        {shiftid: "10", name: "person"},
        {shiftid: "11", name: "person"},
        {shiftid: "12", name: "person"},
        {shiftid: "13", name: "person"},
        {shiftid: "14", name: "person"}
       ]
    },
    { date: "Sept-8",  
       weekday: "tuesday",
       scheduled:[
         {shiftid: "1",  name: "person"},
         {shiftid: "2",  name: "person"},
         {shiftid: "3",  name: "person"},
         {shiftid: "4",  name: "person"},
         {shiftid: "5",  name: "person"},
         {shiftid: "6",  name: "person"},
         {shiftid: "7",  name: "person"},
         {shiftid: "8",  name: "person"},
         {shiftid: "9",  name: "person"},
         {shiftid: "10", name: "person"},
         {shiftid: "11", name: "person"},
         {shiftid: "12", name: "person"},
         {shiftid: "13", name: "person"},
         {shiftid: "14", name: "person"}
       ],
    },
    { date: "Sept-9",
       weekday: "wednesday",
       scheduled:[
         {shiftid: "1",  name: "person"},
         {shiftid: "2",  name: "person"},
         {shiftid: "3",  name: "person"},
         {shiftid: "4",  name: "person"},
         {shiftid: "5",  name: "person"},
         {shiftid: "6",  name: "person"},
         {shiftid: "7",  name: "person"},
         {shiftid: "8",  name: "person"},
         {shiftid: "9",  name: "person"},
         {shiftid: "10", name: "person"},
         {shiftid: "11", name: "person"},
         {shiftid: "12", name: "person"},
         {shiftid: "13", name: "person"},
         {shiftid: "14", name: "person"}
       ]
    },
    { date: "Sept-10",
       weekday: "thursday",
       scheduled:[
         { shiftid: "1",  name: "person" },
         { shiftid: "2",  name: "person" },
         { shiftid: "3",  name: "person" },
         { shiftid: "4",  name: "person" },
         { shiftid: "5",  name: "person" },
         { shiftid: "6",  name: "person" },
         { shiftid: "7",  name: "person" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-11",
       weekday: "friday",
       scheduled:[
         { shiftid: "1",  name: "person" },
         { shiftid: "2",  name: "person" },
         { shiftid: "3",  name: "person" },
         { shiftid: "4",  name: "person" },
         { shiftid: "5",  name: "person" },
         { shiftid: "6",  name: "person" },
         { shiftid: "7",  name: "person" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-12",
       weekday: "saturday",
       scheduled:[
         { shiftid: "1",  name: "person" },
         { shiftid: "2",  name: "person" },
         { shiftid: "3",  name: "person" },
         { shiftid: "4",  name: "person" },
         { shiftid: "5",  name: "person" },
         { shiftid: "6",  name: "person" },
         { shiftid: "7",  name: "person" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-13",
       weekday: "sunday",
       scheduled:[
         { shiftid: "1",  name: "person" },
         { shiftid: "2",  name: "person" },
         { shiftid: "3",  name: "person" },
         { shiftid: "4",  name: "person" },
         { shiftid: "5",  name: "person" },
         { shiftid: "6",  name: "person" },
         { shiftid: "7",  name: "person" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    }
    ];

});
