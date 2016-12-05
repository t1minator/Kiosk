(function(){
'use strict';

var modal = angular.module('inactivityModal', ['ngIdle', 'ngMeteor', 'ngJwtMessage', 'kioskMethods']);

modal.directive('dinInactivityModal', ['$translate', '$timeout', function($translate, $timeout) {
	return {
		require: [],
		restrict: 'A',
		templateUrl: 'views/inactivity_modal.html',
		controller: ['$state', '$scope', '$element', 'Idle', '$meteor', '$jwtMessage', '$kioskMethods', function($state, $scope, $element, Idle, $meteor, $jwtMessage, $kioskMethods) {
			$scope.inactivityModalVisible = false;
			$scope.timeRemaining = 0;

			//$scope.$on('IdleStart', function() {
			//});

			$scope.$on('IdleWarn', function(e, time) {
				$scope.$apply(function() {
					$scope.timeRemaining = time;
				});
				if(!$scope.inactivityModalVisible) {
					$element.modal('show');
					$scope.inactivityModalVisible = true;
				}
			});

			$scope.$on('IdleTimeout', function() {
				if ($scope.sessionId) {
					//var method = 'kiosk_inactive';
					//$jwtMessage.sign({
					//	session: $scope.sessionId
					//}, method).then(function(result) {
					//	$meteor.call(method, [result]);
					//}).catch(function(error) {
					$kioskMethods.inactive($scope.sessionId).catch(function(error) {
						if(error.error === 'no-auth') {
							$state.go('config');
						} else if(error.error === 'bad-auth') {
							$state.go('config');
						}
					});
				}
				Idle.unwatch();
				$state.go('language');
				$element.modal('hide');
				$scope.inactivityModalVisible = false;
			});

			$scope.$on('IdleEnd', function() {
				if($scope.inactivityModalVisible) {
					$element.modal('hide');
					$scope.inactivityModalVisible = false;
				}
			});
		}],
		link: function(scope, element) {
			$timeout(function() {
				element.modal({
					closable: false
				});
			});
		}
	};
}]);

})();
