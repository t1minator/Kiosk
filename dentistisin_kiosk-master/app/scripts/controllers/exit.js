(function(){

'use strict';

var exit = angular.module('exit', ['ui.router']);

exit.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('exit', {
			url: '/exit',
			templateUrl: 'views/exit.html',
			controller: 'exitController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader'
			},
			onEnter: function(translatePartialLoader) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('exit');
			},
			onExit: function(translatePartialLoader) {
				translatePartialLoader.deletePart('exit');
			}
		});
}]);

exit.controller('exitController', ['$state', '$timeout', function ($state, $timeout) {
	$timeout(function() {
		$state.go('language');
	}, 15000);
}]);

})();
