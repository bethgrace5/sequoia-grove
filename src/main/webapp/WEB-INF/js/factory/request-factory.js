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
    }).success(function (data, status, headers, config) {
      pendingRequests = data.requestStatus;
      requestsNum = pendingRequests.length;
      notifyObservers();
      deferred.resolve(data);
    });
    return deferred.promise;
  }


  // Exposed factory functionality
  var service = {
    'init': function() {
      return initPending();
    },
    'getNumberPending': function() {
      return requestsNum;
    },
    'getPending': function() {
      return pendingRequests;
    }
  }

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

