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
        localStorageService) {


/************** Login Redirect, Containers and UI settings **************/
  localStorageService.set('lastPath', '/schedule');
  $scope.saving = false;
  $scope.importing = false;

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
      if(_.isMatch(e, {'firstName':name})) {
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

  // a shift was typed in blank, add it to delete list, if it isn't
  // already in there
  $scope.addToDeleteList = function(obj) {
    var isAlreadyBlank = false;
    var isInDeleteList = false;
    obj.sid = parseInt(obj.sid);

    // check if this entry was already blank
    _.map($scope.originalTemplate, function(shift, index) {
      if (shift.eid === 0) {
        if ( _.isEqual(obj, _.omit(shift, 'eid'))) {
          isAlreadyBlank = true;
        }
      }
    });

    // we don't need to delete this shift because it never existed in
    // the first place
    if (isAlreadyBlank) {
      return;
    }

    _.map($scope.deleteShifts, function(shift, index, list) {
      if( _.isEqual(shift, obj)) {
        isInDeleteList = true;
      }
    });
    if (isInDeleteList === false) {
      $scope.deleteShifts.push({'sid':obj.sid, 'date':obj.date});
    }
  }

  // tracks changes by keeping update list current
  $scope.trackScheduleChange = function(eid, sid, date) {
    sid = parseInt(sid);
    var paramObj = {'eid':eid, 'sid':sid, 'date':date};
    var inOriginal = false;
    var inUpdate = false;
    var originalIndex = -1;
    var updateIndex = -1;

    // check if this shift is in the update list
    _.map($scope.updateShifts, function(shift, index, list) {
      if (_.isMatch(shift, { 'sid':sid, 'date':date})) {
        inUpdate = true;
        updateIndex = index;
      }
    });

    // check if this shift is in the original list
    _.map($scope.originalTemplate, function(shift, index, list) {
      if( _.isEqual(shift, paramObj)) {
        inOriginal = true;
        originalIndex = index;
      }
    });

    // check if this shift is in the delete list
    _.map($scope.deleteShifts, function(shift, index, list) {
      if(_.isMatch(shift, {'sid':sid, 'date':date})) {
        // remove this from delete shifts, because if this function
        // was called, it means this shift was assigned a name
        $scope.deleteShifts.splice(index, 1);
      }
    });

    // decide what to do with the info gathered above
    if (inOriginal && inUpdate) {
      // item needs to be removed from update
      $scope.updateShifts.splice(updateIndex, 1);
    }
    else if (inOriginal && !inUpdate) {
      // do nothing
    }
    else if (!inOriginal && inUpdate) {
      // update the update list
      $scope.updateShifts.splice(updateIndex, 1);
      $scope.updateShifts.push(paramObj);
    }
    else if (!inOriginal && !inUpdate) {
      // add item to update list
      $scope.updateShifts.push(paramObj);
    }

    $scope.selectedId = eid;
  }


  // adds all shifts to delete list, so they are deleted when save is clicked
  $scope.clearSchedule = function() {
    $scope.updateShifts = [];
    $scope.deleteShifts = [];

    // add all shifts to delete list if they weren't already blank
    _.map($scope.template, function(t, index, list) {
      if (t.mon.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.mon.val});
      }
      if (t.tue.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.tue.val});
      }
      if (t.wed.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.wed.val});
      }
      if (t.thu.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.thu.val});
      }
      if (t.fri.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.fri.val});
      }
      if (t.sat.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.sat.val});
      }
      if (t.sun.eid !== 0) {
        $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.sun.val});
      }

      // update template so view reflects changes
      t.mon.name = ""; t.mon.eid = 0;
      t.tue.name = ""; t.tue.eid = 0;
      t.wed.name = ""; t.wed.eid = 0;
      t.thu.name = ""; t.thu.eid = 0;
      t.fri.name = ""; t.fri.eid = 0;
      t.sat.name = ""; t.sat.eid = 0;
      t.sun.name = ""; t.sun.eid = 0;
    });
    $scope.countDays();
    $scope.countHours();
  }

  $scope.importLastWeek = function() {
    $scope.deleteShifts = [];
    $scope.importing = true;
    $scope.selectedId = 0;
    var d = moment($scope.date.mon.val,'DD-MM-YYYY').subtract(7, 'days').format('DD-MM-YYYY');
     $scope.getScheduleTemplate(d).then(function(data) {
          // add all shifts to update shifts, so they can be saved for this week
          angular.copy($scope.originalTemplate, $scope.updateShifts);
          $scope.importing = false;
          $scope.countDays();
          $scope.countHours();
     });
  }

/************** HTTP Request Functions **************/

  // Save these shift schedulings in the list of updateShifts
  $scope.saveSchedule = function() {
    if ($scope.saving) {
      return;
    }
    $scope.saving = true;
    $scope.selectedId = 0;
    // remove blank spaces from update list - they are in delete shifts, or
    // have not been assigned
    $scope.updateShifts = _.filter($scope.updateShifts, function(shift) {
      return (shift.eid !== 0);
    });

    // don't actually save if in dev mode
    if($rootScope.devMode) {
      $scope.updateShifts = [];
      $scope.deleteSchedule();
      return;
    }

    $http({
      url: '/sequoiagrove/schedule/update/',
      method: "POST",
      data: $scope.updateShifts
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear update shifts list
        $scope.updateShifts = [];
        $scope.deleteSchedule();
      }
      else {
        $log.error('Error saving schedule ', status, data);
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error saving schedule " + data);
      $scope.saving = false;
    });
  }

  // Delete these shift schedulings
  $scope.deleteSchedule = function() {

    // don't actually delete if in dev mode
    if($rootScope.devMode) {
      $scope.deleteShifts = [];
      $scope.saving = false;
      return;
    }

    $http({
      url: '/sequoiagrove/schedule/delete/',
      method: "DELETE",
      data: $scope.deleteShifts
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear delete shifts list
        $scope.deleteShifts = [];
        $scope.getScheduleTemplate($scope.date.mon.val);
        $scope.saving = false;
      }
      else {
        $log.error('Error deleting schedule ', status, data);
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error deleting schedule " + data);
    });
  }

  // Auto-Fill schedule based on history
  $scope.autoGenerate = function() {

    if ($scope.saving) {
      $log.debug("cannot make request, currently saving");
      return;
    }

    // don't actually auto-gen if in dev mode
    //if($rootScope.devMode) {
    //  $log.debug("in debug mode, http request not made");
    //  $scope.saving = false;
    //  return;
    //}

    $scope.saving = true;

    var daysHist = $scope.autoGenOptions.weeksInHistory * 7;
    $scope.autoGenOptions.mon = $scope.date.mon.val;
    $scope.autoGenOptions.historyEnd =
      moment(
        $scope.date.mon.val, 'DD-MM-YYYY'
      ).subtract(daysHist, 'days').format('DD-MM-YYYY');
    $scope.autoGenOptions.historyStart =
      moment(
        $scope.date.mon.val, 'DD-MM-YYYY'
      ).subtract(1, 'days').format('DD-MM-YYYY');

    $http({
      url: '/sequoiagrove/schedule/autogen/',
      //+ $scope.date.mon.val + '/'
      //+ moment($scope.date.mon.val, 'DD-MM-YYYY').subtract(1, 'days').format('DD-MM-YYYY') + '/'
      //+ moment($scope.date.mon.val, 'DD-MM-YYYY').subtract(daysHist, 'days').format('DD-MM-YYYY'),
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

});
