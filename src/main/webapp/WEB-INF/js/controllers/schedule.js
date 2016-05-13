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

  $scope.selectedPid = 0;
  $scope.selectedPosition = 'All';
  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.empEditSearch = '';
  $scope.errors = {
    'selectedName':'',
    'available':true, 
    'hasPosition':true,
    'selectedPosition':''
  };

  $scope.autoGenOptions = {
    "mon": "",
    "historyStart": "",
    "historyEnd": "",
    "weeksInHistory": 6,
    "emptyShiftThreshold": 0.1
  };
  // Auto-Fill schedule based on history
  $scope.autoGenerate = function() {

    if ($scope.saving) {
      return;
    }

    // don't actually auto-gen if in dev mode
    if($rootScope.devMode) {
      $scope.saving = false;
      return;
    }

    $scope.saving = true;

    $http({
      url: '/sequoiagrove/schedule/autogen/',
      method: "POST",
      data: $scope.autoGenOptions
    }).success( function(data, status, headers, config) {
      if (status == 200) {
        //$scope.updateShifts = [];
        //$scope.deleteShifts = [];
        // insert new shifts into schedule
        $scope.saving = false;
      }
      else {
        $log.error(status + " Error auto-generating schedule " + data);
        $scope.saving = false;
      }
    }).error( function(data, status, headers, config) {
      $log.error(status + " Error auto-generating schedule " + data);
      $scope.saving = false;
    });
  }

/************** Pure Functions **************/

  $scope.items = [{'isSpacer':true, 'index':-1}];

  $scope.selectPosition = function(pid, title) {
    $scope.selectedPid = pid;
    $scope.selectedPosition = title;
  }


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

  // set selected id when clicking employee list in schedule
  $scope.selectFromList = function(eid) {
    $scope.selectedId = eid;
    // clear errors
    $scope.errors = {
      'selectedName':'',
      'available':true, 
      'hasPosition':true,
      'selectedPosition':''
    };
  }

  $scope.selectEid = function(t, day) {
    if (t[day]) {
      $scope.selectedId = t[day].eid;
      if ($scope.selectedId === 0) {
        $scope.errors.available = true;
        $scope.errors.hasPosition = true;
        $scope.selectedId = 0;
      }
      else {
        $scope.errors.selectedName = t[day].name;
        $scope.errors.selectedPosition = t.position;
        $scope.errors.available = t[day].available;
        $scope.errors.hasPosition = t[day].hasPosition;
      }
    }
    else {
      // t is undefined, set to default
      $scope.errors.available = true;
      $scope.errors.hasPosition = true;
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

  $scope.employeeHasPosition = function(uid, pid) {
    if (pid === -1) {
      pid = $scope.selectedPid;
    }
    if (pid === 0) {
      return true;
    }
    return userFactory.hasPosition(uid, pid);
  }

  // filter schedule to determine if the scheduled employee has availability
  // adds 'availabe' attribute to that day for error checking
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

  // filter schedule to determine if the scheduled employee has the position
  // adds 'hasPosition' attribute to that day for error checking
  $scope.initPositionsSchedule = function() {
    $scope.template = _.map ($scope.template, function(item, index) {
      if (item.isSpacer) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        item.mon = _.extend(item.mon, {'hasPosition': userFactory.hasPosition(item.mon.eid, item.pid)});
        item.tue = _.extend(item.tue, {'hasPosition': userFactory.hasPosition(item.tue.eid, item.pid)});
        item.wed = _.extend(item.wed, {'hasPosition': userFactory.hasPosition(item.wed.eid, item.pid)});
        item.thu = _.extend(item.thu, {'hasPosition': userFactory.hasPosition(item.thu.eid, item.pid)});
        item.fri = _.extend(item.fri, {'hasPosition': userFactory.hasPosition(item.fri.eid, item.pid)});
        item.sat = _.extend(item.sat, {'hasPosition': userFactory.hasPosition(item.sat.eid, item.pid)});
        item.sun = _.extend(item.sun, {'hasPosition': userFactory.hasPosition(item.sun.eid, item.pid)});
      }
      return item;
    });
  }



  // validation for schedule edit input
  $scope.inputStatus = function(id, shiftId, available, hasPosition) {
    var style = 'form-control schedule-edit-input';

    // Highlight all occurences of the employee that was clicked
    if (id == $scope.selectedId) {
      style += ' schedule-edit-highlight';
    }
    if (available == false) {
      style += ' schedule-edit-input-error';
    }
    if (hasPosition == false) {
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
    $scope.importing = true;
    scheduleFactory.importWeek(week).then(
      function(success) {
        $scope.importing = false;
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
  $scope.initPositionsSchedule();

  scheduleFactory.registerObserverCallback(updateChangesMade);

  $rootScope.$on('editEmployee', function(event, args) {
    userFactory.init();
    $scope.initAvailSchedule();
    $scope.initPositionsSchedule();
  });


});
