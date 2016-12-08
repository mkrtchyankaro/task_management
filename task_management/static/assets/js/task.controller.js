(function () {
    'use strict'

    angular.module('task.management').controller('TaskController', ['$scope', '$http', '$location', '$state', '$stateParams', TaskController]);

    function TaskController($scope, $http, $location, $state, $stateParams) {

        $scope.mode = "add";

        if($stateParams.id != undefined){
            $http.get('/task/detail/'+$stateParams.id).then(function (response) {
                    $scope.task = response.data;
                    $scope.mode = "edit";
                });
        }

        $scope.addOrUpdate = function () {
            if($scope.mode == "add"){
                $http.post('/task/', $scope.task).then(function (response) {
                    $location.url('/task/list/');
                });
            }else{
                $http.put('/task/detail/'+ $scope.task.id, $scope.task).then(function (response) {
                    $location.url('/task/list/');
                });
            }
        }

        var input = document.getElementById('location');
        var searchBox = new google.maps.places.SearchBox(input);

        searchBox.addListener('places_changed', function () {

            var places = searchBox.getPlaces();

            if (places.length == 0) {
                $scope.task.latitude = "";
                    $scope.task.longitude = "";
                    $scope.$apply();
            } else {
                places.forEach(function (place) {
                    $scope.task.address = place.formatted_address;
                    $scope.task.latitude = place.geometry.location.lat();
                    $scope.task.longitude = place.geometry.location.lng();
                    $scope.$apply();
                })
            }
        })

    }

}());
