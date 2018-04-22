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
        loginFactory,
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
  if (loginFactory.isLoggedIn() === false) {
    $location.path('/login');
  }
  if (!loginFactory.getUser().isManager) {
    $location.path('/home');
  }

  $scope.aList = {};
  $scope.pList = {};
  $scope.selectedPid = 0;
  $scope.selectedPosition = 'All';
  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.empEditSearch = '';
  $scope.hideSpacers = true;
  $scope.toggleHideSpacers = function() {
    $scope.hideSpacers = !$scope.hideSpacers;
  }
  $scope.errors = {
    'selectedName':'',
    'available':true,
    'hasPosition':true,
    'isCurrent':true,
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

    var daysHist = $scope.autoGenOptions.weeksInHistory * 7;
    $scope.autoGenOptions.mon = $scope.date.mon.val;
    $scope.autoGenOptions.historyStart =
      moment(
        $scope.date.mon.val, 'DD-MM-YYYY'
      ).subtract(daysHist, 'days').format('DD-MM-YYYY');
    $scope.autoGenOptions.historyEnd =
      moment(
        $scope.date.mon.val, 'DD-MM-YYYY'
      ).subtract(1, 'days').format('DD-MM-YYYY');

    $http({
      url: $rootScope.urlPrefix + '/schedule/autogen/',
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
        $log.error(status + " No Error: Could no auto-generate schedule " + data);
        $scope.saving = false;
      }
    }).error( function(data, status, headers, config) {
      $log.error(status + " Error while auto-generating schedule " + data);
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
      'selectedPosition':'',
      'isCurrent':true
    };
  }

  $scope.selectEid = function(t, day, al, pl) {
    $scope.aList = al;
    $scope.pList = pl;
    if (t[day]) {
      $scope.selectedId = t[day].eid;
      if ($scope.selectedId === 0) {
        $scope.errors.available = true;
        $scope.errors.hasPosition = true;
        $scope.errors.isCurrent = true;
        $scope.selectedId = 0;
      }
      else {
        $scope.errors.selectedName = t[day].name;
        $scope.errors.selectedPosition = t.position;
        $scope.errors.available = t[day].hasAvailability[$scope.selectedId];
        $scope.errors.hasPosition = t[day].hasPosition[$scope.selectedId];
        $scope.errors.isCurrent = t[day].isCurrent[$scope.selectedId];
      }
    }
    else {
      // t is undefined, set to default
      $scope.errors.available = true;
      $scope.errors.hasPosition = true;
      $scope.errors.isCurrent = true;
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

  $scope.employeeHasPosition = function(uid) {
    if ($scope.selectedPid === 0) {
      return true;
    }
    return userFactory.hasPosition(uid, $scope.selectedPid);
  }

  // highlights the list on the side
  $scope.employeeListHighlight = function(id) {
    var style = 'form-control schedule-edit-input';
    if (id == $scope.selectedId) {
      style += ' schedule-edit-highlight';
    }
    if ($scope.aList && $scope.pList) {
      if ($scope.aList[id] && $scope.pList[id]) {
        style += ' schedule-edit-input-avail';
      }
    }
    return style;
  };

  // validation for schedule edit input
  $scope.inputStatus = function(id, shiftId, available, hasPosition, holiday, current) {
    var style = 'form-control schedule-edit-input';
    if ($rootScope.readyToSchedule === false) {
      return style;
    }
    if (available === undefined) {
      if (id == $scope.selectedId) {
        style += ' schedule-edit-highlight';
      }
      return style;
    }
    // Highlight all occurences of the employee that was clicked
    if (id == $scope.selectedId) {
      style += ' schedule-edit-highlight';
    }
    else {
      if (available[$scope.selectedId] && hasPosition[$scope.selectedId]) {
        if( !holiday) {
          style += ' schedule-edit-input-avail';
        }
      }
    }
    if (available[id] === false) {
      style += ' schedule-edit-input-error';
    }
    else if (hasPosition[id] == false) {
      style += ' schedule-edit-input-error';
    }
    else if (current[id] === false) {
      style += ' schedule-edit-input-error';
    }
    if (holiday) {
      style += ' schedule-edit-input-holiday';
    }
    return style;
  }

  $scope.saveSchedule = function() {
    if(loginFactory.getUser().isManager) {
      $scope.saving = true;
      scheduleFactory.saveSchedule($rootScope).then(
        function(success) {
          $timeout(function() {
            $scope.saving = false;
          });
        });
    }
  }

  $scope.clearSchedule = function() {
    if(loginFactory.getUser().isManager) {
      $scope.selectedId = 0;
      scheduleFactory.clear($rootScope);
    }
  }

  $scope.importWeek = function(index) {
    if(loginFactory.getUser().isManager) {
      $scope.selectWeek(index);
      var week = $scope.weekList[index].val;
      $scope.importing = true;
      scheduleFactory.importWeek(week).then(
        function(success) {
          $scope.importing = false;
        });
    }
  }

  var updateChangesMade = function(){
    $scope.template = scheduleFactory.getTemplate($rootScope);
    if (loginFactory.getUser().isManager) {
      $scope.weekList = scheduleFactory.getWeekList();
      $scope.dayCount = scheduleFactory.getDayCount();
      $scope.hourCount = scheduleFactory.getHourCount();
      $scope.changesMade = scheduleFactory.changesMade();
      $scope.requests = scheduleFactory.getRequests();
    }
  }

  scheduleFactory.registerObserverCallback(updateChangesMade);


  $scope.$on('$locationChangeStart', function (event, next, current) {
    /*
    console.log(current);

    if (current.match("/schedule")) {
      var answer = confirm("Are you sure you want to leave this page?");
      if (!answer) {
        event.preventDefault();
      }else{
        $log.debug('else');
        //clearInterval(myInterval);
      }
    }
    */
  });

});
