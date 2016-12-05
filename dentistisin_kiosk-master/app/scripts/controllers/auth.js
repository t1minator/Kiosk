(function(){

'use strict';

var auth = angular.module('auth', ['ui.router', 'ngIdle', 'code', 'privacy', 'consent']);

auth.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('auth', {
			abstract: true,
			url: '/auth',
			template: '<ui-view></ui-view>',
			controller: 'authController',
		})
}]);

auth.controller('authController', ['$scope', function ($scope) {
	$scope.authModel = {};
}]);

})();
