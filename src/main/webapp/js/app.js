'use strict';


// Declare app level module which depends on filters, and services
angular.module('demoApp', ['ngRoute', 'demoApp.services', 'demoApp.directives', 'demoApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/start', {templateUrl: 'partials/start.html', controller: 'StartCtrl'});
    $routeProvider.when('/taskList', {templateUrl: 'partials/taskList.html', controller: 'TaskListCtrl'});
    $routeProvider.when('/availableList', {templateUrl: 'partials/availableList.html', controller: 'AvailableListCtrl'});
    $routeProvider.when('/station/:taskId', {templateUrl: 'partials/station.html', controller: 'StationCtrl'});
    $routeProvider.when('/:taskName/:taskId', {templateUrl: 'partials/composite.html', controller: 'TasksCtrl'});
    $routeProvider.otherwise({redirectTo: '/start'});
  }]);