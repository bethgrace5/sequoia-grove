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
    $timeout,
    $translate,
    localStorageService,
    scheduleFactory,
    userFactory,
    $q){

/************** Login Redirect, Containers and UI settings **************/


  $scope.loadingWeek = false;
  $rootScope.currentPath = $location.path();
  $scope.selectedWeek = 0;
  $scope.weekLabel = '';
  $scope.weekList = [];
  $scope.template = {};

  // extend shift duration for holiday closes
  $scope.extendStart = 2;
  $scope.extendEnd = 2;

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

  // toggle dev mode
  $scope.updateDevMode = function() {
    $rootScope.devMode = !$rootScope.devMode;
    localStorageService.set('devMode', $rootScope.devMode);
  }

  // setup containers
  $scope.deliveries = [];

  $scope.viewDeliveries = {
      'mon':[],
      'tue':[],
      'wed':[],
      'thu':[],
      'fri':[],
      'sat':[],
      'sun':[]
  }

  // container of  a simplification of the scheudle template shifts
  // used to check that updating a shift is making a chage or not
  $scope.birthdays = [];
  $scope.holidays = [];
  $rootScope.isPublished = false;
  $rootScope.showDeliveries = true;
  $scope.printMessageDisclaimer = "Employees working more than 4 hours but less than 6 have the option of taking a 30 minute break.";
  $scope.printMessageFullShift = "Shifts Longer than 6 hours have two 10min breaks with a 30min break in between";
  $scope.printMessageHalfShift = "Shifts 4 hours or shorter have one 15min break";
  $scope.currentYear = "";
  $rootScope.loadingMsg = "Verifying user with Application...";
  $scope.selectedPid = 0;

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
  $rootScope.revealDeliveries = false;
  // flag when set will disable all buttons, to avoid overlapping requests
  $scope.loading = false;

/************** Pure Functions **************/

  $scope.formatTime = function(t, ampm) {
    // we can use moment to parse times to display correctly on the front end
    //$log.debug(moment({hour:16, minute:10}).format('h:mm a'));
    if (ampm) {
      return moment(t, 'HHmm').format('h:mm a');
    }
    return moment(t, 'HHmm').format('h:mm');
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

/************** HTTP Request Functions **************/
  // get all existing deliveries
  $scope.getDeliveries = function() {
    var deferred = $q.defer();
    $scope.deliveries = [];
    $scope.viewDeliveries = {
      'mon':[],
      'tue':[],
      'wed':[],
      'thu':[],
      'fri':[],
      'sat':[],
      'sun':[]
    }
    $http({url: '/sequoiagrove/delivery', method: "GET" })
      .then(function(success) {
        if (success.status == 200) {
          $scope.deliveries = success.data.delivery;
          _.map($scope.deliveries,function(item){
            if(item.mon) {
              $scope.viewDeliveries.mon.push(item.name);
            }
            if(item.tue) {
              $scope.viewDeliveries.tue.push(item.name);
            }
            if(item.wed) {
              $scope.viewDeliveries.wed.push(item.name);
            }
            if(item.thu) {
              $scope.viewDeliveries.thu.push(item.name);
            }
            if(item.fri) {
              $scope.viewDeliveries.fri.push(item.name);
            }
            if(item.sat) {
              $scope.viewDeliveries.sat.push(item.name);
            }
            if(item.sun) {
              $scope.viewDeliveries.sun.push(item.name);
            }
          });
        }
        deferred.resolve(success);
      });
    return deferred.promise;
  }

  $scope.getPositions = function() {
    var deferred = $q.defer();
    $http({ url: '/sequoiagrove/position', method: "GET" })
      .then(function(success) {
        $rootScope.positions = success.data.positions;
        deferred.resolve(success);
      });
    return deferred.promise;
  }

  $scope.toggleDeliveries = function() {
      $rootScope.revealDeliveries = !$rootScope.revealDeliveries;
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

  $rootScope.$on('loggedIn', function(event, args) {
    //$log.debug('caught logged in at main');
    $scope.template = scheduleFactory.getTemplate();
    $scope.date = scheduleFactory.getHeader();
    $scope.isPublished = scheduleFactory.isPublished();
    $scope.dayCount = scheduleFactory.getDayCount();
    $scope.hourCount = scheduleFactory.getHourCount();
    $scope.changesMade = scheduleFactory.changesMade();
    $scope.weekList = scheduleFactory.getWeekList();
    $timeout(function() {
      $scope.employees = userFactory.getUsers();
      $scope.initPositionsSchedule();
      $scope.initAvailSchedule();
    });
  });

  $scope.selectWeek = function(index) {
    $scope.selectedWeek = index;
  }

    $scope.up = function() {
      $scope.employees = userFactory.getUsers();
    }

  // filter schedule to determine if the scheduled employee has availability
  // adds 'available' attribute to that day for error checking
  $scope.initAvailSchedule = function() {
    $scope.template = _.map ($scope.template, function(item, index) {
      if (item.isSpacer) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        //item.mon = _.extend(item.mon, {'available': userFactory.isAvailable(item.mon.eid, 'mon', item.weekdayStart, item.weekdayEnd)});
        item.mon = _.extend(item.mon, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'mon', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.tue = _.extend(item.tue, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'tue', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.wed = _.extend(item.wed, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'wed', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.thu = _.extend(item.thu, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'thu', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.fri = _.extend(item.fri, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'fri', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.sat = _.extend(item.sat, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'sat', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
        item.sun = _.extend(item.sun, {'hasAvailability': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.isAvailable(e.id, 'sun', item.weekdayStart, item.weekdayEnd)]
            })
          )
        });
      }
      return item;
    });
  }

  // filter schedule to determine if the scheduled employee has availability
  // adds 'available' attribute to that day for error checking
  $scope.initPositionsSchedule = function() {
    $scope.template = _.map ($scope.template, function(item, index) {
      if (item.isSpacer) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        item.mon = _.extend(item.mon, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.tue = _.extend(item.tue, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.wed = _.extend(item.wed, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.thu = _.extend(item.thu, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.fri = _.extend(item.fri, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.sat = _.extend(item.sat, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
        item.sun = _.extend(item.sun, {'hasPosition': 
          _.object(
            _.map($scope.employees, function(e, index) {
              return [e.id, userFactory.hasPosition(e.id, item.pid)]
            })
          )
        });
      }
      return item;
    });
  }

  // called from header menu
  $scope.appLogin = function() {
    $log.debug('broadcast login from main');
    $rootScope.$broadcast('login');
  }

  // called from header menu
  $scope.destructData = function() {
    $log.debug('broadcast logout from main');
    $rootScope.$broadcast('logout');
  }

  // advance or go back weeks in time
  $scope.changeWeek = function(operation) {
    $scope.selectWeek(0);
    if ($scope.loadingWeek) {
      return;
    }
    $scope.loadingWeek = true;
    scheduleFactory.changeWeek(operation);
  }

  $scope.publishSchedule = function() {
    $scope.isPublished = scheduleFactory.publish();
  }

  var updateChangesMade = function(){
    //$log.debug('update template main.js');
    $scope.template = scheduleFactory.getTemplate();
    $scope.dayCount = scheduleFactory.getDayCount();
    $scope.hourCount = scheduleFactory.getHourCount();
    $scope.changesMade = scheduleFactory.changesMade();
    $scope.weekList = scheduleFactory.getWeekList();
    $scope.loadingWeek = false;
    $log.debug('update changes made');
  };
  scheduleFactory.registerObserverCallback(updateChangesMade);
  //schedule factory now in control of updateChangesMade()

});
