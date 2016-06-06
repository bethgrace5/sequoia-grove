
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
        // an arrow key was pressed
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
         return;
        }
        // capitalize first letter of the name
        var firstLetter = this.value.charAt(0).toUpperCase();
        this.value = firstLetter + this.value.substring(1, this.value.length);

        // the name is blank - add it to delete list
        if(this.value.length === 0) {
          scheduleFactory.deleteItem({'sid': attrs.sid, 'date':attrs.date});
          element.context.classList.remove('schedule-edit-input-warn');
          $scope.template[attrs.idx][attrs.day].eid = 0;
          $scope.selectEid(0);
          $scope.$apply();
          return;
        }
        var employee = $scope.getEmployeeByname(this.value);;
        // found employee!
        if (employee.id !== 0) {
          // remove warning class and update template with new id
          element.context.classList.remove('schedule-edit-input-warn');
          $scope.template[attrs.idx][attrs.day].eid = employee.id;

          // 1. check that they are current
          if (employee.isCurrent) {
            element.context.classList.add('schedule-edit-highlight');
          } else { //employee is not current
            element.context.classList.add('schedule-edit-input-error');
          }

          // 2. Check availability
          if ($scope.template[attrs.idx][attrs.day].hasAvailability[employee.id]) {
            element.context.classList.add('schedule-edit-highlight');
          } else { // the employee is not available
            element.context.classList.add('schedule-edit-input-error');
          }

          // 3. check that they have the position
          if ($scope.template[attrs.idx][attrs.day].hasPosition[employee.id]) {
            element.context.classList.add('schedule-edit-highlight');
          } else {
            element.context.classList.add('schedule-edit-input-error');
          }

          // 4. update change lists
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
