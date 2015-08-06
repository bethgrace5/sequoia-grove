'use strict';

/**
 * @ngdoc overview
 * @name sequoiaGroveApp
 * @description
 * # sequoiaGroveApp
 *
 * Main module of the application.
 */
angular
  .module('sequoiaGroveApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, $translateProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
          //templateUrl: 'views/login.html',
          controller: 'carsCtrl',
          controllerAs: 'cars'
      })
      .otherwise({
          controller: 'carsCtrl',
          controllerAs: 'cars'
      });

      /* LocalStorage */
        localStorageServiceProvider
          .setPrefix('SequoiaGrove')
          .setStorageType('localStorage')
          .setNotify(true, true);
  });

