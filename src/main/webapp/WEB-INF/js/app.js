'use strict';

angular.module('sequoiaGroveApp', [
    'LocalStorageModule',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'pascalprecht.translate',
    'persona',
    'ngMaterial',
    'ngMessages',
    'underscore'
  ])
  .config(function ($routeProvider, $translateProvider, localStorageServiceProvider,
              $logProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/login'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
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
      .when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'ManageCtrl',
        controllerAs: 'manage'
      })
      .otherwise({
        redirectTo: '/login'
      });


      /* Translations */
      $translateProvider.useStaticFilesLoader({
          prefix: 'i18n/locale-',
          suffix: '.json'
      });
      $translateProvider.useSanitizeValueStrategy('sanitize');

      // change language to browser's primary content language
      $translateProvider.determinePreferredLanguage( function() {
          var language = window.navigator.languages[0];
          if(language.substring(0,2) === "es") {
              return "es";
          }
          else {
              return "en";
          }
      });

      /* LocalStorage */
        localStorageServiceProvider
          .setPrefix('SequoiaGrove')
          .setStorageType('localStorage')
          .setNotify(true, true);

      /* Logging */
      $logProvider.debugEnabled(true);

      /* Increase application performance when false, default is true */
      $compileProvider.debugInfoEnabled(true);

  }).
  run (function($rootScope, $injector, $location, $log, localStorageService) {
    //localStorageService.set('auth_token', 'tok');
    //$log.debug(localStorageService.get('auth_token'));

    // Set Development Mode - loads app more quickly by reading schedule
    // template stored in localstorage instead of pulling a new one every time.
    $rootScope.devMode = true;


    // reset login error flags
    $rootScope.loggedIn = false;
    $rootScope.userNotRegistered = false;
    $rootScope.userNotCurrent = false;
    $rootScope.loginFailed = false;
    $rootScope.loggedInUser = {};

    $location.path( "/login" );
  });
