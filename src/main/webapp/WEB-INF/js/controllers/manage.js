'use strict';
/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:ManageCtrl
 * @description
 * # ManageControler
 * Controller for managing store
 */


angular.module('sequoiaGroveApp')
.controller('ManageCtrl', function ($scope, $log, $rootScope, $http, $location, localStorageService, scheduleFactory) {

  /****************** Local Variables/Objects ***********************/
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

  $scope.setExtend = function() {
    $scope.extendStart = parseInt($scope.extendStart);
    $scope.extendEnd = parseInt($scope.extendEnd);
    scheduleFactory.extendStart($scope.extendStart);
    scheduleFactory.extendEnd($scope.extendEnd);
  }

  /****************** Check and Balances ****************************/
  localStorageService.set('lastPath', '/manage');
  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  // The name of the active tab, by default, it will be the submit section
  $scope.activeTab = "holiday";

  // function to set the class of the tab to active,
  // and
  $scope.isActive = function(tabName) {
    if(tabName === $scope.activeTab) {
        return true;
    }
    return false;
  }

  $scope.flagOff = function(value) {
    if ($scope[value] === true) {
      $scope[value] = false;
    }
  }

  /****************** Shift Edit ************************************/
  $scope.clearShiftSelect = function() {
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
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
  }

  $scope.selectShift = function(shift) {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.selectedShift = shift;
    $log.debug(shift);
  }

  $scope.shiftSelected = function() {
    return $scope.selectShift.id != 0;
  }

  // Add new shift to schedule
  $scope.addShift = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;

    _.map($scope.positions, function(item, index) {
      if (item.id == $scope.selectedShift.pid) {
        $scope.selectedShift.location = item.location;
      }
    });

    $http({url: '/sequoiagrove/shift/add/',
      method: "POST",
      data: $scope.selectedShift
    }).success(function (data, status, headers, config) {
      $scope.saving = false;
      if (status == 200) {
        $scope.selectedShift.sid = data.sid;
        $scope.template.push(angular.copy($scope.selectedShift));
        $scope.shiftSaved = true;
        $scope.initPositionsSchedule();
        $scope.initAvailSchedule();
      }
    }).error(function (data, status, headers, config) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(status + " Error adding shift " + data);
    }).then(function(success) {
      scheduleFactory.init();
    });
  }

  // Update current shift in schedule
  $scope.updateShift = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;
    $log.debug($scope.selectedShift);

      $http({ url: '/sequoiagrove/shift/update/',
        method: "POST",
        data: $scope.selectedShift
      }).success(function (data, status, headers, config) {
        $scope.saving = false;
        if (status == 200) {
          $scope.clearShiftSelect();
          $scope.shiftSaved = true;
          $scope.initPositionsSchedule();
          $scope.initAvailSchedule();
        }
      }).error(function (data, status, headers, config) {
        $scope.saving = false;
        $scope.shiftSaveError = true;
        $log.error(status + " Error updating shift " + data);
      });
  }

  // Delete current shift from schedule
  $scope.deleteShift = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;
    $http({
      url: '/sequoiagrove/shift/delete/',
      method: "POST",
      data: $scope.selectedShift
    }).success(function (data, status, headers, config) {
      $scope.saving = false;
      if (status == 200) {
        $scope.template = _.without($scope.template, _.findWhere($scope.template, {sid: $scope.selectedShift.sid}));
        $scope.shiftSaved = true;
        $scope.selectedShift.sid = -1;
      }
    }).error(function (data, status, headers, config) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(status + " Error deleting shift " + data);
    });
  }



  // deleting deliveries
  $scope.deleteDelivery = function(id,index) {
      $http({
url: '/sequoiagrove/delivery/delete/'+ id,
method: "DELETE"
}). then (function (success) {
    // remove fromj list
    $scope.deliveries.splice(index,1);
    }, function(failure) {
      $log.error('Error deleting deliveries ', failure);

    })

}

// add deliveries
$scope.addDelivery = function() {
    $http({
        url: '/sequoiagrove/delivery/add',
        method: "POST",
        data: $scope.newDelivery
    }).then (function (success) {
    // add to list
        $scope.newDelivery.id = success.data.id;
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
  $scope.holidayDate = new Date();
  $scope.newHoliday =
    {'id':0,
      'title':'',
      'open':{},
      'storeOpenVal':'0000',
      'close':{},
      'storeCloseVal':'0000',
      'date':''};

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
    // change date into formatted string 'mm-dd-yyyy'
    $scope.newHoliday.date = moment($scope.holidayDate).format('MM-DD-YYYY');
    if ($scope.newHoliday.open.val) {
      $scope.newHoliday.storeOpenVal  = $scope.newHoliday.open.val;
      $scope.newHoliday.storeCloseVal = $scope.newHoliday.close.val;
    }

    $http({ url: '/sequoiagrove/holiday/add',
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
    $http({ url: '/sequoiagrove/holiday',
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
    $http({ url: '/sequoiagrove/holiday/remove/'+id,
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

