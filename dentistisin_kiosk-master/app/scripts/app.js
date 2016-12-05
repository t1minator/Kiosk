(function() {

'use strict';

var deps = [
	'pascalprecht.translate',
	'ngAnimate',
	'ngIdle',
	'ui.router',
	'inactivityModal',
	'translatePartialCacheLoader',
	'ngMeteor',
	'error',
	'config',
	'language',
	'auth',
	'exit',
	'session',
	'dinStorage'
];

var kaApp = angular.module('dinka', deps);

kaApp.run(['$rootScope', '$translate', '$translatePartialCacheLoader', '$state', '$storage', function ($rootScope, $translate, $translatePartialCacheLoader, $state, $storage) {
	$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		$translate.refresh();
	});
	//$translatePartialCacheLoader.addPart('common');
	//$translate.refresh();
}]);

kaApp.config(['$meteorProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', 'IdleProvider', function ($meteorProvider, $stateProvider, $urlRouterProvider, $translateProvider, IdleProvider) {
	$translateProvider.useLoader('$translatePartialCacheLoader', {
		urlTemplate: 'i18n/{part}/{lang}.json'
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
	$translateProvider.useSanitizeValueStrategy('escaped');

	$urlRouterProvider.otherwise('/language');

	IdleProvider.idle(2*60);
	IdleProvider.timeout(60);
	$meteorProvider.setUrl('wss://the-dentist-is-in-alpha-45310.onmodulus.net/websocket');
	//$meteorProvider.setUrl('ws://localhost:3000/websocket');
}]);

kaApp.constant('meteorUrl', 'wss://the-dentist-is-in-alpha-45310.onmodulus.net/websocket');
kaApp.factory('jwtOptions', function() {
	return {
		getAudience: function() {
			return 'DentistIsIn';
		},
		getExpiration: function() {
			return 15;
		}
	};
});

})();
