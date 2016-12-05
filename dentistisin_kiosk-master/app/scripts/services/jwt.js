(function(){

'use strict';

var angularJwt = angular.module('ngJwt', []);

angularJwt.factory('jwt', function() {
	var jwt = require('jsonwebtoken');
	return jwt;
});

})();

