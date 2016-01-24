'use strict';

/**
 * Employee Controller
 */
angular.module('sequoiaGroveApp')
  .controller('EmployeeCtrl', function ($http, $log, $scope, $rootScope, $location) {

    // user is not logged in
    if ($rootScope.loggedIn == false) {
      $location.path('/login');
    }
 
    $scope.activeTab = 'info';

    $scope.current;
    $scope.selectedEmployee = {id:0};
    $scope.newAvail = {day:'', start:'', end:''};

    $scope.empDateFormat = function(curDate) {
      if (curDate=='' || curDate==0 || curDate==null) {
        return 'Present';
      }
      return moment(curDate,'YYYY-MM-DD').format('MMMM Do, YYYY');
    }

    //Birthday Selector  
    $scope.birthDate = new Date();
    //var minDate = new Date(currentTime.getYear(), currentTime.getMonth() -1, +1);
    //one day next before month
    $scope.minDate = new Date(
      $scope.birthDate.getFullYear(),
      $scope.birthDate.getMonth(),
      $scope.birthDate.getDate() +14);
    $scope.maxDate = new Date(
      $scope.birthDate.getFullYear(),
      $scope.birthDate.getMonth() + 2,
      $scope.birthDate.getDate());
    $scope.onlyWeekendsPredicate = function(date) {
      var day = date.getDay();
      return day === 0 || day === 6;
    }
    

    // add a new availability time for an employee
    $scope.addAvail = function() {
      var day = $scope.newAvail.day;
      var st = $scope.newAvail.start;
      var end = $scope.newAvail.end;

      // make sure all fields are filled in
      if (day!='' && st!='' && end!='') {
        // reset availability input
        $scope.newAvail = {day:'', start:'', end:''};

        var newTimes = { startHr:st.valHr, startMin: st.valMin, endHr: end.valHr, endMin: end.valMin};
        // TODO send new availability to back end
        var startt = $scope.hrMinTo24(st.valHr, st.valMin);
        var endt = $scope.hrMinTo24(end.valHr, end.valMin);
        var eid = $scope.selectedEmployee.id;
        $http({
          url: '/sequoiagrove/avail/add/'+ 
          eid + '/' + day + '/' + startt + '/' + endt,
          method: "POST"
        })

        // update front end
        if (day=='mon') { $scope.selectedEmployee.avail.mon.push(newTimes); }
        else if (day=='tue') { $scope.selectedEmployee.avail.tue.push(newTimes); }
        else if (day=='wed') { $scope.selectedEmployee.avail.wed.push(newTimes); }
        else if (day=='thu') { $scope.selectedEmployee.avail.thu.push(newTimes); }
        else if (day=='fri') { $scope.selectedEmployee.avail.fri.push(newTimes); }
        else if (day=='sat') { $scope.selectedEmployee.avail.sat.push(newTimes); }
        else if (day=='sun') { $scope.selectedEmployee.avail.sun.push(newTimes); }
      }
    }

    $scope.newPos = {};
    // add a new position for an employee
    $scope.addPos = function() {
        var pos = $scope.newPos.title;

        // make sure all fields are filled in
        if (pos!='') {
            // reset input
            $scope.newPos = {};

            // check if employee does not already have position
            var empPosLen = $scope.selectedEmployee.positions.length;
            for (var i = 0; i < empPosLen; i++) {
                if ($scope.selectedEmployee.positions[i].title==pos)
                    return;
            }

            var eid = $scope.selectedEmployee.id;
            var pid;
            var len = $scope.positions.length;
            for (var i = 0; i < len; i++) {
                if ($scope.positions[i].title==pos) {
                    pid = $scope.positions[i].id;
                }
            }

            var posObj = {id:pid, title:pos, "location":null};
            // send new position to back end
            $http({
                url: '/sequoiagrove/position/add/'+ 
                    eid + '/' + pid + '/' +
                    moment().format("DD-MM-YYYY"),
                method: "POST"
            })

            // update front end
            $scope.selectedEmployee.positions.push(posObj);
        }

        var posObj = {id:pid, title:pos, "location":null};
        // send new position to back end
        $http({
          url: '/sequoiagrove/position/add/'+ 
          eid + '/' + pid + '/' +
          moment().format("DD-MM-YYYY"),
          method: "POST"
        })

        // update front end
        $scope.allEmployees[$scope.current].positions.push(posObj);
    }

    // click existing day to populate input with that day
    $scope.setNewAvailDay = function(day) {
      // there's not often the case where the same day has multiple
      // availabilities
      //$scope.newAvail.day=day;
    }

    // click existing imes to populate input with those times
    $scope.setNewAvailTimes = function(sH, sM, eH, eM) {
      var start = moment({hour:sH, minute:sM}).format('h:mm a');
      var end = moment({hour:eH, minute:eM}).format('h:mm a');
      $scope.newAvail.start = start;
      $scope.newAvail.end = end; 
      //var stTimeLen = $scope.times.start.length;
      //var edTimeLen = $scope.times.end.length;
      //var i=0;

      // find this item in start times and set start input as it
      /*for(i=0;i<stTimeLen; i++) {
        if (start == $scope.times.start[i].val) {
        $scope.newAvail.start = $scope.times.start[i];
        break;
        }
        }*/

      // find this item in end times and set end input as it
      /*for(i=0; i<edTimeLen; i++) {
        if (end == $scope.times.end[i].val) {
        $scope.newAvail.end = $scope.times.end[i];
        break;
        }
        }*/
    }

    // remove an availability for an employee
    $scope.remAvail = function(day, index) {
        // update front end, and get start_time
        var hr;
        var min;
        if (day=='mon') {
          hr = $scope.selectedEmployee.avail.mon[index].startHr;
          min = $scope.selectedEmployee.avail.mon[index].startMin;
          $scope.selectedEmployee.avail.mon.splice(index, 1);
        }
        else if (day=='tue') {
          hr = $scope.selectedEmployee.avail.tue[index].startHr;
          min = $scope.selectedEmployee.avail.tue[index].startMin;
          $scope.selectedEmployee.avail.tue.splice(index, 1);
        }
        else if (day=='wed') {
          hr = $scope.selectedEmployee.avail.wed[index].startHr;
          min = $scope.selectedEmployee.avail.wed[index].startMin;
          $scope.selectedEmployee.avail.wed.splice(index, 1);
        }
        else if (day=='thu') {
          hr = $scope.selectedEmployee.avail.thu[index].startHr;
          min = $scope.selectedEmployee.avail.thu[index].startMin;
          $scope.selectedEmployee.avail.thu.splice(index, 1);
        }
        else if (day=='fri') {
          hr = $scope.selectedEmployee.avail.fri[index].startHr;
          min = $scope.selectedEmployee.avail.fri[index].startMin;
          $scope.selectedEmployee.avail.fri.splice(index, 1);
        }
        else if (day=='sat') {
          hr = $scope.selectedEmployee.avail.sat[index].startHr;
          min = $scope.selectedEmployee.avail.sat[index].startMin;
          $scope.selectedEmployee.avail.sat.splice(index, 1);
        }
        else if (day=='sun') {
          hr = $scope.selectedEmployee.avail.sun[index].startHr;
          min = $scope.selectedEmployee.avail.sun[index].startMin;
          $scope.selectedEmployee.avail.sun.splice(index, 1);
        }

      var startt = $scope.hrMinTo24(hr,min);
        // remove availability from database
        $http({
            url: '/sequoiagrove/avail/remove/'+ 
                $scope.selectedEmployee.id + '/' + day + '/' + startt,
            method: "POST"
        })
    }

    $scope.remPos = function(index) {
        var eid = $scope.selectedEmployee.id;
        var title = $scope.selectedEmployee.positions[index].title;
        var pid;
        var len = $scope.positions.length;
        for (var i = 0; i < len; i++) {
            if ($scope.positions[i].title==title) {
                pid = $scope.positions[i].id;
            }
        }

      // remove position from back end
      $http({
        url: '/sequoiagrove/position/remove/'+ 
        eid + '/' + pid + '/' +
        moment().format("DD-MM-YYYY"),
        method: "POST"
      })

        // update front end
        $scope.selectedEmployee.positions.splice(index, 1);
    }

    $scope.updateEmployee = function() {
      //Adding birthDate to selectedEmployee[birthday]
      //-
      $scope.selectedEmployee[birthday] = moment(birthDate).format('yyyy-mm-dd');
      // validate
      // send post
      $http.post("/sequoiagrove/employee/update", $scope.selectedEmployee).
        success(function(data, status){
        });
    }

    $scope.selectEmployee = function(id) {
      var length = $scope.allEmployees.length;
      for(var i = 0; i < length; i++) {
        var curid = $scope.allEmployees[i].id;
        if (curid==id) {
          $scope.selectedEmployee = $scope.allEmployees[i];
          break;
        }
      }
    }
  });
