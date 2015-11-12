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
  $scope.date = { mon:{}, tue:{}, wed:{}, thu:{}, fri:{}, sat:{}, sun:{} };
  $scope.currentWeek  = new Date();

  // set initial schedule header for current week
  // this puts the correct date for each day of the week, and the 
  // month for the schedule
   $scope.setScheduleHeader = function(date) {
    $log.debug(date);

    // decide which weekday it is
    var currentIndex = date.getDay(); // 0 is Sunday
    var dd = date.getDate();

    // set this past monday date correctly
    $scope.date.mon.val = new Date(); $scope.date.mon.val.setDate( dd - currentIndex+1);

    // add days to monday to get the rest of the weekdays
    // javascript's date library takes care of where months and years change
    // when the days being added to monday changes the month or year
    $scope.date.tue.val = new Date(); $scope.date.tue.val.setDate($scope.date.mon.val.getDate()+1);
    $scope.date.wed.val = new Date(); $scope.date.wed.val.setDate($scope.date.mon.val.getDate()+2);
    $scope.date.thu.val = new Date(); $scope.date.thu.val.setDate($scope.date.mon.val.getDate()+3);
    $scope.date.fri.val = new Date(); $scope.date.fri.val.setDate($scope.date.mon.val.getDate()+4);
    $scope.date.sat.val = new Date(); $scope.date.sat.val.setDate($scope.date.mon.val.getDate()+5);
    $scope.date.sun.val = new Date(); $scope.date.sun.val.setDate($scope.date.mon.val.getDate()+6);

    // get a human readable month for display with specific 
    // abbreviations for the month
    var months = [
      $scope.date.mon.val.getMonth(),
      $scope.date.tue.val.getMonth(),
      $scope.date.wed.val.getMonth(),
      $scope.date.thu.val.getMonth(),
      $scope.date.fri.val.getMonth(),
      $scope.date.sat.val.getMonth(),
      $scope.date.sun.val.getMonth()
    ]
    $log.debug(months);
    // the index of the month
    var thisMonthNumber = months[0];
    var nextMonthNumber = months[0];

    // the readable name of the month
    var thisMonthTitle = '';
    var nextMonthTitle = '';

    var nextMonthIndex = 0;

    for(var i=1; i< 7; i++) {
      // the month changed mid week
      if (months[i] != thisMonthNumber) {
        nextMonthIndex = i;
        break;
      }
    }

    // set this month number as english word
    switch(thisMonthNumber) {
      case 0:  thisMonthTitle = "Jan";   nextMonthTitle = "Feb";   break;
      case 1:  thisMonthTitle = "Feb";   nextMonthTitle = "March"; break;
      case 2:  thisMonthTitle = "March"; nextMonthTitle = "April"; break;
      case 3:  thisMonthTitle = "April"; nextMonthTitle = "May";   break;
      case 4:  thisMonthTitle = "May";   nextMonthTitle = "June";  break;
      case 5:  thisMonthTitle = "June";  nextMonthTitle = "July";  break;
      case 6:  thisMonthTitle = "July";  nextMonthTitle = "Aug";   break;
      case 7:  thisMonthTitle = "Aug";   nextMonthTitle = "Sept";  break;
      case 8:  thisMonthTitle = "Sept";  nextMonthTitle = "Oct";   break;
      case 9:  thisMonthTitle = "Oct";   nextMonthTitle = "Nov";   break;
      case 10: thisMonthTitle = "Nov";   nextMonthTitle = "Dec";   break;
      case 11: thisMonthTitle = "Dec";   nextMonthTitle = "Jan";   break;
    }

    // the month changed mid week, get the english word for it
      switch(nextMonthIndex) {
        case 1: $scope.date.tue.disp = nextMonthTitle+'-'+($scope.date.tue.val.getDate());
        case 2: $scope.date.wed.disp = nextMonthTitle+'-'+($scope.date.wed.val.getDate());
        case 3: $scope.date.thu.disp = nextMonthTitle+'-'+($scope.date.thu.val.getDate());
        case 4: $scope.date.fri.disp = nextMonthTitle+'-'+($scope.date.fri.val.getDate());
        case 5: $scope.date.sat.disp = nextMonthTitle+'-'+($scope.date.sat.val.getDate());
        case 6: $scope.date.sun.disp = nextMonthTitle+'-'+($scope.date.sun.val.getDate());
      }

    $log.debug(nextMonthIndex);
    // set the current month title for days that weren't changed already to next month
      switch(nextMonthIndex) {
        // The month did change mid week, set the days before the month change as their values
        case 0: $scope.date.sun.disp = thisMonthTitle+'-'+($scope.date.sun.val.getDate());
        case 6: $scope.date.sat.disp = thisMonthTitle+'-'+($scope.date.sat.val.getDate());
        case 5: $scope.date.fri.disp = thisMonthTitle+'-'+($scope.date.fri.val.getDate());
        case 4: $scope.date.thu.disp = thisMonthTitle+'-'+($scope.date.thu.val.getDate());
        case 3: $scope.date.wed.disp = thisMonthTitle+'-'+($scope.date.wed.val.getDate());
        case 2: $scope.date.tue.disp = thisMonthTitle+'-'+($scope.date.tue.val.getDate());
        case 1: $scope.date.mon.disp = thisMonthTitle+'-'+($scope.date.mon.val.getDate());
      }

    // set the date string with entlish text for display on view
    /*
    $scope.date.mon.disp = mm+'-'+(dd-currentIndex+1);
    $scope.date.tue.disp = mm+'-'+(dd-currentIndex+2);
    $scope.date.wed.disp = mm+'-'+(dd-currentIndex+3);
    $scope.date.thu.disp = mm+'-'+(dd-currentIndex+4);
    $scope.date.fri.disp = mm+'-'+(dd-currentIndex+5);
    $scope.date.sat.disp = mm+'-'+(dd-currentIndex+6);
    $scope.date.sun.disp = mm+'-'+(dd-currentIndex+7);
    */

  }
  $scope.setScheduleHeader(new Date ($scope.currentWeek));

  $scope.changeWeek = function(changeBy) {

    // increment or decrement the currently viewed week
    $scope.currentWeek = new Date($scope.currentWeek.getDate() + changeBy);
    // change schedule header to this week
    $scope.setScheduleHeader($scope.currentWeek);

    //TODO call to get that schedule from the back end
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
