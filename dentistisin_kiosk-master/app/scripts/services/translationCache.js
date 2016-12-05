(function(){

'use strict';

// Near as I can tell angular-translate doesn't even include this file
// so... I guess it's time to duplicate work
var cache = angular.module('translationCache', []);

cache.factory('$translationCache', ['$cacheFactory', function($cacheFactory) {
	return $cacheFactory('translations');
}]);

})();
