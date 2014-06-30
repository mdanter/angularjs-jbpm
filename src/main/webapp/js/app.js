'use strict';

// Declare app level module which depends on filters, and services
angular.module(
		'demoApp',
		[ 'ngRoute', 'demoApp.services', 'demoApp.directives',
				'demoApp.controllers' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/startProcess', {
				templateUrl : 'partials/start.html',
				controller : 'StartCtrl'
			});
			$routeProvider.when('/assignedTasks', {
				templateUrl : 'partials/assignedTasks.html',
				controller : 'AssignedTasksCtrl',
				resolve : {
					'AssignedTaskData' : function(taskFactory) {
						return taskFactory.getAssigned;
					}
				}
			});
			$routeProvider.when('/availableTasks', {
				templateUrl : 'partials/availableTasks.html',
				controller : 'AvailableTasksCtrl',
				resolve : {
					'AvailableTaskData' : function(taskFactory) {
						return taskFactory.getAvailable;
					}
				}
			});
			$routeProvider.when('/:taskName/:taskId', {
				templateUrl : 'partials/composite.html',
				controller : 'TasksCtrl'
			});
			$routeProvider.otherwise({
				redirectTo : '/startProcess'
			});
		} ]);