(function(){

'use strict';

var webview = angular.module('chromeWebview', []);

webview.directive('sightcallWebview', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			var messageQ = [];
			var pageLoaded = false;
			var webview = element[0];
			var consoleHandler = function(e) {
				console.log('Webview: ' + e.message);
			};
			var permissionHandler = function(e) {
				if (e.permission === 'media') {
					e.request.allow();
				}
			};
			var contentLoadHandler = function() {
				pageLoaded = true;
				while (messageQ.length > 0) {
					webview.contentWindow.postMessage(messageQ.shift(), '*');
					
				}
			};

			webview.addEventListener('consolemessage', consoleHandler);
			webview.addEventListener('permissionrequest', permissionHandler);
			webview.addEventListener('contentload', contentLoadHandler);

			var messageHandler = function(e) {
				if (e.origin.indexOf('chrome-extension://') !== 0) {
					//console.log('Received message from external origin');
					return;
				}
				scope.$emit('from.webview.sightcall', e.data);
			};

			$window.addEventListener('message', messageHandler);
			scope.$on('$destroy', function() {
				$window.removeEventListener('message', messageHandler);
			});

			var messageWebview = function(event, data) {
				// TODO both origins should be the same as the webview is local
				if (pageLoaded) {
					webview.contentWindow.postMessage(data, '*');
				} else {
					messageQ.push(data);
				}
			};

			scope.$on('to.webview.sightcall', messageWebview);
		}
	};
}]);

})();
