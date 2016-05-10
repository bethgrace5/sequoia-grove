'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller for editing the schedule.
 */
angular.module('sequoiaGroveApp')
  .controller('ScheduleCtrl', function (
        $filter,
        $window,
        $location,
        $http,
        $log,
        $rootScope,
        $scope,
        $timeout,
        $translate,
        $mdDialog,
        scheduleFactory,
        userFactory,
        localStorageService) {


/************** Login Redirect, Containers and UI settings **************/
  localStorageService.set('lastPath', '/schedule');
  $scope.saving = false;

  $scope.getIndex = function(has, gets) {
    if(has) {
      return has;
    }
    else {
      return gets;
    }

  }

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.empEditSearch = '';
  $scope.errors = {'available': true};
  $scope.selectedName = '';

  $scope.autoGenOptions = {
    "mon": "",
    "historyStart": "",
    "historyEnd": "",
    "weeksInHistory": 6,
    "emptyShiftThreshold": 0.1
  };

/************** Pure Functions **************/

  $scope.items = [{'isSpacer':true, 'index':-1}];

  $scope.boardDragControlListeners = {
      'accept': function(sourceItemHandleScope, destSortableScope){
        //$log.debug(sourceItemHandleScope);
        //$log.debug(destSortableScope);
          return true; //override to determine drag is allowed or not. default is true.
        },
      'itemMoved': function(event){
        scheduleFactory.setMovedShifts();
        //$log.debug(event);
        },
      'orderChanged': function(event){
        scheduleFactory.setMovedShifts();
        //$log.debug(event);
        },
      'removeItem': function(index) {
        return false;
      }
      //'containment': '#board',//optional param.
      //'clone': false,//optional param for clone feature.
      //'allowDuplicates': false //optional param allows duplicates to be dropped.
    };
  $scope.gapDragControlListeners = {
      'accept': function(sourceItemHandleScope, destSortableScope){
          return true; //override to determine drag is allowed or not. default is true.
        },
      'itemMoved': function(event){
        scheduleFactory.setMovedShifts();
        //$log.debug(event);
        },
      'orderChanged': function(event){
        scheduleFactory.setMovedShifts();
        //$log.debug(event);
        },
      //'containment': '#board',//optional param.
      'clone': true,//optional param for clone feature.
      //'allowDuplicates': false //optional param allows duplicates to be dropped.
    };

  // Call browser to print schedule on paper
  $scope.print = function() {
    $window.print();
  }

  $scope.selectEid = function(t, day) {
    if (t[day]) {
      $scope.selectedId = t[day].eid;
      if ($scope.selectedId === 0) {
        $scope.errors.available = true;
        $scope.selectedId = 0;
      }
      else {
        $scope.selectedName = t[day].name;
        $scope.errors.available = t[day].available;
      }
    }
    else {
      // t is undefined, set to default
      $scope.errors.available = true;
      $scope.selectedId = 0;
    }
  }

  // Filter schedule by selected position
  $scope.filterSchedule = function(pid) {
    if($scope.selectedPid == 0) {
      return true;
    }
    if(pid == $scope.selectedPid) {
      return true;
    }
    return false;
  }

  // find the matching employee by name
  $scope.getEmployeeByname = function(name) {
    var employee = {'id':0};
    _.map($scope.employees, function(e) {
      if(_.isMatch(e, {'firstname':name})) {
        employee = e;
      }
    });
    return employee;
  }

  // get if employee is available
  $scope.employeeIsAvailable = function(attrs, employee) {
    return userFactory.isAvailable( 
        employee.id, attrs.day, attrs.shiftstart, attrs.shiftend);
  }

  $scope.initAvailSchedule = function() {
    $scope.template = _.map ($scope.template, function(item, index) {
      if (item.isSpacer) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        item.mon = _.extend(item.mon, {'available': userFactory.isAvailable(item.mon.eid, 'mon', item.weekdayStart, item.weekdayEnd)});
        item.tue = _.extend(item.tue, {'available': userFactory.isAvailable(item.tue.eid, 'tue', item.weekdayStart, item.weekdayEnd)});
        item.wed = _.extend(item.wed, {'available': userFactory.isAvailable(item.wed.eid, 'wed', item.weekdayStart, item.weekdayEnd)});
        item.thu = _.extend(item.thu, {'available': userFactory.isAvailable(item.thu.eid, 'thu', item.weekdayStart, item.weekdayEnd)});
        item.fri = _.extend(item.fri, {'available': userFactory.isAvailable(item.fri.eid, 'fri', item.weekdayStart, item.weekdayEnd)});
        item.sat = _.extend(item.sat, {'available': userFactory.isAvailable(item.sat.eid, 'sat', item.weekdayStart, item.weekdayEnd)});
        item.sun = _.extend(item.sun, {'available': userFactory.isAvailable(item.sun.eid, 'sun', item.weekdayStart, item.weekdayEnd)});
      }
      return item;
    });
  }

  // validation for schedule edit input
  $scope.inputStatus = function(id, shiftId, available) {
    var style = 'form-control schedule-edit-input';

    // Highlight all occurences of the employee that was clicked
    if (id == $scope.selectedId) {
      style += ' schedule-edit-highlight';
    }
    if (available == false) {
      style += ' schedule-edit-input-error';
    }
    // Dummy Error/Warning Application
    /* // apply an error
    if (weekday=='monday' && shiftId == '3') {
      style += ' schedule-edit-input-error';
    }
    // apply a warning
    else if(weekday=='thursday' && shiftId == '2') {
      style += ' schedule-edit-input-warn';
    }
    // no warnings or errors
    else {
      style += ' schedule-edit-input-highlight';
    } */
    return style;
  }

  $scope.saveSchedule = function() {
    $scope.saving = true;
    scheduleFactory.saveSchedule().then(
      function(success) {
        $scope.saving = false;
        $rootScope.$broadcast('editEmployee');
      });
  }

  $scope.clearSchedule = function() {
    scheduleFactory.clear();
  }

  $scope.importWeek = function(index) {
    $scope.selectWeek(index);
    var week = $scope.weekList[index].val;
    $scope.saving = true;
    scheduleFactory.importWeek(week).then(
      function(success) {
        $scope.saving = false;
        $rootScope.$broadcast('editEmployee');
      });
  }

  var updateChangesMade = function(){
    //$log.debug('update template schedule.js');
    $scope.template = scheduleFactory.getTemplate();
    $scope.weekList = scheduleFactory.getWeekList();
    $scope.dayCount = scheduleFactory.getDayCount();
    $scope.hourCount = scheduleFactory.getHourCount();
    $scope.changesMade = scheduleFactory.changesMade();
  }

  $scope.initAvailSchedule();
  scheduleFactory.registerObserverCallback(updateChangesMade);

  $rootScope.$on('editEmployee', function(event, args) {
    userFactory.init();
    $scope.initAvailSchedule();
  });


});
