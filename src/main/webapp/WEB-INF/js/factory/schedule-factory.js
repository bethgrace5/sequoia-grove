'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('scheduleFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];

  // Exposed to all users through service
  var schedule = [];
  var locations = [];
  var locationId = [];
  var business = 0;
  var publishedList = [];
  var header = {
    mon:{val:'', disp:'', holiday:{}},
    tue:{val:'', disp:'', holiday:{}},
    wed:{val:'', disp:'', holiday:{}},
    thu:{val:'', disp:'', holiday:{}},
    fri:{val:'', disp:'', holiday:{}},
    sat:{val:'', disp:'', holiday:{}},
    sun:{val:'', disp:'', holiday:{}}};
  var weekList;

  // Exposed to users with 'manage schedule' privelage through service
  var dayCount = [];
  var hourCount = [];

  // Internal Factory Variables
  var originalTemplate = [];
  var deleteShifts = [];
  var updateShifts = [];
  var shiftIndices = [];
  var year = '';
  var monday  = '';
  var daysAgo = 0;
  var movedShifts = false;
  var holidays = [];
  var extendEnd = 2;
  var extendStart = 2;
  var requests = {};


  //call this when you know 'foo' has been changed
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  // step back one day at a time from today to get this monday's date
  var initMonday = function() {
    var dayName = moment().format('dddd');
    if (dayName != 'Monday') { //Figure out how many days ago monday was
      while(dayName != 'Monday') {
        daysAgo++;
        dayName = moment().subtract(daysAgo, 'days').format('dddd');
        monday = moment().subtract(daysAgo, 'days').format('DD-MM-YYYY');
      }
    }
    else {
      monday = moment().format('DD-MM-YYYY'); // Today is Monday
    }
  }

  // Set Schedule Header Dates, and Date String Values
  var initHeader = function() {
    header.mon.val = monday; // Use Monday to setup the week
    header.mon.disp = moment(monday, 'DD-MM-YYYY').format('MMM-D');
    header.tue.val  = moment(monday, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
    header.tue.disp = moment(monday, 'DD-MM-YYYY').add(1, 'days').format('MMM-D');
    header.wed.val  = moment(monday, 'DD-MM-YYYY').add(2, 'days').format('DD-MM-YYYY');
    header.wed.disp = moment(monday, 'DD-MM-YYYY').add(2, 'days').format('MMM-D');
    header.thu.val  = moment(monday, 'DD-MM-YYYY').add(3, 'days').format('DD-MM-YYYY');
    header.thu.disp = moment(monday, 'DD-MM-YYYY').add(3, 'days').format('MMM-D');
    header.fri.val  = moment(monday, 'DD-MM-YYYY').add(4, 'days').format('DD-MM-YYYY');
    header.fri.disp = moment(monday, 'DD-MM-YYYY').add(4, 'days').format('MMM-D');
    header.sat.val  = moment(monday, 'DD-MM-YYYY').add(5, 'days').format('DD-MM-YYYY');
    header.sat.disp = moment(monday, 'DD-MM-YYYY').add(5, 'days').format('MMM-D');
    header.sun.val  = moment(monday, 'DD-MM-YYYY').add(6, 'days').format('DD-MM-YYYY');
    header.sun.disp = moment(monday, 'DD-MM-YYYY').add(6, 'days').format('MMM-D');
    year = moment(monday, 'DD-MM-YYYY').format('YYYY');
    buildWeekList();
  }

  var initRequests = function() {
    requests = {};
    var deferred = $q.defer();
    $http({ 'url': '/sequoiagrove/request/'+header.mon.val+'/'+header.sun.val+'/'+business, 'method': 'GET', }).then(
        function(success) {
          if (success.status === 200) {
            _.map(success.data.requests, function(item, index) {
              var start = moment(item.startDate, 'YYYY-MM-DD');
              var end = moment(item.endDate, 'YYYY-MM-DD');

              // if start is before monday, make it equal to monday
              if (start.isBefore(moment(header.mon.val, 'DD-MM-YYYY'))) {
                start = moment(header.mon.val, 'DD-MM-YYYY');
              }

              // if end is after sunday, make it equal to sunday
              if (end.isAfter(moment(header.sun.val, 'DD-MM-YYYY'))) {
                end = moment(header.sun.val, 'DD-MM-YYYY');
              }

              var duration = end.diff(start, 'days')
              var weekdays = {'mon':false, 'tue':false, 'wed':false, 'thu':false, 'fri':false, 'sat':false, 'sun':false}

              // the employee had another request in the list that was set, don't override it.
              if (requests[item.employeeID] !== undefined) {
                weekdays = requests[item.employeeID];
              }

              // get start
              if(start.format('dddd') === 'Monday') {
                weekdays.mon = true;
                if(duration > 0) { weekdays.tue = true; duration--; }
                if(duration > 0) { weekdays.wed = true; duration--; }
                if(duration > 0) { weekdays.thu = true; duration--; }
                if(duration > 0) { weekdays.fri = true; duration--; }
                if(duration > 0) { weekdays.sat = true; duration--; }
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Tuesday') {
                weekdays.tue = true;
                if(duration > 0) { weekdays.wed = true; duration--; }
                if(duration > 0) { weekdays.thu = true; duration--; }
                if(duration > 0) { weekdays.fri = true; duration--; }
                if(duration > 0) { weekdays.sat = true; duration--; }
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Wednesday') {
                weekdays.wed = true;
                if(duration > 0) { weekdays.thu = true; duration--; }
                if(duration > 0) { weekdays.fri = true; duration--; }
                if(duration > 0) { weekdays.sat = true; duration--; }
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Thursday') {
                weekdays.thu = true;
                if(duration > 0) { weekdays.fri = true; duration--; }
                if(duration > 0) { weekdays.sat = true; duration--; }
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Friday') {
                weekdays.fri = true;
                if(duration > 0) { weekdays.sat = true; duration--; }
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Saturday') {
                weekdays.sat = true;
                if(duration > 0) { weekdays.sun = true; duration--; }
              }
              else if(start.format('dddd') === 'Sunday') {
                weekdays.sun = true;
              }
              requests[item.employeeID] = weekdays;
              return [item.employeeID, weekdays]
            });
            deferred.resolve();
          }
        });

    return deferred.promise;
  };

  var buildWeekList = function() {
    var weeks = [
      moment(monday, 'DD-MM-YYYY').subtract(7,  'days').format('DD-MM-YYYY'),
      moment(monday, 'DD-MM-YYYY').subtract(14, 'days').format('DD-MM-YYYY'),
      moment(monday, 'DD-MM-YYYY').subtract(21, 'days').format('DD-MM-YYYY'),
      moment(monday, 'DD-MM-YYYY').subtract(28, 'days').format('DD-MM-YYYY'),
      moment(monday, 'DD-MM-YYYY').subtract(35, 'days').format('DD-MM-YYYY')
    ]
    weekList = [
      {'name':moment(weeks[0], 'DD-MM-YYYY').format('MMMM Do'), 'val':weeks[0]},
      {'name':moment(weeks[1], 'DD-MM-YYYY').format('MMMM Do'), 'val':weeks[1]},
      {'name':moment(weeks[2], 'DD-MM-YYYY').format('MMMM Do'), 'val':weeks[2]},
      {'name':moment(weeks[3], 'DD-MM-YYYY').format('MMMM Do'), 'val':weeks[3]},
      {'name':moment(weeks[4], 'DD-MM-YYYY').format('MMMM Do'), 'val':weeks[4]}
    ]
  }

  var insertSpacers = function() {
    $timeout(function() {

      angular.forEach (locations, function(val, key) {
        var i = 0;
        var spaceCount = 0;
        // index is the old index saved from the database
        var temp =  _.map(schedule[val], function(item, index) {
            if(index != (item.index - spaceCount)) {
              if(item.index == 0) { //new schedules all have 0 index
                return item;
              }
              spaceCount++;
              return [{'isSpacer':true, 'index':-1}, item];
            }
            else {
              return item;
            }
          });
        schedule[val] = _.flatten(temp, true);
      })
      notifyObservers();

    }, 1000);
  }

  var initHolidays = function() {
    var deferred = $q.defer();
    $http({ url: '/sequoiagrove/holiday/get/between/'+
      moment(header.mon.val, 'DD-MM-YYYY').format('MM-DD-YYYY') + '/' +
      moment(header.sun.val, 'DD-MM-YYYY').format('MM-DD-YYYY'), method: "GET" })
      .then(function(success) {
        holidays = success.data.holidays;
        if (holidays.length <= 0) {
          deferred.resolve(success);
          header.mon.holiday = {};
          header.tue.holiday = {};
          header.wed.holiday = {};
          header.thu.holiday = {};
          header.fri.holiday = {};
          header.sat.holiday = {};
          header.sun.holiday = {};
        }
        else {
          _.map(holidays, function(h, index) {
            var d = parseInt(h.weekday);
            if(d === 2) { header.mon.holiday = h; }
            else { header.mon.holiday = {} }
            if(d === 3) { header.tue.holiday = h; }
            else { header.tue.holiday = {} }
            if(d === 4) { header.wed.holiday = h; }
            else { header.wed.holiday = {} }
            if(d === 5) { header.thu.holiday = h; }
            else { header.thu.holiday = {} }
            if(d === 6) { header.fri.holiday = h; }
            else { header.fri.holiday = {} }
            if(d === 7) { header.sat.holiday = h; }
            else { header.sat.holiday = {} }
            if(d === 1) { header.sun.holiday = h; }
            else { header.sun.holiday = {} }
          });
          addHolidays();
          deferred.resolve(success);
        }
      });
    return deferred.promise;
  }

  var addHolidays = function() {
    _.map(schedule, function(item, index) {
      if (!_.isEmpty(header.mon.holiday)) {
        if (!shiftIsSchedulable( item.weekdayStart, item.weekdayEnd, 'mon')) {
          item.mon = _.extend(item.mon, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.tue.holiday)) {
        if (!shiftIsSchedulable( item.weekdayStart, item.weekdayEnd, 'tue')) {
          item.tue = _.extend(item.tue, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.wed.holiday)) {
        if (!shiftIsSchedulable( item.weekdayStart, item.weekdayEnd, 'wed')) {
          item.wed = _.extend(item.wed, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.thu.holiday)) {
        if (!shiftIsSchedulable( item.weekdayStart, item.weekdayEnd, 'thu')) {
          item.thu = _.extend(item.thu, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.fri.holiday)) {
        if (!shiftIsSchedulable( item.weekdayStart, item.weekdayEnd, 'fri')) {
          item.fri = _.extend(item.fri, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.sat.holiday)) {
        if (!shiftIsSchedulable( item.weekendStart, item.weekendEnd, 'sat')) {
          item.sat = _.extend(item.sat, {'holiday': true});
        }
      };
      if (!_.isEmpty(header.sun.holiday)) {
        if (!shiftIsSchedulable( item.weekendStart, item.weekendEnd, 'sun')) {
          item.sun = _.extend(item.sun, {'holiday': true});
        }
      };
    });
  }

  var shiftIsSchedulable = function(start, end, day) {
      // determine shift duration times
      var shiftStart = moment(start, 'HHmm').subtract(parseInt(extendStart), 'hours');
      var shiftEnd = moment(end, 'HHmm').subtract(parseInt(extendEnd), 'hours');
      var storeOpen = moment(header[day].holiday.storeOpen, 'HHmm');
      var storeClose = moment(header[day].holiday.storeClose, 'HHmm');
      return ((shiftEnd.isSame(storeClose, 'minute') || shiftEnd.isBefore(storeClose, 'minute'))
          && (shiftStart.isAfter(storeOpen, 'minute') || shiftStart.isSame(storeOpen, 'minute')));
  };

  // Get The Schedule for the week currently being viewed - expects a moment object for week
  var initSchedule = function() {
    // initialize update and delete shift lists for each location
    angular.forEach(locations, function(val, key) {
      updateShifts[val] = [];
      deleteShifts[val] = [];
    })

    var deferred = $q.defer();
    $rootScope.loadingMsg = "Obtaining current schedule data...";
    var url = '/sequoiagrove/schedule/template/'+monday+'/'+locations; // if it's in dev mode, and we already have
    // a template in localstorage, return.
    /*
    if($rootScope.devMode) {
      var temp = localStorageService.get('template');
        if (temp) {
          schedule = JSON.parse(temp);
          $log.debug('Warning: devMode on. This is not current schedule data');
          isPublished = true;
          return $q(function(resolve, reject) {
            resolve();
          });
        }
      }
      */
    $http({
      "url": url,
      "method": "GET",
    }).then(function (success) {
          if (success.status === 200) {
            publishedList = success.data.isPublished;
            schedule = success.data.template;
            // Keep a copy of schedule retrieved to compare against changes later
            if ($rootScope.devMode) {
              localStorageService.set('template', JSON.stringify(success.data.template));
            }
            storeOriginalTemplate();
            insertSpacers();
            deferred.resolve(success.data);
          }
          deferred.reject();
        });
    return deferred.promise;
  }

  // Save Schedule
  var saveSchedule = function() {
    console.log('saveSchedule in schedule-factory.js, locationId: ', locationId);
    var deferred = $q.defer();
    if(updateShifts[locationId].length <= 0) {
      deferred.resolve();
      return deferred.promise
    }

    // remove any blank names from update list
    updateShifts[locationId] = _.filter(updateShifts[locationId], function(shift) {
      return (shift.eid !== 0);
    });
    // don't actually save if in dev mode
    //if($rootScope.devMode) {
      //updateShifts[locationId] = [];
      //return;
    //}
    $http({
      url: '/sequoiagrove/schedule/update/',
      method: "POST",
      data: updateShifts[locationId]
    }).then(function (success) {
      if (success.status == 200) {
        // clear update shifts list
        updateShifts[locationId] = [];
        deferred.resolve(success);
      }
    });
    return deferred.promise;
  }

  //FIXME put save and delete schedule chained in one funciton
  //for both of them, and make one function called save, so it will
  // save and delete

  // Delete these shift schedulings
  var deleteSchedule = function() {
    console.log('deleteSchedule in schedule-factory.js, locationId: ', locationId);
    var deferred = $q.defer();
    if(deleteShifts[locationId].length <= 0) {
      deferred.resolve();
      return deferred.promise
    }
    // don't actually delete if in dev mode
    if($rootScope.devMode) {
      deleteShifts[locationId] = [];
      return;
    }
    $http({
      url: '/sequoiagrove/schedule/delete/',
      method: "DELETE",
      data: deleteShifts[locationId]
    }).then( function(success) {
      if (success.status == 200) {
        deleteShifts[locationId] = []; // clear delete shifts list
        deferred.resolve(success);
      }
    });
    return deferred.promise;
  }

  // for each location, save what we pulled from the database in the format
  // for checking the schedule for comparisons when editing the schedule
  var storeOriginalTemplate = function() {
    console.log('storeOriginalTemplate in schedule-factory.js, locationId: ', locationId);
    angular.forEach(schedule, function(schList, lid) {
      originalTemplate[lid] = []; // clear originalTemplate
      _.map(schList, function(val, key) {
        if (!val.isSpacer) {
          originalTemplate[lid].push({'eid':val.mon.eid, 'sid':val.sid, 'date':header.mon.val});
          originalTemplate[lid].push({'eid':val.tue.eid, 'sid':val.sid, 'date':header.tue.val});
          originalTemplate[lid].push({'eid':val.wed.eid, 'sid':val.sid, 'date':header.wed.val});
          originalTemplate[lid].push({'eid':val.thu.eid, 'sid':val.sid, 'date':header.thu.val});
          originalTemplate[lid].push({'eid':val.fri.eid, 'sid':val.sid, 'date':header.fri.val});
          originalTemplate[lid].push({'eid':val.sat.eid, 'sid':val.sid, 'date':header.sat.val});
          originalTemplate[lid].push({'eid':val.sun.eid, 'sid':val.sid, 'date':header.sun.val});
        }
      });
    });
  }


  var saveShifts = function() {
    var deferred = $q.defer();
    shiftIndices[locationId] = _.map(schedule[locationId], function(item, index) {
      if (item.isSpacer == true) {
        return {'sid':0, 'eid':0};
      }
      else {
      // use 'sid' and 'eid' to reuse a java class
        return {'sid':item.sid, 'eid':index};
      }
    });

    shiftIndices[locationId] = _.filter(shiftIndices[locationId], function(item, index) {
      return item.sid != 0;
    });

    $http({
      url: '/sequoiagrove/schedule/shiftIndices',
      method: "POST",
      data: shiftIndices[locationId]
    }).then(function(success) {
      shiftIndices[locationId] = [];
      movedShifts = false;
      notifyObservers();
      deferred.resolve(true);
    },function (failure) {
      //deferred.reject(false);
    });
    return deferred.promise;
  }

  // calculate duration by using formatted time strings as input
  // 24 hour time (HHmm)
  var getShiftDuration = function(start, end) {
    return moment(end, 'HHmm').diff(moment(start, 'HHmm'), 'hours', true);
  }

  // iterate the template to count days for each employee
  // if they are scheduled twice on a day, it counts as one.
  var countDays = function() {
    var shifts = [[],[],[],[],[],[],[]];
    _.map(schedule[locationId], function(item) { // collect employee names for each day
      if(item.isSpacer) {
        return;
      }
      shifts[0] = _.union(shifts[0], [item.mon.eid]);
      shifts[1] = _.union(shifts[1], [item.tue.eid]);
      shifts[2] = _.union(shifts[2], [item.wed.eid]);
      shifts[3] = _.union(shifts[3], [item.thu.eid]);
      shifts[4] = _.union(shifts[4], [item.fri.eid]);
      shifts[5] = _.union(shifts[5], [item.sat.eid]);
      shifts[6] = _.union(shifts[6], [item.sun.eid]);
    });
    // get day count for each employee, format is: [ {'eid':'count'}, ... ]
    dayCount = _.countBy((_.flatten(shifts)), function(id){
      return id;
    });
  }

  // iterate the template to count hours for each employee
  var countHours = function() {
    var count = [];
    _.map(schedule[locationId], function(item) {
      if(item.isSpacer) {
        return;
      }
      var duration = 0;

      var wDay = getShiftDuration(item.weekdayStart, item.weekdayEnd);
      var wEnd = getShiftDuration(item.weekendStart, item.weekendEnd);

      count.push({'eid':item.mon.eid, 'duration':wDay});
      count.push({'eid':item.tue.eid, 'duration':wDay});
      count.push({'eid':item.wed.eid, 'duration':wDay});
      count.push({'eid':item.thu.eid, 'duration':wDay});
      count.push({'eid':item.fri.eid, 'duration':wDay});

      count.push({'eid':item.sat.eid, 'duration':wEnd});
      count.push({'eid':item.sun.eid, 'duration':wEnd});

      // tack the duration on to the schedule for viewing
      item = _.extend(item, {'weekdayDuration': wDay});
      item = _.extend(item, {'weekendDuration': wEnd});
    });

    // get hour count for each employee, format is: [ {'eid':'count'}, ... ]
    hourCount = _.groupBy(count, function(item){
      return item.eid;
    });
    _.map(hourCount, function(items, index) {
      var hours =  _.reduce(items, function(memo, item) {
        return memo + item.duration;
      }, 0)
      hourCount[index] = hours;
    });
  }

  // alternative function to count hours, used for non-manager
  // employees who do not have all the extra info
  var calculateShiftHours = function() {
    schedule[locationId] = _.map(schedule[locationId], function(item) {
      if(item.isSpacer) {
        return;
      }
      var duration = 0;

      var wDay = getShiftDuration(item.weekdayStart, item.weekdayEnd);
      var wEnd = getShiftDuration(item.weekendStart, item.weekendEnd);

      // tack the duration on to the schedule for viewing
      return _.extend(item, {'weekdayDuration': wDay, 'weekendDuration': wEnd})
    });
  }

  // a shift was typed in blank, add it to delete list
  var addToDeleteList = function(obj) {
    console.log('addToDeleteList in schedule-factory.js, locationId: ', locationId);
    var isAlreadyBlank = false;
    var isInDeleteList = false;
    obj.sid = parseInt(obj.sid);
    // check if this entry was already blank
    _.map(originalTemplate[locationId], function(shift, index) {
      if (shift.eid === 0) {
        if ( _.isEqual(obj, _.omit(shift, 'eid'))) {
          isAlreadyBlank = true;
        }
      }
    });
    if (isAlreadyBlank) { // shift is already blank
      return;
    }
    _.map(deleteShifts[locationId], function(shift, index, list) {
      if( _.isEqual(shift, obj)) {
        isInDeleteList = true;
      }
    });
    if (isInDeleteList === false) { // add to delete list
      deleteShifts[locationId].push({'sid':obj.sid, 'date':obj.date});
    }
    notifyObservers();
  }

  // put change made into update shifts
  var trackScheduleChange = function(eid, sid, date) {
    console.log('trackScheduleChange in schedule-factory.js, locationId: ', locationId);
    sid = parseInt(sid);
    var paramObj = {'eid':eid, 'sid':sid, 'date':date};
    var inOriginal = false;
    var inUpdate = false;
    var originalIndex = -1;
    var updateIndex = -1;
    // check for it in the update list
    _.map(updateShifts[locationId], function(shift, index, list) {
      if (_.isMatch(shift, { 'sid':sid, 'date':date})) {
        inUpdate = true;
        updateIndex = index;
      }
    });
    // check for it in the original list
    _.map(originalTemplate[locationId], function(shift, index, list) {
      if( _.isEqual(shift, paramObj)) {
        inOriginal = true;
        originalIndex = index;
      }
    });
    // check for it in the delete list
    _.map(deleteShifts[locationId], function(shift, index, list) {
      if(_.isMatch(shift, {'sid':sid, 'date':date})) {
        // remove this from delete shifts, because if this function
        // was called, it means this shift was assigned a name
        deleteShifts[locationId].splice(index, 1);
      }
    });

    // decide what to do with the info gathered above
    if (inOriginal && inUpdate) {
      // item needs to be removed from update
      updateShifts[locationId].splice(updateIndex, 1);
    }
    else if (inOriginal && !inUpdate) {
      // do nothing
    }
    else if (!inOriginal && inUpdate) {
      // update the update list
      updateShifts[locationId].splice(updateIndex, 1);
      updateShifts[locationId].push(paramObj);
    }
    else if (!inOriginal && !inUpdate) {
      // add item to update list
      updateShifts[locationId].push(paramObj);
    }
    notifyObservers();
  }

  // adds all shifts to delete list, so they are deleted when save is clicked
  var clearSchedule = function() {
    var oldDeleteShifts = deleteShifts[locationId];
    var countChanges = 0;
    updateShifts[locationId] = [];
    deleteShifts[locationId] = [];
    // add all shifts to delete list if they weren't already blank
    schedule[locationId] = _.map(schedule[locationId], function(t, index, list) {
      if(t.isSpacer == true) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        if (t.mon.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.mon.val});
          countChanges++;
        }
        if (t.tue.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.tue.val});
          countChanges++;
        }
        if (t.wed.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.wed.val});
          countChanges++;
        }
        if (t.thu.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.thu.val});
          countChanges++;
        }
        if (t.fri.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.fri.val});
          countChanges++;
        }
        if (t.sat.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.sat.val});
          countChanges++;
        }
        if (t.sun.eid !== 0) {
          deleteShifts[locationId].push({'sid':t.sid, 'date':header.sun.val});
          countChanges++;
        }
        // update template so view reflects changes
        t.mon.name = ""; t.mon.eid = 0;
        t.tue.name = ""; t.tue.eid = 0;
        t.wed.name = ""; t.wed.eid = 0;
        t.thu.name = ""; t.thu.eid = 0;
        t.fri.name = ""; t.fri.eid = 0;
        t.sat.name = ""; t.sat.eid = 0;
        t.sun.name = ""; t.sun.eid = 0;
        return t;
      }
    });
    storeOriginalTemplate();
    // no changes were added to delete list
    if (countChanges === 0) {
      //FIXME how to handle clicking clear twice,
      // can't just reset to old delete shifts, because
      // what if one change was added, it wouldn't keep all the deletions
      //$log.debug('no changes to clear');
    }
  }

  // rewrite current schedule with last week's data
  var importWeek = function(mondayOfWeek) {
    console.log('importWeek in schedule-factory.js, locationId: ', locationId);
    var deferred = $q.defer();
    deleteShifts[locationId] = [];
    updateShifts[locationId] = [];
    // set monday back in time
    monday = mondayOfWeek;
    initSchedule().then(function(data) {
      // add all shifts to update shifts, so they can be saved for this week
      angular.copy(originalTemplate[locationId], updateShifts[locationId]);
      notifyObservers();
      deferred.resolve(data);
    });
    return deferred.promise;
  }

  // Publish the schedule
  var publishSchedule = function(userId) {
    var deferred = $q.defer();
    var obj = {'date':header.mon.val, 'eid': userId, 'locationId':locationId};
    $http({
      url: '/sequoiagrove/schedule/publish/',
      method: "POST",
      data: obj
    }).then(function(success) {
      // insert dummy array so length > 1, which is
      // required to determine published status.
      publishedList[locationId] = ['published'];
      notifyObservers();
      deferred.resolve(true);
    },function (failure) {
      deferred.reject(false);
    });
    return deferred.promise;
  }


  // if User has manage schedule privelages, extend functionality
  var setManagePrivelage = function() {
    //TODO set a boolean saying that this user has manage schedule privelage
    service.init = function(locationList, selectedLocation, bid) {
      locations = locationList;
      locationId = selectedLocation
      business = bid;
      var deferred = $q.defer();
      initMonday();
      initHeader();
      initSchedule().then(
          function(success) {
            countDays();
            countHours();
            return initHolidays();
          }).then(function(success) {
            return initRequests();
          }).then(function(success) {
            notifyObservers();
            deferred.resolve(success);
          });
      return deferred.promise;
    }
    // same as above, but counts days and hours when changing weeks
    service.changeWeek = function(operation) {
      var deferred = $q.defer();
      if (operation == 'add') {
        monday = moment(header.mon.val, 'DD-MM-YYYY').add(7, 'days').format('DD-MM-YYYY');
      }
      else if (operation == 'subtract'){
        monday = moment(header.mon.val, 'DD-MM-YYYY').subtract(7, 'days').format('DD-MM-YYYY');
      }
      else {
        monday = operation;
      }
      initSchedule().then(
        function(success) {
          initHeader(); // update schedule header to reflect new dates
          countDays(); // NOTE Added for those with manage schedule privelage
          countHours(); // NOTE Added for those with manage schedule privelage
          buildWeekList();
          return initHolidays();
        },function(failure) {
          deferred.reject(failure);
      }).then(function(success) {
        return initRequests();
      }).then(function(success) {
        notifyObservers();
        deferred.resolve(success);
      });
      return deferred.promise;
    },
    service.getWeekList    = function() { return weekList};
    service.deleteItem     = function(obj) { addToDeleteList(obj); };
    service.changeItem     = function(eid, sid, date) { trackScheduleChange(eid, sid, date); };
    service.clear          = function() { clearSchedule(); notifyObservers(); };
    service.publish        = function(userId) { return publishSchedule(userId); };
    service.importWeek     = function(mon) { return importWeek(mon); };
    service.getDayCount    = function() { return dayCount; };
    service.getHourCount   = function() { return hourCount; };
    service.getRequests   = function() { return requests; };
    service.changesMade    = function() {
      return ((updateShifts[locationId].length + deleteShifts[locationId].length) > 0) || movedShifts;
    };
    service.setMovedShifts   = function() { movedShifts = true; notifyObservers() };
    service.saveSchedule = function() {
      var deferred = $q.defer();
      // Save Shift Indices
      saveShifts().then(function(success) {
        // Save Updated cells
        return saveSchedule();
      }).then(function(success) {
        // Save Deleted cells
        return deleteSchedule();
      }).then(function(success) {
        return initHolidays();
      }).then(function(success) {
        countDays();
        countHours();
        buildWeekList();
        notifyObservers();
        deferred.resolve(success);
      });
      return deferred.promise;
    };
    service.removeManagePrivelage = function() {
      service = removeManagePrivelage();
    }
  }

  var removeManagePrivelage = function() {
    // Exposed factory functionality
    return {
      // Initialize monday, set schedule header, get schedule template
      'init':function(locationList, selectedLocation) {
        var deferred = $q.defer();
        locations = locationList;
        locationId = selectedLocation
        initMonday();
        initHeader();
        initSchedule().then(function(success) {
          calculateShiftHours();
          deferred.resolve(success);
        });
        return deferred.promise;
      },
      // update monday, change header, and request corresponding schedule
      'changeWeek':function(operation) {
        var deferred = $q.defer();
        if (operation == 'add') {
          monday = moment(header.mon.val, 'DD-MM-YYYY').add(7, 'days').format('DD-MM-YYYY');
        }
        else if (operation == 'subtract'){
          monday = moment(header.mon.val, 'DD-MM-YYYY').subtract(7, 'days').format('DD-MM-YYYY');
        }
        else {
          monday = operation;
        }
        initHeader(); // update schedule header to reflect new dates
        initSchedule().then(
           function(success) {
            countDays(); // NOTE Added for those with manage schedule privelage
            countHours(); // NOTE Added for those with manage schedule privelage
            buildWeekList();
            notifyObservers();
            deferred.resolve(success);
        });
        return deferred.promise;
      },
      'getHeader':   function() { return header; },
      'getTemplate': function() { return schedule[locationId]; },
      'isPublished': function() { return publishedList[locationId].length > 0; },
      'extendEnd': function(extend) {
        extendEnd = extend;
        addHolidays();
        notifyObservers();
      },
      'extendStart': function(extend) {
        extendStart = extend;
        addHolidays();
        notifyObservers();
      },
      'getWeekList': function() { return weekList},
      'setManagePrivelage': function() { setManagePrivelage(); },
      'removeManagePrivelage': function() {
        $log.debug('remove manage service');
        // do nothing
      }
    }
  }

  var service = removeManagePrivelage();

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

