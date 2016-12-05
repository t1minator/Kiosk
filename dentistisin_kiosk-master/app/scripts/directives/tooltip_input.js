(function(){
'use strict';

var tooltip = angular.module('tooltipInput', ['dateFormat', 'ngLodash']);

tooltip.directive('dinTooltipInput', ['_', function(_) {
	return {
		require: [],
		restrict: 'E',
		scope: {
			dinOptions: '=',
			dinModel: '=',
			dinForm: '='
		},
		//transclude: true,
		templateUrl: 'views/partials/tooltip_input.partial.html',
		link: function(scope, element) {
			var input = element.find('input');
			var popup = element.find('.ui.popup');
			input.popup({
				transition: 'fade up',
				position: 'top right',
				on: 'manual',
				popup: popup,
				offset: -3,
				setFluidWidth: false,
				display: {
					show: 50,
					hide: 50
				}
			});

			var enter = function() {
				if (scope.dinForm[scope.dinOptions.name].$invalid && scope.dinForm.$submitted) {
				//if (scope.dinForm[scope.dinOptions.name].$invalid && scope.dinForm[scope.dinOptions.name].$dirty) {
					input.popup('show');
				}
			};

			var exit = function() {
				input.popup('hide');
			};

			var resetError = function() {
				_.each(scope.dinOptions.reset, function(error) {
					scope.dinForm[scope.dinOptions.name].$setValidity(error, true);
				});
			};

			var watchInvalid = scope.$watch('dinForm[dinOptions.name].$invalid', function(invalid) {
				//if (invalid && scope.dinForm.$submitted && input.is(":focus")) {
				if (invalid && scope.dinForm[scope.dinOptions.name].$dirty && input.is(':focus')) {
					input.popup('show');
				}
			});

			var watchValid = scope.$watch('dinForm[dinOptions.name].$valid', function(valid) {
				if(valid) {
					input.popup('hide');
				}
			});

			var watchDirty = scope.$watch('dinForm[dinOptions.name].$dirty', function(dirty) {
				if(scope.dinForm[scope.dinOptions.name].$invalid && dirty && input.is(':focus')) {
					input.popup('show');
				}
			});

			var watchSubmitted = scope.$watch('dinForm.$submitted', function(submitted) {
				if (scope.dinForm[scope.dinOptions.name].$invalid && submitted && input.is(':focus')) {
					input.popup('show');
				}
			});

			element.on('$destroy', function() {
				input.off('focus', enter);
				input.off('blur', exit);
				input.off('keyup', resetError);
				watchSubmitted();
				watchDirty();
				watchInvalid();
				watchValid();
			});

			input.on('focus', enter );
			input.on('blur', exit);
			input.on('keyup', resetError);
		}
	};
}]);

})();
