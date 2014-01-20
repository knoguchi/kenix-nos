var gapi;
angular.module('nosApp')
    .controller('HomeCtrl', ['$scope', '$window', function ($scope, $window) {
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
            }, 'http://localhost:8080/_ah/api');
        };
    }]);
/*
 .controller('HeaderController', function ($scope, $location) {
 $scope.isActive = function (viewLocation) {
 return viewLocation === $location.path();
 };
 });
 */
