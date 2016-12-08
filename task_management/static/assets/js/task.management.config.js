(function () {
    'use strict';

    angular.module('task.management',
        [
            'ui.router.state',
            'ngCookies'
        ])
        .config(['$stateProvider', '$urlRouterProvider', config])
        .run(['$rootScope', '$http', '$state', '$cookies', run]);
    
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                data: {
                    isRequireLogin: false
                },
                views: {
                    'mainWrapper': {
                        templateUrl: '/static/html/login.html'
                    }
                }
            })
            .state('home', {
                url: '/task/list',
                data: {
                    isRequireLogin: true
                },
                views: {
                    'mainWrapper': {
                        templateUrl: '/static/html/task_list.html'
                    },
                    'header': {
                        templateUrl: '/static/html/header.html'
                    }

                }
            })
            .state('task-edit', {
                url: '/task/{id:[0-9]{1,8}}',
                data: {
                    isRequireLogin: true
                },

                views: {
                        'mainWrapper': {
                            templateUrl: '/static/html/task.html'
                        },
                        'header': {
                            templateUrl: '/static/html/header.html'
                        }

                    }
            })
            .state('task-add', {
                url: '/task/add',
                data: {
                    isRequireLogin: true
                },

                views: {
                        'mainWrapper': {
                            templateUrl: '/static/html/task.html'
                        },
                        'header': {
                            templateUrl: '/static/html/header.html'
                        }

                    }
            });

        $urlRouterProvider.otherwise('/task/list');
    }
    
    function run($rootScope, $http, $state, $cookies) {

        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.$on('$stateChangeStart', function (evt, toState) {

            var isRequireLogin = toState.data['isRequireLogin'];

            if (isRequireLogin && typeof $cookies.get('authenticatedAccount') === 'undefined') {
                evt.preventDefault();
                return $state.go('login');
            }
            if (!isRequireLogin && typeof $cookies.get('authenticatedAccount') != 'undefined') {
                evt.preventDefault();
                return $state.go('home');
            }
        });
    }
})();