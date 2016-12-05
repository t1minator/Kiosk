(function() {

'use strict';

var APP_ID = '6xjg7qx65zz0';

var WVSightCall = function(options) {
	this.options = options || {};
};

WVSightCall.prototype.setOrigin = function(origin) {
	this.origin = origin;
};

WVSightCall.prototype.getOrigin = function() {
	return this.origin;
};

WVSightCall.prototype.setSource = function(source) {
	this.source = source;
};

WVSightCall.prototype.getSource = function() {
	return this.source;
};

WVSightCall.prototype.acceptCall = function() {
	this.currentCall.accept();
};

WVSightCall.prototype.initialize = function(token) {
	var self = this;

	function sendMessage(data) {
		if (self.source && self.origin) {
			self.source.postMessage(data, self.origin);
		}
	}
	self.rtcc = new Rtcc(APP_ID, token, 'internal', this.options);
	self.rtcc.onConnectionHandler = function(message, code) {
		sendMessage({
			onConnectionHandler: {
				message: message,
				code: code
			}
		});
	};
	self.rtcc.onCallHandler = function(callObj, infoObj) {
		self.currentCall = callObj;
		sendMessage({
			onCallHandler: {
				infoObj: infoObj
			}
		});
	};
	self.rtcc.onGetHandler = function(name, obj) {
		sendMessage({
			onGetHandler: {
				name: name,
				obj: obj
			}
		});
	};
	self.rtcc.onRtccDriverNotStarted = function(downloadUrl) {
		console.log('WebRTC Not Available');
	};
	this.rtcc.initialize();
};

var scInst = new WVSightCall({
	//container: 'video-container',
	uiDialToneUrl: false,
	uiRingToneUrl: false,
	uiUrl: 'RtccUi.js'
	//defaultStyle: false,
	//uiCssUrl: false
});

var messageHandler = function(event) {
	if (!scInst.getSource() || !scInst.getOrigin()) {
		scInst.setSource(event.source);
		scInst.setOrigin(event.origin);
	}
	if (event.data === 'accept') {
		scInst.acceptCall();
	} else if (event.data.init) {
		scInst.initialize(event.data.init);
	}
};

window.addEventListener('message', messageHandler, false);

})();
