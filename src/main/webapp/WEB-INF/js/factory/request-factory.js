'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('requestFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];
  var requestsNum = 0;
  var pendingRequests = [];

  // call this to notify observers
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  var initPending = function() {
    var deferred = $q.defer();
    $http({
      url: '/sequoiagrove/request/get/pending',
      method: "GET"
    }).then(function(success) {
      pendingRequests = success.data.requestStatus;
      requestsNum = pendingRequests.length;
      notifyObservers();
      deferred.resolve(success);
    });
    return deferred.promise;
  }


  var setManagePrivelage = function() {
    service.init = function() {
      notifyObservers();
      return initPending();
    };
    service.getNumberPending = function() {
      return requestsNum;
    };
    service.getPending = function() {
      return pendingRequests;
    };
    service.removeManagePrivelage = function() {
      service = removeManagePrivelage();
    }
  }

  var removeManagePrivelage = function() {
  // Exposed factory functionality
    return {
      'init': function() {
      },
      'getNumberPending': function() {
        return 0;
      },
      'getPending': function() {
        return [];
      },
      'setManagePrivelage': function() {
        setManagePrivelage();
      },
      'removeManagePrivelage': function() {
        // do nothing
      }
    }
  }

  var service = removeManagePrivelage();

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

