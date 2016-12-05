(function(){
'use strict';

var dateFormat = angular.module('dateFormat', []);

dateFormat.directive('dinDateFormat', [function() {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, ngModelCtrl) {
			if(attrs.type === 'date') {
				ngModelCtrl.$formatters.push(function(valueFromModel) {
					if(valueFromModel && valueFromModel.$date) {
						return new Date(valueFromModel.$date);
					}
					return valueFromModel;
				});

				ngModelCtrl.$parsers.push(function(valueFromInput) {
					if (valueFromInput) {
						return { $date: valueFromInput.valueOf() };
					}
					return valueFromInput;
				});

				element.on('input', function() {
	                if($(this).attr('id') == 'yearField'){
                        if($(this).val().length > 4){
                            $(this).val($(this).val().substring(0,4));
                        }else{
                            return true;
                        }
                    }
                    if($(this).attr('id') == 'monthField'){
                        if($(this).val().length > 2){
                            $(this).val($(this).val().substring(0,4));
                            e.preventDefault();
                        }else{
                            return true;
                        }
                    }
                    if($(this).attr('id') == 'dayField'){
                        if($(this).val().length > 2){
                            $(this).val($(this).val().substring(0,4));
                            e.preventDefault();
                        }else{
                            return true;
                        }
                    }
	            });
			}
		}
	};
}]);

})();
