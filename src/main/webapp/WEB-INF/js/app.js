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
        redirectTo: '/login'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
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
        redirectTo: '/login'
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
  run (function($rootScope, $http, $log, $location, Persona) {
    $rootScope.loggedIn = false;
    $rootScope.loggingIn = true;
    $rootScope.userNotRegistered = false;
    $rootScope.loggedInUser = {};
    var currentUser = '';

    $rootScope.login = function () {
      Persona.request();
    }
    $rootScope.logout = function () {
      Persona.logout();
      $location.path( "/login" );
    }

    Persona.watch({
      onlogin: function(assertion) {
        $rootScope.loggingIn = true;
        var data = { assertion: assertion };
        $http.post("/sequoiagrove/auth/login/", data).
          success(function(data, status){
            $rootScope.loggingIn = false;
            if (data.UserNotRegistered) {
              $rootScope.userNotRegistered = true;
              $log.debug(data.email, 'not registered with this application');
              $rootScope.loggedInUser = {email:data.email};
              return;
            }
            $rootScope.userNotRegistered = false;
            //$log.debug(data);
            $rootScope.loggedInUser = data.user;
            $rootScope.loggedIn = true;
            $log.debug('logged in as', data.user.fullname, "(",data.user.email, ")");
            $location.path( "/home" );
          });
      },
      onlogout: function() {
        $rootScope.loggedIn = false;
        $rootScope.loggedInUser = {};
        $rootScope.$apply();
        $location.path( "/login" );
        // Stuff
      }
    });

  });
