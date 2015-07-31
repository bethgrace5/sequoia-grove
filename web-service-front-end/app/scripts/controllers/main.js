'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('MainCtrl', function (
          $scope, $rootScope, $route, $translate, localStorageService) {

    $scope.activeTab = 'home';
    $scope.user = { firstname: "Purple", lastname: "Pancakes", type: "manager" };

    localStorageService.set('SequoiaGrove.user', $scope.user);
    console.log(localStorageService.get('SequoiaGrove.user').type);


    var lang = localStorageService.get('SequoiaGrove.lang');
    if (lang !== null) {
      $translate.use(lang);
    }

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      localStorageService.set('SequoiaGrove.lang', langKey);
    };
  });
