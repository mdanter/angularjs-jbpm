'use strict';

angular.module('demoApp.controllers', []).controller('StartCtrl', [ '$scope', '$http', function($scope, $http) {
	$scope.loading = false;
	$scope.init = function() {
		return {
			loanOrder : {
					firstName : '',
					lastName : '',
					loanOrder : '',
			}
		};
	};

	$scope.isNumber = angular.isNumber;
	$scope.userFeedback = '';

	// Instantiate an object to store your scope data in (Best Practices)
	$scope.myData = $scope.init();
	console.log($scope.myData);
	
	$scope.responseData = '';

	$scope.startProcess = function() {

		$scope.loading = true;
		var startProcessUrl = 'angularjs-jbpm/api/rest/process/start/loanOrder';
		var headers={
				'Content-Type' : 'application/json'
		};
		
		console.log('Submitting request payload: ');
		console.log($scope.myData);
		$http.post(startProcessUrl, $scope.myData, headers).success(function(data, status, headers, config){
			$scope.userFeedback = 'Started Process With ID: ' + $scope.responseData;
			$scope.responseData = data;
			$scope.userFeedback = 'Started Process With ID: ' + $scope.responseData.process.processId;
			$scope.myData = $scope.init();
		}).error(function(data, status, headers, config){
			console.log(data);
			console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			$scope.loading = false;
		});

	};

} ])

.controller('AssignedTasksCtrl', [ '$scope', '$location', '$http','taskFactory', function($scope, $location, $http, taskFactory) {

	$scope.showCompleted = '';
	$scope.completedFilter = '';

	$scope.data = {};
	$scope.userFeedback = '';

	$scope.filterCompleted = function(task) {
		if ($scope.showCompleted) {
			return true;
		} else {
			return task.status != "Completed";
		}
	};

	// function to load assigned and available tasks
	$scope.loadData = function() {
		$scope.data.assignedTasks = taskFactory.getAssigned('abaxter');
		
	};

	// loading data initially
	$scope.loadData();

	// function to release a task
	$scope.releaseTask = function(taskName, taskId) {
		taskFactory.release('abaxter', taskName, taskId);
		$scope.loadData();
	};

	// function to start a task
	$scope.startTask = function(taskName, taskId) {
		taskFactory.start('abaxter', taskName, taskId);
		$scope.loadData();
		$location.path('/' + taskName + '/' + taskId);
	};
	
	

	// function to continue a started task
	$scope.continueTask = function(taskName, taskId) {
		console.log('Continued ' + taskName + ' with ID: ' + taskId);
		$location.path('/' + taskName + '/' + taskId);
	};

} ]).controller('AvailableTasksCtrl', [ '$scope', '$location', '$http','taskFactory', function($scope, $location, $http, taskFactory) {
	$scope.init = function() {
		return {
			loanOrder : {
					firstName : '',
					lastName : '',
					loanOrder : '',
			}
		};
	};
	
	
	$scope.showCompleted = '';
	$scope.completedFilter = '';

	$scope.data = {};
	$scope.userFeedback = '';

	$scope.filterCompleted = function(task) {
		if ($scope.showCompleted) {
			return true;
		} else {
			return task.status != "Completed";
		}
	};

	// function to load assigned and available tasks
	$scope.loadData = function() {
		$scope.data.availableTasks = taskFactory.getAvailable('abaxter');
	};

	// loading data initially
	$scope.loadData();

	// function to claim a task
	$scope.claimTask = function(taskName, taskId) {
		taskFactory.claim('abaxter', taskName, taskId);
		$scope.loadData();
	};

} ]).controller('TasksCtrl', [ '$scope', '$routeParams', '$location', '$http', 'taskFactory', function($scope, $routeParams, $location, $http, taskFactory) {

	$scope.userFeedback = '';

	// creating the necessary parameters for the
	// composite page here
	$scope.taskId = $routeParams.taskId;
	$scope.taskName = $routeParams.taskName;
	$scope.taskFormPath = 'partials/tasks/' + $routeParams.taskName + '.html';
	console.log('Loading composite.html with ' + $scope.taskFormPath + ' and task ID: ' + $scope.taskId);

	$scope.loading = false;
	
	$scope.init = function() {
		return {
			loanOrder : {
					firstName : '',
					lastName : '',
					loanOrder : '',
			}
		};
	};

	$scope.myData = $scope.init();
	
	if ($routeParams.taskName == 'humanTask1') {
		
		$scope.myData = taskFactory.getData('abaxter', $scope.taskName, $scope.taskId);
		
	} else if ($routeParams.taskName == 'humanTask2') {
		
		$scope.myData = taskFactory.getData('abaxter', $scope.taskName, $scope.taskId);

	}

	// tie this to the submit button
	$scope.completeTask = function(taskName, taskId) {
		
		taskFactory.complete('abaxter', taskName, taskId);
		$location.path('/avilableTasks');
		
	};

} ]);