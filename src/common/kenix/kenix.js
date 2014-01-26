// https://groups.google.com/forum/#!searchin/angular/gapi/angular/uVaPf3VVgRQ/SwqGyBTzT7kJ
// https://groups.google.com/forum/#!searchin/angular/gapi/angular/zU4AhW-PSEM/b1ieO7Zw8iwJ
// http://stackoverflow.com/questions/18537687/what-is-the-difference-between-init-and-window-init
// http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory
angular.module('kenix', [])
    .factory('kenix', ['$rootScope', function ($rootScope) {
        var service = {
            login: function (email, password) {
                return gapi.client.users.auth(email, password)
                    .execute(function (response) {
                        return response.data.user;
                    });
            },
            logout: function () {
                return gapi.client.users.logout()
                    .execute(function (response) {
                        return response.data.logout_status;
                    });
            },
            currentUser: function () {
                return gapi.client.users.auth()
                    .execute(function (response) {
                        return response.result.user;
                    });
            }
        };
        return service;

    }]);


//this.login = function () {
//    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult);
//
//    return deferred.promise;
//};
//
//this.handleClientLoad = function () {
//    gapi.client.setApiKey(apiKey);
//    gapi.auth.init(function () {
//    });
//    window.setTimeout(checkAuth, 1);
//};
//
//this.checkAuth = function () {
//    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true, hd: domain }, this.handleAuthResult);
//};
//
//this.handleAuthResult = function (authResult) {
//    if (authResult && !authResult.error) {
//        var data = {};
//        gapi.client.load('users', 'v1', function () {
//            $scope.isBackendReady = true;
//            $scope.list();
//        }, 'http://localhost:8080/_ah/api');
//
//        gapi.client.load('oauth2', 'v2', function () {
//            var request = gapi.client.oauth2.userinfo.get();
//            request.execute(function (resp) {
//                $rootScope.$apply(function () {
//                    data.email = resp.email;
//                });
//            });
//        });
//        deferred.resolve(data);
//    } else {
//        deferred.reject('error');
//    }
//};
//
//this.handleAuthClick = function (event) {
//    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult);
//    return false;
//};
//
//
//}])
//;
