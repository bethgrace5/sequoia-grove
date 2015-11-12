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

  // container for displaying the date header
  // each day has a human readable display string, and a date type attribute value
  $scope.date = { 
    mon:{val:(new Date()), disp:''}, 
    tue:{val:(new Date()), disp:''}, 
    wed:{val:(new Date()), disp:''}, 
    thu:{val:(new Date()), disp:''}, 
    fri:{val:(new Date()), disp:''}, 
    sat:{val:(new Date()), disp:''}, 
    sun:{val:(new Date()), disp:''}};
  $scope.currentDay  = new Date();

  // set initial schedule header for current week
  // this puts the correct date for each day of the week, and the 
  // month for the schedule
   $scope.setScheduleHeader = function() {
     var daysAgo = 0;
     var dayName = moment().format('dddd');
     var mondayDateString = '';

     //Figure out how many days ago monday was
     while(dayName != 'Monday') {
       daysAgo++;
       dayName = moment().subtract(daysAgo, 'days').format('dddd');
       mondayDateString = moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');
     }

     // setup Monday
     $scope.date.mon.val = mondayDateString;
     $scope.date.mon.disp = moment().subtract(daysAgo, 'days').format('MMM-D');

     // use Monday to setup the rest of the weekdays
     $scope.date.tue.val  = moment(mondayDateString, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
     $scope.date.tue.disp = moment(mondayDateString).add(1, 'days').format('MMM-D');

     $scope.date.wed.val  = moment(mondayDateString, 'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD');
     $scope.date.wed.disp = moment(mondayDateString).add(2, 'days').format('MMM-D');

     $scope.date.thu.val  = moment(mondayDateString, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
     $scope.date.thu.disp = moment(mondayDateString).add(3, 'days').format('MMM-D');

     $scope.date.fri.val  = moment(mondayDateString, 'YYYY-MM-DD').add(4, 'days').format('YYYY-MM-DD');
     $scope.date.fri.disp = moment(mondayDateString).add(4, 'days').format('MMM-D');

     $scope.date.sat.val  = moment(mondayDateString, 'YYYY-MM-DD').add(5, 'days').format('YYYY-MM-DD');
     $scope.date.sat.disp = moment(mondayDateString).add(5, 'days').format('MMM-D');

     $scope.date.sun.val  = moment(mondayDateString, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD');
     $scope.date.sun.disp = moment(mondayDateString).add(6, 'days').format('MMM-D');

  }
  $scope.setScheduleHeader(new Date ($scope.currentDay));

  $scope.changeWeek = function(operation) {
    var nextMonday; 

    if (operation == 'add') {
      nextMonday = moment($scope.date.mon.val).add(7, 'days').format('YYYY-MM-DD');
    }
    else{
      nextMonday = moment($scope.date.mon.val).subtract(7, 'days').format('YYYY-MM-DD');
    }
    $scope.date.mon.val  = moment(nextMonday, 'YYYY-MM-DD').add(0, 'days').format('YYYY-MM-DD');
    $scope.date.mon.disp = moment(nextMonday).add(0, 'days').format('MMM-D');

    $scope.date.tue.val  = moment(nextMonday, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    $scope.date.tue.disp = moment(nextMonday).add(1, 'days').format('MMM-D');

    $scope.date.wed.val  = moment(nextMonday, 'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD');
    $scope.date.wed.disp = moment(nextMonday).add(2, 'days').format('MMM-D');

    $scope.date.thu.val  = moment(nextMonday, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
    $scope.date.thu.disp = moment(nextMonday).add(3, 'days').format('MMM-D');

    $scope.date.fri.val  = moment(nextMonday, 'YYYY-MM-DD').add(4, 'days').format('YYYY-MM-DD');
    $scope.date.fri.disp = moment(nextMonday).add(4, 'days').format('MMM-D');

    $scope.date.sat.val  = moment(nextMonday, 'YYYY-MM-DD').add(5, 'days').format('YYYY-MM-DD');
    $scope.date.sat.disp = moment(nextMonday).add(5, 'days').format('MMM-D');

    $scope.date.sun.val  = moment(nextMonday, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD');
    $scope.date.sun.disp = moment(nextMonday).add(6, 'days').format('MMM-D');

  }

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

    // TODO supply beginning monday as input here,
    // then here back end will calculate the rest of the weekdays to sunday
    $scope.getScheduleTemplate = function() {
    /*
      var dd = $scope.date.mon.val.getDate();
      var mm = $scope.date.mon.val.getMonth(); //January is 0!
      var yyyy = $scope.date.mon.val.getFullYear();

      // the back end relies on the substring for day being two characters
      if (dd < 10) {
        dd = '0' + dd;
      }
      // the back end relies on the substring for month being two characters
      if (mm < 10) {
        mm = '0' + mm;
      }
      // add 1 to month, because Jan is 0
      var dateString = (mm+1) + "-" + dd + "-" + yyyy;
      $log.debug(dateString);
      */
      $http({
        url: '/sequoiagrove/schedule/template',
        method: "GET"
      }).success(function (data, status, headers, config) {
          $scope.template = data.template;
          //$log.debug(data);

      }).error(function (data, status, headers, config) {
          $log.error(status + " Error obtaining hotel data: " + data);
      });
    }


    $scope.getScheduleTemplate();
    $scope.getEmployees();
    $scope.getPositions();
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
