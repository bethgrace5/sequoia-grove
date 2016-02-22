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
        Persona){
    $rootScope.loggedIn = false;
    $rootScope.userNotRegistered = false;
    $rootScope.userNotCurrent = false;
    $rootScope.loggedInUser = {};

    // User tried to go back to the login page when they were alredy logged in.
    // redirect back to home
    if ($rootScope.loggedIn) {
      $location.path( "/home" );
      $rootScope.loggingIn = false;
    }

    // User initialized login, send it to Mozilla Persona
    $scope.personaLogin = function () {
      $rootScope.userNotRegistered = false;
      $rootScope.userNotCurrent = false;
      Persona.request();
    }

    // When user has logged in, this will load required data based
    // on user access level, and then redirect to home.
    $scope.initializeData = function() {

      // first, build schedule header
      $scope.setScheduleHeader();

      // next, build schedule template
      $q.all( [$scope.getScheduleTemplate($scope.date.mon.val)]
      ).then(function(results) {

        // next, if the user is a manager, gather additional needed data
        if ($rootScope.loggedInUser.isManager) {
          $q.all([ $scope.getEmployees()]
          ).then(function(results) {
            $scope.getPositions();
          })
        }

        // Finally, redirect to home
        }).then(function(results) {
          $scope.loading = false;
          $log.debug('loading complete');

          // redirect to last path, or home if none
          if ($rootScope.lastPath === '/login' ||
              $rootScope.lastPath === undefined  ||
              $rootScope.lastPath === null) {
            $rootScope.lastPath = '/home';
          }
          $location.path( $rootScope.lastPath );
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
            // Otherwise, we found the user - save that user's data
            $rootScope.userNotRegistered = false;
            $rootScope.loggedInUser = data.user;
            $rootScope.loggedIn = true;
            $log.debug('logged in as', data.user.fullname, "(",data.user.email, ")");

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
