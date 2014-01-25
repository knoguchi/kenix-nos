// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
        'kenix',
        'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
        'security.login',         // Contains the login form template and controller
        'ui.bootstrap'     // Used to display the login form as a modal dialog.
    ])

    .factory('security', ['kenix', '$q', '$location', 'securityRetryQueue', '$modal', function (kenix, $q, $location, queue, $modal) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        // Login form dialog stuff
        var loginDialog = null;

        function openLoginDialog() {
            if (loginDialog) {
                throw new Error('Trying to open a dialog that is already open!');
            }
            loginDialog = $modal.dialog();
            loginDialog.open('security/login/form.tpl.html', 'LoginFormController').then(onLoginDialogClose);
        }

        function closeLoginDialog(success) {
            if (loginDialog) {
                loginDialog.close(success);
            }
        }

        function onLoginDialogClose(success) {
            loginDialog = null;
            if (success) {
                queue.retryAll();
            } else {
                queue.cancelAll();
                redirect();
            }
        }

        // Register a handler for when an item is added to the retry queue
        queue.onItemAddedCallbacks.push(function (retryItem) {
            if (queue.hasMore()) {
                service.showLogin();
            }
        });

        // The public API of the service
        var service = {

            // Get the first reason for needing a login
            getLoginReason: function () {
                return queue.retryReason();
            },

            // Show the modal login dialog
            showLogin: function () {
                openLoginDialog();
            },

            // Attempt to authenticate a user by the given email and password
            login: function (email, password) {
                var currentUser = kenix.login({email: email, password: password});
                if (currentUser) {
                    service.currentUser = currentUser;
                    if (service.isAuthenticated()) {
                        closeLoginDialog(true);
                    }
                    return service.isAuthenticated();
                }
            },

            // Give up trying to login and clear the retry queue
            cancelLogin: function () {
                closeLoginDialog(false);
                redirect();
            },

            // Logout the current user and redirect
            logout: function (redirectTo) {
                var status = kenix.logout();
                if (status) {
                    service.currentUser = null;
                    redirect(redirectTo);
                }
            },

            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function () {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {
                    var currentUser = kenix.checkAuth();
                    if (currentUser) {
                        service.currentUser = currentUser;
                        return service.currentUser;
                    }
                }
            },

            // Information about the current user
            currentUser: null,

            // Is the current user authenticated?
            isAuthenticated: function () {
                return !!service.currentUser;
            },

            // Is the current user an adminstrator?
            isAdmin: function () {
                return !!(service.currentUser && service.currentUser.admin);
            }
        };

        return service;
    }]);
