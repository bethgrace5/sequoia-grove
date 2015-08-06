
'use strict';

/**
 * @ngdoc overview
 * @name sequoiaGroveApp
 * @description
 * # sequoiaGroveApp
 *
 * Main module of the application.
 */
angular.module('sequoiaGroveApp').controller('carsCtrl', function($scope, $http) {
        alert('cars!!');

    //the first asynchronous request will be the page #1
    var page=1;

        //when the user enters in the site the 3 cars are loaded through SpringMVC
        //by default AngularJS cars is empty
        $scope.cars = [];

        $scope.test = "Test Controller";

        //that is the way for bindding 'click' event to a AngularJS function
        //javascript cannot know the context, so we give it as a parameter
        $scope.load = function(context){
            //Asynchronous request, if you know jQuery, this one works like $.ajax
            $http({
                url: context+'/load/'+page,
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                //data contains the model which is send it by the Spring controller in JSON format
                //$scope.cars.push is the way to add new cars into $scope.cars array
                for(i=0; i< data.carList.length; i++) {
                    $scope.cars.push(data.carList[i]);
                    console.log(data.carList[i]);
                }

            page++; //updating the page
            page%=5; //our bean contains 15 cars, 3 cars par page = 5 pages, so page 5=0

            }).error(function (data, status, headers, config) {
                alert(status);
            });           
        }

  });
