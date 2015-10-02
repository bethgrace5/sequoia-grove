'use strict';

angular.module('sequoiaGroveApp').directive('scheduleView',[ '$translate', function($translate) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'templates/schedule-view.html'
    };
}]);
