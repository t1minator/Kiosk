(function(){

'use strict';

var voip = angular.module('voip', ['ui.router', 'ngJwtMessage', 'ngLodash', 'chromeWebview', 'ngMeteor', 'kioskMethods']);

voip.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.voip', {
			url: '/voip',
			templateUrl: 'views/voip.html',
			controller: 'voipController',
			resolve: {
				translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function(translatePartialLoader, Idle) {
				translatePartialLoader.addPart('common');
				translatePartialLoader.addPart('voip');
				Idle.setIdle(10*60);
				Idle.watch();
			},
			onExit: function(translatePartialLoader, Idle) {
				translatePartialLoader.deletePart('voip');
				Idle.setIdle(2*60);
				Idle.unwatch();
			}
		});
}]);

voip.controller('voipController', ['$scope', '$state', '$jwtMessage', '_', '$meteor', '$kioskMethods', function($scope, $state, $jwtMessage, _, $meteor, $kioskMethods) {
	$scope.setStepActive('voip');

	var states = {
		loadingSightcall: 'loadingSightcall',
		initializingSightcall: 'initializingSightcall',
		enqueued: 'enqueued',
		assigned: 'assigned'
	};

	$scope.voipState = states.loadingSightcall;
	$scope.voipFailed = false;
	$scope.callInProgress = false;

	//$scope.loadingSightcall = true;
	$scope.subObserver = $meteor.observe('sessions', {
		//added: function(id) { console.log(id, $meteor); },
		updated: function(id, oldFields, clearedFields, newFields) {
			//console.log(id, oldFields, clearedFields, newFields);	
			//if (_.has(newFields, 'voipState')) {
			if (newFields.voip && newFields.voip.state) {
				//switch (newFields.voipState) {
				switch (newFields.voip.state) {
					case 'enqueued':
						$scope.voipState = states.enqueued;
						break;
					case 'assigned':
						$scope.voipState = states.assigned;
						break;
					case 'failed':
						//var meth = 'kiosk_reenqueue';
						//$jwtMessage.sign({
						//	session: $scope.sessionId
						//}, meth).then(function(result) {
						//	return $meteor.call(meth, [result]);
						//}).then(function(result) {
						$kioskMethods.reenqueue($scope.sessionId).then(function(result) {
							$scope.voipFailed = true;
						}).catch(function(error) {
							if (error.error === 'no-auth' || error.error === 'bad-auth') {
								$state.go('config');
							} else if (error.error === 'bad-session') {
								$state.go('error');
							}
						});
						break;
				}
			}
		},
		//removed: function(id, oldValue) { console.log(id, oldValue); }
	});
	var subscription = 'kiosk_voip_state';
	$jwtMessage.sign({
		session: $scope.sessionId
	}, subscription).then(function(result) {
		return $meteor.subscribe(subscription, [result]);
	}).then(function(result) {
		$scope.subId = result;
		var method = 'kiosk_voip_token';
		return $jwtMessage.sign({
			session: $scope.sessionId
		}, method);
	}).then(function(result) {
	//$meteor.subscribe(subscription, [$jwtMessage.sign({
	//	session: $scope.sessionId
	//}, subscription)]).then(function(result) {
	//	$scope.subId = result;
		var method = 'kiosk_voip_token';
	//	return $meteor.call(method, [$jwtMessage.sign({
	//		session: $scope.sessionId
	//	}, method)]);
		//console.log(result);
		return $meteor.call(method, [result]);
	}).then(function(result) {
		//$scope.loadingSightcall = false;
		//$scope.initializingSightcall = true;
		//console.log('init', result);
		$scope.voipState = states.initializingSightcall;
		$scope.$broadcast('to.webview.sightcall', { init: result });
	}).catch(function(error) {
		//console.log(error);
		if(error.error === 'no-auth') {
			$state.go('config');
		} else if(error.error === 'bad-auth') {
			$state.go('config');
		} else if (error.error === 'bad-session') {
			$state.go('error');
		}
	}).finally(function() {

	});

	$scope.$on('from.webview.sightcall', function (event, data) {
		//console.log('Message from WVSC: ', data);
		if (data.onConnectionHandler) {
			var method;
			switch (data.onConnectionHandler.message) {
				case 'authenticated':
					//console.log('SightCall Authenticated');
					break;
				case 'connectedCloud':
					//console.log('SightCall Connected Cloud');
					break;
				case 'initializationIncomplete':
					//console.log('SightCall Initialization Incomplete');
					break;
				case 'notUseInThisMode':
					//console.log('SightCall Not Use In This Mode');
					break;
				case 'sipNok':
					//console.log('SightCall SIP Not Ok');
					break;
				case 'sipOk':
					//console.log('SightCall SIP Ok');
					//method = 'kiosk_voip_enqueue';
					//$jwtMessage.sign({
					//	session: $scope.sessionId
					//}, method).then(function(result) {
					//	return $meteor.call(method, [result]);
					//}).then(function(result) {
					//$meteor.call(method, [$jwtMessage.sign({
					//	session: $scope.sessionId
					//}, method)]).then(function(result) {
					$kioskMethods.enqueue($scope.sessionId).then(function(result) {
						//$scope.initializingSightcall = false;
						//$scope.enqueued = true;
						$scope.voipState = states.enqueued;
					}).catch(function(error) {
						if(error.error === 'no-auth') {
							$state.go('config');
						} else if(error.error === 'bad-auth') {
							$state.go('config');
						} else if (error.error === 'bad-session') {
							$state.go('error');
						}
					});
					break;
				case 'presenceOkAlreadyRegistered':
					//console.log('SightCall Presence Ok Already Registered');
					break;
				case 'presenceOkNewUser':
					//console.log('SightCall Presence Ok New User');
					break;
				case 'presenceNok':
					//console.log('SightCall Presence Not Ok');
					break;
				case 'unauthenticated':
					//console.log('SightCall Unauthenticated');
					break;
				case 'webRTCCapabilities':
					//console.log('SightCall WebRTC Capabilities');
					break;
				case 'rtccAuthApiError':
					//console.log('SightCall RTCC Auth Api Error');
					break;
				case 'browserCompatibilityError':
					//console.log('SightCall Browser Compatibility Error');
					break;
				case 'connectedWebRTC':
					//console.log('SightCall Connected WebRTC');
					break;
				case 'disconnectedWebRTC':
					//console.log('SightCall Disconnected WebRTC');
					break;
			}
		} else if (data.onCallHandler && data.onCallHandler.infoObj) {
			switch (data.onCallHandler.infoObj.type) {
				case 'webRTCcall':
					switch (data.onCallHandler.infoObj.status) {
						case 'incoming':
							//console.log('Call Incoming');
							$scope.$broadcast('to.webview.sightcall', 'accept');
							break;
						case 'callCreated':
							//console.log('Call Created');
							break;
						case 'proceeding':
							//console.log('Call Proceeding');
							break;
						case 'active':
							//console.log('Call Active');
							//$scope.enqueued = false;
							//$scope.assigned = false;
							$scope.voipState = null;
							$scope.callInProgress = true;
							$scope.$apply();
							break;
						case 'terminated':
							switch (data.onCallHandler.infoObj.reason) {
								case 'remoteHangup':
									//console.log('Call Terminated Remote Hangup');
									$scope.waitingOnRequest = true;
									//method = 'kiosk_voip_finish';
									//$jwtMessage.sign({
									//	session: $scope.sessionId
									//}, method).then(function(result) {
									//	return $meteor.call(method, [result]);
									//}).then(function(result) {
									//$meteor.call(method, [$jwtMessage.sign({
									//	session: $scope.sessionId
									//}, method)]).then(function(result) {
									$kioskMethods.finish($scope.sessionId).then(function(result) {
										$scope.waitingOnRequest = false;
										$scope.setStepCompleted('voip');
										$scope.subObserver.stop();
										$meteor.unsubscribe($scope.subId);
										$state.go('^.skip');
									}).catch(function(error) {
										//console.log(err);
										if(error.error === 'no-auth') {
											$state.go('config');
										} else if(error.error === 'bad-auth') {
											$state.go('config');
										} else if (error.error === 'bad-session') {
											$state.go('error');
										}
									});
									break;
								case 'localHangup':
									//console.log('Call Terminated Local Hangup');
									break;
								case 'noAnswer':
									//console.log('Call Terminated No Answer');
									break;
								case 'busy':
									//console.log('Call Terminated Busy');
									break;
								case 'rejected':
									//console.log('Call Terminated Rejected');
									break;
								case 'unavailable':
									//console.log('Call Terminated Unavailable');
									break;
								case 'notFound':
									//console.log('Call Terminated Not Found');
									break;
								case 'canceled':
									//console.log('Call Terminated Canceled');
									break;
								case 'networkError':
									//console.log('Call Terminated Network Error');
									break;
								case 'userDeniedMediaAccess':
									//console.log('Call Terminated User Denied Media Access');
									break;
								case 'notAllowed':
									//console.log('Call Terminated Not Allowed');
									break;
								case 'unknown':
									//console.log('Call Terminated Unknown');
									break;
							}
							break;
					}
					break;
				case 'video_local':
					switch (data.onCallHandler.infoObj.status) {
						case 'start':
							//console.log('Local Video Enabled');
							break;
						case 'stop':
							//console.log('Local Video Disabled');
							break;
					}
					break;
				case 'video_remote':
					switch (data.onCallHandler.infoObj.status) {
						case 'start':
							//console.log('Remote Video Enabled');
							break;
						case 'stop':
							//console.log('Remote Video Disabled');
							break;
					}
					break;
				case 'sound':
					switch (data.onCallHandler.infoObj.status) {
						case 'mute':
							//console.log('Call Muted');
							break;
						case 'unmute':
							//console.log('Call Unmuted');
							break;
					}
					break;
				default:
					//console.log('Other Event: ', data.onCallHandler.infoObj);
			}
		}
	});
}]);

})();
