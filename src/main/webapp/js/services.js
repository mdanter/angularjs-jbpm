'use strict';

angular.module('demoApp.services', [ 'ngResource' ]).factory('AvailableTasks', function($http) {
	return {
		get : function(params) {
			return $http.get('/angularjs-jbpm/api/rest/task/available/abaxter');
		}
	};
});