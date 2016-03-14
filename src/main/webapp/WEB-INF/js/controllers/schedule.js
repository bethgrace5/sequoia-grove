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
        $mdDialog) {


/************** Login Redirect, Containers and UI settings **************/
  $rootScope.lastPath = '/schedule';
  $scope.saving = false;
  $scope.importing = false;

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.activeTab = 'schedule';
  $scope.selectedId = 0;
  $scope.newDelivery = '';
  $scope.empEditSearch = '';
  $scope.selectedShift = {
    idx : -1
  };
  $scope.shiftInfo = {
    "location": "",
    "pid": -1,
    "position": "",
    "sid": -1,
    "tname": "",
    "weekdayStart": "",
    "weekdayEnd": "",
    "weekendStart": "",
    "weekendEnd": "",
    "mon":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "tue":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "wed":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "thu":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "fri":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "sat":{
      "eid": 0,
      "name": "",
      "weekday": ""
    },
    "sun":{
      "eid": 0,
      "name": "",
      "weekday": ""
    }
  };

/************** Pure Functions **************/

  // Call browser to print schedule on paper
  $scope.print = function() {
    $window.print();
  }

  $scope.selectEid = function(id) {
    $scope.selectedId = id;
  }

  $scope.clearShiftSelect = function() {
    $scope.selectedShift.idx = -1;
    $scope.shiftInfo.sid = -1;
    $scope.shiftInfo.pid = -1;
    $scope.shiftInfo.location = '';
    $scope.shiftInfo.tname = '';
    $scope.shiftInfo.weekdayStart = '';
    $scope.shiftInfo.weekdayEnd = '';
    $scope.shiftInfo.weekendStart = '';
    $scope.shiftInfo.weekendEnd = '';
  }

  $scope.selectShift = function(cur) {
    $scope.selectedShift.idx = cur;
    if ($scope.selectedShift.idx != -1) {
      $scope.shiftInfo.sid = $scope.template[cur].sid;
      $scope.shiftInfo.pid = $scope.template[cur].pid;
      $scope.shiftInfo.tname = $scope.template[cur].tname;
      $scope.shiftInfo.weekdayStart = $scope.template[cur].weekdayStart;
      $scope.shiftInfo.weekdayEnd = $scope.template[cur].weekdayEnd;
      $scope.shiftInfo.weekendStart = $scope.template[cur].weekendStart;
      $scope.shiftInfo.weekendEnd = $scope.template[cur].weekendEnd;
      for (var i = 0; i < $scope.positions.length; i++) { 
        if ($scope.shiftInfo.pid === $scope.positions[i].id) {
          $scope.shiftInfo.location = $scope.positions[i].location;
          $scope.shiftInfo.position = $scope.positions[i].title;
          break;
        }
      }
    }
    else {
      $scope.clearShiftSelect();
    }
  }

  $scope.shiftSelected = function() {
    return ($scope.selectedShift.idx != -1);
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

  $scope.shiftStatus = function(i) {
    var style = '';
    if(i===$scope.selectedShift.idx) {
      style += 'schedule-edit-task-selected';
    }
    return style;
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

  // Add new shift to schedule
  $scope.addShift = function() {
    for (var i = 0; i < $scope.positions.length; i++) { 
       if ($scope.shiftInfo.pid === $scope.positions[i].id) {
        $scope.shiftInfo.location = $scope.positions[i].location;
        $scope.shiftInfo.position = $scope.positions[i].title;
        break;
      }
    }
    $http({
      url: '/sequoiagrove/shift/add/',
      method: "POST",
      data: $scope.shiftInfo
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // !!!! confirm shift added to user !!!!
        $scope.shiftInfo.sid = data.sid;
        $scope.template.push(angular.copy($scope.shiftInfo));
        $scope.clearShiftSelect();
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error adding shift " + data);
      // !!!! show error to user !!!!
      $scope.clearShiftSelect();
    });
  }

  // Update current shift to schedule
  $scope.updateShift = function() {
    var schd = $scope.template[$scope.selectedShift.idx];
    var newData = $scope.shiftInfo;
    $http({
      url: '/sequoiagrove/shift/update/',
      method: "POST",
      data: $scope.shiftInfo
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        schd.pid = newData.pid;
        schd.location = newData.location;
        schd.tname = newData.tname;
        schd.weekdayStart = newData.weekdayStart;
        schd.weekdayEnd = newData.weekdayEnd;
        schd.weekendStart = newData.weekendStart;
        schd.weekendEnd = newData.weekendEnd;
        $scope.clearShiftSelect();
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error updating shift " + data);
    });
  }

  // Delete current shift to schedule
  $scope.deleteShift = function() {
    var curSid = $scope.shiftInfo.sid;
    $http({
      url: '/sequoiagrove/shift/delete/',
      method: "POST",
      data: $scope.shiftInfo
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        $scope.template = _.without($scope.template, _.findWhere($scope.template, {sid: curSid}));
        $scope.clearShiftSelect();
      }
    }).error(function (data, status, headers, config) {
      $log.error(status + " Error deleting shift " + data);
    });
  }

/************** Holidays Functions **********************************/
  $scope.chosenHoliday;
  $scope.holidayStartDate;
  $scope.holidayEndDate;
  $scope.holidayName;
  $scope.newHolidayName;
  $scope.holidayDate;
  $scope.holidayType;
  $scope.types = ["Half" , "Full"];
  /* HTML reminder  (this will be deleted after implemented in html"
        <input type="text" id="newHoliday" class="form-control"
        ng-model="newHoliday"
        placeholder="New Holiday" />
   */
  //--------------------------
  //Holiday Minor Functions
  //--------------------------
  $scope.today = new Date();
  $scope.minDateStart = new Date(
    $scope.today.getFullYear(),
    $scope.today.getMonth(),
    $scope.today.getDate()
    );

  $scope.holidayStartDate  = $scope.minDateStart;
  $scope.holidayEndDate =   $scope.minDateStart;

  $scope.updateEnd = function(){
    if(moment($scope.holidayDateStart).isAfter($scope.holidayDateEnd)){
      $scope.holidayEndDate = $scope.holidayStartDate;
    }
  }

  $scope.defaultDate = function(a){
    return moment(a).format("MMMM Do, YYYY");
  }

  $scope.compareDate = function(a, b){
    moment(a).format("MMMM Do, YYYY");
    moment(b).format("MMMM Do, YYYY");
    if(moment(a).isSame(b)){
      return true;
    }
    else{
      return false
    }
  }
  //--------------------------
  //Holiday Major Functions
  //--------------------------
  $scope.addNewHoliday = function(){
    $log.debug($scope.newHolidayName);
    $log.debug($scope.holidayType);
    $log.debug(moment($scope.holidayStartDate).format("MM-DD"));
    var obj = {
      "name":$scope.newHolidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD"),
      "type":$scope.holidayType
    }
    $http({
      url: '/sequoiagrove/schedule/submit/new/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $scope.getAllHolidays();
    })
    .error(function (data, status, headers, config) {
      $log.error('Error submiting new holiday ', status, data);
    });
  }

  $scope.getAllHolidays = function() {
    $http({
      url: '/sequoiagrove/schedule/get/holidays',
    method: "GET"
    }).success(function (data, status, headers, config) {
      $log.debug("At get All Holidays");
      $scope.allHolidays = data.holidays;
      $log.debug($scope.allHolidays);
    });
  }

  $scope.changeHolidayDates = function(){
    var obj = { 
      "name":$scope.holidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD"),
      "type":$scope.holidayType
    }
    $http({
      url: '/sequoiagrove/update/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
    })
    .error(function (data, status, headers, config) {
      $log.error('Error changing Holidays ', status, data);
    });
  }

  $scope.selectHoliday = function(name){
    $scope.holidayName = name;
  }

  $scope.deleteHoliday = function(){
    var obj = { 
      "name":$scope.holidayName,
      "date":moment($scope.holidayStartDate).format("MM-DD"),
      "type":$scope.holidayType
    }
    $http({
      url: '/sequoiagrove/schedule/delete/holiday',
    method: "POST",
    data: JSON.stringify(obj)
    })
    .success(function (data, status, headers, config) {
      $scope.getAllHolidays();
    })
    .error(function (data, status, headers, config) {
      $log.error('Error changing Holidays ', status, data);
    });
  }


  /************** Controller Initialization **************/

  $scope.init = function() {
    $scope.getAllHolidays();
    $log.debug("At Init");
    $log.debug($scope.allHolidays);
  }

  $scope.init();

  /************** Event Watchers **************/

  $scope.$watch($rootScope.loading, function(newVal, oldVal){
    if(newVal){
      //$log.debug(newVal);
      // watchExpression has changed.
    }
  });
});
