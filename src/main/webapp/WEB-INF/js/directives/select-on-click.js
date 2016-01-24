
// select the entire text of an input on one click
// used in schedule edit
angular.module('sequoiaGroveApp').directive('selectOnClick', ['$window', '$timeout', function ($window, $timeout) {
  return {
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          this.setSelectionRange(0, this.value.length)
        }
        // get name to see if it changes
        oldName = this.value;
      });

      element.on('keydown', function (e) {
        //console.log(e.keyCode);

        // Enter Pressed
        if(e.keyCode == 13) {
          // deselect the item
          this.blur()
        }

        // Backspace Pressed
        if(e.keyCode == 8) {
          // clear input
          //this.value = this.value.substring(0, this.value.length);

          // back space operate as usual
          this.setSelectionRange(this.value.length-1, this.value.length)
        }

        // Esc Pressed
        if(e.keyCode == 27) {
          this.blur()
        }
      });

      element.on('keyup', function (e) {
        var isInDeleteList = false;

        // the shift name is empty - add this to delete list, if it
        // is not already in delete list
        if(this.value.length === 0) {
          _.map($scope.deleteShifts, function(shift, index, list) {
            if( _.isEqual(shift, {'sid':attrs.sid, 'date':attrs.date})) {
              isInDeleteList = true;
            }
          });
          if (isInDeleteList === false) {
            $scope.deleteShifts.push({'sid':parseInt(attrs.sid), 'date':attrs.date});
          }
        }

        // capitalize first letter of the value
        var firstLetter = this.value.charAt(0).toUpperCase();
        this.value = (firstLetter + this.value.substring(1,this.value.length));

        // schedule template index
        var index = attrs.idx;
        var exists = false;
        var newId = 0;

        var len = $scope.currentEmployees.length;
        var i = 0;

        // find the matching employee by name, and update
        // the employee id for the template
        for(; i<len; i++) {
          if($scope.currentEmployees[i].firstName == this.value) {
            newId = $scope.currentEmployees[i].id;
            exists = true;
            element.context.classList.remove('schedule-edit-input-warn');

            var schFlag = false;
            if (attrs.day == 'mon' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.mon, attrs
                )
            ) {
              $scope.template[index].mon.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'tue' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.tue, attrs
                )
            ) {
              $scope.template[index].tue.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'wed' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.wed, attrs
                )
            ) {
              $scope.template[index].wed.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'thu' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.thu, attrs
                )
            ) {
              $scope.template[index].thu.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'fri' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.fri, attrs
                )
            ) {
              $scope.template[index].fri.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'sat' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.sat, attrs
                )
            ) {
              $scope.template[index].sat.eid = newId;
              schFlag = true;
            }
            else if (attrs.day == 'sun' &&
                $scope.checkEmpAvailWithShift(
                  $scope.currentEmployees[i].avail.sun, attrs
                )
            ) {
              $scope.template[index].sun.eid = newId;
              schFlag = true;
            }
            if (schFlag) {
              element.context.classList.add('schedule-edit-input-error');
            }
            else {
              element.context.classList.remove('schedule-edit-input-error');
            }
            // add shift to update list if necessary
            $scope.checkIfShiftExists(newId, attrs.sid, attrs.date)
            $scope.selectEid(newId);
            $scope.$apply();
            element.context.classList.add('schedule-edit-highlight');
          }
        }

        //$timeout( function() {
          if (exists == false) {
            // This name does not match any employee in the list
            // set the template id to 0
            element.context.classList.add('schedule-edit-input-warn');

            if (attrs.day == 'mon') {
              $scope.template[index].mon.eid = 0;
            }
            else if (attrs.day == 'tue') {
              $scope.template[index].tue.eid = 0;
            }
            else if (attrs.day == 'wed') {
              $scope.template[index].wed.eid = 0;
            }
            else if (attrs.day == 'thu') {
              $scope.template[index].thu.eid = 0;
            }
            else if (attrs.day == 'fri') {
             $scope.template[index].fri.eid = 0;
            }
            else if (attrs.day == 'sat') {
              $scope.template[index].sat.eid = 0;
            }
            else if (attrs.day == 'sun') {
              $scope.template[index].sun.eid = 0;
            }
          }
        //}, 0)

      });

      element.on('blur', function (e) {
        oldName = this.value;
      });
    }
  };
}]);
