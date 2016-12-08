(function () {
    'use strict'

    angular.module('task.management').controller('MenuController', ['$scope', '$location', 'LoginService', MenuController]);

    function MenuController($scope, $location, LoginService) {
        $scope.logout = function () {
            LoginService.logout().then(function (response) {
                $location.url('/login')
            })
        }
    }
}());