(function(){
'use strict';

var tooltip = angular.module('tooltipDropdown', []);

tooltip.directive('dinTooltipDropdown', ['$translate', '$timeout', function($translate, $timeout) {
	return {
		require: [],
		restrict: 'E',
		scope: {
			dinOptions: '=',
			dinModel: '=',
			dinForm: '='
		},
		templateUrl: 'views/partials/tooltip_dropdown.partial.html',
		transclude: true,
		link: function(scope, element) {
			var input = element.find('.ui.selection.dropdown');
			$timeout(function() {
				if (scope.dinModel) {
					input.dropdown('set selected', scope.dinModel);
				}
				input.dropdown({
					allowTab: true,
					onChange: function(value) {
						if (value === undefined) {
							return;
						}
						if (scope.dinForm !== value) {
							scope.dinForm[scope.dinOptions.name].$setViewValue(value);
						}
					}
				});
			});

			element.on('$destroy', function() {
				input = null;
			});
		},
	};
}]);

})();
