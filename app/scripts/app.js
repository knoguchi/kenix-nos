'use strict';

angular.module('nosApp', [
//        'ngCookies',
//        'ngResource',
//        'ngSanitize',
//        'ngRoute',
//        'ngGrid',
//        'pos',
        'ngRoute',
        'services.breadcrumbs',
        'services.i18nNotifications',
        'services.httpRequestTracker',
        'security'
    ])
    .constant('NOS_CONFIG', {
        baseUrl: '/nos/'
    })
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        /*
         AngularJS provides a simple way to associate a view with a controller
         and load everything at runtime using the $routeProvider object.
         Routing code is typically put in a module’s config()
         */
        $locationProvider.html5Model = true;
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(['security', function (security) {
        security.requestCurrentUser();
    }])
    .controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages', function ($scope, i18nNotifications) {
        $scope.notifications = i18nNotifications;
        $scope.removeNotification = function (notification) {
            i18nNotifications.remove(notification);
        };
        $scope.$on('$routeChangeError', function (event, current, previous, rejection) {
            i18nNotifications.pushForCurrentRoute(
                'errors.route.changeError',
                'error',
                {},
                {rejection: rejection}
            );
        });
    }])
    .controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
        function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
            $scope.location = $location;
            $scope.breadcrumbs = breadcrumbs;
            $scope.isAuthenticated = security.isAuthenticated;
            $scope.isAdmin = security.isAdmin;

            $scope.home = function () {
                if (security.isAuthenticated()) {
                    $location.path('/authenticated_page');
                } else {
                    $location.path('/non_auth_page');
                }
            };

            $scope.isNavbarActive = function (navBarPath) {
                return navBarPath === breadcrumbs.getFirest().name;
            };

            $scope.hasPendingRequests = function () {
                return httpRequestTracker.hasPendingRequests();
            };

        }]);