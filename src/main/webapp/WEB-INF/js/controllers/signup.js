'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for viewing the schedule
 */
angular.module('sequoiaGroveApp')
  .controller('SignupCtrl', function ( $q, $http, $log, $scope, $location, $rootScope,
    $translate, loginFactory, localStorageService){

  $scope.locationTitle = '';

  $scope.info = { 'business': '', 'email': '', 'firstname': '', 'lastname': '', 'locations':[] };

  $scope.addLocation = function() {
    $scope.info.locations.push($scope.locationTitle);
    $scope.locationTitle = '';
  }
  $scope.removeLocation = function(index) {
    $scope.info.locations.splice(index, 1);
  }

  $scope.addAccount = function() {
    console.log($scope.info);
    var deferred = $q.defer();
    $http({
      url: '/sequoiagrove/signup',
      data: $scope.info,
      method: 'POST' })
      .then(function(success) {
        console.log(success);
        deferred.resolve(success);
      });
    return deferred.promise;
  }


});
