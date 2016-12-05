(function(){

'use strict';

var config = angular.module('config', ['ui.router', 'ngJwtMessage', 'ngMeteor', 'dinStorage', 'kioskMethods']);

config.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('config', {
			url: '/config',
			templateUrl: 'views/config.html',
			controller: 'configController'
		});
}]);

config.controller('configController', ['$translate', '$scope', '$state', '$jwtMessage', '$meteor', '$storage', '$kioskMethods', function ($translate, $scope, $state, $jwtMessage, $meteor, $storage, $kioskMethods) {
	$storage.clear();
	$scope.configModel;
	$scope.configSubmit = function () {
		$scope.waitingOnRequest = true;
		//var subject = 'kiosk_auth';
		//$jwtMessage.sign({}, subject, $scope.configModel).then(function(result) {
		//	return $meteor.call(subject, [result]);
		//}).then(function(result) {
		$kioskMethods.auth($scope.configModel).then(function(result) {
			return $storage.set($scope.configModel);
		}).then(function(result) {
			$state.go('language');
		}).catch(function(error) {
			//console.log(error);
		}).finally(function() {
			$scope.waitingOnRequest = false;
		});
	};
}]);

})();
