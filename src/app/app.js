angular.module('nosApp', [
        'templates-app',
        'templates-common',
        'nosApp.home',
        'nosApp.about',
        'ui.state',  // stateProvider
        'ui.route'  // urlRouterProvider?
//        'ngCookies',
//        'ngResource',
//        'ngSanitize',
//        'ngRoute',
//        'ngGrid',
//        'pos',
//        'ngRoute',
//        'services.breadcrumbs',
//        'services.i18nNotifications',
//        'services.httpRequestTracker',
//        'security'
    ])
    .constant('NOS_CONFIG', {
        baseUrl: '/nos/'
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])
    /*
     .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
     */
    .controller('AppCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.adata.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Kenix NOS';
            }
        });
    }])
//    .controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
//        function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
//            $scope.location = $location;
//            $scope.breadcrumbs = breadcrumbs;
//            $scope.isAuthenticated = security.isAuthenticated;
//            $scope.isAdmin = security.isAdmin;
//
//            $scope.home = function () {
//                if (security.isAuthenticated()) {
//                    $location.path('/authenticated_page');
//                } else {
//                    $location.path('/non_auth_page');
//                }
//            };
//
//            $scope.isNavbarActive = function (navBarPath) {
//                return navBarPath === breadcrumbs.getFirst().name;
//            };
//
//            $scope.hasPendingRequests = function () {
//                return httpRequestTracker.hasPendingRequests();
//            };
//
//        }]);
;