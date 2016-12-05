SightCall = {};

SightCall.ready = new ReactiveVar(false);
SightCall.callActive = new ReactiveVar(false);
var isReconnect = false;
var kiosklocation = '';
var callobj = '';
var callresult = '';
SightCall.initReconnect = function(handle){
	isReconnect = true;
	kiosklocation = handle;
	//SightCall.rtcc.reset();
	SightCall.rtcc.initialize();
}


SightCall.call = function(handle) {
	if (SightCall.rtcc && SightCall.ready.get()) { 
		SightCall.rtcc.createCall(handle, 'internal', '');
	}
};

SightCall.hangup = function() {
	if (SightCall.currentCall) {
		SightCall.currentCall.hangup();
	}
};

SightCall.errorCallback = function() {

};



Accounts.onLogin(function () {
	if (!Roles.userIsInRole(Meteor.user(), ['dentist', 'ma'])) {
		return;
	}
	$.ajax({
		url: 'https://download.rtccloud.net/js/webappid/' + Meteor.settings.public.sightcall.appid,
		dataType: 'script',
		success: function(data, textStatus, jqxhr) {
			Meteor.call('getVoipToken', function(error, result) {

				SightCall.rtcc = new Rtcc(Meteor.settings.public.sightcall.appid, result, 'internal', { container: 'video-container', defaultStyle: false });
				SightCall.rtcc.on('call.create', function(callobject){
					callobj = callobject;
					callobj.on('video.local.start', function(){
						console.log('video.local.start');
					});
					callobj.on('video.local.stop', function(){
						console.log('video.local.stop');
					});
					callobj.on('video.remote.start', function(){
						console.log('video.remote.start');
					});
					callobj.on('video.remote.stop', function(){
						console.log('video.remote.stop');
					});
					callobj.on('terminate', function(){
						console.log('terminate');
					});
					callobj.on('error', function(){
						console.log('call is error');
					});
					callobj.on('record.stop', function(){
						console.log('record.stop');
					});
					callobj.on('video.local.stop', function(){
						console.log('video.local.stop');
					});
					callobj.on('share.local.stop', function(){
						console.log('share.local.stop');
					});
					callobj.on('share.remote.stop', function(){
						console.log('share.remote.stop');
					});
					callobj.on('share.remote.remotecontrol.stop',  function(){
						console.log('share.remote.remotecontrol.stop');
					});
					callobj.on('webrtc.mediarequest.error', function(){
						console.log('webrtc.mediarequest.error');
					});
				});

				/*
				SightCall.rtcc.on('client.disconnect', function(e){
					console.log('client disconnect  ' + e);
				});

				SightCall.rtcc.on('cloud.disconnect', function(e){
					console.log('cloud disconnect  ' + e);
				});

				SightCall.rtcc.on('cloud.drop', function(e){
					console.log('cloud drop  ' + e);
				});

				SightCall.rtcc.on('cloud.sip.ko', function(e){
					console.log('cloud sip.ko  ' + e);
				});

				SightCall.rtcc.on('cloud.turn.ko', function(e){
					console.log('cloud turn.ko  ' + e);
				});

				SightCall.rtcc.on('cloud.haproxy.error', function(e){
					console.log('cloud haproxy.error  ' + e);
				});

				SightCall.rtcc.on('cloud.alreadyconnected', function(e){
					console.log('cloud alreadyconnected  ' + e);
				});

				SightCall.rtcc.on('cloud.turn.ok', function(e){
					console.log('cloud turn.ok  ' + e);
				});

				SightCall.rtcc.on('error', function(e){
					console.log('call error  ' + e);
				});

				SightCall.rtcc.on('cloud.sip.ok', function(e){
					console.log('cloud sip.ok  ' + e);
				});

				SightCall.rtcc.on('meetingpoint.attendee.error', function(e){
					console.log('meetingpoint.attendee.error  ' + e);
				});

				SightCall.rtcc.on('presence.ko', function(e){
					console.log('presence.ko  ' + e);
				});*/
				SightCall.rtcc.onGetHandler = function(name, obj){
					//console.log('name ' + name + ' obj ' + obj);
				};

				SightCall.rtcc.onConnectionHandler = function (message, code) {
					console.log('message ' + message );
					switch(message) {
						case 'sipOk':
							//Session.set('scReady', true);
							SightCall.ready.set(true);
							
							if(	isReconnect ){
								//$('#video-container').empty();
								SightCall.call(kiosklocation);
								isReconnect = false;
								kiosklocation = '';
							}
							break;
						case 'loggedasotheruser':
							Meteor.call('get_voip_token', function(error, result) {
								SightCall.rtcc.setToken(result);
								SightCall.rtcc.forceAuthenticate();
							});
							break;
					}
				};
				SightCall.rtcc.onCallHandler = function (callObj, infoObj) {
					console.log('enter onCallHandler: callObj ' + callObj + ' infoObj ' + infoObj.status + ' infoObj.reason ' + infoObj.reason);
					if (infoObj.type === 'call' || infoObj.type === 'webRTCcall') {
						console.log('status ' + infoObj.status);
						
						if (infoObj.status === 'active') {
							SightCall.currentCall = callObj;
							//Session.set('callActive', true);
							SightCall.callActive.set(true);
						} else if (infoObj.status === 'terminated') {
							delete SightCall.currentCall;
							//Session.set('callActive', false);
							SightCall.callActive.set(false);
							switch (infoObj.reason) {
								case 'remote hangup':
									console.log('remote hangup error');
									break;
								case 'noAnswer':
									console.log('noAnswer error');
									break;
								case 'busy':
									console.log('busy error');
									break;
								case 'rejected':
									console.log('rejected error');
									break;
								case 'unavailable':
									console.log('unavailable error');
									break;
								case 'notFound':
									console.log('notFound error');
									break;
								case 'canceled':
									console.log('canceled error');
									break;
								case 'networkError':
									console.log('network error');
									break;
								case 'userDeniedMediaAccess':
									console.log('userDeniedMediaAccess error');
									break;
								case 'notAllowed':
									console.log('notAllowed error');
									break;
								case 'unknown':
									console.log('error unknown');
									SightCall.errorCallback(infoObj.reason);
									break;
							}
						}
					}
				};
				//SightCall.rtcc.onRtccDriverNotStarted = function (downloadUrl) {
				//	var answer = confirm('Click OK to download and install the Rtcc Client.');
				//	if (answer === true) { window.location = downloadUrl; }
				//};
				SightCall.rtcc.initialize();
			});
		}
	});
});
