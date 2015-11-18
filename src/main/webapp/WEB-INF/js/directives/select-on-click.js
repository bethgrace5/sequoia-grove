
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

          // send click event so ng-click gets called
          //this.click();
        }

        // Backspace Pressed
        if(e.keyCode == 8) {
          // clear input
          //this.value = this.value.substring(0, this.value.length);
          //this.click();
          this.setSelectionRange(this.value.length-1, this.value.length)
        }

        // Esc Pressed
        if(e.keyCode == 27) {
          this.blur()
        }

        // Right Arrow
        if(e.keyCode == 39) {
        }

        // Left Arrow
        if(e.keyCode == 37) {
        }
        
        // Up Arrow
        if(e.keyCode == 38) {
        }

        // Down Arrow
        if(e.keyCode == 40) {
        }

      });

      element.on('keyup', function (e) {
        // capitalize first letter of the value
        var firstLetter = this.value.charAt(0).toUpperCase();
        this.value = (firstLetter + this.value.substring(1,this.value.length));

        var sid = attrs.sid;
        var date = attrs.date;
        var index = attrs.idx;
        var newName = this.value;
        var employeeNameExists = false;

        // The name changed
        //if (oldName != newName) {
          var len = $scope.employees.length;
          var i = 0;

          // find the matching employee by name, and update
          // the employee id for the day
          for(; i<len; i++) {
            if($scope.employees[i].name == newName) {
              employeeNameExists = true;
              element.context.classList.remove('schedule-edit-input-warn');

              if (attrs.day == 'mon') {
                $scope.template[index].mon.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'tue') {
                $scope.template[index].tue.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'wed') {
                $scope.template[index].wed.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'thu') {
                $scope.template[index].thu.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'fri') {
                $scope.template[index].fri.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'sat') {
                $scope.template[index].sat.eid = $scope.employees[i].id;
              }
              else if (attrs.day == 'sun') {
                $scope.template[index].sun.eid = $scope.employees[i].id;
              }

              $scope.selectEid($scope.employees[i].id);
              this.click();
            }
          }


            $timeout(
            function() {
              if (employeeNameExists == false) {
                // This name does not match any employee in the list
                // set the id to 0
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
              },
              0
            )

      });

      element.on('blur', function (e) {
        oldName = this.value;
      });
    }
  };
}]);
