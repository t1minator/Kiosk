(function(){

'use strict';

var form = angular.module('form', ['ui.router', 'ngAnimate', 'ngJwtMessage', 'ngMeteor', 'patient', 'medical', 'dental', 'kioskMethods']);

form.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.form', {
			abstract: true,
			url: '/form',
			templateUrl: 'views/form.html',
			controller: 'formController'
		});
}]);

//form.controller('formController', ['kioskSecret', 'kioskApiKey', 'jwtAudience', '$scope', function (kioskSecret, kioskApiKey, jwtAudience, $scope) {
form.controller('formController', ['$scope', '$jwtMessage', '$meteor', '$kioskMethods', function($scope, $jwtMessage, $meteor, $kioskMethods) {
	$scope.formModel = {};

	$scope.formStepCompletion = {
		patient: false,
		medical: false,
		dental: false,
		voip: false,
		survey: false
	};


	$scope.submitForm = function () {
		$scope.waitingOnRequest = true;
		//var subject = 'kiosk_createForm';
		//return $jwtMessage.sign({
		//	patient: $scope.formModel,
		//	session: $scope.sessionId
		//}, subject).then(function(result) {
		//	return $meteor.call(subject, [result]);
		//}).then(function(result) {
		return $kioskMethods.createForm($scope.sessionId, $scope.formModel).then(function(result) {
			$scope.formModel = {};
			return result;
		}).finally(function() {
			$scope.waitingOnRequest = false;
		});
	};
}]);

})();
