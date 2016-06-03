'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for viewing the schedule
 */
angular.module('sequoiaGroveApp')
  .controller('HomeCtrl', function (
    $http,
    $log,
    $scope,
    $location,
    $rootScope,
    $translate,
    loginFactory,
    localStorageService)
  {

/************** Login Redirect, Containers and UI settings **************/
  localStorageService.set('lastPath', '/home');

  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.highlight = true;
  $scope.type = 'all';

/************** Pure Functions **************/

  // Change filter type to show - can be 'all', 'mine', a location or a position
  $scope.changeType = function(t) {
    $scope.type = t;
  }

  // Toggle Highlight of Current Logged in user
  $scope.selectLoggedInUser = function() {
    $scope.highlight = !$scope.highlight;
  }

  // FIXME its broke
  $scope.filterByType = function (loc, pos, t) {
    var uid = loginFactory.getUser().id;
      if ($scope.type == 'all') {
          return true;
      }
      else if ($scope.type==loc || $scope.type==pos) {
          return true;
      }
      else if ($scope.type=='mine') {
        if (t === undefined) {
          return true;
        }
        if (t.mon === undefined ||
            t.tue === undefined ||
            t.wed === undefined ||
            t.thu === undefined ||
            t.fri === undefined ||
            t.sat === undefined ||
            t.sun === undefined) {
          return true;
        }

        if (t.mon.eid === uid || t.tue.eid === uid || t.wed.eidt === uid || 
          t.thu.eid === uid || t.fri.eid === uid || t.sat.eid === uid || t.sun.eid === uid) {
              return true;
          }
          else {
              return false;
          }
      }

      return false;
  }

/************** Controller Initialization **************/
  $scope.init = function() {
  }

  $scope.init();
});
