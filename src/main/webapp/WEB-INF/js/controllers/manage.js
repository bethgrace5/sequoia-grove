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

  /****************** Check and Balances ****************************/
  $rootScope.lastPath = '/schedule';
  $rootScope.lastPath = '/request';
  // user is not logged in
  if ($rootScope.loggedIn == false) {
    $location.path('/login');
  }

  $scope.deliveries = [];

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

  $scope.getdeliveries();

});

