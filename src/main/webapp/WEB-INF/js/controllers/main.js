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

    // container for displaying the date header on the calendar
  $scope.date = { mon:{}, tue:{}, wed:{}, thu:{}, fri:{}, sat:{}, sun:{} };

  // set initial schedule header for current week
  // this puts the correct date for each day of the week, and the 
  // month for the schedule
  var setScheduleHeader = function() {
    $scope.today = new Date();
    // decide which weekday it is today.
    var currentIndex = $scope.today.getDay(); // 0 is Sunday
    var dd = $scope.today.getDate();
    //TODO deal with the edge case where the month changes mid week
    var mm = $scope.today.getMonth(); //January is 0!
    //TODO deal with the edge case where the year changes mid week
    var yyyy = $scope.today.getFullYear();

    // set date object value
    $scope.date.mon.val = new Date(); $scope.date.mon.val.setDate(dd-currentIndex+1);
    $scope.date.tue.val = new Date(); $scope.date.tue.val.setDate(dd-currentIndex+2);
    $scope.date.wed.val = new Date(); $scope.date.wed.val.setDate(dd-currentIndex+3);
    $scope.date.thu.val = new Date(); $scope.date.thu.val.setDate(dd-currentIndex+4);
    $scope.date.fri.val = new Date(); $scope.date.fri.val.setDate(dd-currentIndex+5);
    $scope.date.sat.val = new Date(); $scope.date.sat.val.setDate(dd-currentIndex+6);
    $scope.date.sun.val = new Date(); $scope.date.sun.val.setDate(dd-currentIndex+7);

    // set the month number as english word
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
    // set the date string with entlish text for display on view
    $scope.date.mon.disp = mm+'-'+(dd-currentIndex+1);
    $scope.date.tue.disp = mm+'-'+(dd-currentIndex+2);
    $scope.date.wed.disp = mm+'-'+(dd-currentIndex+3);
    $scope.date.thu.disp = mm+'-'+(dd-currentIndex+4);
    $scope.date.fri.disp = mm+'-'+(dd-currentIndex+5);
    $scope.date.sat.disp = mm+'-'+(dd-currentIndex+6);
    $scope.date.sun.disp = mm+'-'+(dd-currentIndex+7);

  $log.debug($scope.date);
  }
  setScheduleHeader();

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
    $scope.getScheduleTemplate = function() {
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

    // get all the info about who is scheduled for which positions
    // for the given schedule
    $scope.getSchedule = function() {
      //FIXME for now we're just sending monday, but it will need to 
      //accept a paramter in order to switch weeks

      //TODO check that we're sending a MONDAY for the query -
      //javascripts Date.getDay() will return the index of the day,
      //we need 1 for MONDAY

      //$log.debug($scope.date.mon);
      // getDate() returns the day of the month (0-31)
      var dd = $scope.date.mon.val.getDate();
      //TODO deal with the edge case where the month changes mid week
      var mm = $scope.date.mon.val.getMonth(); //January is 0!
      //TODO deal with the edge case where the year changes mid week
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

        // accepts date in form MM/DD/YYYY
        $http({
          //url: '/sequoiagrove/schedule/week/' + dateString,
          url: '/sequoiagrove/schedule/week/' + '11-02-2015',
          method: "GET"
        }).success(function (data, status, headers, config) {
          //$log.debug(data.mon);

            $scope.sch = { 
              mon:[], tue:[], wed:[], thu:[], fri:[], sat:[], sun:[]
            };

            $scope.sch.mon = data.mon;
            $scope.sch.tue = data.tue;
            $scope.sch.wed = data.wed;
            $scope.sch.thu = data.thu;
            $scope.sch.fri = data.fri;
            $scope.sch.sat = data.sat;
            $scope.sch.sun = data.sun;

            /*
            data.schedule.forEach(function(value, index, ar) {
              $log.debug(value.sid);
              $scope.sch.scheduled.mon.push(
                { "sid": value.sid, 
                  "name":value.ename, 
                  "ename":value.ename,
                });
            });
            */


            $log.debug(data);

        }).error(function (data, status, headers, config) {
            $log.error(status + " Error obtaining schedule data: " + data);
        });
    }

    $scope.getSchedule();
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
