
// select the entire text of an input on one click
// used in schedule edit
angular.module('sequoiaGroveApp').directive('selectOnClick', ['$window', '$timeout', '$log', function ($window, $timeout, $log) {
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
        var avail = [];
        var employee = {'id':0};
        var name = this.value;
        var matchFound = false;
        var firstLetter = name.charAt(0).toUpperCase();
        var templateIndex = attrs.idx;
        var isInDeleteList = false;
        var isAvailable = false;

        // capitalize first letter of the value
        this.value = (firstLetter + this.value.substring(1,this.value.length));

        // the shift name is empty - add it to delete list
        if(this.value.length === 0) {
          $scope.addToDeleteList({'sid': attrs.sid, 'date':attrs.date});
          $scope.template[templateIndex][attrs.day].eid = 0;
          $scope.selectEid(0);
        }

        // find the matching employee by name
        _.map($scope.currentEmployees, function(e) {
          if(_.isMatch(e, {'firstName':name})) {
            matchFound = true;
            employee = e;
          }
        });

        // No Employee was found by the name supplied
        if (matchFound === false) {
          element.context.classList.add('schedule-edit-input-warn');
        }
        // Found Employee - check availability and update changes in lists
        else {
          // remove warning class
          element.context.classList.remove('schedule-edit-input-warn');
          // update template with new id
          $scope.template[templateIndex][attrs.day].eid = employee.id;

          // get availability
          avail = _.map(employee.avail[attrs.day], function(a) {
            return {
              'start':moment(attrs.date +' '+ a.startHr +' '+ a.startMin, 'DD-MM-YYYY hh mm'),
              'end':moment(attrs.date +' '+ a.endHr +' '+ a.endMin, 'DD-MM-YYYY hh mm')
            }
          });

          // determine shift duration times
          var shiftStart = moment(attrs.date + ' ' + attrs.sthr+attrs.stmin, 'DD-MM-YYYY hhmm');
          var shiftEnd = moment(attrs.date + ' ' + attrs.endhr+attrs.endmin, 'DD-MM-YYYY hhmm');

          // check availability against shift duration
          if (avail.length > 0) {
            isAvailable = $scope.checkAvail(avail, shiftStart, shiftEnd);
          }
          // The Employee is not available
          if(isAvailable === false) {
            element.context.classList.add('schedule-edit-input-error');
          }
          // The Employee is available
          else {
            element.context.classList.add('schedule-edit-highlight');
          }
          $scope.selectEid(employee.id);
        }
        //  update change lists
        if (employee.id !== 0) {
          $scope.trackScheduleChange(employee.id, attrs.sid, attrs.date)
        }
        $scope.$apply();
      });

      element.on('blur', function (e) {
        oldName = this.value;
      });
    }
  };
}]);
