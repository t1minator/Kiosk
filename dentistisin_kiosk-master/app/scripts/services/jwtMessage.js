(function(){

'use strict';

var jwtMessage = angular.module('ngJwtMessage', ['ui.router', 'ngJwt', 'dinStorage']);

//jwtMessage.factory('$jwtMessage', ['jwt', 'jwtOptions', function $jwtMessageFactory(jwt, jwtOptions) {
jwtMessage.factory('$jwtMessage', ['jwt', 'jwtOptions', '$storage', '$q', '$state', function $jwtMessageFactory(jwt, jwtOptions, $storage, $q, $state) {
	return {
		sign: function(data, subject, auth) {
			var deferred = $q.defer();
			if (auth) {
				deferred.resolve(
					jwt.sign({
						data: JSON.stringify(data)
					}, auth.secret, {
						expiresInMinutes: jwtOptions.getExpiration(),
						issuer: auth.key,
						audience: jwtOptions.getAudience(),
						subject: subject
					})
				);
			} else {
				$storage.get().then(function (result) {
					deferred.resolve(
						jwt.sign({
							data: JSON.stringify(data)
						}, result.secret, {
							expiresInMinutes: jwtOptions.getExpiration(),
							issuer: result.key,
							audience: jwtOptions.getAudience(),
							subject: subject
						})
					);
				}).catch(function (error) {
					deferred.reject(error);
				});
			}
			return deferred.promise;
		}
	};
}]);

})();
