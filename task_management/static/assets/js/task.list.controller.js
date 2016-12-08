(function () {
    'use strict'

    angular.module('task.management').controller('TaskListController', ['$scope', '$http', TaskListController]);

    function TaskListController($scope, $http) {
        $scope.markers = [];
        $scope.taskList = [];

        $http.get('/task').then(function (response) {
            $scope.taskList = response.data;
            $scope.addMarkers($scope.taskList);
        });

        $scope.deleteTask = function (task) {
            $http.delete('/task/detail/' + task.id).then(function (response) {
                var index = $scope.taskList.indexOf(task);
                $scope.taskList.splice(index, 1);
                $scope.addMarkers($scope.taskList);
            })
        }

        $scope.loadMarker = function (name) {
            return google.maps.event.trigger($scope.markers[name], 'click');
        }

        $scope.addMarkers = function (markers) {

            var mapOptions = {mapTypeId: 'roadmap'};
            var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
            var bounds = new google.maps.LatLngBounds();


            var infoWindow = new google.maps.InfoWindow(), marker, i;

            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i]['latitude'], markers[i]['longitude']);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i]['name'],
                    address: markers[i]['address'],
                    description: markers[i]['description'],
                });

                $scope.markers[markers[i]['name']] = marker;

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        var infoWindowContent = '<div class="info_content">' +
                            '<h5>' + marker.title + '</h5>' +
                            '<p>' + marker.address + '</p>' +
                            '<p>' + marker.description + '</p>' +
                            '</div>';
                        infoWindow.setContent(infoWindowContent);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

                map.fitBounds(bounds);
            }
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                this.setZoom(2);
                google.maps.event.removeListener(boundsListener);
            });
        }


    }
}());