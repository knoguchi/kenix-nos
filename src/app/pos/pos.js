
/*
angular.module('nos.controllers', [])
    .controller('urchaseOrderViewCtrl',
        ['$scope', 'purchaseOrderService',
            function ($scope, purchaseOrderService) {
                purchaseOrderService.loadData($scope);
            }]);

angular.module('nos.services', [])
    .service('purchaseOrderService', [function () {
        this.loadData = function ($scope) {
            // Async call to google service
            gapi.client.nos.pos.list().execut(
                function (resp) {
                    if (!resp.code) {
                        console.debug(resp);
                        $scope.purchase_orders = resp.items;
                        // because it's a callback,
                        // we need to notify angular of the data refresh
                        $scope.gridOptions = { data: 'purchase_orders' };
                        $scope.apply();
                    }
                });
        };
    }]);
*/
