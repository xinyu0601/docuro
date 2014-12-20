'use strict';

angular.module('docuro', ['ngRoute', 'docuro.services', 'docuro.filters', 'masthead', 'footer', 'dashboard', 'container', 'containers', 'sidebar', 'images'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'app/components/dashboard/dashboard.html', controller: 'DashboardController'});
        $routeProvider.when('/containers/', {templateUrl: 'app/components/containers/containers.html', controller: 'ContainersController'});
        $routeProvider.when('/containers/:id/', {templateUrl: 'app/components/container/container.html', controller: 'ContainerController'});
        $routeProvider.when('/images/', {templateUrl: 'app/components/images/images.html', controller: 'ImagesController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    // This is your docker url that the api will use to make requests
    // You need to set this to the api endpoint without the port i.e. http://192.168.1.9
    .constant('DOCKER_ENDPOINT', '/dockerapi')
    .constant('DOCKER_PORT', '') // Docker port, leave as an empty string if no port is requred.  If you have a port, prefix it with a ':' i.e. :4243
    .constant('UI_VERSION', 'v0.5')
    .constant('DOCKER_API_VERSION', 'v1.15');
