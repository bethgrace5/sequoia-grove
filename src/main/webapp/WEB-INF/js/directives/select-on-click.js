
// select the entire text of an input on one click
// used in schedule edit
angular.module('sequoiaGroveApp').directive('selectOnClick', ['$window', function ($window) {
  return {
    restrict: 'A',
    scope: false,
    link: function (scope, element, attrs) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          this.setSelectionRange(0, this.value.length)
        }
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
          //this.value = '';
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
      });
    }
  };
}]);
