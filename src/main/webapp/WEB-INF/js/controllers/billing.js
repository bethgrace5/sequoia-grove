'use strict';

angular.module('sequoiaGroveApp')
  .controller('BillingCtrl', function ($http, $log, $scope, $rootScope, $location, $mdDialog, localStorageService, loginFactory) {

    localStorageService.set('lastPath', '/billing');

    if (loginFactory.isLoggedIn() === false) {
      $location.path('/login');
    }

    $scope.billingDetails = {"billingDetails":"details"}

    $scope.getBillingDetails = function() {
        $http({
          url: $rootScope.urlPrefix + '/billingDetails',
          method: "GET",
          data: {"locationId": "4"}
        }).then(function(data, status) {
          var start = data.data.billingDetails.indexOf('{');
          var end = data.data.billingDetails.length;
          console.log(start, end);
          $scope.billingDetails = JSON.parse(data.data.billingDetails.substring(start, end));
        });
    }

    $scope.getBillingDetails();

});
