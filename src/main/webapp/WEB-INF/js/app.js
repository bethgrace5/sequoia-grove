'use strict';

angular.module('sequoiaGroveApp', [
    'LocalStorageModule', 'ngCookies', 'ngResource', 'ngRoute', 'ngAnimate',
    'ngSanitize', 'pascalprecht.translate', 'ngMaterial', 'underscore',
    'as.sortable'])
.config(function ($routeProvider, $locationProvider, $translateProvider, localStorageServiceProvider,
    $logProvider, $compileProvider) {

  $locationProvider.hashPrefix('');

var translationsEN = {
  "LOGIN_EMPLOYEE_SCHEDULING": "Employee Scheduling",
  "LOGIN_FAILED_FOR": "Sign in failed for",
  "LOGIN_ASK_ADMIN_TO_VERIFY_EMAIL": "If your company has an account, ask an administrator to verify your email",
  "LOGIN_NOT_CURRENT": "If you are a current employee, ask an administrator to verify your email.",
  "LOGIN_BLANK_EMAIL": "Blank email please supply an email to continue.",
  "LOGIN_INVALID_ID_TOKEN": "Invalid id token",
  "LOGIN_NEED_AN_ACCOUNT": "Need an account?",
  "SIGNUP_COMING_SOON": "Business account signup coming soon",
  "SIGNUP_LEARN_MORE": "Interested in learning more?",
  "HEADER_TAB_HELLO": "Hello",
  "HEADER_SIGNED_IN_AS": "Signed in as",
  "HEADER_SIGN_OUT": "Sign out",
  "HEADER_TAB_HOME": "Home",
  "HEADER_TAB_REQUESTS": "Requests",
  "HEADER_TAB_SCHEDULING": "Scheduling",
  "HEADER_TAB_EMPLOYEES": "Employees",
  "HEADER_NOT": "Not",
  "REQUEST_TAB_PENDING": "Pending",
  "REQUEST_TAB_HISTORY": "History",
  "REQUEST_TAB_MY_REQUESTS": "My Requests",
  "REQUEST_SUBMIT_NEW_REQUEST": "Submit New Request",
  "REQUEST_STARTING_DATE": "Starting Date",
  "REQUEST_ENDING_DATE": "Ending Date",
  "REQUEST_NONE_EXIST_YET": "You have not submitted any requests yet.",
  "SUBMIT": "Submit",
  "HEADER_TAB_MANAGE": "Manage Store",
  "EMPLOYEE_TAB_INFO": "Info",
  "EMPLOYEE_TAB_AVAILIBILITY": "Availibility",
  "SCHEDULE_TAB_SCHEDULE": "Schedule",
  "SCHEDULE_TAB_HISTORY": "History",
  "SCHEDULE_TAB_DELIVERIES": "Deliveries",
  "SCHEDULE_TAB_SHIFTS": "Shifts",
  "SCHEDULE_VIEW_MONDAY": "Monday",
  "SCHEDULE_VIEW_TUESDAY": "Tuesday",
  "SCHEDULE_VIEW_WEDNESDAY": "Wednesday",
  "SCHEDULE_VIEW_THURSDAY": "Thursday",
  "SCHEDULE_VIEW_FRIDAY": "Friday",
  "SCHEDULE_VIEW_SATURDAY": "Saturday",
  "SCHEDULE_VIEW_SUNDAY": "Sunday",
  "SCHEDULE_VIEW_HIGHLIGHTER": "highlighter",
  "SCHEDULE_VIEW_OFF": "off",
  "SCHEDULE_VIEW_WEEK_OF": "Week of",
  "SCHEDULE_VIEW_WEEKLY_STAFF_SCHEDULE": "Weekly Staff Schedule",
  "SCHEDULE_VIEW_PRINT": "print",
  "SCHEDULE_VIEW_ALL": "All",
  "SCHEDULE_VIEW_MINE": "Mine",
  "SCHEDULE_VIEW_POSITIONS": "Positions",
  "SCHEDULE_VIEW_SHOW_DELIVERIES": "show deliveries",
  "SCHEDULE_VIEW_HIDE_DELIVERIES": "hide deliveries",
  "FOOTER_TRANSLATE": "Translate",
  "UPSIDE_DOWN_QUESTION_MARK": "",
  "Jan": "Jan",
  "Feb": "Feb",
  "Mar": "Mar",
  "Apr": "Apr",
  "May": "May",
  "Jun": "Jun",
  "Jul": "Jul",
  "Aug": "Aug",
  "Sep": "Sep",
  "Oct": "Oct",
  "Nov": "nov",
  "Dec": "Dec"
}

var translationsES = {
  "LOGIN_EMPLOYEE_SCHEDULING": "Programacion de los Empleados",
  "LOGIN_FAILED_FOR": "Sesion Fallido de",
  "LOGIN_ASK_ADMIN_TO_VERIFY_EMAIL": "Si su empresa tiene una cuenta , pida a un administrador para comprobar su correo electronico",
  "LOGIN_NOT_CURRENT": "Si usted es un empleado actual , pedir a un administrador para verificar su correo electronico",
  "LOGIN_BLANK_EMAIL": "Correo electrnico en blanco indica a continuacin un correo electrónico para continuar.",
  "LOGIN_INVALID_ID_TOKEN": "token de ID no valido",
  "LOGIN_NEED_AN_ACCOUNT": "necesito una cuenta?",
  "SIGNUP_COMING_SOON": "Negocio de registro de cuenta en breve",
  "SIGNUP_LEARN_MORE": "Intersted en aprender mas ?",
  "HEADER_TAB_HELLO": "Hola",
  "HEADER_SIGNED_IN_AS": "Acceso como",
  "HEADER_SIGN_OUT": "Desconectar",
  "HEADER_TAB_HOME": "Pagina de Inicio",
  "HEADER_TAB_REQUESTS": "Pedidos",
  "HEADER_TAB_SCHEDULING": "Programacion",
  "HEADER_TAB_EMPLOYEES": "Empleados",
  "HEADER_NOT": "No Eres",
  "REQUEST_TAB_PENDING": "Pendiente",
  "REQUEST_TAB_HISTORY": "Historia",
  "REQUEST_TAB_MY_REQUESTS": "Mis Pedidos",
  "REQUEST_SUBMIT_NEW_REQUEST": "Presentar Solicitud de Dia Libre",
  "REQUEST_STARTING_DATE": "Fecha de Inicio",
  "REQUEST_ENDING_DATE": "Fecha de Fin",
  "REQUEST_NONE_EXIST_YET": "No ha presentado ninguna solicitud todavia.",
  "SUBMIT": "Entregar",
  "HEADER_TAB_MANAGE": "Manejar Tienda",
  "EMPLOYEE_TAB_INFO": "Info",
  "EMPLOYEE_TAB_AVAILIBILITY": "Disponibilidad",
  "SCHEDULE_TAB_SCHEDULE": "Horario",
  "SCHEDULE_TAB_HISTORY": "Historia",
  "SCHEDULE_TAB_DELIVERIES": "Entregas",
  "SCHEDULE_TAB_SHIFTS": "Turno de",
  "SCHEDULE_VIEW_MONDAY": "lunes",
  "SCHEDULE_VIEW_TUESDAY": "martes",
  "SCHEDULE_VIEW_WEDNESDAY": "miercoles",
  "SCHEDULE_VIEW_THURSDAY": "jueves",
  "SCHEDULE_VIEW_FRIDAY": "viernes",
  "SCHEDULE_VIEW_SATURDAY": "sabado",
  "SCHEDULE_VIEW_SUNDAY": "domingo",
  "SCHEDULE_VIEW_HIGHLIGHTER": "rotulador",
  "SCHEDULE_VIEW_OFF": "apagado",
  "SCHEDULE_VIEW_WEEK_OF": "Semana de",
  "SCHEDULE_VIEW_WEEKLY_STAFF_SCHEDULE": "Horario Semanal del Personal",
  "SCHEDULE_VIEW_PRINT": "estampar",
  "SCHEDULE_VIEW_ALL": "Todas",
  "SCHEDULE_VIEW_MINE": "Mio",
  "SCHEDULE_VIEW_POSITIONS": "Puestos de Trabajo",
  "SCHEDULE_VIEW_SHOW_DELIVERIES": "revelar las entregas",
  "SCHEDULE_VIEW_HIDE_DELIVERIES": "entregas ocultar",
  "FOOTER_TRANSLATE": "Traducir",
  "UPSIDE_DOWN_QUESTION_MARK": "",
  "Jan": "enero",
  "Feb": "feb",
  "Mar": "marzo",
  "Apr": "abr",
  "May": "mayo",
  "Jun": "jun",
  "Jul": "jul",
  "Aug": "agosto",
  "Sep": "set",
  "Oct": "oct",
  "Nov": "nov",
  "Dec": "dic"
}

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
  //$translateProvider.useStaticFilesLoader({
      //prefix: 'i18n/locale-',
      //suffix: '.json'
  //});

  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('es', translationsES);

  // change language to browser's primary content language
  $translateProvider.determinePreferredLanguage( function() {
      var language = window.navigator.languages[0];
      if(language.substring(0,2) === "es") {
          $translateProvider.preferredLanguage('es');
          return "es";
      }
      else {
          $translateProvider.preferredLanguage('en');
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

  $rootScope.appFailure = false;

  //$rootScope.urlPrefix = '/sequoiagrove';
  $rootScope.urlPrefix = '';
});
