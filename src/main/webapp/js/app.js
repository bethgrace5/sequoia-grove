'use strict';

angular.module('sequoiaGroveApp', [
    'LocalStorageModule', 'ngCookies', 'ngResource', 'ngRoute', 'ngAnimate',
    'ngSanitize', 'pascalprecht.translate', 'ngMaterial', 'ngMessages', 'underscore',
    'as.sortable'])
.config(function ($routeProvider, $translateProvider, localStorageServiceProvider,
    $logProvider, $compileProvider) {

  /* Routes */
  $routeProvider.when('/', {
    redirectTo: '/login'
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'home'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  }).when('/schedule', {
    templateUrl: 'views/schedule.html',
    controller: 'ScheduleCtrl',
    controllerAs: 'schedule'
  }).when('/employee', {
    templateUrl: 'views/employee.html',
    controller: 'EmployeeCtrl',
    controllerAs: 'employee'
  }).when('/request', {
    templateUrl: 'views/request.html',
    controller: 'RequestCtrl',
    controllerAs: 'request'
  }).when('/manage', {
    templateUrl: 'views/manage.html',
    controller: 'ManageCtrl',
    controllerAs: 'manage'
  }).otherwise({
  }).when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl',
    controllerAs: 'contact'
  }).when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl',
    controllerAs: 'signup'
  }).otherwise({
    redirectTo: '/login'
  });

  /* Translations */
  $translateProvider.useSanitizeValueStrategy('sanitize');
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

}).run (function( $q, $rootScope, $injector, $location, $log, $http, $timeout,
    localStorageService ) {

  // Set Development Mode - loads app more quickly by reading schedule
  // template stored in localstorage instead of pulling a new one every time.
  $rootScope.devMode = JSON.parse(localStorageService.get('devMode'));
  $rootScope.urlPrefix = "";

  $timeout(function() {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)){ return; }
      js = d.createElement(s); js.id = id;
      js.onload = function(){
        // remote script has loaded, add a signin listener
      };
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))
  }, 400).then(function() {
    $timeout(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(listenSignin)
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log('signed in true');
      }
      else {
        gapi.auth2.getAuthInstance().signIn();
        console.log('signed in false');
      }
    },500)
  });
});
