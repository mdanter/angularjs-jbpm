'use strict';


// Declare app level module which depends on filters, and services
angular.module('demoApp', ['ngRoute', 'demoApp.services', 'demoApp.directives', 'demoApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/start', {templateUrl: 'partials/start.html', controller: 'StartCtrl'});
    $routeProvider.when('/taskList', {templateUrl: 'partials/assignedTasks.html', controller: 'AssignedTasksCtrl'});
    $routeProvider.when('/availableList', {templateUrl: 'partials/availableTasks.html', controller: 'AvailableTasksCtrl'});
    $routeProvider.when('/:taskName/:taskId', {templateUrl: 'partials/composite.html', controller: 'TasksCtrl'});
    $routeProvider.otherwise({redirectTo: '/start'});
  }]);