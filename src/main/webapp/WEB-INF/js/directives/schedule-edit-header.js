'use strict';

angular.module('sequoiaGroveApp').directive('scheduleEditHeader',[ '$translate', function($translate) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'templates/schedule-edit-header.html'
    };
}]);
