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

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      localStorageService.set('SequoiaGrove.lang', langKey);
    };
  });
