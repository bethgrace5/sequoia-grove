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
        localStorageService) {


/************** Login Redirect, Containers and UI settings **************/
  localStorageService.set('lastPath', '/schedule');
  $scope.saving = false;

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.empEditSearch = '';

  $scope.autoGenOptions = {
    "mon": "",
    "historyStart": "",
    "historyEnd": "",
    "weeksInHistory": 6,
    "emptyShiftThreshold": 0.1
  };

/************** Pure Functions **************/

  $scope.items = [{'isSpacer':true}];

  $scope.boardDragControlListeners = {
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

  $scope.selectEid = function(id) {
    $scope.selectedId = id;
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
    var avail = [];
    var isAvailable = false;

    // 1. get employee availability
    avail = _.map(employee.avail[attrs.day], function(a) {
      return {
        'start':moment(attrs.date +' '+ a.start, 'DD-MM-YYYY HHmm'),
        'end':moment(attrs.date +' '+ a.end, 'DD-MM-YYYY HHmm')
      }
    });
    if (avail.length <=0 ) {
      return false;
    }

    // 2. determine shift duration times
    var shiftStart = moment(attrs.date + ' ' + attrs.shiftstart, 'DD-MM-YYYY HHmm');
    var shiftEnd = moment(attrs.date + ' ' + attrs.shiftend, 'DD-MM-YYYY HHmm');

    // 3. check employee availability against shift duration
    _.map(avail, function(a, index) {
      if ((a.start.isBefore(shiftStart, 'minute') || a.start.isSame(shiftStart, 'minute')) && (a.end.isAfter(shiftEnd, 'minute') || a.end.isSame(shiftEnd, 'minute'))) {
        isAvailable = true;
      }
    });
    return isAvailable;
  }

  // validation for schedule edit input
  $scope.inputStatus = function(id, shiftId) {
    var style = 'form-control schedule-edit-input';

    // Highlight all occurences of the employee that was clicked
    if (id == $scope.selectedId) {
      style += ' schedule-edit-highlight';
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
  scheduleFactory.registerObserverCallback(updateChangesMade);

});
