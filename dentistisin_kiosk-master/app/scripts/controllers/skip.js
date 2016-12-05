(function(){

'use strict';

var skip = angular.module('skip', ['ui.router', 'ngIdle', 'ngJwtMessage', 'ngMeteor', 'kioskMethods']);

skip.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.skip', {
			url: '/skip',
			templateUrl: 'views/skip.html',
			controller: 'skipController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('skip');
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('skip');
				Idle.unwatch();
			}
		});
}]);

//skip.controller('skipController', ['kioskSecret', 'kioskApiKey', 'jwtAudience', '$scope', '$state', function(kioskSecret, kioskApiKey, jwtAudience, $scope, $state) {
skip.controller('skipController', ['$scope', '$state', '$jwtMessage', '$meteor', '$kioskMethods', function($scope, $state, $jwtMessage, $meteor, $kioskMethods) {
	//$scope.setStepCompleted('voip');
	$scope.setStepActive('survey');
	$scope.skip = function() {
		$scope.waitingOnRequest = true;
		//var subject = 'kiosk_createSurvey';
		//$jwtMessage.sign({
		//	session: $scope.sessionId
		//}, subject).then(function(result) {
		//	return $meteor.call(subject, [result]);
		//}).then(function(result) {
		$kioskMethods.createSurvey($scope.sessionId).then(function(result) {
			$state.go('exit');
		}).catch(function(error) {
			if(error.error === 'no-auth') {
				$state.go('config');
			} else if(error.error === 'bad-auth') {
				$state.go('config');
			} else if (error.error === 'bad-session') {
				$state.go('error');
			}
		}).finally(function() {
			$scope.waitingOnRequest = false;
		});
	};
	$scope.survey = function() {
		$state.go('^.survey');
	};
}]);

})();
