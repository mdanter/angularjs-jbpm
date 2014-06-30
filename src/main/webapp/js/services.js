'use strict';

var app = angular.module('demoApp.services', []);

app.factory('taskFactory', function($http) {
	return {
		getAvailable : function(userName) {
			
			var obj = {tasks:null};
			
			$http.get('/angularjs-jbpm/api/rest/task/available/'+userName).success(function(data, status, headers, config) {
				obj.tasks = data.task;
			}).error(function(data, status, headers, config) {
				console.log('An error occured, please check the console logs for full information. Status code: ' + status+':'+data);
			});
			console.log(obj);
			return obj;
		},getAssigned : function(userName) {
			
			var obj = {tasks:null};
			
			$http.get('/angularjs-jbpm/api/rest/task/assigned/'+userName).success(function(data, status, headers, config) {
				obj.tasks = data.task;
			}).error(function(data, status, headers, config) {
				console.log('An error occured, please check the console logs for full information. Status code: ' + status+':'+data);
			});
			console.log(obj);
			return obj;
		},claim : function(userName, taskName, taskId) {
			
			var obj = {data:null};
			
			console.log('Claimed ' + taskName + ' with ID: ' + taskId);
			$http.put('/angularjs-jbpm/api/rest/task/claim/'+userName+'/' + taskId).success(function(data, status, headers, config) {
				console.log(data);
				obj.data = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			});
			
			console.log(obj);
			return obj;
		},release : function(userName, taskName, taskId) {
			
			var obj = {data:null};
			
			console.log('Released ' + taskName + ' with ID: ' + taskId);
			$http.put('/angularjs-jbpm/api/rest/task/release/'+userName+'/' + taskId).success(function(data, status, headers, config) {
				console.log(data);
				obj.data = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			});
			
			console.log(obj);
			return obj;
		},start : function(userName, taskName, taskId) {
			
			var obj = {data:null};
			
			console.log('Started ' + taskName + ' with ID: ' + taskId);
			$http.put('/angularjs-jbpm/api/rest/task/start/'+userName+'/' + taskId).success(function(data, status, headers, config) {
				console.log(data);
				obj.data = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			});
			
			console.log(obj);
			return obj;
		},complete : function(userName, taskName, taskId) {
			
			var obj = {data:null};
			
			console.log('Completed ' + taskName + ' with ID: ' + taskId);
			$http.put('/angularjs-jbpm/api/rest/task/complete/'+userName+'/' + taskId).success(function(data, status, headers, config) {
				console.log(data);
				obj.data = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			});
			
			console.log(obj);
			return obj;
		},getData : function(userName, taskName, taskId) {
			
			var obj = {data:null};
			
			console.log('Got data for ' + taskName + ' with ID: ' + taskId);
			$http.get('/angularjs-jbpm/api/rest/task/get-data/'+userName+'/' + taskId).success(function(data, status, headers, config) {
				console.log(data);
				obj.data = data;
			}).error(function(data, status, headers, config) {
				console.log(data);
				console.log('An error occured, please check the console logs for full information. Status code: ' + status);
			});
			
			console.log(obj);
			return obj;
		}
	};
});