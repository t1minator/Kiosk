(function(){

'use strict';

var lodash = angular.module('ngLodash', []);

lodash.factory('_', [function() {
	var _ = require('lodash');
	return _;
}]);

})();
