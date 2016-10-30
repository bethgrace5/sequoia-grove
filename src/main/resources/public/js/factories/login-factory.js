'use strict';

// Factory to inject authorization token with each request sent
angular.module('sequoiaGroveApp').factory('loginFactory', function ( $log, localStorageService, $q, $http, $rootScope, $timeout) {
  var service = {};
  var observerCallbacks = [];

  var user = {'isManager':false};
  var loggedIn = false;

  // call this to notify observers
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  function appSignUp(gapi) {
    var deferred = $q.defer();
    $http.post($rootScope.urlPrefix + '/signup', {'email':user.email, 'idtoken':user.token}).
      then(function(success){
        // TODO get more explicit permissions for UI control
        //user.isManager = parseInt(success.data.user.classificationId) !== 1;
        //user.id = success.data.user.id;
        //user.locations = success.data.user.locations;
        //user.business = success.data.user.businessId;
        //deferred.resolve(user);
      }
    );
    return deferred.promise;
  }

  // User initialized login
  function appSignIn(gapi) {
    var deferred = $q.defer();
    $http.post($rootScope.urlPrefix + "/auth/login/", {'email':user.email, 'idtoken':user.token}).
      then(function(success){
        if (success.data.loginFailed) {
          deferred.reject(success.data);
          user = {};
          loggedIn = false;
        }
        else {
          //console.log(success.data);
          // TODO get more explicit permissions for UI control
          user.isManager = parseInt(success.data.user.classificationId) !== 1;
          user.id = success.data.user.id;
          user.locations = success.data.user.locations;
          user.business = success.data.user.businessId;
          deferred.resolve(user);
        }
      }, function(failure) {
          deferred.reject(user);
      }
    );
    return deferred.promise;
  }

  // cleanup data, remove session, and logout
  function destructData() {
    var deferred = $q.defer();
    // remove session
    $http({ url: $rootScope.urlPrefix + '/auth/logout', method: "POST" }).then( function(success) {
      deferred.resolve(success);
    });
    return deferred.promise;
  }

  // sign in this app with google, then send to verify signing and get user in db
  function googleSignIn(googleUser, gapi) {
    var deferred = $q.defer();
    var auth2 = gapi.auth2.getAuthInstance();
    var profile = googleUser.getBasicProfile();
    user = {
      'google_id':profile.getId(),
      'email': profile.getEmail(),
      'name': profile.getName(),
      'firstname': profile.getGivenName(),
      'lastname': profile.getFamilyName(),
      'profile_photo':profile.getImageUrl(),
      'token':googleUser.getAuthResponse().id_token,
      'is_manager':false,
      'id':'',
    };
    // user hasn't set a photo with google
    if (user.profile_photo == undefined) {
      user.profile_photo = 'img/user-icon.png';
    }
    deferred.resolve();
    return deferred.promise;
  }

  // signout google with this application
  function signOut(gapi) {
    var deferred = $q.defer();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      deferred.resolve();
    });
    return deferred.promise;
  }

  // log user out and redirect to google to sign out of their account
  function switchUser(gapi) {
    var deferred = $q.defer();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      deferred.resolve();
    });
    return deferred.promise;
  }

/* Exposed service functions*/

  // sign in - first calls google then this app
  service.signIn = function(googleUser, gapi) {
    var deferred = $q.defer();
    // if the user successfully signed in with google
    if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
      $log.debug("gapi.auth2 is signed in");
      googleSignIn(googleUser, gapi).then(
          function() {
            appSignIn(gapi).then(
              function(success) {
                loggedIn = true;
                notifyObservers();
                deferred.resolve(success);
              },
              function(failure) {
                deferred.reject(failure);
              });
          });
    }
    else {
      deferred.reject(false);
    }
    return deferred.promise;
  };

  service.signUp = function(googleUser, gapi) {
    var deferred = $q.defer();
    // if the user successfully signed in with google
    if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
      googleSignIn(googleUser, gapi).
        then(function() {
          appSignIn(gapi).
            then(function(success) {
              //loggedIn = true;
              //notifyObservers();
              deferred.resolve(success);
            }, function(failure) {
              //deferred.reject(failure);
            });
        });
    }
    else {
      deferred.reject(false);
    }
    return deferred.promise;
  };

  // sign out - first calls google then this app
  service.signOut = function(gapi) {
    var deferred = $q.defer();
    signOut(gapi).then(function() {
        destructData().then(function() {
          user = {'isManager':false};
          loggedIn = false;
          notifyObservers();
          deferred.resolve();
        });
      });
    return deferred.promise;
  };

  // sign out entire google account first, then this app
  service.switchUser = function() {
    var deferred = $q.defer();
    switchUser(gapi).
      then(function(success) {
        destructData().
        then(function() {
          user = {'isManager':false};
          loggedIn = false;
          notifyObservers();
          deferred.resolve();
        });
      })
    return deferred.promise;
  };

  // get logged in user
  service.getUser = function() {
    return user;
  };

  // determine login status
  service.isLoggedIn = function() {
    return loggedIn;
  }

  // register observers
  service.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  return service
});

