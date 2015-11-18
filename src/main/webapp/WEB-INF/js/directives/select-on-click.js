
// select the entire text of an input on one click
// used in schedule edit
angular.module('sequoiaGroveApp').directive('selectOnClick', ['$window', function ($window) {
  return {
    restrict: 'A',
    scope: false,
    name: '',
    link: function ($scope, element, attrs) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          this.setSelectionRange(0, this.value.length)
        }
        name = this.value;
        console.log(name);
      });
      element.on('keydown', function (e) {
        //console.log(e.keyCode);

        // Enter Pressed
        if(e.keyCode == 13) {
          // deselect the item
          //this.blur()

          // send click event so ng-click gets called
          this.click();
        }

        // Backspace Pressed
        if(e.keyCode == 8) {
          // clear input
          this.value = this.value.substring(0, this.value.length);
          //this.click();
          this.setSelectionRange(this.value.length-1, this.value.length)

          //$log.debug(this.value.substring(0, this.value.length-2));
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
        var index = attrs.idx;
        var day = attrs.day;
        this.value = (firstLetter + this.value.substring(1,this.value.length));

        console.log(this.value);

        if(this.value == '') {
          console.log('empty');

          if (day == 'mon') {
            //clear out template value for it
            $scope.template[index].mon.eid = 0;
          }


        }
      });
      element.on('blur', function (e) {
        var day = attrs.day;
        var eid = attrs.eid;
        var sid = attrs.sid;
        var date = attrs.date;
        var newName = this.value;
          console.log($scope.template[attrs.idx]);

          /*
        if (day == 'mon') {
          if (newName == '') {
            //clear out template value for it
            $scope.template[index].mon.eid = 0;
          }
          else {
            // name is the initial value before element was clicked
            console.log(newName != name);
          }
        }
        */



        //$scope.changeId();

      });
    }
  };
}]);
