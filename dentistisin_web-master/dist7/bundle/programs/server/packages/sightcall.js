(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var HTTP = Package['dandv:http-more'].HTTP;

/* Package-scope variables */
var SightCall;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/sightcall/server/sightcall.js                                              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
SightCall = {};                                                                        // 1
                                                                                       // 2
var endpoint = 'https://auth.rtccloud.net';                                            // 3
                                                                                       // 4
var ssl_params = {                                                                     // 5
	ca: null,                                                                             // 6
	cert: null,                                                                           // 7
	key: null,                                                                            // 8
	passphrase: null,                                                                     // 9
};                                                                                     // 10
                                                                                       // 11
var form_params = {                                                                    // 12
	client_id: null,                                                                      // 13
	client_secret: null                                                                   // 14
};                                                                                     // 15
                                                                                       // 16
var domain = null;                                                                     // 17
                                                                                       // 18
SightCall.config = function (options) {                                                // 19
	if (_.has(options, 'ca')) {                                                           // 20
		ssl_params.ca = options.ca;                                                          // 21
	}                                                                                     // 22
                                                                                       // 23
	if (_.has(options, 'public_cert')) {                                                  // 24
		ssl_params.cert = options.public_cert;                                               // 25
	}                                                                                     // 26
                                                                                       // 27
	if (_.has(options, 'private_key')) {                                                  // 28
		ssl_params.key = options.private_key;                                                // 29
	}                                                                                     // 30
                                                                                       // 31
	if (_.has(options, 'cert_pass')) {                                                    // 32
		ssl_params.passphrase = options.cert_pass;                                           // 33
	}                                                                                     // 34
                                                                                       // 35
	if (_.has(options, 'client_id')) {                                                    // 36
		form_params.client_id = options.client_id;                                           // 37
	}                                                                                     // 38
                                                                                       // 39
	if (_.has(options, 'client_secret')) {                                                // 40
		form_params.client_secret = options.client_secret;                                   // 41
	}                                                                                     // 42
                                                                                       // 43
	if (_.has(options, 'domain')) {                                                       // 44
		domain = options.domain                                                              // 45
	}                                                                                     // 46
};                                                                                     // 47
                                                                                       // 48
SightCall.auth = function (uid, profile) {                                             // 49
	var req_form = {                                                                      // 50
		uid: uid,                                                                            // 51
		identifier_client: domain,                                                           // 52
		id_profile: profile                                                                  // 53
	};                                                                                    // 54
                                                                                       // 55
	_.extend(req_form, form_params);                                                      // 56
	// TODO: Replace with updated HTTP that offers access to the underlying request rather than depending on 3rd party HTTP
	return HTTP.post(endpoint + '/auth', { params: req_form, agentOptions: ssl_params }); // 58
};                                                                                     // 59
                                                                                       // 60
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.sightcall = {
  SightCall: SightCall
};

})();

//# sourceMappingURL=sightcall.js.map
