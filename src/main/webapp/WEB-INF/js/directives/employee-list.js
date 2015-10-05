'use strict';

angular.module('sequoiaGroveApp').directive('employeeList', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/employee-list.html'
    link: function (scope, element, attrs) {
    element.on('click', function () {
      if (!$window.getSelection().toString()) {
        // Required for mobile Safari
        this.setSelectionRange(0, this.value.length)
            }
          });
        
    };
});
