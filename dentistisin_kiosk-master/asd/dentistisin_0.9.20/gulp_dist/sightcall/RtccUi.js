/*
By RaphaÃ«l Boucher and Nicholas Stock.
Copyright Weemo Inc.
*/
'use strict';

var RtccUi = (function() {
	var module = {};

	return module;
})();

RtccUi.release = '0.5.4';
RtccUi.scriptName = 'RtccUi.js';
RtccUi.baseUrl = document.querySelector('script[src$="' + RtccUi.scriptName + '"]').src.replace(RtccUi.scriptName, '');
RtccUi.soundsBaseUrl = RtccUi.baseUrl + 'sounds/';
RtccUi.defaultConfig = {
	uiCssUrl: RtccUi.baseUrl + 'css/rtcc.css',
	uiDialToneUrl: RtccUi.soundsBaseUrl + 'Dial.mp3',
	uiRingToneUrl: RtccUi.soundsBaseUrl + 'Ring.mp3',
	container: null,
	defaultStyle: true,
	plugin: false
};

RtccUi.Helper = (function() {
	var module = {};
	module.removeClass = function(elem, className) {
		var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
		if (module.hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	};

	module.hasClass = function(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	};

	module.addClass = function(node, cls) {
		if (!module.hasClass(node, cls)) {
			node.className += ' ' + cls;
		}
	};

	module.createHtml = function(elementName, attributes) {
		var e = document.createElement(elementName);
		for (var k in attributes) {
			e.setAttribute(k, attributes[k]);
		}
		return e;
	};

	return module;
})();

RtccUi.Utils = {};

RtccUi.Utils.mergeConfig = function(/*defaultConfig, config*/) {
	var obj = {};
	var i = 0;
	var il = arguments.length;
	var key;
	for (; i < il; i++) {
		for (key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key) && arguments[i][key] !== undefined) {
				obj[key] = arguments[i][key];
			}
		}
	}
	return obj;
};

RtccUi.Videobox = function(callObject, config) {
	//console.log('Videobox: create');
	//var that = this;
	this.config = config || {};

	var muted = false;
	var pipEnabled = true;
	var videoLocalEnabled = (this.config.videoLocalEnabled !== undefined) ? this.config.videoLocalEnabled :  true;
	var videoRemoteEnabled = (this.config.videoRemoteEnabled !== undefined) ? this.config.videoRemoteEnabled : true;

	this.muted = function() {
		return muted;
	};

	this.pipEnabled = function() {
		return pipEnabled;
	};

	this.videoLocalEnabled = function() {
		return videoLocalEnabled;
	};

	this.videoRemoteEnabled = function() {
		return videoRemoteEnabled;
	};

	this.setLocalSrc = function(src) {
		//console.log('RtccUi: Videobox: set local src');
		view.setLocalSrc(src);
		view.updateLocalVideoCrop();
	};
	this.setRemoteSrc = function(src) {
		//console.log('RtccUi: Videobox: set remote src');
		view.setRemoteSrc(src);
		view.updateRemoteVideoCrop();
	};

	this.enablePip = function() {
		view.showPip();
		pipEnabled = true;
	};

	this.disablePip = function() {
		view.hidePip();
		pipEnabled = false;
	};

	this.disableAudio = function() {
		view.mute();
		muted = true;
	};

	this.enableAudio = function() {
		view.unmute();
		muted = false;
	};

	this.disableLocalVideo = function() {
		//console.log('RtccUi: Videobox: disable local video');
		view.hideLocalVideo();
		updateLocalVideoState(false);
	};

	this.enableLocalVideo = function() {
		view.showLocalVideo();
		updateLocalVideoState(true);
	};

	this.enableRemoteVideo = function() {
		view.makePipSmall();
		view.showRemoteVideo();
		updateRemoteVideoState(true);
	};

	this.disableRemoteVideo = function() {
		//console.log('RtccUi: Videobox: disable remote video');
		view.makePipBig();
		view.hideRemoteVideo();
		updateRemoteVideoState(false);
	};

	this.remove = function() {
		view.remove();
	};

	//this.fullscreen = function(){
	//	/*if(!isConf)*/ callObject.updateVideoProfile(callObject.videoProfile.HIGH);
	//	view.fullscreen();
	//};

	//this.mediumVideo = function(){
	//	/*if(!isConf)*/ callObject.updateVideoProfile(callObject.videoProfile.MEDIUM);
	//	view.mediumSize();
	//};

	this.smallVideo = function(){
		callObject.updateVideoProfile(callObject.videoProfile.SMALL);
		view.smallSize();
	};

	var updateRemoteVideoState = function(state) {
		videoRemoteEnabled = state;
		updateDisabledVideo();
	};

	var updateLocalVideoState = function(state) {
		videoLocalEnabled = state;
		updateDisabledVideo();
	};
		//show or hide a text when both users have disabled video
	var updateDisabledVideo = function() {
		//console.log('RtccUi: Videobox: update disabled video');
		if (!videoRemoteEnabled && !videoLocalEnabled) {
			view.showDisabledVideo();
		} else {
			view.hideDisabledVideo();
		}
	};


	var view = new RtccUi.VideoboxView(this);
	var controller = new RtccUi.VideoboxController(this, view, callObject);

	updateDisabledVideo();
	view.setListeners(controller);
};

RtccUi.VideoboxController = function(model, view, callObject) {
	//console.log('RtccUi: Controller: create');
	this.onClickMute = function() {
		if (model.muted()) {
			callObject.audioUnMute();
		} else {
			callObject.audioMute();
		}
	};

	this.onClickHideVideo = function() {
		if (model.videoLocalEnabled()) {
			callObject.videoStop();
		} else {
			callObject.videoStart();
		}
	};

	this.onClickNoPip = function() {
		if (model.videoLocalEnabled()) {
			if (model.pipEnabled()) {
				callObject.noPip();
			} else {
				callObject.pip();
			}
		}
	};

	this.onClickHangup = function() {
		callObject.hangup();
	};

	this.onClickMediumVideo = function() {
		model.mediumVideo();
	};

	this.onClickSmallVideo = function() {
		model.smallVideo();
	};
};

RtccUi.VideoboxView = function(model) {
	//console.log('RtccUi: View: create');
	model.config = model.config || {};
	var controller;
	var that = this;
	var helper = RtccUi.Helper;

	var htmlElements;

	this.setListeners = function(ctrl) {
		//console.log('RtccUi: View: set listeners');
		controller = ctrl;
	};

	this.setLocalSrc = function(src) {
		//console.log('RtccUi: View: set local src');
		updateVideoSrc(htmlElements.localView, src);
	};

	this.setRemoteSrc = function(src) {
		//console.log('RtccUi: View: set remote src');
		updateVideoSrc(htmlElements.remoteView, src);
	};

	this.updateLocalVideoCrop = function() {
		//console.log('RtccUi: View: update local video crop');
		cropWithRatio(htmlElements.localView);
	};

	this.updateRemoteVideoCrop = function() {
		//console.log('RtccUi: View: update remote video crop');
		cropWithRatio(htmlElements.remoteView);
	};

	var cropWithRatio = function(elem) {
		//console.log('RtccUi: View: crop with ratio');
		var ratio = elem.offsetWidth / elem.offsetHeight;
		if (ratio < 1.77 || ratio > 1.78) {
			helper.addClass(elem, 'rtcc-no-crop');
		} else {
			helper.removeClass(elem, 'rtcc-no-crop');
		}
	};

	this.hideLocalVideo = function() {
		//helper.addClass(htmlElements.buttonVideoEnabled, 'rtcc-active');
		helper.addClass(htmlElements.localView, 'rtcc-disabled');
	};

	this.showLocalVideo = function() {
		//helper.removeClass(htmlElements.buttonVideoEnabled, 'rtcc-active');
		helper.removeClass(htmlElements.localView, 'rtcc-disabled');
	};

	this.hideRemoteVideo = function() {
		helper.addClass(htmlElements.remoteView, 'rtcc-disabled');
	};

	this.showRemoteVideo = function() {
		helper.removeClass(htmlElements.remoteView, 'rtcc-disabled');
	};

	this.makePipBig = function() {
		helper.addClass(htmlElements.localViewBox, 'full');
		htmlElements.localViewBox.style.top = '0';
		htmlElements.localViewBox.style.left = '0';
		htmlElements.localViewBox.style.right = '';
		htmlElements.localViewBox.style.bottom = '';
	};

	this.makePipSmall = function() {
		helper.removeClass(htmlElements.localViewBox, 'full');
		htmlElements.localViewBox.style.right = '0';
		htmlElements.localViewBox.style.bottom = '0';
		htmlElements.localViewBox.style.top = '';
		htmlElements.localViewBox.style.left = '';
	};

	this.showPip = function() {
		//helper.removeClass(htmlElements.buttonNoPip, 'rtcc-active');
		helper.removeClass(htmlElements.localViewBox, 'rtcc-disabled');
	};

	this.hidePip = function() {
		//helper.addClass(htmlElements.buttonNoPip, 'rtcc-active');
		helper.addClass(htmlElements.localViewBox, 'rtcc-disabled');
	};

	this.mute = function() {
		//helper.addClass(htmlElements.buttonMute, 'rtcc-active');
	};

	this.unmute = function() {
		//helper.removeClass(htmlElements.buttonMute, 'rtcc-active');
	};


	this.showDisabledVideo = function() {
		//console.log('RtccUi: View: show disabled video');
		helper.removeClass(htmlElements.videoDisabled, 'rtcc-disabled');
	};

	this.hideDisabledVideo = function() {
		//console.log('RtccUi: View: hide disabled video');
		helper.addClass(htmlElements.videoDisabled, 'rtcc-disabled');
	};

	function updateVideoSrc(video, src) {
		//console.log('RtccUi: View: update video src');
		video.pause();
		video.src = src;
		video.load();
	}

/**
	function forceVideoboxRatio() {
		var originalHeight = htmlElements.videobox.offsetHeight;
		var originalWidth = htmlElements.videobox.offsetWidth;
		var ratio = 16 / 9;
		//if (that.isConfModeEnabled()) ratio = ratio * 1.25;
		if (originalHeight * ratio > originalWidth) {
			htmlElements.videobox.style.height = (originalWidth / ratio) + 'px';
		} else {
			htmlElements.videobox.style.width = (originalHeight * ratio) + 'px';
		}
	}
**/

	this.smallSize = function() {
		helper.removeClass(htmlElements.videobox, 'rtcc-medium-size');
		helper.removeClass(htmlElements.videobox, 'rtcc-simple-bar');
	};

	this.remove = function() {
		if (model.config.container !== null) {
			document.getElementById(model.config.container).removeChild(htmlElements.videobox);
		} else {
			document.body.removeChild(htmlElements.videobox);
		}
	};

	function init() {
		htmlElements = that._create(model.config, helper);
		that.smallSize();
	}

	init();
};

RtccUi.VideoboxView.prototype._create = function(config, helper) {
	function createVideoBox() {
		var videobox = document.createElement('div');
		videobox.setAttribute('class', 'rtcc-videobox');
		if (config.container !== null) {
			helper.addClass(videobox, 'rtcc-videobox-container');
		}
		return videobox;
	}

	function createRemoteVideo() {
		var remoteView = document.createElement('video');
		remoteView.setAttribute('class', 'rtcc-remotevideo');
		remoteView.setAttribute('autoplay', 'autoplay');
		return remoteView;
	}

	function createLocalVideoBox() {
		var localViewBox = document.createElement('div');
		localViewBox.setAttribute('class', 'rtcc-local-viewbox');
		return localViewBox;
	}

	function createLocalVideo() {
		var localView = document.createElement('video');
		localView.setAttribute('class', 'rtcc-local-view');
		localView.setAttribute('autoplay', 'autoplay');
		localView.setAttribute('muted', 'muted');
		return localView;
	}

	function createDisabledVideoView() {
		var videoDisabled = document.createElement('div');
		videoDisabled.setAttribute('class', 'rtcc-disabledvideo');
		videoDisabled.innerHTML = 'VIDEO DISABLED';
		return videoDisabled;
	}


	function createSimpleDiv(attribute, value){
		var div = document.createElement('div');
		if(attribute) {
			div.setAttribute(attribute, value);
		}
		return div;
	}

	function createElements() {
		var elems = {};
		elems.videobox = createVideoBox();
		elems.activeVideoContainer = createSimpleDiv('class', 'rtcc-active-video-container');

		elems.remoteView = createRemoteVideo();
		elems.localViewBox = createLocalVideoBox();
		elems.localView = createLocalVideo();
		elems.videoDisabled = createDisabledVideoView();

		return elems;
	}

	function constructBox(elems) {
		if (config.container !== null) {
			document.getElementById(config.container).appendChild(elems.videobox);
		} else {
			document.body.appendChild(elems.videobox);
		}

		elems.videobox.appendChild(elems.activeVideoContainer);
		elems.activeVideoContainer.appendChild(elems.remoteView);
		elems.activeVideoContainer.appendChild(elems.localViewBox);
		elems.localViewBox.appendChild(elems.localView);
		elems.activeVideoContainer.appendChild(elems.videoDisabled);
	}

	var htmlElements = createElements();
	constructBox(htmlElements);
	return htmlElements;
};

RtccUi.WebRtcUi = function(config) {
	config = RtccUi.Utils.mergeConfig(RtccUi.defaultConfig, config);
	var currentCallObject;

	var videobox;

	function removeBox(box) {
		//console.log('RtccUi: remove box');
		if (box) {
			box.remove();
		}
		return null;
	}

	this.hangup = function() {
		//console.log('RtccUi: hangup');
		videobox = removeBox(videobox);
	};

	this.pip = function() {
		//console.log('RtccUi: pip');
		videobox.enablePip();
	};

	this.noPip = function() {
		//console.log('RtccUi: nopip');
		videobox.disablePip();
	};

	this.audioMute = function() {
		//console.log('RtccUi: mute');
		videobox.disableAudio();
	};

	this.audioUnMute = function() {
		//console.log('RtccUi: unmute');
		videobox.enableAudio();
	};

	this.enableLocalVideo = function() {
		//console.log('RtccUi: enable local video');
		videobox.enableLocalVideo();
	};

	this.disableLocalVideo = function() {
		//console.log('RtccUi: disable local video');
		videobox.disableLocalVideo();
	};

	this.enableRemoteVideo = function() {
		//console.log('RtccUi: enable remote video');
		videobox.enableRemoteVideo();
	};

	this.disableRemoteVideo = function() {
		//console.log('RtccUi: disable remote video');
		videobox.disableRemoteVideo();
	};

	this.acceptCall = function(localstream, remoteStream, localVideoOnStart, remoteVideoOnStart) {
		//console.log('RtccUi: accept call');
		videobox = new RtccUi.Videobox(currentCallObject, config);
		this.setLocalStream(localstream);
		this.setRemoteStream(remoteStream);

		if (!localVideoOnStart) {
			videobox.disableLocalVideo();
		}
		if (!remoteVideoOnStart) {
			videobox.disableRemoteVideo();
		}
	};


	this.setRemoteStream = function(remotestream) {
		//console.log('RtccUi: set remote stream');
		if (remotestream && videobox) {
			videobox.setRemoteSrc(window.webkitURL.createObjectURL(remotestream));
		}
	};

	this.setLocalStream = function(stream) {
		//console.log('RtccUi: set local stream');
		if (stream && videobox) {
			videobox.setLocalSrc(window.webkitURL.createObjectURL(stream));
		}
	};

	this.ringing = function(callObject/*, isOutgoing*/) {
		//console.log('RtccUi: ringing');
		currentCallObject = callObject;
	};

	this.setupPlugin = function() {
		//console.log('RtccUi: setup plugin');
	};

	this.setPassiveVideoBoxes = function(/*boxes*/) {
		//console.log('RtccUi: set passive video boxes');
	};

	this.setParticipantList = function(/*pList*/) {
		//console.log('RtccUi: set participant list');
	};

	this.setIdentity = function(/*pid, host*/){
		//console.log('RtccUi: set identity');
	};

	function init() {
		//console.log('RtccUi: init');
		if (config.defaultStyle && !document.getElementById('rtcc-css') && config.uiCssUrl) {
			var link = document.createElement('link');
			link.setAttribute('id', 'rtcc-css');
			link.setAttribute('type', 'text/css');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', config.uiCssUrl);

			document.getElementsByTagName('head')[0].appendChild(link);
		}
	}

	init();
};
