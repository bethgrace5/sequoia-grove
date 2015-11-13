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
    localStorageService) 
  {

  $log.debug(moment({hour:16, minute:10}).format('h:mm a'));

  // Sample Data for current logged in user
  $scope.user1 = { firstname: "John", lastname: "Doe", type: "manager" };
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
  // highlight name
  $scope.highlight = false;

  // container for displaying the date header
  // val 'DD-MM-YYYY' format, disp 'MMM-D' format
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
      mondayDateString = moment().subtract(daysAgo, 'days').format('DD-MM-YYYY');
    }

    // Setup Monday
    $scope.date.mon.val = mondayDateString;
    $scope.date.mon.disp = moment().subtract(daysAgo, 'days').format('MMM-D');

    // Use Monday to setup the rest of the weekdays
    $scope.date.tue.val  = moment(mondayDateString, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
    $scope.date.tue.disp = moment(mondayDateString, 'DD-MM-YYYY').add(1, 'days').format('MMM-D');
    $scope.date.wed.val  = moment(mondayDateString, 'DD-MM-YYYY').add(2, 'days').format('DD-MM-YYYY');
    $scope.date.wed.disp = moment(mondayDateString, 'DD-MM-YYYY').add(2, 'days').format('MMM-D');
    $scope.date.thu.val  = moment(mondayDateString, 'DD-MM-YYYY').add(3, 'days').format('DD-MM-YYYY');
    $scope.date.thu.disp = moment(mondayDateString, 'DD-MM-YYYY').add(3, 'days').format('MMM-D');
    $scope.date.fri.val  = moment(mondayDateString, 'DD-MM-YYYY').add(4, 'days').format('DD-MM-YYYY');
    $scope.date.fri.disp = moment(mondayDateString, 'DD-MM-YYYY').add(4, 'days').format('MMM-D');
    $scope.date.sat.val  = moment(mondayDateString, 'DD-MM-YYYY').add(5, 'days').format('DD-MM-YYYY');
    $scope.date.sat.disp = moment(mondayDateString, 'DD-MM-YYYY').add(5, 'days').format('MMM-D');
    $scope.date.sun.val  = moment(mondayDateString, 'DD-MM-YYYY').add(6, 'days').format('DD-MM-YYYY');
    $scope.date.sun.disp = moment(mondayDateString, 'DD-MM-YYYY').add(6, 'days').format('MMM-D');

    $log.debug($scope.date.mon.val);
    $log.debug($scope.date.tue.val);
    $log.debug($scope.date.wed.val);
    $log.debug($scope.date.thu.val);
    $log.debug($scope.date.fri.val);
    $log.debug($scope.date.sat.val);
    $log.debug($scope.date.sun.val);
  }

  // View Next or Previous Week
  $scope.changeWeek = function(operation) {
    var nextMonday = '';

    // Set Monday Next Week
    if (operation == 'add') {
      nextMonday = moment($scope.date.mon.val, 'DD-MM-YYYY').add(7, 'days').format('DD-MM-YYYY');
    }
    // Set Monday Previous Week
    else{
      nextMonday = moment($scope.date.mon.val, 'DD-MM-YYYY').subtract(7, 'days').format('DD-MM-YYYY');
    }

    // Adjust the rest of the weekdays to match Monday
    $scope.date.mon.val  = moment(nextMonday, 'DD-MM-YYYY').add(0, 'days').format('DD-MM-YYYY');
    $scope.date.mon.disp = moment(nextMonday, 'DD-MM-YYYY').add(0, 'days').format('MMM-D');
    $scope.date.tue.val  = moment(nextMonday, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
    $scope.date.tue.disp = moment(nextMonday, 'DD-MM-YYYY').add(1, 'days').format('MMM-D');
    $scope.date.wed.val  = moment(nextMonday, 'DD-MM-YYYY').add(2, 'days').format('DD-MM-YYYY');
    $scope.date.wed.disp = moment(nextMonday, 'DD-MM-YYYY').add(2, 'days').format('MMM-D');
    $scope.date.thu.val  = moment(nextMonday, 'DD-MM-YYYY').add(3, 'days').format('DD-MM-YYYY');
    $scope.date.thu.disp = moment(nextMonday, 'DD-MM-YYYY').add(3, 'days').format('MMM-D');
    $scope.date.fri.val  = moment(nextMonday, 'DD-MM-YYYY').add(4, 'days').format('DD-MM-YYYY');
    $scope.date.fri.disp = moment(nextMonday, 'DD-MM-YYYY').add(4, 'days').format('MMM-D');
    $scope.date.sat.val  = moment(nextMonday, 'DD-MM-YYYY').add(5, 'days').format('DD-MM-YYYY');
    $scope.date.sat.disp = moment(nextMonday, 'DD-MM-YYYY').add(5, 'days').format('MMM-D');
    $scope.date.sun.val  = moment(nextMonday, 'DD-MM-YYYY').add(6, 'days').format('DD-MM-YYYY');
    $scope.date.sun.disp = moment(nextMonday, 'DD-MM-YYYY').add(6, 'days').format('MMM-D');

    $scope.getScheduleTemplate();
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
      url: '/sequoiagrove/schedule/template/' +
            $scope.date.mon.val + '/' +
            $scope.date.tue.val + '/' +
            $scope.date.wed.val + '/' +
            $scope.date.thu.val + '/' +
            $scope.date.fri.val + '/' +
            $scope.date.sat.val + '/' +
            $scope.date.sun.val + '/',
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
