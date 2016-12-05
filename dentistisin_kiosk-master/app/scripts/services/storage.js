(function(){

'use strict';

var storage = angular.module('dinStorage', []);

storage.factory('$storage', ['$q', function($q) {
	return {
		set: function(config) {
			//var deferred = $q.defer();

			chrome.storage.local.set(config);
			//deferred.resolve();

			//return deferred.promise;
		},
		get: function() {
			var deferred = $q.defer();

			chrome.storage.local.get(['key', 'secret'], function(config) {
				if (!config.key || !config.secret) {
					deferred.reject({ error: 'no-auth' });
				}
				deferred.resolve(config);
			});
			return deferred.promise;
		},
		clear: function() {
			chrome.storage.local.clear();
		}
	};
}]);

})();
