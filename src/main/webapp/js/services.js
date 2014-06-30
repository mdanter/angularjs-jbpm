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
		}
	};
});