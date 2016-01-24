'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
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
        $translate) {

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.newDelivery = '';
  $scope.selectedPid = 0;
  $scope.empEditSearch = '';
  $scope.saving = false;

  // Call browser to print schedule on paper
  $scope.print = function() {
    $window.print();
  }

  $scope.selectEid = function(id) {
    $scope.selectedId = id;
  }

  $scope.switchPos = function(pos) {
    $scope.empEditSearch = '';
    $scope.selectedPid = pos;
  }

  // Filter employees by selected position
  $scope.filterEmployees = function(eid) {
    if($scope.selectedPid == 0) {
      return true;
    }
    var hasPos = $scope.hasPosition[$scope.selectedPid];
    var i=0;
    var len = hasPos.length;

    for(; i<len; i++) {
      // this employee has this position
      if(hasPos[i] == eid){
        return true;
      }
    }
    return false;
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

  // check if given day availability is within provided shift range
  $scope.checkEmpAvailWithShift = function(avl, shf) {
    if (avl == null) {
      return false;
    }
    var len = avl.length;
    for (var i = 0; i < len; i++) {
      var startFlag = false;
      var endFlag = false;
      if (
        (avl[i].startHr == shf.sthr && avl[i].startMin <= shf.stmin) ||
        avl[i].startHr < shf.sthr
      ) {
        startFlag = true;
      }
      if (
        (avl[i].endHr == shf.endhr &&  avl[i].endMin >= shf.endmin) ||
        avl[i].endHr > shf.endhr
      ) {
        endFlag = true;
      }
      if (startFlag && endFlag) {
        return true;
      }
    }
    return false;
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

  // Save the shifts in the list of updateShifts
  $scope.saveSchedule = function() {
    $scope.schHourCount = [];
    $scope.saving = true;

    $http({
      url: '/sequoiagrove/schedule/update/',
      method: "POST",
      data: { 'body': JSON.stringify($scope.updateShifts) }
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear update shifts list
        $scope.updateShifts = [];
        $scope.getScheduleTemplate();
        $scope.saving = false;
      }
      else {
        $log.error('Error saving schedule ', status, data);
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error saving schedule " + data);
      $scope.saving = false;
    });
  }

  // Delete all these shifts
  $scope.deleteSchedule = function() {
    $scope.schHourCount = [];
    $scope.saving = true;

    $http({
      url: '/sequoiagrove/schedule/delete/',
      method: "DELETE",
      data: { 'body': JSON.stringify($scope.deleteShifts) }
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear delete shifts list
        $scope.deleteShifts = [];
        $scope.getScheduleTemplate();
        $scope.saving = false;
      }
      else {
        $log.error('Error deleting schedule ', status, data);
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error deleting schedule " + data);
    });
  }

  // tracks changes by keeping update list current
  $scope.checkIfShiftExists = function(eid, sid, date) {
    sid = parseInt(sid);
    var paramObj = {'eid':eid, 'sid':sid, 'date':date};
    var inOriginal = false;
    var inUpdate = false;
    var originalIndex = -1;
    var updateIndex = -1;

    // check if this shift is in the update list
    _.map($scope.updateShifts, function(shift, index, list) {
      if (_.isMatch(shift, { 'sid':sid, 'date':date})) {
        $log.debug('match in update');
        inUpdate = true;
        updateIndex = index;
      }
    });

    // check if this shift is in the original list
    _.map($scope.oldShifts, function(shift, index, list) {
      if( _.isEqual(shift, paramObj)) {
        $log.debug('match in original');
        inOriginal = true;
        originalIndex = index;
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

    $scope.selectEid(eid);
  }


  $scope.clearSchedule = function() {
    _.map($scope.template, function(t, index, list) {
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.mon.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.tue.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.wed.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.thu.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.fri.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.sat.val});
      $scope.deleteShifts.push({'sid':t.sid, 'date':$scope.date.sun.val});

      t.mon.name = ""; t.mon.eid = 0;
      t.tue.name = ""; t.tue.eid = 0;
      t.wed.name = ""; t.wed.eid = 0;
      t.thu.name = ""; t.thu.eid = 0;
      t.fri.name = ""; t.fri.eid = 0;
      t.sat.name = ""; t.sat.eid = 0;
      t.sun.name = ""; t.sun.eid = 0;
    });

    $scope.deleteSchedule();
  }

  $scope.importLastWeek = function() {

    // all of the day of the week lists should be the same
    // length as monday
    var len  = $scope.oldShifts.mon.length;
    var i=0;
    for(; i<len; i++) {
      // Monday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.mon[i].eid,
        sid: $scope.previousShifts.mon[i].sid,
        date: $scope.date.mon.val
      });
      // Tuesday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.tue[i].eid,
        sid: $scope.previousShifts.tue[i].sid,
        date: $scope.date.tue.val
      });
      // Wednesday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.wed[i].eid,
        sid: $scope.previousShifts.wed[i].sid,
        date: $scope.date.wed.val
      });
      // Thursday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.thu[i].eid,
        sid: $scope.previousShifts.thu[i].sid,
        date: $scope.date.thu.val
      });
      // Friday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.fri[i].eid,
        sid: $scope.previousShifts.fri[i].sid,
        date: $scope.date.fri.val
      });
      // Saturday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.sat[i].eid,
        sid: $scope.previousShifts.sat[i].sid,
        date: $scope.date.sat.val
      });
      // Sunday
      $scope.updateShifts.push({
        eid: $scope.previousShifts.sun[i].eid,
        sid: $scope.previousShifts.sun[i].sid,
        date: $scope.date.sun.val
      });
    }
    $scope.saveSchedule();
  }

  $scope.removeDelivery = function(index) {
    // remove delivery from dummy list for now
    $scope.deliveries.splice(index, 1);
  }

  // add delivery to front end
  $scope.addDelivery = function() {
    if ($scope.newDelivery != '') {
        $scope.deliveries.push(
        { title: $scope.newDelivery,
          days: {
            monday:    false,
            tuesday:   false,
            wednesday: false,
            thursday:  false,
            friday:    false,
            saturday:  false,
            sunday:    false}
        })
        $scope.newDelivery = '';
    }
  }

  $scope.init = function() {
    //$scope.getShifts();
  }

  $scope.init();

});
