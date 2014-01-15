'use strict';
angular.module('nosApp')
    .controller('MainCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $window.init = function () {
            $scope.$apply($scope.loadPoLib);
        };
        $scope.loadPoLib = function () {
            gapi.client.load('po', 'v1', function () {
                $scope.isBackendReady = true;
                $scope.list();
            }, 'http://127.0.0.1:1919/_ah/api');
        };
    }]);
/*
 .controller('HeaderController', function ($scope, $location) {
 $scope.isActive = function (viewLocation) {
 return viewLocation === $location.path();
 };
 });
 */
