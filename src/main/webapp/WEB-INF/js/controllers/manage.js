'use strict';
/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:ManageCtrl
 * @description
 * # ManageControler
 * Controller for managing store
 */


angular.module('sequoiaGroveApp')
.controller('ManageCtrl', function ($scope, $log, $rootScope, $http, $location) {

  /****************** Local Variables/Objects ***********************/
  $scope.saving = false;
  $scope.shiftSaved = false;
  $scope.shiftSaveError = false;
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

  $scope.deliveries = [];
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

  /****************** Check and Balances ****************************/
  $rootScope.lastPath = '/schedule';
  $rootScope.lastPath = '/request';
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
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
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
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.shiftInfo.sid = cur.sid;
    $scope.shiftInfo.pid = cur.pid;
    $scope.shiftInfo.tname = cur.tname;
    $scope.shiftInfo.weekdayStart = cur.weekdayStart;
    $scope.shiftInfo.weekdayEnd = cur.weekdayEnd;
    $scope.shiftInfo.weekendStart = cur.weekendStart;
    $scope.shiftInfo.weekendEnd = cur.weekendEnd;
    for (var i = 0; i < $scope.positions.length; i++) { 
      if ($scope.shiftInfo.pid === $scope.positions[i].id) {
        $scope.shiftInfo.location = $scope.positions[i].location;
        $scope.shiftInfo.position = $scope.positions[i].title;
        break;
      }
    }
  }

  $scope.shiftSelected = function() {
    return ($scope.shiftInfo.sid != -1);
  }

  $scope.shiftStatus = function(curSid) {
    var style = '';
    if(curSid === $scope.shiftInfo.sid) {
      style += 'schedule-edit-task-selected';
    }
    return style;
  }

  // Add new shift to schedule
  $scope.addShift = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;
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
      $scope.saving = false;
      if (status == 200) {
        $scope.shiftInfo.sid = data.sid;
        $scope.template.push(angular.copy($scope.shiftInfo));
        $scope.shiftSaved = true;
      }
    }).error(function (data, status, headers, config) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(status + " Error adding shift " + data);
    });
  }

  // Update current shift in schedule
  $scope.updateShift = function(schd) {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;
    var cur = -1;
    var schd = {};
    var newData = $scope.shiftInfo;
    for (var i = 0; i < $scope.template.length; i++) {
      if (newData.sid === $scope.template[i].sid) {
        cur = i;
        break;
      }
    }
    if (cur < 0) {
      $scope.saving = false;
      $log.error("Error updating shift: sid=" + newData.sid + " not found");
    }
    else {
      schd = $scope.template[cur];
      $http({
        url: '/sequoiagrove/shift/update/',
        method: "POST",
        data: $scope.shiftInfo
      }).success(function (data, status, headers, config) {
        $scope.saving = false;
        if (status == 200) {
          schd.pid = newData.pid;
          schd.location = newData.location;
          schd.tname = newData.tname;
          schd.weekdayStart = newData.weekdayStart;
          schd.weekdayEnd = newData.weekdayEnd;
          schd.weekendStart = newData.weekendStart;
          schd.weekendEnd = newData.weekendEnd;
          $scope.shiftSaved = true;
        }
      }).error(function (data, status, headers, config) {
        $scope.saving = false;
        $scope.shiftSaveError = true;
        $log.error(status + " Error updating shift " + data);
      });
    }
  }

  // Delete current shift from schedule
  $scope.deleteShift = function() {
    $scope.shiftSaved = false;
    $scope.shiftSaveError = false;
    $scope.saving = true;
    var curSid = $scope.shiftInfo.sid;
    $http({
      url: '/sequoiagrove/shift/delete/',
      method: "POST",
      data: $scope.shiftInfo
    }).success(function (data, status, headers, config) {
      $scope.saving = false;
      if (status == 200) {
        $scope.template = _.without($scope.template, _.findWhere($scope.template, {sid: curSid}));
        $scope.shiftSaved = true;
        $scope.shiftInfo.sid = -1;
      }
    }).error(function (data, status, headers, config) {
      $scope.saving = false;
      $scope.shiftSaveError = true;
      $log.error(status + " Error deleting shift " + data);
    });
  }

  // get all existing deliveries
  $scope.getdeliveries = function() {
    $http({
      url: '/sequoiagrove/delivery',
      method: "GET"
    }).success(function (data, status, headers, config) {
      if (status == 200) {
        // clear update shifts list
        $scope.deliveries = data.delivery; 
        $log.debug(data.delivery);
      }
    }).error(function (data, status, headers, config) {
      $log.error('Error getting deliveries ', status, data);
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
    $log.debug(success);
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

  $scope.getdeliveries();

});

