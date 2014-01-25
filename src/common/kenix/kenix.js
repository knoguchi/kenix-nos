// https://groups.google.com/forum/#!searchin/angular/gapi/angular/uVaPf3VVgRQ/SwqGyBTzT7kJ
// https://groups.google.com/forum/#!searchin/angular/gapi/angular/zU4AhW-PSEM/b1ieO7Zw8iwJ
// http://stackoverflow.com/questions/18537687/what-is-the-difference-between-init-and-window-init
// http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory
angular.module('kenix', [])
    .service('kenix', ['$rootScope', '$q', function ($rootScope, $q) {
        var clientId = 'CLIENT_ID',
            apiKey = 'API_KEY',
            scopes = 'https://www.googleapis.com/auth/userinfo.email https://www.google.com/m8/feeds',
            domain = '{MY COMPANY DOMAIN}',
            userEmail,
            deferred = $q.defer();

        this.login = function () {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult);

            return deferred.promise;
        };

        this.handleClientLoad = function () {
            gapi.client.setApiKey(apiKey);
            gapi.auth.init(function () {
            });
            window.setTimeout(checkAuth, 1);
        };

        this.checkAuth = function () {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true, hd: domain }, this.handleAuthResult);
        };

        this.handleAuthResult = function (authResult) {
            if (authResult && !authResult.error) {
                var data = {};
                gapi.client.load('users', 'v1', function () {
                    $scope.isBackendReady = true;
                    $scope.list();
                }, 'http://localhost:8080/_ah/api');

                gapi.client.load('oauth2', 'v2', function () {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function (resp) {
                        $rootScope.$apply(function () {
                            data.email = resp.email;
                        });
                    });
                });
                deferred.resolve(data);
            } else {
                deferred.reject('error');
            }
        };

        this.handleAuthClick = function (event) {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false, hd: domain }, this.handleAuthResult);
            return false;
        };


        // The public API of the service
        var service = {
            login: function (email, password) {
                return gapi.client.kenix.users.auth(email, password)
                    .execute(function (response) {
                        return response.data.user;
                    });
            },
            logout: function () {
                return gapi.client.kenix.users.logout()
                    .execute(function (response) {
                        return response.data.logout_status;
                    });
            },
            currentUser: function () {
                return gapi.client.kenix.users.currentUser()
                    .execute(function (response) {
                        return response.data.currentUser;
                    });
            }
        };
        return service;
    }]);
