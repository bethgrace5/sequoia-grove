'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('authTokenInterceptor', function ($log, localStorageService) {

  var tokenInjector = {
    request: function(config) {
      // put the token from local storage
      config.headers['Authorization'] = localStorageService.get('auth_token');
      return config;
    }
  }
  return tokenInjector
});

// add interceptor to $httpProvider
angular.module('sequoiaGroveApp').config(function($httpProvider) {
  $httpProvider.interceptors.push('authTokenInterceptor');
});
