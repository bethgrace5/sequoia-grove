'use strict';
/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:ManageCtrl
 * @description
 * # ManageControler
 * Controller for managing store holidays, shifts, deliveries, and restrictions
 */

angular.module('sequoiaGroveApp')
.controller('ManageCtrl', function ($scope, $log, $rootScope, $http, $location, localStorageService, scheduleFactory, $timeout) {
  var ctrl = this;

  /****************** Check and Balances ****************************/
  localStorageService.set('lastPath', '/manage');
  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }
  // The name of the active tab, by default, it will be the submit section
  $scope.activeTab = "shift";

  // function to set the class of the selected tab to active
  $scope.isActive = function(tabName) {
    if(tabName === $scope.activeTab) {
        return true;
    }
    return false;
  }

  /****************** Shift Edit ************************************/
  // variable declarations
  $scope.shiftForm = {};
  $scope.saving = false;
  $scope.shiftSaved = false;
  $scope.shiftSaveError = false;
  $scope.selectedShift = {
    "location": "",
    "pid": -1,
    "position": "",
    "sid": -1,
    "tname": "",
    "weekdayStart": "",
    "weekdayEnd": "",
    "weekendStart": "",
    "weekendEnd": ""
  }

  // shift was selected from list
  $scope.selectShift = function(shift) {
    $scope.shiftForm.form.$setPristine();
    $scope.resetShiftErrorFlags();
    $scope.saving = false;
    $scope.selectedShift = shift;
  }

  // flag indicating that an existing shift was selected
  $scope.shiftSelected = function() {
    return $scope.selectedShift.sid > 0;
  }

  // before updating, deleting, or adding a shift, reset error flags
  $scope.resetShiftErrorFlags = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
  }

  // after updating, deleting, or adding a shift, cleanup shift edit
  $scope.cleanupShiftEdit = function(clear) {
    $scope.selectedShift = {
      "location": "",
      "pid": -1,
      "position": "",
      "sid": -1,
      "tname": "",
      "weekdayStart": "",
      "weekdayEnd": "",
      "weekendStart": "",
      "weekendEnd": ""
    }
    //reset form validation
    $scope.shiftForm.form.$setSubmitted();
    $scope.shiftForm.form.$setPristine();
    $scope.shiftForm.form.tname.$setUntouched();
    $scope.shiftForm.form.position.$setUntouched();
    $scope.shiftForm.form.shiftWeekdayStart.$setUntouched();
    $scope.shiftForm.form.shiftWeekdayEnd.$setUntouched();
    $scope.shiftForm.form.shiftWeekendStart.$setUntouched();
    $scope.shiftForm.form.shiftWeekendEnd.$setUntouched();

    // just cleared the form, didn't save or update
    if (clear === false) {
    }
    else {
      // reset saving flags
      $scope.saving = false;
      $scope.shiftSaved = true;
      $scope.initPositionsSchedule();
      $scope.initAvailSchedule();
    }
  }

  // verify that all information was supplied before sending shift
  $scope.verifyShift = function() {
    // to add, at the very minumum, we need pid, taskName, 
    // weekdayStart hours and weekdayEnd hours
    //$log.debug($scope.selectedShift);
    //$log.debug($scope.shiftForm.form);

    //TODO if weekend is not set, set it to weekday times

    // validate the rest of the form
    if ($scope.shiftForm.form.$invalid) {
      $scope.shiftForm.form.tname.$setTouched();
      $scope.shiftForm.form.position.$setTouched();
      $scope.shiftForm.form.shiftWeekdayStart.$setTouched();
      $scope.shiftForm.form.shiftWeekdayEnd.$setTouched();
      $scope.shiftForm.form.shiftWeekendStart.$setTouched();
      $scope.shiftForm.form.shiftWeekendEnd.$setTouched();
      return false;
    }
    if ($scope.shiftForm.form.$dirty === false ) {
      $scope.shiftForm.form.$setSubmitted();
      $scope.shiftSaved = true;
      return false;
    }
    else {
      //$log.debug('form was dirty');
    }
    return true;
  }

  // Update selected shift
  $scope.updateShift = function() {
    $scope.resetShiftErrorFlags();
    if($scope.verifyShift() === false) {
      return;
    }
    $scope.saving = true;
    // TODO to update this shift we also need the shift id
    
    $http({ url: '/shift/update/',
      method: "POST",
      data: $scope.selectedShift
    }).then(function(success) {
      $scope.saving = false;
      if (success.status == 200) {
        $scope.cleanupShiftEdit();
      }
    }, function(failure) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(failure.status + " Error updating shift " + failure.data);
    });
  }

  // Add new shift to schedule
  $scope.addShift = function() {
    $scope.resetShiftErrorFlags();
    if($scope.verifyShift() === false) {
      return;
    }
    $scope.saving = true;

    $http({url: '/shift/add/',
      method: "POST",
      data: $scope.selectedShift
    }).then(function(success) {
      $scope.saving = false;
      if (success.status == 200) {
        $scope.selectedShift.sid = success.data.sid; // collect new shift id
        $scope.template.push(
          angular.copy($scope.selectedShift)); // add shift to the template
        $scope.cleanupShiftEdit();
      }
    }, function(failure) {
      $scope.shiftSaveError = true;
      $log.error(failure.status + " Error adding shift " + failure.data);
    }).then(function(done) {
      // finally, reinitialize schedule to show updates immediately
      scheduleFactory.init();
    });
  }

  // Delete selected shift from schedule
  $scope.deleteShift = function() {
    $scope.resetShiftErrorFlags();
    $scope.saving = true;
    $http({ url: '/shift/delete/',
      method: "POST",
      data: $scope.selectedShift
    }).then(function(success) {
      $scope.saving = false;
      if (success.status == 200) {
        $scope.template = _.without($scope.template, _.findWhere($scope.template, {sid: $scope.selectedShift.sid}));
        $scope.cleanupShiftEdit();
      }
    }, function(failure) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(failure.status + " Error deleting shift " + failure.data);
    });
  }

  /****************** Delivery Edit ************************************/
  // variable declarations
  $scope.newDelivery = {
      id: 0,
      name:"",
      mon: false,
      tue:false,
      wed:false,
      thu:false,
      fri:false,
      sat:false,
      sun:false
  };

  // delete delivery
  $scope.deleteDelivery = function(id,index) {
    $http({ url: '/delivery/delete/'+ id,
      method: "DELETE"
    }). then (function (success) {
      // remove fromj list
      $scope.deliveries.splice(index,1);
    }, function(failure) {
      $log.error('Error deleting deliveries ', failure);
    })
  }

  // add delivery
  $scope.addDelivery = function() {
    $http({ url: '/delivery/add',
      method: "POST",
      data: $scope.newDelivery
    }).then (function (success) {
      $scope.newDelivery.id = success.data.id; // add to list
      $scope.deliveries.push($scope.newDelivery);
      $scope.newDelivery = {
        id: 0,
        name:"",
        mon: false,
        tue:false,
        wed:false,
        thu:false,
        fri:false,
        sat:false,
        sun:false
      }
    }, function(failure) {
      $log.error('Error adding deliveries ', failure);
    })
  }


  /************** Holidays Functions **********************************/
  // variable declarations
  $scope.holidayDate = new Date();
  $scope.newHoliday = {
    'id':0,
    'title':'',
    'open':{},
    'storeOpenVal':'0000',
    'close':{},
    'storeCloseVal':'0000',
    'date':''
  };

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

  // extend shift scope for holiday store hours
  $scope.setExtend = function() {
    $scope.extendStart = parseInt($scope.extendStart);
    $scope.extendEnd = parseInt($scope.extendEnd);
    scheduleFactory.extendStart($scope.extendStart);
    scheduleFactory.extendEnd($scope.extendEnd);
  }

  //--------------------------
  //Holiday Major Functions
  //--------------------------
  $scope.addNewHoliday = function(){
    // change date into formatted string 'mm-dd-yyyy'
    $scope.newHoliday.date = moment($scope.holidayDate).format('MM-DD-YYYY');
    if ($scope.newHoliday.open.val) {
      $scope.newHoliday.storeOpenVal  = $scope.newHoliday.open.val;
      $scope.newHoliday.storeCloseVal = $scope.newHoliday.close.val;
    }

    $http({ url: '/holiday/add',
      method: "POST",
      data: $scope.newHoliday
    }).then(
      // request was successful
      function(success) {
        $scope.newHoliday =
          {'id':0,
            'title':'',
            'open':{},
            'storeOpenVal':null,
            'close':{},
            'storeCloseVal':null,
            'date':''};
        $scope.getAllHolidays();
      },
      // request failed
      function(failure) {
        $log.error('Error submiting new holiday ', failure.config.data);
    });
  }

  $scope.getAllHolidays = function() {
    $http({ url: '/holiday',
      method: "GET"
    }).then(
      // request was successful
      function(success) {
        $scope.allHolidays = success.data.holidays;
      },
      // request failed
      function(failure) {
        $log.error('Error getting all holidays', failure);
    });
  }

  $scope.deleteHoliday = function(id){
    $http({ url: '/holiday/remove/'+id,
      method: "POST"
    }).then(
      // request was successful
      function(success) {
        $scope.getAllHolidays();
      },
      // request failed
      function(failure) {
        $log.error('Error removing Holiday ', failure.config.url);
    });
  }

  $scope.init = function(){
    $scope.getAllHolidays();
  }

  $scope.init();
});

