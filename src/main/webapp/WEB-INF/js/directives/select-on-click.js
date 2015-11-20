
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

            if (attrs.day == 'mon') {
              $scope.template[index].mon.eid = newId;
            }
            else if (attrs.day == 'tue') {
              $scope.template[index].tue.eid = newId;
            }
            else if (attrs.day == 'wed') {
              $scope.template[index].wed.eid = newId;
            }
            else if (attrs.day == 'thu') {
              $scope.template[index].thu.eid = newId;
            }
            else if (attrs.day == 'fri') {
              $scope.template[index].fri.eid = newId;
            }
            else if (attrs.day == 'sat') {
              $scope.template[index].sat.eid = newId;
            }
            else if (attrs.day == 'sun') {
              $scope.template[index].sun.eid = newId;
            }
            // add shift to update list if necessary
            $scope.checkIfShiftExists(attrs.day, newId, attrs.sid)
            this.click();
            this.blur()
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
