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

  // Sample Data for current logged in user
  $scope.user1 = { firstname: "John", lastname: "theManager", type: "manager" };
  $scope.user2 = { firstname: "Smith", lastname: "theEmployee", type: "employee" };
  $scope.user = $scope.user1;
  localStorageService.set('SequoiaGrove.user', $scope.user);


  // Locale settings
  $scope.lang = 'en';
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.lang = langKey;
    localStorageService.set('SequoiaGrove.lang', langKey);
    $scope.$broadcast('translate');
  };

  // UI 'Active' Tab Settings
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

  // container for displaying the date header
  // val 'YYYY-MM-DD' format, disp 'MMM-D' format
  $scope.date = { 
    mon:{val:'', disp:''}, 
    tue:{val:'', disp:''}, 
    wed:{val:'', disp:''}, 
    thu:{val:'', disp:''}, 
    fri:{val:'', disp:''}, 
    sat:{val:'', disp:''}, 
    sun:{val:'', disp:''}};

  // Set Schedule Header Dates, and Date String Values
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

    // Setup Monday
    $scope.date.mon.val = mondayDateString;
    $scope.date.mon.disp = moment().subtract(daysAgo, 'days').format('MMM-D');

    // Use Monday to setup the rest of the weekdays
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

  // View Next or Previous Week
  $scope.changeWeek = function(operation) {
    var nextMonday = '';

    // Set Monday Next Week
    if (operation == 'add') {
      nextMonday = moment($scope.date.mon.val).add(7, 'days').format('YYYY-MM-DD');
    }
    // Set Monday Previous Week
    else{
      nextMonday = moment($scope.date.mon.val).subtract(7, 'days').format('YYYY-MM-DD');
    }

    // Adjust the rest of the weekdays to match Monday
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

    //TODO call back end to get the actual schedule for the corresponding week
    // use the all the date vals as arguments for http request
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

  $scope.init = function() {
    $scope.changeTab('/home');
    $scope.setScheduleHeader();
    $scope.getScheduleTemplate();
    $scope.getEmployees();
    $scope.getPositions();
    $scope.getDeliveries();
    $scope.getAvailability();
    $scope.getEmployee();
  }

  $scope.init();

});
