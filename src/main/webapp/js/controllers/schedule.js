'use strict';
angular.module('sequoiaGroveApp')
.controller('ScheduleCtrl', function ($filter, $window, $location, $http,
      $log, $rootScope, $scope, $timeout, $translate, $mdDialog, scheduleFactory,
      userFactory, loginFactory, localStorageService) {

  localStorageService.set('lastPath', '/schedule');
  // user is not logged in
  if (loginFactory.isLoggedIn() === false) {
    $location.path('/login');
  }
  if (!loginFactory.getUser().isManager) {
    $location.path('/home');
  }
  $scope.saving = false;
  $scope.aList = {}; // availability list
  $scope.pList = {}; // position list
  $scope.selectedPid = 0;
  $scope.selectedPosition = 'All';
  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.empEditSearch = '';
  $scope.hideSpacers = true;
  $scope.items = [{'isSpacer':true, 'index':-1}];
  $scope.errors = { 'selectedName':'', 'available':true, 'hasPosition':true,
    'isCurrent':true, 'selectedPosition':'' };

  $scope.toggleHideSpacers = function() {
    $scope.hideSpacers = !$scope.hideSpacers;
  }
  // Call browser to print schedule on paper
  $scope.print = function() {
    $window.print();
  }
  $scope.selectPosition = function(pid, title) {
    $scope.selectedPid = pid;
    $scope.selectedPosition = title;
  }
  // set selected id when clicking employee list in schedule
  $scope.selectFromList = function(eid) {
    $scope.selectedId = eid;
    // clear errors
    $scope.errors = { 'selectedName':'', 'available':true, 'hasPosition':true,
      'selectedPosition':'', 'isCurrent':true };
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

  // binary search to get employee by name
  $scope.getEmployeeByName = function(searchElement) {

    var minIndex = 0;
    var maxIndex = $scope.list.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = $scope.list[currentIndex];
      var check = searchElement.localeCompare(currentElement.firstname.substring(0, searchElement.length));

      if (check == 0) {
        return $scope.list[currentIndex];;
      }
      if (check < 1) {
        maxIndex = currentIndex - 1;
      }
      else if (check >= 1) {
        minIndex = currentIndex + 1;
      }
      else {
        return currentIndex;
      }
    }
    return -1;
  }

  $scope.selectEid = function(t, day, al, pl) {
    $scope.aList = al;
    $scope.pList = pl;

    if (t[day]) {
    //var obj = ($scope.employees[t[day].eid]);
      $scope.selectedId = t[day].eid;
      if ($scope.selectedId === 0) {
        $scope.errors.available = true;
        $scope.errors.hasPosition = true;
        $scope.errors.isCurrent = true;
        $scope.selectedId = 0;
      }
      else {
        $scope.errors.selectedName = $scope.employees[t[day].eid].firstname;
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

  // get if employee is available
  $scope.employeeIsAvailable = function(attrs, employee) {
    console.log(employee);
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
      else {
        if($scope.selectedPid === 0) {
          style += ' schedule-edit-input-hide';
        }
      }
    }
    return style;
  };

  // validation for schedule edit input
  $scope.inputStatus = function(id, shiftId, available, hasPosition, holiday, current) {
    var style = 'form-control schedule-edit-input';
    if(id == 0) {
      if ($scope.selectedId == 0) {
        style += ' schedule-edit-highlight';
      }
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
        //if( !holiday) {
          style += ' schedule-edit-input-avail';
        //}
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
    //if (holiday) {
      //style += ' schedule-edit-input-holiday';
    //}
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

  $scope.clearSchedule = function(ev) {
      var confirm = $mdDialog.confirm()
        .title('Clear?')
        .textContent('This will clear any current data this week, and cannot be undone.')
        .ariaLabel('publish schedule')
        .targetEvent(ev)
        .ok('Clear')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        // OK to clear
        if(loginFactory.getUser().isManager) {
          $scope.selectedId = 0;
          scheduleFactory.clear($rootScope);
        }
      }, function() {
        // cancel publish
        return;
      });
  }

  // observer callback for schedule factory
  scheduleFactory.registerObserverCallback(
      function(){
        $scope.template = scheduleFactory.getTemplate($rootScope);
        if (loginFactory.getUser().isManager) {
          $scope.weekList = scheduleFactory.getWeekList();
          $scope.dayCount = scheduleFactory.getDayCount();
          $scope.hourCount = scheduleFactory.getHourCount();
          $scope.changesMade = scheduleFactory.changesMade();
          $scope.requests = scheduleFactory.getRequests();
        }
      });

  // ng-sortable drag and drop - shifts
  $scope.boardDragControlListeners = {
      'accept': function(sourceItemHandleScope, destSortableScope){
          return true; //override to determine drag is allowed or not. default is true.
        },
      'itemMoved': function(event){
        scheduleFactory.setMovedShifts();
        },
      'orderChanged': function(event){
        scheduleFactory.setMovedShifts();
        },
      'removeItem': function(index) {
        return false;
      }
    };
  // ng-sortable drag and drop - spacers
  $scope.gapDragControlListeners = {
      'accept': function(sourceItemHandleScope, destSortableScope){
          return true; //override to determine drag is allowed or not. default is true.
        },
      'itemMoved': function(event){
        scheduleFactory.setMovedShifts();
        },
      'orderChanged': function(event){
        scheduleFactory.setMovedShifts();
        },
      'clone': true,//optional param for clone feature.
    };
});
