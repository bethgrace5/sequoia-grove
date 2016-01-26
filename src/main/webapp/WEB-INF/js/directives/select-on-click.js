
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

        // capitalize first letter of the value
        this.value = (firstLetter + this.value.substring(1,this.value.length));

        // find the matching employee by name
        _.map($scope.currentEmployees, function(e) {
          if(_.isMatch(e, {'firstName':name})) {
            matchFound = true;
            employee = e;
          }
        });

        if (matchFound) {
          // remove warning class
          element.context.classList.remove('schedule-edit-input-warn');
          exists = true;
          // determine which day we need to look at for availability
          switch (attrs.day) {
            case 'mon':
              avail = employee.avail.mon;
              $scope.template[templateIndex].mon.eid = employee.id;
              break;
            case 'tue':
              avail = employee.avail.tue;
              $scope.template[templateIndex].tue.eid = employee.id;
              break;
            case 'wed':
              avail = employee.avail.wed;
              $scope.template[templateIndex].wed.eid = employee.id;
              break;
            case 'thu':
              avail = employee.avail.thu;
              $scope.template[templateIndex].thu.eid = employee.id;
              break;
            case 'fri':
              avail = employee.avail.fri;
              $scope.template[templateIndex].fri.eid = employee.id;
              break;
            case 'sat':
              avail = employee.avail.sat;
              $scope.template[templateIndex].sat.eid = employee.id;
              break;
            case 'sun':
              avail = employee.avail.sun;
              $scope.template[templateIndex].sun.eid = employee.id;
              break;
          }

          avail = _.map(avail, function(a) {
            return {
              'start':moment(attrs.date +' '+ a.startHr +' '+ a.startMin, 'DD-MM-YYYY hh mm'),
              'end':moment(attrs.date +' '+ a.endHr +' '+ a.endMin, 'DD-MM-YYYY hh mm')
            }
          });

          var shiftStart = moment(attrs.date + ' ' + attrs.sthr+attrs.stmin, 'DD-MM-YYYY hhmm');
          var shiftEnd = moment(attrs.date + ' ' + attrs.endhr+attrs.endmin, 'DD-MM-YYYY hhmm');

          var isAvailable = $scope.checkAvail(avail, shiftStart, shiftEnd);

          if(isAvailable === false) {
            element.context.classList.add('schedule-edit-input-error');
          }
          else {
            element.context.classList.add('schedule-edit-highlight');
          }
        }
        else {
          //add warning class
          element.context.classList.add('schedule-edit-input-warn');
        }
        $scope.trackScheduleChange(employee.id, attrs.sid, attrs.date)
        $scope.selectEid(employee.id);
        $scope.$apply();

        //element.context.classList.remove('schedule-edit-input-error');
        // add shift to update list if necessary

      });

      element.on('blur', function (e) {
        oldName = this.value;
      });
    }
  };
}]);
