'use strict';

angular.module('sequoiaGroveApp').directive('scheduleView',[ '$translate', function($translate) {
    return {
        restrict: 'E',
        templateUrl: 'templates/schedule-view.html'
    };
}]);
