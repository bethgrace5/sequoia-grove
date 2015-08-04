'use strict';

angular.module('sequoiaGroveApp').directive('requestPending', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/request-pending.html'
    };
});
