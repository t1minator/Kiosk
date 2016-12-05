(function(){

'use strict';

var consent = angular.module('consent', ['ui.router', 'ngIdle']);

consent.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('auth.consent', {
			url: '/consent',
			templateUrl: 'views/consent.html',
			controller: 'privacyController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('consent');
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('consent');
				Idle.unwatch();
			}
		});
}]);

consent.controller('consentController', ['$translate', '$scope', '$state', function ($translate, $scope, $state) {
}]);

})();
