'use strict';

angular.module('sequoiaGroveApp').directive('employeeList', ['$window',function($window) {
  return {
    restrict: 'E',
    templateUrl: 'templates/employee-list.html',
    link: function (scope, element, attrs) {
      element.on('click', function () {
      });
    }
  }
}]);
