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
        $sha,
        $timeout,
        scheduleFactory,
        userFactory,
        localStorageService){

    $scope.email = $rootScope.loggedInUser.email;
    $scope.password = '1234';
    $scope.remember = true;

    $scope.updateRemember = function() {
      if ($scope.remember) {
      }
      else {
        localStorageService.remove('email');
      }
    }

    // User tried to go back to the login page when they were alredy logged in.
    // redirect back to home
    if ($rootScope.loggedIn) {
      $location.path( "/home" );
      $rootScope.loggingIn = false;
    }

    // User initialized login
    $scope.appLogin = function() {
      // reset login error flags
      $rootScope.loggingIn = true;
      $rootScope.loggedIn = false;
      $rootScope.errorMessage = '';

      $http.post("/sequoiagrove/auth/login/", {'email':$scope.email, 'password':$sha.hash($scope.password)}).
        then(function(success){
          if (success.data.loginFailed) {
            $scope.errorMessage = success.data.message;
            $rootScope.loggedInUser = {'email':success.data.email, 'isManager':false};
            $rootScope.loggingIn = false;
            return;
          }
          // Otherwise, we found the user - save that user's data
          $rootScope.errorMessage = ''
          $rootScope.loggedInUser = success.data.user;
          $rootScope.loggedInUser.isManager = success.data.user.classification != 'employee';

          // if the user wants to save their email, put it in localstorage
          if ($scope.remember && success.data.user) {
            localStorageService.set('email', JSON.stringify(success.data.user.email));
          }
          // load all required data and redirect to home
          $scope.initializeData();
        });
    }

    // When user has logged in, this will load required data based
    // on user access level, and then redirect to home.
    $scope.initializeData = function() {
      // pull data from localstorage, if it's availabile
      if($rootScope.devMode) {
        if (localStorageService.get('template')){
          $rootScope.template = JSON.parse(localStorageService.get('template'));
        }
        if(localStorageService.get('employees')) {
          $rootScope.employees = JSON.parse(localStorageService.get('employees'));
        }
      }
      // TODO only set manage privelage if user has permission manage schedule
      scheduleFactory.setManagePrivelage();
      // TODO only set manage privelage if user has permission manage employees
      userFactory.setManagePrivelage();
      scheduleFactory.init().then(
          function(success) {
            $timeout(function() {
              return userFactory.init();
            })
          }).then(function(success) {
            // get positions
            return $scope.getPositions();
        }).then(function(success) {
            return $scope.getDeliveries();
        }).then(function(success) {
            // finally, redirect to last path, or home if none
            $scope.loading = false;
            $log.debug('loading complete');
            $rootScope.loggingIn = false;
            $rootScope.loggedIn = true;
            $rootScope.$broadcast('loggedIn');
            $location.path(localStorageService.get('lastPath'));
      });
    }

  // check if token and session is valid
  $scope.validateToken = function() {
    return $http({
      url: '/sequoiagrove/auth/loginwithtoken',
      method: "POST", data: {'auth_token':$rootScope.token}
    }).then(
        function(success) {
          $log.debug(success);
          $rootScope.hasValidToken = success.data.valid;

          if (success.data.valid) {
            $rootScope.token = success.data.token;
            $rootScope.errorMessage = '';
            $rootScope.loggedInUser = success.data.user;
            $rootScope.loggedInUser.isManager = success.data.user.classification != 'employee';
            $log.debug($rootScope.loggedInUser);

            // save user
            if ($scope.remember && success.data.user) {
              localStorageService.set('email', JSON.stringify(success.data.user.email));
            }
            // then call function to load all required data and redirect to home
            // this sets logged in after data has loaded.
            $scope.initializeData();
          }
        }, function(failure) {
          // reset data
          $scope.destructData();
      })
    }

    // When a user has logged out, this will clear variables to reset
    // the application to a clean state
    $scope.destructData = function() {
      // reset login error flags
      $rootScope.loggingIn = false;
      $rootScope.loggedIn = false;
      $rootScope.errorMessage = '';
      $rootScope.token = '';
      $rootScope.hasValidToken = false;
      $rootScope.loggedInUser= {'email':JSON.parse(localStorageService.get('email'))};

      // remove session
      return $http({ url: '/sequoiagrove/auth/logout', method: "POST" })
        .then( function(success) {
          $location.path('/login');
      });
    }

    // we found a token, check if it is valid
    if ($rootScope.token) {
      $rootScope.loggingIn = true;
      $scope.validateToken().then(
        function(success) { 
      });
    }

/************** Event Watchers **************/
    $rootScope.$on('login', function() {
      $scope.appLogin();
    });

    $rootScope.$on('logout', function() {
      $scope.destructData();
    });

  });
