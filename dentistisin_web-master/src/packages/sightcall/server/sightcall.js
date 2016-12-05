SightCall = {};

var endpoint = 'https://auth.rtccloud.net';

var ssl_params = {
	ca: null,
	cert: null,
	key: null,
	passphrase: null,
};

var form_params = {
	client_id: null,
	client_secret: null
};

var domain = null;

SightCall.config = function (options) {
	if (_.has(options, 'ca')) {
		ssl_params.ca = options.ca;
	}

	if (_.has(options, 'public_cert')) {
		ssl_params.cert = options.public_cert;
	}

	if (_.has(options, 'private_key')) {
		ssl_params.key = options.private_key;
	}

	if (_.has(options, 'cert_pass')) {
		ssl_params.passphrase = options.cert_pass;
	}

	if (_.has(options, 'client_id')) {
		form_params.client_id = options.client_id;
	}

	if (_.has(options, 'client_secret')) {
		form_params.client_secret = options.client_secret;
	}

	if (_.has(options, 'domain')) {
		domain = options.domain
	}
};

SightCall.auth = function (uid, profile) {
	var req_form = {
		uid: uid,
		identifier_client: domain,
		id_profile: profile
	};

	_.extend(req_form, form_params);
	// TODO: Replace with updated HTTP that offers access to the underlying request rather than depending on 3rd party HTTP
	return HTTP.post(endpoint + '/auth', { params: req_form, agentOptions: ssl_params });
};
