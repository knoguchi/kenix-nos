angular.module('nos', [
        'services.breadcrumbs',
        'services.i18nNotifications',
        'services.httpRequestTracker',
        'security',
        'templates-app',  // generated js from atpl by html2js
        'templates-common',  // generated js from acpl by html2js
        //'common.errorHandling',
        //'nos.home',
        //'nos.about',
        //'nos.club',
        //'nos.team',
        'ui.router'
    ])
    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        console.log('config');
        //$urlRouterProvider.otherwise('/home');
    })
    .run(['security', function (security) {
        console.log('run security');
        // Get the current user when the application starts
        // (in case they are still logged in from a previous session)
        //security.requestCurrentUser();
    }])
    .controller('AppCtrl', ['$scope', '$location', 'security', function ($scope, $location, security) {
        security.requestCurrentUser();
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Kenix NOS';
            }
        });
    }])
    .controller('HeaderCtrl', ['$scope', '$location', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
        function ($scope, $location, security, breadcrumbs, notifications, httpRequestTracker) {
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
        }]);
