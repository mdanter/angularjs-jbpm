'use strict';

angular.module('demoApp.services', [ 'ngResource' ]).factory('AvailableTasks', function($http) {
	return {
		get : function(params) {
			return $http.get('/web-reference-1.1.0/services/task/get-available/admin');
		}
	};
});