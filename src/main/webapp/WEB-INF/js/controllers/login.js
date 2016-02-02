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
        Persona){
    $rootScope.loggedIn = false;
    $rootScope.userNotRegistered = false;
    $rootScope.loggedInUser = {};
    var currentUser = '';

    $scope.personaLogout = function() {
      $rootScope.loggedIn = false;
      $rootScope.loggingIn = false;
      $rootScope.loggedInUser = {};
      Persona.logout();
      $location.path( "/login" );
    }
    $scope.personaLogin = function () {
      Persona.request();
    }

    Persona.watch({
      onlogin: function(assertion) {
        $rootScope.loggingIn = true;
        var data = { assertion: assertion };
        $http.post("/sequoiagrove/auth/login/", data).
          success(function(data, status){
            if (data.UserNotRegistered) {
              $rootScope.userNotRegistered = true;
              $log.debug(data.email, 'not registered with this application');
              $rootScope.loggedInUser = {email:data.email};
              $rootScope.loggingIn = false;
              $rootScope.$broadcast('logged in');
              return;
            }
            $rootScope.userNotRegistered = false;
            //$log.debug(data);
            $rootScope.loggedInUser = data.user;
            $rootScope.loggedIn = true;
            $log.debug('logged in as', data.user.fullname, "(",data.user.email, ")");

            $rootScope.$broadcast('logged in');
            if ($rootScope.lastPath === '/login') {
              $rootScope.lastPath = '/home';
            }
            $location.path( $rootScope.lastPath );
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

    if ($rootScope.loggedIn) {
      $rootScope.$broadcast('logged in');
      $location.path( "/home" );
      $rootScope.loggingIn = false;
    }

    $rootScope.$on('login', function() {
      $scope.personaLogin();
    });

    $rootScope.$on('logout', function() {
      $scope.personaLogout();
    });

  });
