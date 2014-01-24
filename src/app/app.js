var gapi;
angular.module('nos', [
        'security',
        //'templates-app',  // generated js from atpl by html2js
        //'templates-common',  // generated js from acpl by html2js
        //'common.errorHandling',
        //'nos.home',
        //'nos.about',
        //'nos.club',
        //'nos.team',
        'ui.router'
    ])
    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(['security', function (security) {
        // Get the current user when the application starts
        // (in case they are still logged in from a previous session)
        security.requestCurrentUser();
    }])
    .controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
        function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
            $scope.location = $location;
            $scope.breadcrumbs = breadcrumbs;

            $scope.isAuthenticated = security.isAuthenticated;
            $scope.isAdmin = security.isAdmin;

            $scope.home = function () {
                if (security.isAuthenticated()) {
                    $location.path('/dashboard');
                } else {
                    $location.path('/projectsinfo');
                }
            };
            $scope.isNavbarActive = function (navBarPath) {
                return navBarPath === breadcrumbs.getFirst().name;
            };

            $scope.hasPendingRequests = function () {
                return httpRequestTracker.hasPendingRequests();
            };
        }])
    .controller('AppCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $window.init = function () {
            $scope.$apply($scope.loadKenixLib);
        };
        $scope.loadKenixLib = function () {
            gapi.client.load('users', 'v1', function () {
                $scope.isBackendReady = true;
                $scope.list();
            }, 'http://localhost:8080/_ah/api');
        };
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Kenix NOS';
            }
        });
    }]);
