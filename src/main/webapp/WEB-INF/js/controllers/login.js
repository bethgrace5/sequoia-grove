'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp').controller('LoginCtrl', function(
  $window, $http, $location, $log, $rootScope, $scope, $timeout, scheduleFactory,
  userFactory, loginFactory, requestFactory, localStorageService, $q ){
  $scope.attemptedLogin = {};

  // User tried to go back to the login page when they were alredy logged in.
  // redirect back to home
  if (loginFactory.isLoggedIn()) {
    $location.path( "/home" );
  }
  $rootScope.loggingIn = false;
  $scope.initiate = false;

  // wait until gapi is defined, then add a signin/out listener
  $timeout(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(listenSignin)
  }, 900);

  // user signs in
  function onSignIn(googleUser) {
    $rootScope.loggingIn = true;
    var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (!signedIn && !$scope.initiate) {
      $rootScope.loggingIn = false;
      $rootScope.loggedIn = false;
      return;
    }
    $scope.initiate = true;
    loginFactory.signIn(googleUser, gapi).
      then(function(success) {
        // initialize data
        $scope.initializeData(success).then(
          function(s) {
            $scope.loading = false;
            $log.debug('loading complete');
            //$location.path('/login');
            if (localStorageService.get('lastPath') === null) {
              localStorageService.set('lastPath', '/home');
            };
            $timeout(function() {
              $rootScope.loggingIn = false;
              $rootScope.loggedIn = true;
              $location.path(localStorageService.get('lastPath'));
            });
          });
      },function(failure) {
        $scope.initiate = false;
        gapi.auth2.getAuthInstance().signOut();
        if (failure) {
          //gapi.auth2.getAuthInstance().disconnect();
          //$rootScope.failedLogin = true;
          var profile = googleUser.getBasicProfile();
          $scope.attemptedLogin = {
            'google_id':profile.getId(),
            'email': profile.getEmail(),
            'name': profile.getName(),
            'firstname': profile.getGivenName(),
            'lastname': profile.getFamilyName(),
            'profile_photo':profile.getImageUrl()
          };
        }
        $scope.errorMessage = failure.message;
        $rootScope.loggingIn = false;
        $rootScope.loggedIn = false;
      });
  }

  // catch user initiated signin or signout
  function listenSignin(signingIn) {
    $rootScope.loggingIn = true;
    if (signingIn) {
      if (!$scope.initiate) {
        $scope.initiate = true;
        var googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        onSignIn(googleUser);
      }
    }
    else {
      $rootScope.loggedIn = false;
      $rootScope.loggingIn = false;
      //var googleUser = gapi.auth2.getAuthInstance().currentUser.get();
    }
  };

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
      }, function(failure) {
      });
  }

  // user signs out someone else
  function switchUser() {
    loginFactory.switchUser(gapi).
      then(function(success) {
        $rootScope.lastPath = "";
        $scope.initiate = false;
        $scope.errorMessage = "";
        $scope.attemptedLogin = {};
        window.open('https://accounts.google.com/logout', '_blank');
        $window.location.reload();
        $scope.$apply();
      });
  }

  // when a failed login occurs, login as a different user
  function differentUser() {
    $rootScope.lastPath = "";
    $scope.initiate = false;
    $scope.errorMessage = "";
    $scope.attemptedLogin = {};
    window.open('https://accounts.google.com/logout', '_blank');
    $scope.$apply();
  };

  window.onSignIn = onSignIn;
  window.listenSignin = listenSignin;
  window.signOut = signOut;
  window.switchUser = switchUser;
  window.differentUser = differentUser;
  // When user has logged in, this will load required data based
  // on user access level, and then redirect to home.
  $scope.initializeData = function(user) {
    var isManager = user.isManager;
    var locations = user.locations;
    $rootScope.locations = user.locations;
    $rootScope.selectedLocation = user.locations[0];
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
      scheduleFactory.setManagePrivelage($rootScope.selectedLocation); // needs permission manage-schedule
      userFactory.setManagePrivelage(); //needs permission manage-employees
      requestFactory.setManagePrivelage(); //needs permission manage-employees
    }
    return scheduleFactory.init(locations, $rootScope.selectedLocation)
   .then(function(success) { // initialize schedule factory
      return userFactory.init(locations, $rootScope.selectedLocation);
    }).then(function(success) {
      return $scope.getPositions()
    }).then(function(success) {
      return $scope.getDeliveries(); // get deliveries
    }).then(function(success) {
      $rootScope.deliveries = success.deliveries;
      $rootScope.viewDeliveries = success.viewDeliveries;
      return requestFactory.init(loginFactory.getUser().id); // get deliveries
    })
  }

  // get all existing deliveries
  $scope.getDeliveries = function() {
    var deliveries = [];
    var viewDeliveries = [];
    var deferred = $q.defer();
    if($rootScope.locations.length <= 0) {
      deferred.resolve([],[]);
      return;
    }
    // initialize empty locations container and view style container
    // for each location
    $rootScope.locations.forEach (
      function(val, index, arr) {
        deliveries[val] = [];
        viewDeliveries[val] =
          {'mon':[],'tue':[],'wed':[],'thu':[],'fri':[],'sat':[],'sun':[]};
      }
    )
    // request deliveries and make the view list for each location
    $http({url: '/sequoiagrove/delivery/'+$rootScope.locations, method: 'GET' })
      .then(function(success) {
        if (success.status == 200) {
          deliveries = success.data.delivery;
          $rootScope.locations.forEach (
            function(val, index, arr) {
              _.map(deliveries[val],function(item){
                  if(item.mon) { viewDeliveries[val].mon.push(item.name); }
                  if(item.tue) { viewDeliveries[val].tue.push(item.name); }
                  if(item.wed) { viewDeliveries[val].wed.push(item.name); }
                  if(item.thu) { viewDeliveries[val].thu.push(item.name); }
                  if(item.fri) { viewDeliveries[val].fri.push(item.name); }
                  if(item.sat) { viewDeliveries[val].sat.push(item.name); }
                  if(item.sun) { viewDeliveries[val].sun.push(item.name); }
                });
              }
            )
        }
        deferred.resolve({'deliveries':deliveries, 'viewDeliveries':viewDeliveries});
      });
    return deferred.promise;
  }
});
