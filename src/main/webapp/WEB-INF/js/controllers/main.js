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
    $location,
    $log,
    $rootScope,
    $route,
    $scope,
    $translate,
    localStorageService,
    Persona,
    $q){

/************** Login Redirect, Containers and UI settings **************/

  $rootScope.currentPath = $location.path();
  $rootScope.lastPath = '/home';

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $rootScope.lastPath = $location.path();
    if ($location.path() != '/login') {
      $location.path('/login');
    }
  }
  // Locale settings
  $scope.lang = 'en';
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.lang = langKey;
    localStorageService.set('SequoiaGrove.lang', langKey);
    $scope.$broadcast('translate');
  };

  // setup containers
  $scope.currentEmployees = [];
  $scope.allEmployees = [];

  // shifts that were changed from old shifts and need to be saved to database
  $scope.updateShifts = [];
  $scope.originalTemplate = [];
  // when the schedule is cleared, any saved shifts are deleted
  $scope.deleteShifts = [];
  $scope.barChart = { labels:[],  data:[[]], series:["names"]};
  // container of  a simplification of the scheudle template shifts
  // used to check that updating a shift is making a chage or not
  $scope.birthdays = [];
  $scope.holidays = [];
  $rootScope.ispublished = false;

  $scope.printMessageDisclaimer = "Employees working more than 4 hours but less than 6 have the option of taking a 30 minute break.";
  $scope.printMessageFullShift = "Shifts Longer than 6 hours have two 10min breaks with a 30min break in between";
  $scope.printMessageHalfShift = "Shifts 4 hours or shorter have one 15min break";
  $scope.currentYear = "";
  $scope.loadingMsg = "Verifying user with Application...";
  $scope.selectedPid = 0;

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
  // flag when set will disable all buttons, to avoid overlapping requests
  $scope.loading = false;

/************** Pure Functions **************/

  // Set Schedule Header Dates, and Date String Values
  $scope.setScheduleHeader = function() {
    var daysAgo = 0;
    var dayName = moment().format('dddd');
    var mondayDateString = '';

    //Figure out how many days ago monday was
    if (dayName != 'Monday') {
      while(dayName != 'Monday') {
        daysAgo++;
        dayName = moment().subtract(daysAgo, 'days').format('dddd');
        mondayDateString = moment().subtract(daysAgo, 'days').format('DD-MM-YYYY');
      }
    }
    else {
      mondayDateString = moment().subtract(0, 'days').format('DD-MM-YYYY');
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

    $scope.currentYear = moment(mondayDateString, 'DD-MM-YYYY').format('YYYY');
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

    $scope.getScheduleTemplate($scope.date.mon.val);
  }

  $scope.formatTime = function(t, ampm) {
    // we can use moment to parse times to display correctly on the front end
    //$log.debug(moment({hour:16, minute:10}).format('h:mm a'));
    if (ampm) {
      return moment(t, 'HHmm').format('h:mm a');
    }
    return moment(t, 'HHmm').format('h:mm');
  }

  $scope.shiftDuration = function(start, end) {
    return moment(end, 'HHmm').diff(moment(start, 'HHmm'), 'hours', true);
  }

  // count the number of days an employee is scheduled, if they are scheduled
  // twice on a day, it still counts as one day.
  $scope.countDays = function() {
    var shifts = [[],[],[],[],[],[],[]];

    _.map($scope.template, function(item) {
      shifts[0] = _.union(shifts[0], [item.mon.eid]);
      shifts[1] = _.union(shifts[1], [item.tue.eid]);
      shifts[2] = _.union(shifts[2], [item.wed.eid]);
      shifts[3] = _.union(shifts[3], [item.thu.eid]);
      shifts[4] = _.union(shifts[4], [item.fri.eid]);
      shifts[5] = _.union(shifts[5], [item.sat.eid]);
      shifts[6] = _.union(shifts[6], [item.sun.eid]);
    });

    // get day count for each employee, format is: [ {'eid':'count'}, ... ]
    $scope.dayCount = _.countBy((_.flatten(shifts)), function(id){
      return id;
    });
  }

  $scope.countHours = function() {
    var count = [];

    _.map($scope.template, function(item) {
      var duration = 0;
      if (item.day !== 'sat' && item.day !== 'sun') {
        duration = $scope.shiftDuration(item.weekdayStart, item.weekdayEnd);
      }
      else {
        duration = $scope.shiftDuration(item.weekendStart, item.weekendEnd);
      }
      count.push({'eid':item.mon.eid, 'duration':duration});
      count.push({'eid':item.tue.eid, 'duration':duration});
      count.push({'eid':item.wed.eid, 'duration':duration});
      count.push({'eid':item.thu.eid, 'duration':duration});
      count.push({'eid':item.fri.eid, 'duration':duration});
      count.push({'eid':item.sat.eid, 'duration':duration});
      count.push({'eid':item.sun.eid, 'duration':duration});
    });

    // get hour count for each employee, format is: [ {'eid':'count'}, ... ]
    $scope.hourCount = _.groupBy(count, function(item){
      return item.eid;
    });

    _.map($scope.hourCount, function(items, index) {
      var hours =  _.reduce(items, function(memo, item) {
        return memo + item.duration;
      }, 0)
      $scope.hourCount[index] = hours;
    });
    $scope.checkifPublished();
  }

  // check if employee has this position
  $scope.employeeHasPosition = function(eid, pid) {
    if (pid === -1) {
      pid = $scope.selectedPid;
    }
    if (pid === 0) {
      return true;
    }
    var hasPosition = false;

    // find if this employee knows the selected position
    _.map($scope.employees, function(e) {
      if (e.id === eid) {
        _.map(e.positions, function(p) {
          if (parseInt(p) === parseInt(pid)) {
            hasPosition = true;
          }
        })
      }
    });
    return hasPosition;
  }

  $scope.selectPosition = function(pid) {
    $scope.selectedPid = pid;
  }

/************** HTTP Request Functions **************/

  $scope.getPositions = function() {
    return $http({
      url: '/sequoiagrove/position',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.positions = data.positions;
    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining position data: " + data);
    });
  }

  // Get The Schedule for the week currently being viewed - expects
  // a moment object for week
  $scope.getScheduleTemplate = function(week) {
    $scope.loadingMsg = "Obtaining current schedule data...";
    var url = '/sequoiagrove/schedule/template/' + week;

    // clear out original template
    $scope.originalTemplate = [];
    $scope.deleteShifts = [];
    $scope.updateShifts = [];

    return $http({ url: url, method: "GET", })
        .success(function (data, status, headers, config) {
      //$log.debug(data);
      $rootScope.ispublished = data.ispublished;
      if (!$scope.loggedInUser.isManager) {
        if (!data.ispublished){
          return;
        }
      }
      $scope.template = data.template;

      // keep an original copy of the template, so we can check modifications
      // on the template against it
      _.map(data.template, function(t, index, list) {
        $scope.originalTemplate.push({'eid':t.mon.eid, 'sid':t.sid, 'date':$scope.date.mon.val});
        $scope.originalTemplate.push({'eid':t.tue.eid, 'sid':t.sid, 'date':$scope.date.tue.val});
        $scope.originalTemplate.push({'eid':t.wed.eid, 'sid':t.sid, 'date':$scope.date.wed.val});
        $scope.originalTemplate.push({'eid':t.thu.eid, 'sid':t.sid, 'date':$scope.date.thu.val});
        $scope.originalTemplate.push({'eid':t.fri.eid, 'sid':t.sid, 'date':$scope.date.fri.val});
        $scope.originalTemplate.push({'eid':t.sat.eid, 'sid':t.sid, 'date':$scope.date.sat.val});
        $scope.originalTemplate.push({'eid':t.sun.eid, 'sid':t.sid, 'date':$scope.date.sun.val});
      });
      // update count of days and hours per employee
      $scope.countDays();
      $scope.countHours();

    }).error(function (data, status, headers, config) {
      $log.debug(week);
      $log.error(status + " Error getting schedule template: " + data);
    });
  }

  // Get All Employees with their id
  $scope.getEmployees = function() {
    $scope.loadingMsg = "Obtaining current employee data...";
    return $http({
      url: '/sequoiagrove/employees',
      method: "GET"
    }).success(function (data, status, headers, config) {
        $scope.employees = data.employees;

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining all employee: " + data);
    });
  }
  
  // send http request to back end to check if published
  $scope.checkifPublished = function() {
    return $http({
      url: '/sequoiagrove/schedule/ispublished/' + $scope.date.mon.val,
      method: "GET"
    }).success(function (data, status, headers, config) {
        $rootScope.ispublished = data.result;

    }).error(function (data, status, headers, config) {
        $log.error(status + " Error obtaining all employee: " + data);
    });
  }

  //send date and employee id as an object thru http request
  $scope.publishSchedule = function() {
      var obj = {'date':$scope.date.mon.val, 'eid': $rootScope.loggedInUser.id};
    $http({
      url: '/sequoiagrove/schedule/publish/',
      method: "POST",
      data: obj
      }).success(function (data, status, headers, config) {
        $rootScope.ispublished = true;   
        //$log.debug(data)

    }).error(function (data, status, headers, config) {
      $log.error(status + " Error posting schedule " + data);
    });

  }

/************** Variable Initialization **************/

  // TODO function to find birthdays this week
  $scope.birthdays.push({name:"Amelia", date:"10/10"});
  $scope.birthdays.push({name:"Jem", date:"10/13"});

  // TODO function to find holidays this week
  $scope.holidays.push({name:"Christmas", date:"12/25"});
  $scope.holidays.push({name:"New Years Day", date:"01/01"});

  $scope.times = {
    // start times start at the earlist shift start and increment by half
    // hours until the end of the lastest starting shift
    // TODO have a smarter way to populate this list
    start:[
      {disp:"5:00 AM",  val: '0500'},
      {disp:"5:30 AM",  val: '0530'},
      {disp:"6:00 AM",  val: '0600'},
      {disp:"6:30 AM",  val: '0630'},
      {disp:"7:00 AM",  val: '0700'},
      {disp:"7:30 AM",  val: '0730'},
      {disp:"8:00 AM",  val: '0800'},
      {disp:"8:30 AM",  val: '0830'},
      {disp:"9:00 AM",  val: '0900'},
      {disp:"9:30 AM",  val: '0930'},
      {disp:"10:00 AM", val: '1000'},
      {disp:"10:30 AM", val: '1030'},
      {disp:"11:00 AM", val: '1100'},
      {disp:"11:30 AM", val: '1130'},
      {disp:"12:00 PM", val: '1200'},
      {disp:"12:30 PM", val: '1230'},
      {disp:"1:00 PM",  val: '1300'},
      {disp:"1:30 PM",  val: '1330'},
      {disp:"2:00 PM",  val: '1400'},
      {disp:"2:30 PM",  val: '1430'},
      {disp:"3:00 PM",  val: '1500'},
      {disp:"3:30 PM",  val: '1530'},
      {disp:"4:00 PM",  val: '1600'},
      {disp:"4:30 PM",  val: '1630'}
    ],
    // end times start at the earlist shift end and increment by half
    // hours until the end of the lastest ending shift
    // TODO have a smarter way to populate this list
    end:[
      {disp:"1:00 PM", val: '1300'},
      {disp:"1:30 PM", val: '1330'},
      {disp:"2:00 PM", val: '1400'},
      {disp:"2:30 PM", val: '1430'},
      {disp:"3:00 PM", val: '1500'},
      {disp:"3:30 PM", val: '1530'},
      {disp:"4:00 PM", val: '1600'},
      {disp:"4:30 PM", val: '1630'},
      {disp:"5:00 PM", val: '1700'},
      {disp:"5:30 PM", val: '1730'},
      {disp:"6:00 PM", val: '1800'},
      {disp:"6:30 PM", val: '1830'},
      {disp:"7:00 PM", val: '1900'},
      {disp:"7:30 PM", val: '1930'},
      {disp:"8:00 PM", val: '2000'},
      {disp:"8:30 PM", val: '2030'},
      {disp:"9:00 PM", val: '2100'}
    ]
  };

/************** Controller Initialization **************/

  // Initialize controller
  $scope.init = function() {
    // user is not logged in, redirect to login
    if ($rootScope.loggedIn == false) {
      $rootScope.lastPath = $location.path();
      //if ($location.path() != '/login') {
        $location.path('/login');
      //}
    }

    $scope.changeTab('/home');

  }
  $scope.$on('logged in', function(event, args) {
    //$scope.init();
  });

  $scope.personaLogin = function() {
    $rootScope.$broadcast('login');
  }
  $scope.personaLogout = function() {
    $rootScope.$broadcast('logout');
  }

});
