'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('LoginCtrl', function (
        $http,
        $location,
        $log,
        $rootScope,
        $scope,
        $q,
        localStorageService,
        Persona){

    // User tried to go back to the login page when they were alredy logged in.
    // redirect back to home
    if ($rootScope.loggedIn) {
      $location.path( "/home" );
      $rootScope.loggingIn = false;
    }

    // User initialized login, send it to Mozilla Persona
    $scope.personaLogin = function () {
      Persona.request();
    }

    // When user has logged in, this will load required data based
    // on user access level, and then redirect to home.
    $scope.initializeData = function() {
      var gotTemplate = false;

      // build schedule header
      $scope.setScheduleHeader();
      $scope.getdeliveries();

      if($rootScope.devMode) {
        if (localStorageService.get('template')){
          $rootScope.template = JSON.parse(localStorageService.get('template'));
        }
        if(localStorageService.get('employees')) {
          $rootScope.employees = JSON.parse(localStorageService.get('employees'));
        }
      }

      // get Schedule Template
      $scope.getScheduleTemplate($scope.date.mon.val)
        .then(function(success) {
          // get all employees
          return $scope.getEmployees();
        }).then(function(success) {
          // get positions
          return $scope.getPositions();
        }).then(function(success) {
          // finally, redirect to last path, or home if none
          $scope.loading = false;
          $log.debug('loading complete');
          $location.path(localStorageService.get('lastPath'));
      });
    }

    // When a user has logged out, this will clear variables to reset
    // the application to a clean state
    $scope.destructData = function() {
      Persona.logout();
      //FIXME for now, just cheat it and reload the page,
      // eventually, reset root and main scope variables.
      location.reload();
    }


/************** Event Watchers **************/

    // When Persona is used to login or logout, it catches the login/logout as needed
    Persona.watch({
      // User attempted to log in
      onlogin: function(assertion) {
        $rootScope.loggingIn = true;
        var data = { assertion: assertion };
        $http.post("/sequoiagrove/auth/login/", data).
          success(function(data, status){
            // The user with the supplied email was verified by Mozilla Persona,
            // but was not found in the database.
            // Issue warning message, don't redirect to home
            if (data.userNotRegistered) {
              $rootScope.userNotRegistered = true;
              $log.debug(data.email, 'not registered with this application');
              $rootScope.loggedInUser = {'email':data.email, 'isManager':false};
              $rootScope.loggingIn = false;
              return;
            }
            // The user has been unemployed from the company
            if (data.userNotCurrent) {
              $rootScope.userNotCurrent = true;
              $log.debug(data.email, 'is not a current employee');
              $rootScope.loggedInUser = {'email':data.email, 'isManager':false};
              $rootScope.loggingIn = false;
              return;
            }
            // the login failed - maybe the domain was incorrect
            if (data.loginFailed) {
              $rootScope.loginFailed = true;
              $log.debug('sign in failed');
              $rootScope.loggedInUser = {'email':data.email, 'isManager':false};
              $rootScope.loggingIn = false;
              return;
            }
            // Otherwise, we found the user - save that user's data
            $rootScope.userNotRegistered = false;
            $rootScope.loggedInUser = data.user;
            $rootScope.loggedIn = true;
            $log.debug('logged in as', data.user.fullname, "(",data.user.email, ")");
            localStorageService.set('auth_token', data.auth_token);

            // then call function to load all required data and redirect to home
            $scope.initializeData();
          });
      },
      onlogout: function() {
        $rootScope.loggedIn = false;
        $rootScope.loggingIn = false;
        $rootScope.loggedInUser = {};
        $rootScope.$apply();
        $location.path( "/login" );
        // Stuff
      }
    });

    $rootScope.$on('login', function() {
      $scope.personaLogin();
    });

    $rootScope.$on('logout', function() {
      $scope.destructData();
    });

  });
