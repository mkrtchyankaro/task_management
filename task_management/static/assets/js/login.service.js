(function () {
    'use strict'

    angular.module('task.management').service('LoginService', ['$http', '$location', '$cookies', LoginService]);

    function LoginService($http, $location, $cookies) {

        var service = {};

        service.login = function (user) {

            return $http.post('/auth_user/login/', user).then(function (response) {
                    service.setAuthenticatedAccount(response);
                });
        };

        service.logout = function () {
            return $http.get('/auth_user/logout/').then(function (response) {
                    service.unauthenticate();
                });
        }

        service.setAuthenticatedAccount = function (userData) {
            $cookies.put("authenticatedAccount", JSON.stringify(userData));
        };

        service.isAuthenticated = function () {
            return !!$cookies.get("authenticatedAccount");
        };

        service.unauthenticate = function () {
            $cookies.remove("authenticatedAccount");
        };

        return service;

    }
}());
