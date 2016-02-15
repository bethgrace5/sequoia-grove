'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp')
    .factory('authTokenInterceptor', ['$log', function ($http, $log, $scope, $rootScope, $location) {
  var tokenInjector = {
    request: function(config) {
      config.headers['Authorization'] = 'setting auth in interceptor';
      return config;
    }
  }
  return tokenInjector
}]);

// add interceptor to $httpProvider
angular.module('sequoiaGroveApp').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authTokenInterceptor');
}]);
