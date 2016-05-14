'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('scheduleFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];

  // Exposed to all users through service
  var schedule = [];
  var isPublished = false;
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
    var i = 0;
    var spaceCount = 0;
    // index is the old index saved from the database
    var temp =  _.map(schedule, function(item, index) {
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
    schedule = _.flatten(temp, true);
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
        $log.debug('holidays', holidays);

        _.map(holidays, function(h, index) {
          var d = parseInt(h.weekday);
          if(d === 2) { header.mon.holiday = h; }
          if(d === 3) { header.tue.holiday = h; }
          if(d === 4) { header.wed.holiday = h; }
          if(d === 5) { header.thu.holiday = h; }
          if(d === 6) { header.fri.holiday = h; }
          if(d === 7) { header.sat.holiday = h; }
          if(d === 1) { header.sun.holiday = h; }
        });
        addHolidays();
        deferred.resolve(success);
      });
    return deferred.promise;
  }

  var addHolidays = function() {
    $log.debug('add holidays');
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
    notifyObservers();
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
    var deferred = $q.defer();
    $rootScope.loadingMsg = "Obtaining current schedule data...";
    var url = '/sequoiagrove/schedule/template/' + monday; // if it's in dev mode, and we already have
    // a template in localstorage, return.
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
    $http({ 'url': url, 'method': 'GET', }).then(
        function(success) {
          if (success.status === 200) {
            isPublished = success.data.isPublished;
            schedule = success.data.template;
            // Keep a copy of schedule retrieved to compare against changes later
            if ($rootScope.devMode) {
              localStorageService.set('template', JSON.stringify(success.data.template));
            }
            storeOriginalTemplate();
            deferred.resolve(success.data);
            insertSpacers();
            notifyObservers();
          }
          deferred.reject();
        });
    return deferred.promise;
  }

  // Save Schedule
  var saveSchedule = function() {
    var deferred = $q.defer();
    if(updateShifts.length <= 0) {
      deferred.resolve();
      return deferred.promise
    }

    // remove any blank names from update list
    updateShifts = _.filter(updateShifts, function(shift) {
      return (shift.eid !== 0);
    });
    // don't actually save if in dev mode
    if($rootScope.devMode) {
      updateShifts = [];
      return;
    }
    $http({
      url: '/sequoiagrove/schedule/update/',
      method: "POST",
      data: updateShifts
    }).then(function (success) {
      if (success.status == 200) {
        // clear update shifts list
        updateShifts = [];
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
    var deferred = $q.defer();
    if(deleteShifts.length <= 0) {
      deferred.resolve();
      return deferred.promise
    }
    // don't actually delete if in dev mode
    if($rootScope.devMode) {
      deleteShifts = [];
      return;
    }
    $http({
      url: '/sequoiagrove/schedule/delete/',
      method: "DELETE",
      data: deleteShifts
    }).then( function(success) {
      if (success.status == 200) {
        deleteShifts = []; // clear delete shifts list
        deferred.resolve(success);
      }
    });
    return deferred.promise;
  }

  // keep an original copy of the schedule in template format,
  // so we can check any modifications against it
  var storeOriginalTemplate = function() {
    originalTemplate = []; // clear originalTemplate
    _.map(schedule, function(t, index, list) {
      originalTemplate.push({'eid':t.mon.eid, 'sid':t.sid, 'date':header.mon.val});
      originalTemplate.push({'eid':t.tue.eid, 'sid':t.sid, 'date':header.tue.val});
      originalTemplate.push({'eid':t.wed.eid, 'sid':t.sid, 'date':header.wed.val});
      originalTemplate.push({'eid':t.thu.eid, 'sid':t.sid, 'date':header.thu.val});
      originalTemplate.push({'eid':t.fri.eid, 'sid':t.sid, 'date':header.fri.val});
      originalTemplate.push({'eid':t.sat.eid, 'sid':t.sid, 'date':header.sat.val});
      originalTemplate.push({'eid':t.sun.eid, 'sid':t.sid, 'date':header.sun.val});
    });
  }

  var saveShifts = function() {
    var deferred = $q.defer();
    shiftIndices = _.map(schedule, function(item, index) {
      if (item.isSpacer == true) {
        return {'sid':0, 'eid':0};
      }
      else {
      // use 'sid' and 'eid' to reuse a java class
        return {'sid':item.sid, 'eid':index};
      }
    });

    shiftIndices = _.filter(shiftIndices, function(item, index) {
      return item.sid != 0;
    });

    $http({
      url: '/sequoiagrove/schedule/shiftIndices',
      method: "POST",
      data: shiftIndices
    }).then(function(success) {
      shiftIndices = [];
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
    _.map(schedule, function(item) { // collect employee names for each day
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
  // FIXME, logic to count it incorrect, needs to iterate each day
  var countHours = function() {
    var count = [];
    _.map(schedule, function(item) {
      if(item.isSpacer) {
        return;
      }
      var duration = 0;
      if (item.day !== 'sat' && item.day !== 'sun') { // get weeday duration
        duration = getShiftDuration(item.weekdayStart, item.weekdayEnd);
        item = _.extend(item, {'weekdayDuration':duration});
      }
      else { //get weekend duration
        duration = getShiftDuration(item.weekendStart, item.weekendEnd);
        item = _.extend(item, {'weekendDuration':duration});
      }
      count.push({'eid':item.mon.eid, 'duration':duration});
      count.push({'eid':item.tue.eid, 'duration':duration});
      count.push({'eid':item.wed.eid, 'duration':duration});
      count.push({'eid':item.thu.eid, 'duration':duration});
      count.push({'eid':item.fri.eid, 'duration':duration});
      count.push({'eid':item.sat.eid, 'duration':duration});
      count.push({'eid':item.sun.eid, 'duration':duration});
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

  // a shift was typed in blank, add it to delete list
  var addToDeleteList = function(obj) {
    var isAlreadyBlank = false;
    var isInDeleteList = false;
    obj.sid = parseInt(obj.sid);
    // check if this entry was already blank
    _.map(originalTemplate, function(shift, index) {
      if (shift.eid === 0) {
        if ( _.isEqual(obj, _.omit(shift, 'eid'))) {
          isAlreadyBlank = true;
        }
      }
    });
    if (isAlreadyBlank) { // shift is already blank
      return;
    }
    _.map(deleteShifts, function(shift, index, list) {
      if( _.isEqual(shift, obj)) {
        isInDeleteList = true;
      }
    });
    if (isInDeleteList === false) { // add to delete list
      deleteShifts.push({'sid':obj.sid, 'date':obj.date});
    }
    notifyObservers();
  }

  // put change made into update shifts
  var trackScheduleChange = function(eid, sid, date) {
    sid = parseInt(sid);
    var paramObj = {'eid':eid, 'sid':sid, 'date':date};
    var inOriginal = false;
    var inUpdate = false;
    var originalIndex = -1;
    var updateIndex = -1;
    // check for it in the update list
    _.map(updateShifts, function(shift, index, list) {
      if (_.isMatch(shift, { 'sid':sid, 'date':date})) {
        inUpdate = true;
        updateIndex = index;
      }
    });
    // check for it in the original list
    _.map(originalTemplate, function(shift, index, list) {
      if( _.isEqual(shift, paramObj)) {
        inOriginal = true;
        originalIndex = index;
      }
    });
    // check for it in the delete list
    _.map(deleteShifts, function(shift, index, list) {
      if(_.isMatch(shift, {'sid':sid, 'date':date})) {
        // remove this from delete shifts, because if this function
        // was called, it means this shift was assigned a name
        deleteShifts.splice(index, 1);
      }
    });

    // decide what to do with the info gathered above
    if (inOriginal && inUpdate) {
      // item needs to be removed from update
      updateShifts.splice(updateIndex, 1);
    }
    else if (inOriginal && !inUpdate) {
      // do nothing
    }
    else if (!inOriginal && inUpdate) {
      // update the update list
      updateShifts.splice(updateIndex, 1);
      updateShifts.push(paramObj);
    }
    else if (!inOriginal && !inUpdate) {
      // add item to update list
      updateShifts.push(paramObj);
    }
    notifyObservers();
  }

  // adds all shifts to delete list, so they are deleted when save is clicked
  var clearSchedule = function() {
    updateShifts = [];
    deleteShifts = [];
    // add all shifts to delete list if they weren't already blank
    schedule = _.map(schedule, function(t, index, list) {
      if(t.isSpacer == true) {
        return {'isSpacer':true, 'index':-1};
      }
      else {
        if (t.mon.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.mon.val});
        }
        if (t.tue.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.tue.val});
        }
        if (t.wed.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.wed.val});
        }
        if (t.thu.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.thu.val});
        }
        if (t.fri.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.fri.val});
        }
        if (t.sat.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.sat.val});
        }
        if (t.sun.eid !== 0) {
          deleteShifts.push({'sid':t.sid, 'date':header.sun.val});
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
    notifyObservers();
  }

  // rewrite current schedule with last week's data
  var importWeek = function(mondayOfWeek) {
    var deferred = $q.defer();
    deleteShifts = [];
    updateShifts = [];
    // set monday back in time
    monday = mondayOfWeek;
    initSchedule().then(function(data) {
      // add all shifts to update shifts, so they can be saved for this week
      angular.copy(originalTemplate, updateShifts);
      notifyObservers();
      deferred.resolve(data);
    });
    return deferred.promise;
  }

  // Publish the schedule
  var publishSchedule = function() {
    var deferred = $q.defer();
    var obj = {'date':header.mon.val, 'eid': $rootScope.loggedInUser.id};
    $http({
      url: '/sequoiagrove/schedule/publish/',
      method: "POST",
      data: obj
    }).then(function(success) {
      isPublished = true;
      deferred.resolve(true);
    },function (failure) {
      deferred.reject(false);
    });
    return deferred.promise;
  }


  // if User has manage schedule privelages, extend functionality
  var setManagePrivelage = function() {
    //TODO set a boolean saying that this user has manage schedule privelage
    service.init = function() {
      var deferred = $q.defer();
      initMonday();
      initHeader();
      initSchedule().then(
          function(success) {
            countDays();
            countHours();
            return initHolidays();
          }).then(function(success) {
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
          $timeout(function() {
            initHeader(); // update schedule header to reflect new dates
            countDays(); // NOTE Added for those with manage schedule privelage
            countHours(); // NOTE Added for those with manage schedule privelage
            buildWeekList();
            notifyObservers();
            return initHolidays();
          });
        },function(failure) {
          deferred.reject(failure);
      }).then(function(success) {
        deferred.resolve(success);
      });
      return deferred.promise;
    },
    service.getWeekList    = function() { return weekList};
    service.deleteItem     = function(obj) { addToDeleteList(obj); };
    service.changeItem     = function(eid, sid, date) { trackScheduleChange(eid, sid, date); };
    service.clear          = function() { clearSchedule(); };
    service.publish        = function() { return publishSchedule(); };
    service.importWeek     = function(mon) { return importWeek(mon); };
    service.getDayCount    = function() { return dayCount; };
    service.getHourCount   = function() { return hourCount; };
    service.changesMade    = function() {
      return ((updateShifts.length + deleteShifts.length) > 0) || movedShifts;
    };
    service.setMovedShifts   = function() { movedShifts = true; notifyObservers() };
    service.saveSchedule = function() {
      var deferred = $q.defer();
      // Save Shift Indices
      saveShifts().then(function(success) {
        // Save Deleted cells
        return deleteSchedule();
      }).then(function(success) {
        // Save Updated cells
        return saveSchedule();
      }).then(function(success) {
        // get updated schedule back from database
        return initSchedule();
      }).then(function(success) {
        countDays();
        countHours();
        buildWeekList();
        addHolidays();
        notifyObservers();
        deferred.resolve(success);
      });
      return deferred.promise;
    };
  }

  // Exposed factory functionality
  var service = {
    // Initialize monday, set schedule header, get schedule template
    'init':function() {
      var deferred = $q.defer();
      initMonday();
      initHeader();
      initSchedule().then(function(success) {
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
         function(success){ // update schedule template function(success) {
          countDays(); // NOTE Added for those with manage schedule privelage
          countHours(); // NOTE Added for those with manage schedule privelage
          buildWeekList();
          notifyObservers();
          deferred.resolve(success);
      });
      return deferred.promise;
    },
    'getHeader':   function() { return header; },
    'getTemplate': function() { return schedule; },
    'isPublished': function() { return isPublished; },
    'extendEnd': function(extend) { 
      extendEnd = extend; 
      addHolidays();
    },
    'extendStart': function(extend) { 
      extendStart = extend; 
      addHolidays();
    },
    'setManagePrivelage': function() { setManagePrivelage(); }
  }

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

