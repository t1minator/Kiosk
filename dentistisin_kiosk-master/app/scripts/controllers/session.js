(function(){

'use strict';

var session = angular.module('session', ['ui.router', 'ngAnimate', 'ngLodash', 'form', 'voip', 'skip', 'survey']);

session.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session', {
			abstract: true,
			url: '/session/{sessionId:[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}}',
			templateUrl: 'views/session.html',
			controller: 'sessionController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader'
			},
			onEnter: function(translatePartialLoader) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('session');
			},
			onExit: function(translatePartialLoader) {
				translatePartialLoader.deletePart('session');
			}
		});
}]);

session.controller('sessionController', ['$stateParams', '$scope', '_', function ($stateParams, $scope, _) {
	$scope.sessionId = $stateParams.sessionId;
	$scope.stepState = {
		patient: { disabled: true },
		medical: { disabled: true },
		dental: { disabled: true },
		voip: { disabled: true },
		survey: { disabled: true }
	};

	var flags = ['completed', 'active', 'disabled'];
	var steps = ['patient', 'medical', 'dental', 'voip', 'survey'];
	var setFlag = function(step, flag) {
		_.each(flags, function(flag) {
			$scope.stepState[step][flag] = false;
		});
		$scope.stepState[step][flag] = true;
	};

	$scope.setStepCompleted = function(step) {
		if (_.contains(steps, step)) {
			setFlag(step, 'completed');
		}
	};

	$scope.setStepActive = function(step) {
		if (_.contains(steps, step)) {
			setFlag(step, 'active');
		}
	};
}]);

})();
