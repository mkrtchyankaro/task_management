(function () {
    'use strict'

    angular.module('task.management').controller('LoginController', ['$scope', '$location', 'LoginService', LoginController]);

    function LoginController($scope, $location, LoginService) {

        $scope.login = function () {
            LoginService.login($scope.user).then(function () {
                $location.url('/')
            },
            function () {
                $scope.login_error="Invalid email/password combination";
            });
        }
    }

}());