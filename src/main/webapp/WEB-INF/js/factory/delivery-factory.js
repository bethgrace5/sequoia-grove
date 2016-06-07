'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('deliveryFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];

  // call this to notify observers
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  function add(del) {
    var deferred = $q.defer();
    $http({ url: '/delivery/add',
      method: "POST",
      data: del
    }).then (function (success) {
      deferred.resolve(success);
    })
    return deferred.promise;
  }

  function remove(id) {
    var deferred = $q.defer();
    $http({ url: '/delivery/delete/'+ id,
      method: "DELETE"
    }). then (function (success) {
      deferred.resolve(success);
    }, function(failure) {
      $log.error('Error deleting deliveries ', failure);
    })
    return deferred.promise;
  }

  function update(del) {
    var deferred = $q.defer();

    delete(del.id).then(function(success) {
      return add(del);
    }).then(function(success) {
        deferred.resolve(success)
    });
    return deferred.promise;
  }

  var service = {
    'remove': function(id) { remove(id) },
    'update': function(del) { update(del) },
    'add': function(id) { add(del) }
  }

  return service
});

