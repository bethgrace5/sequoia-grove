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

  $scope.today = '';

  $scope.date = {
    monday:{},
    tuesday:{},
    wednesday:{},
    thursday:{},
    friday:{},
    saturday:{},
    sunday:{},
  };

  var showSchedule = function(mondayDate) {
    var today = new Date();
    // decide which weekday it is today.
    var currentIndex = today.getDay(); // 0 is Sunday
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    // set the date string as numbers for queries
    $scope.date.monday.val    = (mm+1) + '-'+ (dd + currentIndex+1-10) + '-' + yyyy;
    $scope.date.tuesday.val   = (mm+1) + '-'+ (dd + currentIndex+2-10) + '-' + yyyy;
    $scope.date.wednesday.val = (mm+1) + '-'+ (dd + currentIndex+3-10) + '-' + yyyy;
    $scope.date.thursday.val  = (mm+1) + '-'+ (dd + currentIndex+4-10) + '-' + yyyy;
    $scope.date.friday.val    = (mm+1) + '-'+ (dd + currentIndex+5-10) + '-' + yyyy;
    $scope.date.saturday.val  = (mm+1) + '-'+ (dd + currentIndex+6-10) + '-' + yyyy;
    $scope.date.sunday.val    = (mm+1) + '-'+ (dd + currentIndex+7-10) + '-' + yyyy;

    // set the month number as word
    switch(mm) {
      case 0:  mm = "Jan"; break;
      case 1:  mm = "Feb"; break;
      case 2:  mm = "March"; break;
      case 3:  mm = "April"; break;
      case 4:  mm = "May"; break;
      case 5:  mm = "June"; break;
      case 6:  mm = "July"; break;
      case 7:  mm = "Aug"; break;
      case 8:  mm = "Sept"; break;
      case 9:  mm = "Oct"; break;
      case 10: mm = "Nov"; break;
      case 11: mm = "Dec"; break;
    }

    // set the date string with text for display on view
    $scope.date.monday.disp    = mm+'-'+(dd-currentIndex+1);
    $scope.date.tuesday.disp   = mm+'-'+(dd-currentIndex+2);
    $scope.date.wednesday.disp = mm+'-'+(dd-currentIndex+3);
    $scope.date.thursday.disp  = mm+'-'+(dd-currentIndex+4);
    $scope.date.friday.disp    = mm+'-'+(dd-currentIndex+5);
    $scope.date.saturday.disp  = mm+'-'+(dd-currentIndex+6);
    $scope.date.sunday.disp    = mm+'-'+(dd-currentIndex+7);

  }

  showSchedule();

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
    $scope.getHotel = function() {
      $http({
        url: '/sequoiagrove/hotel',
        method: "GET"
      }).success(function (data, status, headers, config) {
          $scope.hotel = data;
          //$log.debug(data);

      }).error(function (data, status, headers, config) {
          $log.error(status + " Error obtaining hotel data: " + data);
      });
    }

    $scope.getSchedule = function() {
        $http({
          url: '/sequoiagrove/schedule/week/'+$scope.date.monday.val,
          method: "GET"
        }).success(function (data, status, headers, config) {
          $log.debug(data);
          /*
          var day = new Date (data.schedule[0].day);
          $log.debug(day);

            $scope.sch = { date:day, scheduled:{
              mon:[], tue:[], wed:[], thu:[], fri:[], sat:[], sun:[]
              } 
            };

            data.schedule.forEach(function(value, index, ar) {
              $log.debug(value.sid);
              $scope.sch.scheduled.mon.push(
                { "sid": value.sid, 
                  "name":value.ename, 
                  "type":value.location,
                  "tname":value.tname,
                  "ename":value.ename,
                  "wd_st":value.wd_st,
                  "wd_ed":value.wd_st
                });
            });


            $log.debug($scope.sch);
            //$log.debug(data);
            //*/

        }).error(function (data, status, headers, config) {
            $log.error(status + " Error obtaining schedule data: " + data);
        });
    }

    $scope.getSchedule();
    $scope.getHotel();
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
      {shiftid: "1",  name: "Sandy"},
      {shiftid: "2",  name: "Danny"},
      {shiftid: "3",  name: "Sky"},
      {shiftid: "4",  name: "Zin"},
      {shiftid: "5",  name: "Lynne"},
      {shiftid: "6",  name: "Eli"},
      {shiftid: "7",  name: "Mark"},
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
       {shiftid: "1",  name: "Sandy"},
       {shiftid: "2",  name: "Danny"},
       {shiftid: "3",  name: "Zin"},
       {shiftid: "4",  name: "Sky"},
       {shiftid: "5",  name: "Lynne"},
       {shiftid: "6",  name: "Eli"},
       {shiftid: "7",  name: "Mark"},
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
       {shiftid: "1",  name: "Danny"},
       {shiftid: "2",  name: "Jimmy"},
       {shiftid: "3",  name: "Zin"},
       {shiftid: "4",  name: "Sky"},
       {shiftid: "5",  name: "Lynne"},
       {shiftid: "6",  name: "Carl"},
       {shiftid: "7",  name: "Bekka"},
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
       { shiftid: "1",  name: "Jimmy" },
       { shiftid: "2",  name: "Sandy" },
       { shiftid: "3",  name: "Minnie" },
       { shiftid: "4",  name: "Mickey" },
       { shiftid: "5",  name: "Zin" },
       { shiftid: "6",  name: "Bekka" },
       { shiftid: "7",  name: "Eli" },
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
       { shiftid: "1",  name: "Sandy" },
       { shiftid: "2",  name: "Danny" },
       { shiftid: "3",  name: "Minnie" },
       { shiftid: "4",  name: "Mickey" },
       { shiftid: "5",  name: "Zin" },
       { shiftid: "6",  name: "Mark" },
       { shiftid: "7",  name: "Carl" },
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
       { shiftid: "1",  name: "Danny" },
       { shiftid: "2",  name: "Jimmy" },
       { shiftid: "3",  name: "Sky" },
       { shiftid: "4",  name: "Mickey" },
       { shiftid: "5",  name: "Minnie" },
       { shiftid: "6",  name: "Eli" },
       { shiftid: "7",  name: "Bekka" },
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
       { shiftid: "1",  name: "Jimmy" },
       { shiftid: "2",  name: "Sandy" },
       { shiftid: "3",  name: "Zin" },
       { shiftid: "4",  name: "Lynne" },
       { shiftid: "5",  name: "Minnie" },
       { shiftid: "6",  name: "Eli" },
       { shiftid: "7",  name: "Carl" },
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
