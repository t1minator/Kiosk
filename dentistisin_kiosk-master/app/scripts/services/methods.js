(function(){

'use strict';

var km = angular.module('kioskMethods', ['ngJwtMessage', 'ngMeteor']);

km.factory('$kioskMethods', ['$jwtMessage', '$meteor', function($jwtMessage, $meteor) {
	var callMethod = function(subject, data) {
		return $jwtMessage.sign(data, subject).then(function(result) { return $meteor.call(subject, [result]); });
	};
	return {
		createSession: function(code, lang) {
			return callMethod('kiosk_createSession', { code: code, lang: lang });
		},
		auth: function(credentials) {
			var subject = 'kiosk_auth';
			return $jwtMessage.sign({}, subject, credentials).then(function(result) {
				return $meteor.call(subject, [result]);
			});
		},
		createForm: function(session, doc) {
			return callMethod('kiosk_createForm', { patient: doc, session: session });
		},
		createSurvey: function(session, survey) {
			var data = {
				session: session
			};
			if (survey) data.survey = survey;
			return callMethod('kiosk_createSurvey', data);
		},
		enqueue: function(session) {
			return callMethod('kiosk_voip_enqueue', { session: session });
		},
		reenqueue: function(session) {
			return callMethod('kiosk_voip_reenqueue', { session: session });
		},
		inactive: function(session) {
			return callMethod('kiosk_inactive', { session: session });
		},
		token: function(session) {
			return callMethod('kiosk_voip_token', { session: session });
		},
		fail: function(session) {
			return callMethod('kiosk_voip_fail', { session: session });
		},
		finish: function(session) {
			return callMethod('kiosk_voip_finish', { session: session });
		},
		log: function(session, message) {
			return callMethod('kiosk_log', { session: session, message: message });
		}
	};
}]);

})();
