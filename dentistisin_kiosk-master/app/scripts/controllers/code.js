(function(){

'use strict';

var code = angular.module('code', ['ui.router', 'ngIdle', 'tooltipInput', 'ngJwtMessage', 'ngMeteor', 'kioskMethods']);

code.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('auth.code', {
			url: '/code',
			templateUrl: 'views/code.html',
			controller: 'codeController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('code');
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('code');
				Idle.unwatch();
			}
		});
}]);

code.controller('codeController', ['$timeout', '$translate', '$scope', '$state', '$jwtMessage', '$meteor', '$kioskMethods', function ($timeout, $translate, $scope, $state, $jwtMessage, $meteor, $kioskMethods) {
	$timeout(function() {
		var privacyTemp = $scope.authModel.privacyAccept;
		var consentTemp = $scope.authModel.consentAccept;
		$scope.$apply(function() {
			delete $scope.authModel.privacyAccept;
			delete $scope.authModel.consentAccept;
		});
		$scope.$apply(function() {
			$scope.authModel.privacyAccept = privacyTemp;
			$scope.authModel.consentAccept = consentTemp;
		});
	});

	$scope.code = {
		required: true,
		maxlength: 20,
		pattern: /^[0-9]*$/,
		trim: true,
		type: 'text',
		reset: ['rejected'],
		name: 'codeCode',
		transRoot: 'CODE.CODE'
	};

	$scope.langSelect = function () {
		$state.go('language');
	};

	$scope.codeSubmit = function () {
		//if (!$scope.hipaaAccept) return;
		if (!$scope.authModel.privacyAccept || !$scope.authModel.consentAccept) return;
		$scope.waitingOnRequest = true;
		//var subject = 'kiosk_createSession';
		//$jwtMessage.sign({
		//	code: $scope.codeCodeModel,
		//	lang: $translate.use()
		//}, subject).then(function(result) {
		//	//console.log(result);
		//	return $meteor.call(subject, [result]);
		//}).then(function(result) {
		$kioskMethods.createSession($scope.authModel.code, $translate.use()).then(function(result) {
			$state.go('session.form.patient', {sessionId: result});
		}).catch(function(error) {
			// Deal with all of the potential errors
			if(error.error === 'no-auth') {
				$state.go('config');
			} else if(error.error === 'bad-code') {
				$scope.codeForm.codeCode.$setValidity('rejected', false);
			} else if(error.error === 'bad-auth') {
				$state.go('config');
			} else if(error.error === 'bad-message') {
				//console.log(error.error);
			} else if(error.error === 'bad-data') {
				//console.log(error.error);
			}
		}).finally(function() {
			$scope.waitingOnRequest = false;
		});
	};
}]);

})();
