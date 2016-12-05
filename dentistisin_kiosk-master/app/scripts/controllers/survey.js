(function(){

'use strict';

var survey = angular.module('survey', ['ui.router', 'ngJwtMessage', 'tooltipRadio', 'ngMeteor', 'kioskMethods']);

survey.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.survey', {
			url: '/survey',
			templateUrl: 'views/survey.html',
			controller: 'surveyController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('survey');
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('survey');
				Idle.unwatch();
			}
		});
}]);

//survey.controller('surveyController', ['kioskSecret', 'kioskApiKey', 'jwtAudience', '$scope', '$state', function (kioskSecret, kioskApiKey, jwtAudience, $scope, $state) {
survey.controller('surveyController', ['$scope', '$state', '$jwtMessage', '$meteor', '$kioskMethods', function ($scope, $state, $jwtMessage, $meteor, $kioskMethods) {
	//$scope.setStepActive('survey');

	$scope.survey = {
		waitTime: {
			name: 'surveyWaitTime',
			transRoot: 'SURVEY.WAIT_TIME',
			options: [
				'FIVE_MINUTES',
				'TEN_MINUTES',
				'FIFTEEN_MINUTES',
				'TWENTY_MINUTES'
			]
		},
		understanding: {
			name: 'surveyUnderstanding',
			transRoot: 'SURVEY.UNDERSTANDING',
			options: [
				'T',
				'F'
			]
		},
		treatment: {
			name: 'surveyTreatment',
			transRoot: 'SURVEY.TREATMENT',
			options: [
				'THREE_DAYS',
				'FIVE_DAYS',
				'NEVER'
			]
		},
		pleased: {
			name: 'surveyPleased',
			transRoot: 'SURVEY.PLEASED',
			options: [
				'T',
				'F'
			]
		},
		refer: {
			name: 'surveyRefer',
			transRoot: 'SURVEY.REFER',
			options: [
				'T',
				'F'
			]
		}
	};

	$scope.surveyModel = {};

	$scope.surveySubmit = function() {
		$scope.waitingOnRequest = true;
		//var subject = 'kiosk_createSurvey';
		//$jwtMessage.sign({
		//	survey: $scope.surveyModel,
		//	session: $scope.sessionId
		//}, subject).then(function(result) {
		//	return $meteor.call(subject, [result]);
		//}).then(function(result) {
		$kioskMethods.createSurvey($scope.sessionId, $scope.surveyModel).then(function(result) {
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
}]);

})();
