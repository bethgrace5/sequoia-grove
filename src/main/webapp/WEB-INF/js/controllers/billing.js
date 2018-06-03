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
          $scope.billingDetails = JSON.parse(data.data.billingDetails.substring(start, end));
        });
    }

    $scope.convertDate = function(unixSeconds) {
        return moment.unix(unixSeconds).format('MMM Do, YYYY');
    }

    $scope.convertDollars = function(str) {
      var total = str + '';

      var i=0;
      for (i; total.length < 4; i++) {
        total = '0' + total;
      }

      var first = total.substring(0, total.length - 2);
      var second = total.substring(total.length - 2, total.length);
      return first + "." + second;

      //console.log(str);
      //return (str + "").substring(0,(str + "").substring(0, (str + "")) + "." + (str + "").substring(2, 4);
    }

    $scope.getBillingDetails();

});
