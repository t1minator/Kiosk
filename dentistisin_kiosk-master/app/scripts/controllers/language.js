(function(){

'use strict';

var language = angular.module('language', ['pascalprecht.translate', 'ui.router']);

language.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('language', {
			url: '/language',
			templateUrl: 'views/language.html',
			controller: 'languageController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader'
			},
			onEnter: function(translatePartialLoader) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('language');
			},
			onExit: function(translatePartialLoader) {
				translatePartialLoader.deletePart('language');
			}
		});
}]);

language.controller('languageController', ['$translate', '$scope', '$state', function ($translate, $scope, $rootScope, $state) {
	//$translatePartialLoader.addPart('language');
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$state.go('auth.code');
		$(".confirmContent .lang").attr('class','lang').addClass(langKey);
	};

	$rootScope.confirmYes = function(){
        $("#confirm").hide(),
        $state.go("language")
    },
    $rootScope.confirmCancel = function(){
        $("#confirm").hide()
        //n.go("auth.code")
    },
    $rootScope.backCodeScreen = function() {
        $("#confirm").show()
    }
}]);

})();
