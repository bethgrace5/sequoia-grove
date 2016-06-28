'use strict';

angular.module('sequoiaGroveApp').controller('ContactCtrl', function (
      $scope, $log, $rootScope, $http, $location, localStorageService,
      scheduleFactory, $timeout, loginFactory) {

  localStorageService.set('lastPath', '/contact');
  $scope.reasons = ['Suggestion', 'Question', 'Problem', 'Other'];
  $scope.contactData = {'reason':'Reason', 'text':'', 'name':'', 'email':'', 'company':''}

  // user is not logged in
  if (loginFactory.isLoggedIn() === false) {
    //$location.path('/login');
  }
  else {
    $scope.contactData.name = loginFactory.getUser().name;
    $scope.contactData.email = loginFactory.getUser().email;
  }

  $scope.send = function() {
    $log.debug('would send contact form');
    //TODO send form with navigator info as well
  }


});

