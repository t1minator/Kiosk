(function(){
'use strict';

var tooltip = angular.module('tooltipCheckbox', []);

tooltip.directive('dinTooltipCheckbox', ['$translate', '$timeout', function($translate, $timeout) {
	return {
		require: [],
		restrict: 'E',
		scope: {
			dinOptions: '=',
			dinModel: '=',
			dinForm: '='
		},
		templateUrl: 'views/partials/tooltip_checkbox.partial.html',
		link: function(scope, element) {
/**
			$timeout(function() {
				element.checkbox({
					onChecked: function() {
						scope.dinForm[scope.dinOptions.name].$setViewValue(true);
					},
					onUnchecked: function() {
						scope.dinForm[scope.dinOptions.name].$setViewValue(false);
					}
				});
			});
**/
		}
	};
}]);

})();
