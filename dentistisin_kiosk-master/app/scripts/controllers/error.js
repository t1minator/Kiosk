(function(){

'use strict';

var error = angular.module('error', ['ui.router']);

error.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('error', {
			url: '/error',
			templateUrl: 'views/error.html',
			controller: 'errorController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader'
			},
			onEnter: function(translatePartialLoader) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('error');
			},
			onExit: function(translatePartialLoader) {
				translatePartialLoader.deletePart('error');
			}
		});
}]);

error.controller('exitController', ['$state', '$timeout', function ($state, $timeout) {
	$timeout(function() {
		$state.go('language');
	}, 30000);
}]);

})();
