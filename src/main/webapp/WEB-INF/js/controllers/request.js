'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('RequestCtrl', function ($scope) {

    $scope.user = { type: "manager" };
    $scope.activeTab = 'pending';


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
