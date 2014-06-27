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

		var startProcessUrl = '/angularjs-jbpm/api/rest/process/start/loanOrder';
		var headers = {
			'Content-Type' : 'application/json'
		};
		console.log('Submitting request payload: ');
		console.log($scope.myData);

		$http.post(startProcessUrl, $scope.myData, headers).success(function(data, status, headers, config) {
			console.log('Started Process Instance ID: ' + data.process.processId);
			$scope.responseData = data;
			$scope.userFeedback = 'Started Process With ID: ' + $scope.responseData.process.processId;
			$scope.myData = $scope.init();

		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
			$scope.loading = false;
		});

	};

} ])

.controller('AssignedTasksCtrl', [ '$scope', '$location', '$http', function($scope, $location, $http) {

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
		$http.get('/angularjs-jbpm/api/rest/task/assigned/abaxter').success(function(data, status, headers, config) {
			console.log(data);
			$scope.data.assignedTasks = data.task;

		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});
		
	};

	// loading data initially
	$scope.loadData();

	// function to claim a task


	// function to release a task
	$scope.releaseTask = function(taskId) {
		console.log('Released Task with ID: ' + taskId);
		$http.put('/angularjs-jbpm/api/rest/task/release/abaxter/' + taskId).success(function(data, status, headers, config) {
			console.log(data);
			$scope.loadData();
		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});
	};

	// function to start a task
	$scope.startTask = function(taskName, taskId) {
		console.log('Started ' + taskName + ' with ID: ' + taskId);
		$http.put('/angularjs-jbpm/api/rest/task/start/abaxter/' + taskId).success(function(data, status, headers, config) {
			console.log(data);
			$scope.loadData();
			$location.path('/' + taskName + '/' + taskId);
		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});
		
	};
	
	

	// function to continue a started task
	$scope.continueTask = function(taskName, taskId) {
		console.log('Continued ' + taskName + ' with ID: ' + taskId);
		$location.path('/' + taskName + '/' + taskId);
	};

} ]).controller('AvailableTasksCtrl', [ '$scope', '$location', '$http', function($scope, $location, $http) {
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
		$http.get('/angularjs-jbpm/api/rest/task/available/abaxter').success(function(data, status, headers, config) {
			console.log(data);
			$scope.data.availableTasks = data.task;

		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});
	};

	// loading data initially
	$scope.loadData();

	// function to claim a task
	$scope.claimTask = function(taskName, taskId) {
		console.log('Claimed ' + taskName + ' with ID: ' + taskId);
		$http.put('/angularjs-jbpm/api/rest/task/claim/abaxter/' + taskId).success(function(data, status, headers, config) {
			console.log(data);
			$scope.loadData();
		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});

	};

} ]).controller('TasksCtrl', [ '$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http) {

	$scope.userFeedback = '';

	// creating the necessary parameters for the
	// composite page here
	$scope.taskId = $routeParams.taskId;
	$scope.taskName = 'partials/tasks/' + $routeParams.taskName + '.html';

	console.log('Loading composite.html with ' + $scope.taskName + ' and task ID: ' + $scope.taskId);

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

	if ($routeParams.taskName == 'humanTask1') {
		
		
		$scope.myData = $scope.init();
		// do get request for task data and populate scope myData with it
		$http.get('/angularjs-jbpm/api/rest/task/get-data/abaxter/' + $scope.taskId).success(function(data, status, headers, config) {
			console.log(data);
			$scope.myData = data;

		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});

	} else if ($routeParams.taskName == 'humanTask2') {
		
		$scope.myData = $scope.init();

		// do get request for task data and populate scope myData with it
		$http.get('/angularjs-jbpm/api/rest/task/get-data/abaxter/' + $scope.taskId).success(function(data, status, headers, config) {
			console.log(data);
			$scope.myData = data;
			
		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.userFeedback = 'An error occured, please check the console logs for full information. Status code: ' + status;
		});

	}

	// tie this to the submit button
	$scope.completeTask = function() {
		var startProcessUrl = '/angularjs-jbpm/api/rest/task/complete/abaxter/' + $scope.taskId;
		var headers = {
			'Content-Type' : 'application/json'
		};
		$scope.loading = true;
		$http.put(startProcessUrl, $scope.myData, headers).success(function(data, status, headers, config) {
			console.log(data);
			$location.path('/avilableList');
			
		}).error(function(data, status, headers, config) {
			console.log(data);
			$scope.loading = false;
		});
	};

} ]);