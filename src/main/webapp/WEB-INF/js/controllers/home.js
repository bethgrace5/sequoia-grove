'use strict';

/**
 * @ngdoc function
 * @name sequoiaGroveApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the sequoiaGroveApp
 */
angular.module('sequoiaGroveApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.showDeliveries = false;
    $scope.highlight = true;

    // types are: all, user, front, kitchen, janitor
    $scope.type = 'all';

    $scope.filterByType = function (type, scheduled, user) {
        if ($scope.type == 'all') {
            return true;
        }
        else if ($scope.type==type) {
            return true;
        }
        else if ($scope.type=='mine') {
            console.log(scheduled.monday + ", " + user);
            console.log(scheduled.monday == user);
            if ( (scheduled.monday    == user) ||
                 (scheduled.tuesday   == user) ||
                 (scheduled.wednesday == user) ||
                 (scheduled.thursday  == user) ||
                 (scheduled.friday    == user) ||
                 (scheduled.saturday  == user) ||
                 (scheduled.sunday    == user)) {
                return true;
            }
            else {
                return false;
            }
        }

        return false;
    }

    $scope.next = function () {


    }

    // sample delivery object array
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
      }];

    //sample schedule object array
    $scope.schedule1 = [
      { title: "open store",
        role: "supervisor",
        type: "front",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "John",
          tuesday: "Jacob",
          wednesday: "Thor",
          thursday: "Smith",
          friday: "Thor",
          saturday: "Batman",
          sunday: "Name Too"}
      },
      { title: "open support",
        role: "supervisor",
        type: "front",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Thor",
          tuesday: "Sawyer",
          wednesday: "John",
          thursday: "John",
          friday: "John",
          saturday: "Rohn",
          sunday: "Smith"}
      },
      { title: "register 1",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:00",
        weekendStart: "8:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Elton",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "front",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:00",
        weekendStart: "8:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Xyla",
          tuesday: "Go Out",
          wednesday: "The People",
          thursday: "Always Shout",
          friday: "There goes",
          saturday: "John",
          sunday: "John"}
      },
      { title: "front",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:30",
        weekendStart: "8:00",
        weekendEnd: "3:30",
        scheduled: {
          monday: "Smith",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "meat",
        role: "coldPrep",
        type: "front",
        weekdayStart: "",
        weekdayEnd: "",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "John Jacob",
          sunday: "Smith"}
      },
      { title: "salads",
        role: "kitchen",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Alfred",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "soups",
        role: "kitchen",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Amela",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "cakes",
        role: "bakery",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Cara",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "open janitor",
        role: "janitor",
        type: "janitor",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Yellow",
          tuesday: "Yellow",
          wednesday: "Yellow",
          thursday: "Blue",
          friday: "Blue",
          saturday: "Blue",
          sunday: "Green"}
      },
      { title: "close janitor",
        role: "janitor",
        type: "janitor",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Blue",
          tuesday: "Blue",
          wednesday: "Green",
          thursday: "Green",
          friday: "Green",
          saturday: "Yellow",
          sunday: "Yellow"}
    }];

    $scope.schedule2 = [
      { title: "open store",
        role: "supervisor",
        type: "front",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Thor",
          tuesday: "John",
          wednesday: "Jacob",
          thursday: "Sawyer",
          friday: "Thor",
          saturday: "Batman",
          sunday: "Blue"}
      },
      { title: "open support",
        role: "supervisor",
        type: "front",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Batman",
          tuesday: "Thor",
          wednesday: "Cara",
          thursday: "Jacob",
          friday: "Elton",
          saturday: "Smith",
          sunday: "John"}
      },
      { title: "register 1",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:00",
        weekendStart: "8:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Elton",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "front",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:00",
        weekendStart: "8:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Xyla",
          tuesday: "Go Out",
          wednesday: "John",
          thursday: "Always Shout",
          friday: "There goes",
          saturday: "John",
          sunday: "Smith"}
      },
      { title: "front",
        role: "cashier",
        type: "front",
        weekdayStart: "8:00",
        weekdayEnd: "3:30",
        weekendStart: "8:00",
        weekendEnd: "3:30",
        scheduled: {
          monday: "Smith",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "meat",
        role: "coldPrep",
        type: "front",
        weekdayStart: "",
        weekdayEnd: "",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "John Jacob",
          sunday: "Smith"}
      },
      { title: "salads",
        role: "kitchen",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Alfred",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "soups",
        role: "kitchen",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Amela",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "cakes",
        role: "bakery",
        type: "kitchen",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Cara",
          tuesday: "Jacob",
          wednesday: "Jingleheimer",
          thursday: "Smith",
          friday: "His Name",
          saturday: "Is My",
          sunday: "Name Too"}
      },
      { title: "open janitor",
        role: "janitor",
        type: "janitor",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Green",
          tuesday: "Green",
          wednesday: "Green",
          thursday: "Blue",
          friday: "Yellow ",
          saturday: "John",
          sunday: "Green"}
      },
      { title: "close janitor",
        role: "janitor",
        type: "janitor",
        weekdayStart: "6:00",
        weekdayEnd: "2:00",
        weekendStart: "7:00",
        weekendEnd: "3:00",
        scheduled: {
          monday: "Blue",
          tuesday: "Blue",
          wednesday: "Blue",
          thursday: "Green",
          friday: "Green",
          saturday: "Yellow",
          sunday: "Yellow"}
    }];
  });
