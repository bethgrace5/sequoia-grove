'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('userFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];

  // Exposed to all users through service
  var loggedInUser = {};

  // Exposed to users with 'manage schedule' privelage through service
  var users = [];

  //call this when you know 'foo' has been changed
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  var initUsers = function() {
    var deferred = $q.defer();
    $rootScope.loadingMsg = "Getting user data...";
    var url = '/sequoiagrove/employees';
    // if it's in dev mode, and we already have
    // a template in localstorage, return.
    if($rootScope.devMode) {
      var temp = localStorageService.get('users');
        if (temp) {
          users = JSON.parse(temp);
          $log.debug('Warning: devMode on. This is not current schedule data');
          return $q(function(resolve, reject) {
            resolve();
          });
        }
      }
    $http({ 'url': url, 'method': 'GET', }).then(
        function(success) {
          if (success.status === 200) {
            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                users = success.data.employees;
            // Keep a copy of schedule retrieved to compare against changes later
            if ($rootScope.devMode) {
              localStorageService.set('users', JSON.stringify(success.data.users));
            }
            deferred.resolve(success.data);
            notifyObservers();
            })
          }
          deferred.reject();
        });
    return deferred.promise;
  }

  // if User has manage schedule privelages, extend functionality
  var setManagePrivelage = function() {
    //TODO set a boolean saying that this user has manage schedule privelage
    service.init = function() {
      var deferred = $q.defer();
      initUsers().then(
          function(success) {
            deferred.resolve(success);
          });
      return deferred.promise;
    }
    service.getUsers = function() { return users};
    // TODO include add availability, remove availabilty, add postion, remove position
    // update employee, deactivate employee, activate employee
  }

  // Exposed factory functionality
  var service = {
    'setLoggedInUser':    function(user) { loggedInUser = user; },
    'getLoggedInUser':    function() { return loggedInUser; },
    'setManagePrivelage': function() { setManagePrivelage(); }
  }

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

