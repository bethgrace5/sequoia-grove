'use strict';

angular.module('sequoiaGroveApp', [
    'LocalStorageModule',
    'chart.js',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'persona'
  ])
  .config(function ($routeProvider, $translateProvider, localStorageServiceProvider, 
              $logProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/home'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
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
        redirectTo: '/home'
      });


      /* Translations */
      $translateProvider.useStaticFilesLoader({
          prefix: 'i18n/locale-',
          suffix: '.json'
      });

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
  run (function($rootScope, $http, $log, Persona) {
    var currentUser = 'bob@example.com';
    Persona.watch({
      //loggedInUser: currentUser,
      onlogin: function(assertion) {
        var data = { assertion: assertion };
        $http.post("/sequoiagrove/auth/login/", data).
          success(function(data, status){
            $log.debug(data.email);
          });
        $rootScope.loggedIn = true;
        console.log('logged in');
      },
      onlogout: function() {
        $rootScope.loggedIn = false;
          console.log('logged out');
        // Stuff
      }
    });

  });
