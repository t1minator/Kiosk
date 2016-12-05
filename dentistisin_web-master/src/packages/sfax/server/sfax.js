var crypto = Npm.require('crypto');

SFax = {};

var endpoint = 'https://api.sfaxme.com/api'

var config = {
	username: null,
	apiKey: null,
	encryptionKey: null,
	initVector: null
};

SFax.config = function (options) {
	if (_.has(options, 'username')) config.username = options.username;
	if (_.has(options, 'apiKey')) config.apiKey = options.apiKey;
	if (_.has(options, 'encryptionKey')) config.encryptionKey = new Buffer(options.encryptionKey, 'binary');
	if (_.has(options, 'initVector')) config.initVector = new Buffer(options.initVector, 'binary');
};

var createTokenData = function() {
	return 'Username=' + config.username + '&ApiKey=' + config.apiKey + '&GenDT=' + moment.utc().format();
};

var encryptToken = function(tokenData) {
	var cipher = crypto.createCipheriv('aes-256-cbc', config.encryptionKey, config.initVector);
	var encryptedToken = cipher.update(tokenData, 'ascii', 'base64');
	encryptedToken += cipher.final('base64');
	return encryptedToken;
};

var getToken = function() {
	return encryptToken(createTokenData());
};

SFax.sendFax = function(sessionId, recipientName, recipientFax, pdfBuffer) {
	var token = getToken();
	var url = endpoint +
	         '/SendFax?token=' + encodeURIComponent(token) +
	         '&ApiKey=' + encodeURIComponent(config.apiKey) +
	         '&RecipientName=' + encodeURIComponent(recipientName) +
	         '&RecipientFax=' + encodeURIComponent(recipientFax) +
	         '&OptionalParams=TrackingCode=' + encodeURIComponent(sessionId) +
	         ';MaxAttempts=' + encodeURIComponent('6') +
	         ';AttemptInterval=' + encodeURIComponent('120') + '&';
	var formData = {
		file: {
			value: pdfBuffer,
			options: {
				filename: 'session.pdf',
				contentType: 'application/pdf'
			}
		}
	};
	var result;
	try {
		result = HTTP.call('POST', url, { npmRequestOptions: { formData: formData } });
	} catch (e) {
		//console.log('error: ',e);
	}
	return result.data;
};

SFax.receiveOutboundFax = function() {
	var token = getToken();
	var url = endpoint + '/ReceiveOutboundFax?token=' + encodeURIComponent(token) +
	          '&ApiKey=' + encodeURIComponent(config.apiKey);
	var result;
	try {
		result = HTTP.get(url);
	} catch (e) {
		//console.log(e);
	}
	return result.data.OutboundFaxItems;
};
