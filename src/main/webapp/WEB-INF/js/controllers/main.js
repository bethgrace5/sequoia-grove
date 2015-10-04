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


    // Sample Data as JSON
    $scope.user1 = { firstname: "John", lastname: "theManager", type: "manager" };
    $scope.user2 = { firstname: "Smith", lastname: "theEmployee", type: "employee" };
    $scope.lang = 'en';
    $scope.user = $scope.user1;

    localStorageService.set('SequoiaGrove.user', $scope.user);

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $scope.lang = langKey;
      localStorageService.set('SequoiaGrove.lang', langKey);
      $scope.$broadcast('translate');
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

    // sample employee list
    $scope.employees = [
      { name: "John", roles:["janitor"], 
        availibility:[
          // janitor shifts
          { shiftid: "13", monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "14", monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Sue", roles:["janitor", "coldPrep"], 
        availibility:[
          // cold prep shifts
          { shiftid: "6",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "7",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          // janitor shifts
          { shiftid: "13", monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "14", monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Eli", roles:["coldPrep"], 
        availibility:[
          // cold prep shifts
          { shiftid: "6",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "7",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },
      { name: "Carl", roles:["coldPrep"], 
        availibility:[
          // cold prep shifts
          { shiftid: "6",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "7",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },
      { name: "Bekka", roles:["coldPrep"], 
        availibility:[
          // cold prep shifts
          { shiftid: "6",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "7",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },


      { name: "Mark", roles:["coldPrep"], 
        availibility:[
          // cold prep shifts
          { shiftid: "6",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "7",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Sandy", roles:["cashier, supervisor"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Danny", roles:["cashier, supervisor"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },
      { name: "Jimmy", roles:["supervisor"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Sky", roles:["cashier"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Zin", roles:["cashier"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Lynne", roles:["cashier"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },
      { name: "Minnie", roles:["cashier"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },
      { name: "Mickey", roles:["cashier"], 
        availibility:[
          // cashier shifts
          { shiftid: "3",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "4",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "5",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }
        ]
      },

      { name: "Dawn", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Shawn", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Lawn", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Tracie", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Bela", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Cassie", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "Frank", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },

      { name: "George", roles:["kitchen"], 
        availibility:[
          // kitchen shifts
          { shiftid: "8",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "9",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "10",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "11",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
          { shiftid: "12",  monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true },
        ]
      },
    ];

    $scope.shifts = [
      { id: "1", title: "open store",   role: "supervisor", type: "front",   weekdayStart: "6:00", weekdayEnd: "2:00", weekendStart: "7:00", weekendEnd: "3:00" },
      { id: "2", title: "open support", role: "supervisor", type: "front",   weekdayStart: "6:00", weekdayEnd: "2:00", weekendStart: "7:00", weekendEnd: "3:00" },
      { id: "3", title: "register 1",   role: "cashier",    type: "front",   weekdayStart: "8:00", weekdayEnd: "3:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "4", title: "register 2",   role: "cashier",    type: "front",   weekdayStart: "8:00", weekdayEnd: "3:30", weekendStart: "8:00", weekendEnd: "3:30" },
      { id: "5", title: "mid-morning",  role: "cashier",    type: "front",   weekdayStart: "9:00", weekdayEnd: "2:00", weekendStart: "9:00", weekendEnd: "3:00" },
      { id: "6", title: "meat",         role: "coldPrep",   type: "front",   weekdayStart: "6:00", weekdayEnd: "2:00", weekendStart: "7:00", weekendEnd: "3:00" },
      { id: "7", title: "cheese",       role: "coldPrep",   type: "front",   weekdayStart: "6:00", weekdayEnd: "2:00", weekendStart: "7:00", weekendEnd: "3:00" },
      { id: "8", title: "bakery",       role: "kitchen",    type: "kitchen", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "9", title: "soups",        role: "kitchen",    type: "kitchen", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "10", title: "salads",      role: "kitchen",    type: "kitchen", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "11", title: "hot sandwich",role: "kitchen",    type: "kitchen", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "12", title: "hot sandwich",role: "kitchen",    type: "kitchen", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "13", title: "opening janitor", role: "janitor",    type: "janitor", weekdayStart: "7:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" },
      { id: "14", title: "closing janitor",role: "janitor",    type: "janitor", weekdayStart: "3:00", weekdayEnd: "2:00", weekendStart: "8:00", weekendEnd: "3:00" }];

    $scope.currentSchedule = [
    { date: "Sept-7",  
      weekday: "monday",
      scheduled:[
        {shiftid: "1",  name: "Sandy"},
        {shiftid: "2",  name: "Danny"},
        {shiftid: "3",  name: "Sky"},
        {shiftid: "4",  name: "Zin"},
        {shiftid: "5",  name: "Lynne"},
        {shiftid: "6",  name: "Eli"},
        {shiftid: "7",  name: "Mark"},
        {shiftid: "8",  name: "person"},
        {shiftid: "9",  name: "person"},
        {shiftid: "10", name: "person"},
        {shiftid: "11", name: "person"},
        {shiftid: "12", name: "person"},
        {shiftid: "13", name: "person"},
        {shiftid: "14", name: "person"}
       ]
    },
    { date: "Sept-8",  
       weekday: "tuesday",
       scheduled:[
         {shiftid: "1",  name: "Sandy"},
         {shiftid: "2",  name: "Danny"},
         {shiftid: "3",  name: "Zin"},
         {shiftid: "4",  name: "Sky"},
         {shiftid: "5",  name: "Lynne"},
         {shiftid: "6",  name: "Eli"},
         {shiftid: "7",  name: "Mark"},
         {shiftid: "8",  name: "person"},
         {shiftid: "9",  name: "person"},
         {shiftid: "10", name: "person"},
         {shiftid: "11", name: "person"},
         {shiftid: "12", name: "person"},
         {shiftid: "13", name: "person"},
         {shiftid: "14", name: "person"}
       ],
    },
    { date: "Sept-9",
       weekday: "wednesday",
       scheduled:[
         {shiftid: "1",  name: "Danny"},
         {shiftid: "2",  name: "Jimmy"},
         {shiftid: "3",  name: "Zin"},
         {shiftid: "4",  name: "Sky"},
         {shiftid: "5",  name: "Lynne"},
         {shiftid: "6",  name: "Carl"},
         {shiftid: "7",  name: "Bekka"},
         {shiftid: "8",  name: "person"},
         {shiftid: "9",  name: "person"},
         {shiftid: "10", name: "person"},
         {shiftid: "11", name: "person"},
         {shiftid: "12", name: "person"},
         {shiftid: "13", name: "person"},
         {shiftid: "14", name: "person"}
       ]
    },
    { date: "Sept-10",
       weekday: "thursday",
       scheduled:[
         { shiftid: "1",  name: "Jimmy" },
         { shiftid: "2",  name: "Sandy" },
         { shiftid: "3",  name: "Minnie" },
         { shiftid: "4",  name: "Mickey" },
         { shiftid: "5",  name: "Zin" },
         { shiftid: "6",  name: "Bekka" },
         { shiftid: "7",  name: "Eli" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-11",
       weekday: "friday",
       scheduled:[
         { shiftid: "1",  name: "Sandy" },
         { shiftid: "2",  name: "Danny" },
         { shiftid: "3",  name: "Minnie" },
         { shiftid: "4",  name: "Mickey" },
         { shiftid: "5",  name: "Zin" },
         { shiftid: "6",  name: "Mark" },
         { shiftid: "7",  name: "Carl" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-12",
       weekday: "saturday",
       scheduled:[
         { shiftid: "1",  name: "Danny" },
         { shiftid: "2",  name: "Jimmy" },
         { shiftid: "3",  name: "Sky" },
         { shiftid: "4",  name: "Mickey" },
         { shiftid: "5",  name: "Minnie" },
         { shiftid: "6",  name: "Eli" },
         { shiftid: "7",  name: "Bekka" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    },
    { date: "Sept-13",
       weekday: "sunday",
       scheduled:[
         { shiftid: "1",  name: "Jimmy" },
         { shiftid: "2",  name: "Sandy" },
         { shiftid: "3",  name: "Zin" },
         { shiftid: "4",  name: "Lynne" },
         { shiftid: "5",  name: "Minnie" },
         { shiftid: "6",  name: "Eli" },
         { shiftid: "7",  name: "Carl" },
         { shiftid: "8",  name: "person" },
         { shiftid: "9",  name: "person" },
         { shiftid: "10", name: "person" },
         { shiftid: "11", name: "person" },
         { shiftid: "12", name: "person" },
         { shiftid: "13", name: "person" },
         { shiftid: "14", name: "person" }
       ]
    }
    ];

    $scope.roleList = [
      {role: "Supervisor"},
      {role: "Cashier"},
      {role: "Cold Prep"},
      {role: "Kitchen"},
      {role: "Bakery"},
      {role: "Janitor"},
    ]

});
