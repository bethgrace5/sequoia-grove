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
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/schedule', {
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleCtrl',
        controllerAs: 'schedule'
      })
      .when('/employee', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl',
        controllerAs: 'employee'
      })
      .when('/request', {
        templateUrl: 'views/request.html',
        controller: 'RequestCtrl',
        controllerAs: 'request'
      })
      .otherwise({
        redirectTo: '/'
      });

      /* Translations */
      $translateProvider
        .translations('en', {
          ABOUTUS: 'About',
          BUTTON_LANG_SP: 'Spanish',
          BUTTON_LANG_EN: 'English'
        })
        .translations('sp', {
          ABOUTUS: 'Acerca De',
          BUTTON_LANG_SP: 'Español',
          BUTTON_LANG_EN: 'Inglés'
        })
        .preferredLanguage('en');

      /* LocalStorage */
        localStorageServiceProvider
          .setPrefix('SequoiaGrove')
          .setStorageType('localStorage')
          .setNotify(true, true);
  });
