'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('authTokenInterceptor',
  function ( $log, localStorageService, $q) {
    //var canRecover = false;
    //var responseOrNewPromise = false;

    var tokenInjector = {
      'request': function(config) {
        // put the token from local storage into the request
        var token = localStorageService.get('auth_token');
        if (token) {
          config.headers['Authorization'] = token;
        }
        return config;
      },
      // optional method
     'requestError': function(rejection) {
        // do something on error
        //if (canRecover(rejection)) {
          //return responseOrNewPromise
        //}
        return $q.reject(rejection);
      },
      'response': function(response) {
        if(response.data.auth_token != undefined) {
          localStorageService.set('auth_token', response.data.auth_token);
        }
        return response;
      },
      // optional method
     'responseError': function(rejection) {
        // do something on error
        //if (canRecover(rejection)) {
          //return responseOrNewPromise
        //}
        return $q.reject(rejection);
      }
    }
  return tokenInjector
});

// add interceptor to $httpProvider
angular.module('sequoiaGroveApp').config(function($httpProvider) {
  $httpProvider.interceptors.push('authTokenInterceptor');
});


/*
$httpProvider.responseInterceptors.push([ '$rootScope', '$q', '$injector','$location',
    function ($rootScope, $q, $injector, $location) {
      return function(promise) {
        // no action, was successful
        return promise.then(function(response) {
          return response;
        },
        // error - was it 401 or something else?
        function (response) {
          if (response.status===401 && response.data.error && response.data.error === "invalid_token") {
            // defer until we can re-request a new token
            var deferred = $q.defer();
            // Get a new token... (cannot inject $http directly as will cause a circular ref)
            $injector.get("$http").jsonp('/some/endpoint/that/reissues/tokens?cb=JSON_CALLBACK').then(function(loginResponse) {
              if (loginResponse.data) {
                $rootScope.oauth = loginResponse.data.oauth;
                // we have a new oauth token - set at $rootScope
                // now let's retry the original request - transformRequest in .run() below will add the new OAuth token
                $injector.get("$http")(response.config).then(function(response) {
                  // we have a successful response - resolve it using deferred
                  deferred.resolve(response);
                },
                function(response) {
                  // something went wrong
                  deferred.reject();
                });
              }
              else {
                // login.json didn't give us data
                deferred.reject();
              }
            },
            function(response) {
              deferred.reject();
              // token retry failed, redirect so user can login again
              $location.path('/user/sign/in');
              return;
            });
            // return the deferred promise
            return deferred.promise;
          }
          // not a recoverable error
          return $q.reject(response);
        });
      };
    }]);

    */



