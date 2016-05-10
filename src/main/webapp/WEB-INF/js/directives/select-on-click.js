
// select the entire text of an input on one click
// used in schedule edit
angular.module('sequoiaGroveApp').directive('selectOnClick', ['$window', '$timeout', '$log', '$rootScope', 'scheduleFactory', 'userFactory', function ($window, $timeout, $log, $rootScope, scheduleFactory, userFactory) {
  return {
    restrict: 'A',
    scope: false,

    link: function ($scope, element, attrs) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          this.setSelectionRange(0, this.value.length)
        }
      });

      element.on('keydown', function (e) {
        if(e.keyCode == 13) { // Enter Pressed
          this.blur(); // deselect the item
        }
        if(e.keyCode == 8) { // Backspace Pressed
          //this.value = this.value.substring(0, this.value.length); // clear input
          this.setSelectionRange(this.value.length-1, this.value.length) // back space operate as usual
        }
        if(e.keyCode == 27) { // Esc Pressed
          this.blur();
        }
      }); // end keydown function

      element.on('keyup', function (e) {
        // capitalize first letter of the name
        var firstLetter = this.value.charAt(0).toUpperCase();
        this.value = firstLetter + this.value.substring(1, this.value.length);

        // the name is blank - add it to delete list
        if(this.value.length === 0) {
          scheduleFactory.deleteItem({'sid': attrs.sid, 'date':attrs.date});
          //FIXME update scheduleFactory template to reflect change, or just
          //leave it for scope template?
          $scope.template[attrs.idx][attrs.day].eid = 0;
        }
        var employee = $scope.getEmployeeByname(this.value);;
        // found employee!
        if (employee.id !== 0) {
          // remove warning class and update template with new id
          element.context.classList.remove('schedule-edit-input-warn');
          $scope.template[attrs.idx][attrs.day].eid = employee.id;

          // 1. Check availability
          if ($scope.employeeIsAvailable(attrs, employee)) {
            element.context.classList.add('schedule-edit-highlight');
            if (_.has($scope.template[attrs.day], "available")) {
              $scope.template[attrs.idx][attrs.day].available = true;
            }
            else {
              $scope.template[attrs.idx][attrs.day] =
                _.extend($scope.template[attrs.idx][attrs.day], {'available':true});
            }
          }
          else { // the employee is not available
            element.context.classList.add('schedule-edit-input-error');
            if (_.has($scope.template[attrs.day], "available")) {
              $scope.template[attrs.idx][attrs.day].available = false;
            }
            else {
              $scope.template[attrs.idx][attrs.day] = _.extend($scope.template[attrs.idx][attrs.day], {'available':false});
            }
          }

          // 2. check that they have the position
          var hasPosition = userFactory.hasPosition(parseInt(employee.id), parseInt(attrs.pid));
          if (hasPosition) {
            $log.debug('employee has position');
            element.context.classList.add('schedule-edit-highlight');
            if (_.has($scope.template[attrs.day], "hasPosition")) {
              $scope.template[attrs.idx][attrs.day].hasPosition = true;
            }
            else {
              $scope.template[attrs.idx][attrs.day] =
                _.extend($scope.template[attrs.idx][attrs.day], {'hasPosition':true});
            }
          }
          else {
            $log.debug('employee does not have position');
            element.context.classList.add('schedule-edit-input-error');
            if (_.has($scope.template[attrs.day], "hasPosition")) {
              $scope.template[attrs.idx][attrs.day].hasPosition = false;
            }
            else {
              $scope.template[attrs.idx][attrs.day] = _.extend($scope.template[attrs.idx][attrs.day], {'hasPosition':false});
            }
          }

          // 3. update change lists
          scheduleFactory.changeItem(employee.id, attrs.sid, attrs.date);
        }
        else { // No Employee was found by the name supplied
          element.context.classList.add('schedule-edit-input-warn');
        }

        $scope.selectEid($scope.template[attrs.idx], attrs.day);
        $scope.$apply();
      }); // end 'keyup' function

    }  //end link
  };  // end return
}]); // end module
