
'use strict';

angular.module('sequoiaGroveApp').directive('scheduleHeader',[ '$translate', function($translate) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'templates/schedule-header.html'
    };
}]);
