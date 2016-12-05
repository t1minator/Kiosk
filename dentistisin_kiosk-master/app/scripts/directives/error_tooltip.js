(function(){
'use strict';

var tooltip = angular.module('errorTooltip', ['ngLodash']);

tooltip.directive('dinTooltip', ['_', function(_) {
	return {
		require: [],
		restrict: 'A',
		scope: {
			form: '=dinTooltipForm',
			reset: '=dinTooltipReset'
		},
		link: function(scope, element, attrs) {
			var enter = function() {
				if(scope.form.$submitted && scope.form[attrs.name].$invalid) {
					element.popup('show');
				}
			};

			var exit = function() {
				element.popup('hide');
			};

			var resetError = function() {
				_.each(scope.reset, function(error) {
					scope.form[attrs.name].$setValidity(error, true);
				});
			};

			var watchErrors = scope.$watch('form.' + attrs.name + '.$invalid', function(invalid) {
				if (invalid && scope.form.$submitted) {
					element.popup('show');
				}
				if (!invalid) {
					element.popup('hide');
				}
			});

			var watchSubmitted = scope.$watch('form.$submitted', function(submitted) {
				if (scope.form[attrs.name].$invalid && submitted) {
					element.popup('show');
				}
				if (!scope.form[attrs.name].$invalid) {
					element.popup('hide');
				}
			});

			element.on('$destroy', function() {
				element.off('focus', enter);
				element.off('blur', exit);
				element.off('keyup', resetError);
				watchSubmitted();
				//watchRequired();
				watchErrors();
			});

			element.on('focus', enter);
			element.on('blur', exit);
			element.on('keyup', resetError);
		}
	};
}]);

})();
