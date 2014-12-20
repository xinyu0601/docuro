angular.module('container', [])
.controller('ContainerController', ['$scope', '$routeParams', '$location', 'Container', 'Messages', 'ViewSpinner',
function($scope, $routeParams, $location, Container, Messages, ViewSpinner) {
    $scope.changes = [];

    var update = function() {
        Container.get({id: $routeParams.id}, function(d) {
            $scope.container = d;
            ViewSpinner.stop();
        }, function(e) {
            if (e.status === 404) {
                $('.detail').hide();
                Messages.error("Not found", "Container not found.");
            } else {
                Messages.error("Failure", e.data);
            }
            ViewSpinner.stop();
        });
    };

    $scope.stop = function() {
        ViewSpinner.spin();
        Container.stop({id: $routeParams.id}, function(d) {
            update();
            Messages.send("Container stopped", $routeParams.id);
        }, function(e) {
            update();
            Messages.error("Failure", "Container failed to stop." + e.data);
        });
    };

    $scope.kill = function() {
        ViewSpinner.spin();
        Container.kill({id: $routeParams.id}, function(d) {
            update();
            Messages.send("Container killed", $routeParams.id);
        }, function(e) {
            update();
            Messages.error("Failure", "Container failed to die." + e.data);
        });
    };

    $scope.remove = function() {
        ViewSpinner.spin();
        Container.remove({id: $routeParams.id}, function(d) {
            update();
            Messages.send("Container removed", $routeParams.id);
        }, function(e){
            update();
            Messages.error("Failure", "Container failed to remove." + e.data);
        });
    };

    $scope.hasContent = function(data) {
        return data !== null && data !== undefined;
    };

    $scope.getChanges = function() {
        ViewSpinner.spin();
        Container.changes({id: $routeParams.id}, function(d) {
            $scope.changes = d;
            ViewSpinner.stop();
        });
    };

    update();
    $scope.getChanges();
}]);
