(function(){
'use strict';

var tooltip = angular.module('tooltipRadio', []);

tooltip.directive('dinTooltipRadio', function() {
	return {
		require: [],
		restrict: 'E',
		scope: {
			dinOptions: '=',
			dinModel: '=',
			dinForm: '='
		},
		templateUrl: 'views/partials/tooltip_radio.partial.html',
		//transclude: true,
		link: function() {
			/**
			var options = element.find('div fieldset');
			$timeout(function() {
				_.each(element.find('ui.radio.checkbox'), function(el) {
					console.log(el);
					el.checkbox({
						onChange: function(val) { console.log(val); }
					});
				});
			});
			**/
		},
	};
});

})();
