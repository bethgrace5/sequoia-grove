'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp').controller('LoginCtrl', function(
  $http, $location, $log, $rootScope, $scope, $timeout, scheduleFactory,
  userFactory, loginFactory, localStorageService, $q ){

  // User tried to go back to the login page when they were alredy logged in.
  // redirect back to home
  if ($scope.isLoggedIn) {
    $log.debug('is logged in');
    //$location.path( "/home" );
    $rootScope.loggingIn = false;
  }

  // user signs in
  function onSignIn(googleUser) {
    loginFactory.signIn(googleUser, gapi).
      then(function(success) {
        // initialize data
        $scope.initializeData(success);
      },function(failure) {
        $scope.errorMessage = failure.message;
        $log.debug(failure);
        $rootScope.loggingIn = false;
        $rootScope.loggedIn = false;
        gapi.auth2.getAuthInstance().signOut();
      });
  }

  // user signs out themselves,
  // reset the application to a clean state
  function signOut() {
    loginFactory.signOut(gapi).
      then(function(success) {
        // reset login error flags
        $rootScope.loggingIn = false;
        $rootScope.loggedIn = false;
        $rootScope.errorMessage = '';
        $rootScope.lastPath = "";
        $location.path('/login');
      });
  }

  // user signs out someone else
  function switchUser() {
    loginFactory.switchUser(gapi).
      then(function(success) {
        $rootScope.lastPath = "";
        $location.path('/login');
        window.open('https://accounts.google.com/logout', '_blank');
      });
  }
  window.onSignIn = onSignIn;
  window.signOut = signOut;
  window.switchUser = switchUser;
  // When user has logged in, this will load required data based
  // on user access level, and then redirect to home.
  $scope.initializeData = function(isManager) {
    // pull data from localstorage, if it's availabile
    if($rootScope.devMode) {
      if (localStorageService.get('template')){
        $scope.template = JSON.parse(localStorageService.get('template'));
      }
      if(localStorageService.get('employees')) {
        $rootScope.employees = JSON.parse(localStorageService.get('employees'));
      }
    }
    // TODO refine better scope than is or is not manager
    if (isManager) {
      scheduleFactory.setManagePrivelage(); // needs permission manage-schedule
      userFactory.setManagePrivelage(); //needs permission manage-employees
    }
    scheduleFactory.init(). // initialize schedule factory
      then(function(success) {
        var deferred = $q.defer();
        // initialise user factory
        userFactory.init().
          then(function(success) {
            $scope.getPositions().
              then(function(success) {
                deferred.resolve();
              });
          });
        return deferred.promise;
      }).then(function(success) {
        return $scope.getDeliveries(); // get deliveries
      }).then(function(success) {
        // finally, redirect to last path, or home if none
        $scope.loading = false;
        $log.debug('loading complete');
        $rootScope.loggingIn = false;
        $rootScope.loggedIn = true;
        $rootScope.$broadcast('loggedIn');
        //$location.path('/login');
        if (localStorageService.get('lastPath') === null) {
          localStorageService.set('lastPath', '/home');
        };
        $location.path(localStorageService.get('lastPath'));
    });
  }

  // make functions available to 'onclick' in window

  //var googleDiv = angular.element( document.querySelector( '#google-signin' ) );
  //$timeout(function() {
    //$scope.googleDiv = '<div class="g-signin2" ng-click="onSignIn(this.data-onsuccess)" data-onsuccess="onSignIn"></div>';  
    //$scope.$apply();
  //});

});
