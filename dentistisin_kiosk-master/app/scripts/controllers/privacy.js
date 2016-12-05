(function(){

'use strict';

var privacy = angular.module('privacy', ['ui.router', 'ngIdle']);

privacy.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('auth.privacy', {
			url: '/privacy',
			templateUrl: 'views/privacy.html',
			controller: 'privacyController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('privacy');
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('privacy');
				Idle.unwatch();
			}
		});
}]);

privacy.controller('privacyController', ['$translate', '$scope', '$state', function ($translate, $scope, $state) {
}]);

})();
