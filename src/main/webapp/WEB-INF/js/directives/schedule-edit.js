'use strict';

angular.module('sequoiaGroveApp').directive('scheduleEdit', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'templates/schedule-edit.html'
    };
});
