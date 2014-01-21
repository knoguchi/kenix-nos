angular.module('nos', [
        'templates-app',  // generated js from atpl by html2js
        'templates-common',  // generated js from acpl by html2js
        'common.errorHandling',
        //'nos.home',
        'nos.about',
        //'nos.club',
        //'nos.team',
        'ui.router'
    ])
    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | Kenix NOS';
            }
        });
    });
