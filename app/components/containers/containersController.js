angular.module('containers', [])
.controller('ContainersController', ['$scope', 'Container', 'Settings', 'Messages', 'ViewSpinner', 
function($scope, Container, Settings, Messages, ViewSpinner) {
    $scope.predicate = '-Created';
    $scope.toggle = false;
    $scope.displayAll = Settings.displayAll;

    var update = function(data) {
        ViewSpinner.spin();
        Container.query(data, function(d) {
            $scope.containers = d.map(function(item) {
                return new ContainerViewModel(item); });
            ViewSpinner.stop();
        });
    };

    var batch = function(items, action, msg) {
        ViewSpinner.spin();
        var counter = 0;
        var complete = function() {
            counter = counter -1;
            if (counter === 0) {
                ViewSpinner.stop();
                update({all: Settings.displayAll ? 1 : 0});
            }
        };
        angular.forEach(items, function(c) {
            if (c.Checked) {
                counter = counter + 1;
                action({id: c.Id}, function(d) {
                    Messages.send("Container " + msg, c.Id);
                    var index = $scope.containers.indexOf(c);
                    complete();
                }, function(e) {
                    Messages.error("Failure", e.data);
                    complete();
                });
            }
        });
        if (counter === 0) {
            ViewSpinner.stop();
        }
    };

    $scope.toggleSelectAll = function() {
        angular.forEach($scope.containers, function(i) {
            i.Checked = $scope.toggle;
        });
    };

    $scope.toggleGetAll = function() {
        Settings.displayAll = $scope.displayAll;
        update({all: Settings.displayAll ? 1 : 0});
    };

    $scope.stopAction = function() {
        batch($scope.containers, Container.stop, "Stopped");
    };

    $scope.killAction = function() {
        batch($scope.containers, Container.kill, "Killed");
    };

    update({all: Settings.displayAll ? 1 : 0});
}]);
