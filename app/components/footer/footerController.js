angular.module('footer', [])
.controller('FooterController', ['$scope', 'Settings', function($scope, Settings) {
    $scope.template = 'app/components/footer/statusbar.html';

    $scope.apiVersion = Settings.version;
}]);
