'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('userFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];
  var locations = [];
  var locationId = [];

  // Exposed to users with 'manage schedule' privelage through service
  var users = [];

  // internal variables
  var availMap = {};
  var positionMap = {};

  //call this when you know 'foo' has been changed
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  var initUsers = function(loc, id) {
    locations = loc;
    locationId = id;
    angular.forEach (locations, function(val, key) {
      availMap[val] = [];
      positionMap[val] = [];
    })
    var deferred = $q.defer();
    $rootScope.loadingMsg = "Getting user data...";
    var url = '/employees/'+locations;
    // if it's in dev mode, and we already have
    // a template in localstorage, return.
    /*if($rootScope.devMode) {
      var temp = localStorageService.get('users');
        if (temp) {
          users = JSON.parse(temp);
          $log.debug('Warning: devMode on. This is not current user data');
          return $q(function(resolve, reject) {
            resolve();
          });
        }
      }
      */
    $http({ 'url': $rootScope.urlPrefix + url, 'method': 'GET', }).then(
        function(success) {
          if (success.status === 200) {
            $timeout(function() {
              // anything you want can go here and will safely be run on the next digest.
              users = success.data.employees;
              // Keep a copy of schedule retrieved to compare against changes later
              if ($rootScope.devMode) {
                localStorageService.set('users', JSON.stringify(success.data.users));
              }
              deferred.resolve();
            });
          }
        });
    return deferred.promise;
  }

  var buildAvailability = function() {
    angular.forEach (locations, function(loc, key) {
      // create map with key as eid and value as each object
      availMap[loc] = _.indexBy(users[loc], function(item, index) {
        return item.id;
      });

      // narrow each object to only have availability
      availMap[loc] = _.mapObject(availMap[loc], function(val, key) {
        return _.pick(val, 'avail');
      });
      // change strings to moment objects
      availMap[loc] = _.mapObject(availMap[loc], function(val, key) {
        return {
          'mon':_.map(val.avail['mon'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'tue':_.map(val.avail['tue'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'wed':_.map(val.avail['wed'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'thu':_.map(val.avail['thu'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'fri':_.map(val.avail['fri'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'sat':_.map(val.avail['sat'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          }),
          'sun':_.map(val.avail['sun'], function(d, index) {
            return {'start':moment(d.start, 'HHmm'), 'end':moment(d.end, 'HHmm')};
          })
        }
      })
    });
  }

  var isAvailable = function(eid, day, start, end) {
    var isAvailable = false;

    // 1. get availability
    if (availMap[locationId][eid]) {
      var avail = availMap[locationId][eid][day];
    }
    else {
      return false;
    }

    // 2. determine shift duration times
    var shiftStart = moment(start, 'HHmm');
    var shiftEnd = moment(end, 'HHmm');

    // 3. check employee availability against shift duration
    _.map(avail, function(a, index) {
      if ((a.start.isBefore(shiftStart, 'minute') || a.start.isSame(shiftStart, 'minute')) && (a.end.isAfter(shiftEnd, 'minute') || a.end.isSame(shiftEnd, 'minute'))) {
        isAvailable = true;
      }
    });
    return isAvailable;
  }

  var buildPositions = function() {
    angular.forEach (locations, function(loc, key) {
      // create map with key as eid and value as each object
      positionMap[loc] = _.indexBy(users[loc], function(item, index) {
        return item.id;
      });
      // narrow each object to only have positions
      // probably doing unnecessary things, but it works.
      positionMap[loc] = _.mapObject(positionMap[loc], function(val, key) {
          return _.mapObject(
            _.values(_.pick(val, 'positions')),
            function(val, key) {
              return  _.map(val, function(item) {
                return parseInt(item);
            });
          });
        });
      // rearrange
      positionMap[loc] = _.mapObject(positionMap[loc], function(val, key) {
        if (val[0]) {
          return val[0];
        }
        else {
          return [];
        }
      });
    });


  }

  var hasPosition = function(uid, pid) {
    return _.contains(positionMap[locationId][parseInt(uid)], parseInt(pid));
  }

  var getSelf = function() {
    var deferred = $q.defer();
    $log.debug('would load data about this user, if they have permission to edit themself');
    deferred.resolve();
    return deferred.promise;
  }

  // if User has manage schedule privelages, extend functionality
  var setManagePrivelage = function() {
    //TODO set a boolean saying that this user has manage schedule privelage
    service.init = function(loc, id) {
      var deferred = $q.defer();
      initUsers(loc, id).then(
          function(success) {
            $timeout(function() {
              buildAvailability();
              buildPositions();
              notifyObservers();
              deferred.resolve(success);
            });
          });
      return deferred.promise;
    }
    service.getUsers = function() { return users[locationId]};
    service.isAvailable = function(eid, day, start, end) {
      return isAvailable(eid, day, start, end)
    };
    service.hasPosition = function(uid, pid) {
      return hasPosition(uid, pid);
    };
    // TODO include add availability, remove availabilty, add postion, remove position
    // update employee, deactivate employee, activate employee
    service.removeManagePrivelage = function() {
      service = removeManagePrivelage();
    }

  }

  var removeManagePrivelage = function() {
    // Exposed factory functionality
    return {
      'init': function() {
        return getSelf();
      },
      'setManagePrivelage': function() {
        setManagePrivelage();
      },
      'removeManagePrivelage': function() {
        // do nothing
      }
    }
  }

  var service = removeManagePrivelage();

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

