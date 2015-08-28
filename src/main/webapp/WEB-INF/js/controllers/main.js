'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('MainCtrl', function (
      $scope,
      $rootScope,
      $route,
      $translate,
      $location,
      localStorageService) {

    localStorageService.set('SequoiaGrove.user', $scope.user);

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      localStorageService.set('SequoiaGrove.lang', langKey);
    };

    // set active tab to
    $scope.changeTab = function(tab) {
        var path = $location.path();
        var length = path.length;
        if(tab == path.substring(0,length)) {
            return "active";
        }
        else {
            return "";
        }
    }

    // set tab to home on page load
    $scope.changeTab('/home');

    // Sample Data as JSON
    $scope.user = { firstname: "Purple", lastname: "Pancakes", type: "manager" };
    $scope.showDeliveries = false;
    $scope.highlightUser = true;

    $scope.deliveries = [
        { title: "Alpha", 
          days: {
              monday:    true,
              tuesday:   true,
              wednesday: true,
              thursday:  true,
              friday:    true,
              saturday:  true,
              sunday:    false }
        },
        { title: "Pepsi", 
          days: {
              monday:    true,
              tuesday:   false,
              wednesday: false,
              thursday:  false,
              friday:    false,
              saturday:  false,
              sunday:    false }
        },
        { title: "Sysco", 
          days: {
              monday:    false,
              tuesday:   true,
              wednesday: false,
              thursday:  true,
              friday:    false,
              saturday:  true,
              sunday:    false }
        }
    ];
    $scope.currentSchedule = [
        {
            title: "open store",
            role: "supervisor",
            weekdayStart: "6:00",
            weekdayEnd: "2:00",
            weekendStart: "7:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "John",
                tuesday: "Jacob",
                wednesday: "Jingleheimer",
                thursday: "Smith",
                friday: "His Name",
                saturday: "Is My",
                sunday: "Name Too"
            }
        },
        {
            title: "open support",
            role: "supervisor",
            weekdayStart: "6:00",
            weekdayEnd: "2:00",
            weekendStart: "7:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "Whenever I",
                tuesday: "Go Out",
                wednesday: "The People",
                thursday: "Always Shout",
                friday: "There goes",
                saturday: "John Jacob",
                sunday: "Jingleheimer Smith"
            }
        },
        {
            title: "register 1",
            role: "cashier",
            weekdayStart: "8:00",
            weekdayEnd: "3:00",
            weekendStart: "8:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "John",
                tuesday: "Jacob",
                wednesday: "Jingleheimer",
                thursday: "Smith",
                friday: "His Name",
                saturday: "Is My",
                sunday: "Name Too"
            }
        },
        {
            title: "front",
            role: "cashier",
            weekdayStart: "8:00",
            weekdayEnd: "3:00",
            weekendStart: "8:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "Whenever I",
                tuesday: "Go Out",
                wednesday: "The People",
                thursday: "Always Shout",
                friday: "There goes",
                saturday: "John Jacob",
                sunday: "Jingleheimer Smith"
            }
        },
        {
            title: "front",
            role: "cashier",
            weekdayStart: "8:00",
            weekdayEnd: "3:30",
            weekendStart: "8:00",
            weekendEnd: "3:30",
            scheduled: {
                monday: "John",
                tuesday: "Jacob",
                wednesday: "Jingleheimer",
                thursday: "Smith",
                friday: "His Name",
                saturday: "Is My",
                sunday: "Name Too"
            }
        },
        {
            title: "meat",
            role: "coldPrep",
            weekdayStart: "6:00",
            weekdayEnd: "2:00",
            weekendStart: "7:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "Whenever I",
                tuesday: "Go Out",
                wednesday: "The People",
                thursday: "Always Shout",
                friday: "There goes",
                saturday: "John Jacob",
                sunday: "Jingleheimer Smith"
            }
        },
        {
            title: "cheese",
            role: "coldPrep",
            weekdayStart: "6:00",
            weekdayEnd: "2:00",
            weekendStart: "7:00",
            weekendEnd: "3:00",
            scheduled: {
                monday: "John",
                tuesday: "Jacob",
                wednesday: "Jingleheimer",
                thursday: "Smith",
                friday: "His Name",
                saturday: "Is My",
                sunday: "Name Too"
            }
        }
    ];
});
