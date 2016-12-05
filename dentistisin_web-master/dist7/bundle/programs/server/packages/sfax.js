(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Base64 = Package.base64.Base64;
var moment = Package['momentjs:moment'].moment;

/* Package-scope variables */
var SFax;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/sfax/server/sfax.js                                                                           //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var crypto = Npm.require('crypto');                                                                       // 1
                                                                                                          // 2
SFax = {};                                                                                                // 3
                                                                                                          // 4
var endpoint = 'https://api.sfaxme.com/api'                                                               // 5
                                                                                                          // 6
var config = {                                                                                            // 7
	username: null,                                                                                          // 8
	apiKey: null,                                                                                            // 9
	encryptionKey: null,                                                                                     // 10
	initVector: null                                                                                         // 11
};                                                                                                        // 12
                                                                                                          // 13
SFax.config = function (options) {                                                                        // 14
	if (_.has(options, 'username')) config.username = options.username;                                      // 15
	if (_.has(options, 'apiKey')) config.apiKey = options.apiKey;                                            // 16
	if (_.has(options, 'encryptionKey')) config.encryptionKey = new Buffer(options.encryptionKey, 'binary'); // 17
	if (_.has(options, 'initVector')) config.initVector = new Buffer(options.initVector, 'binary');          // 18
};                                                                                                        // 19
                                                                                                          // 20
var createTokenData = function() {                                                                        // 21
	return 'Username=' + config.username + '&ApiKey=' + config.apiKey + '&GenDT=' + moment.utc().format();   // 22
};                                                                                                        // 23
                                                                                                          // 24
var encryptToken = function(tokenData) {                                                                  // 25
	var cipher = crypto.createCipheriv('aes-256-cbc', config.encryptionKey, config.initVector);              // 26
	var encryptedToken = cipher.update(tokenData, 'ascii', 'base64');                                        // 27
	encryptedToken += cipher.final('base64');                                                                // 28
	return encryptedToken;                                                                                   // 29
};                                                                                                        // 30
                                                                                                          // 31
var getToken = function() {                                                                               // 32
	return encryptToken(createTokenData());                                                                  // 33
};                                                                                                        // 34
                                                                                                          // 35
SFax.sendFax = function(sessionId, recipientName, recipientFax, pdfBuffer) {                              // 36
	var token = getToken();                                                                                  // 37
	var url = endpoint +                                                                                     // 38
	         '/SendFax?token=' + encodeURIComponent(token) +                                                 // 39
	         '&ApiKey=' + encodeURIComponent(config.apiKey) +                                                // 40
	         '&RecipientName=' + encodeURIComponent(recipientName) +                                         // 41
	         '&RecipientFax=' + encodeURIComponent(recipientFax) +                                           // 42
	         '&OptionalParams=TrackingCode=' + encodeURIComponent(sessionId) +                               // 43
	         ';MaxAttempts=' + encodeURIComponent('6') +                                                     // 44
	         ';AttemptInterval=' + encodeURIComponent('120') + '&';                                          // 45
	var formData = {                                                                                         // 46
		file: {                                                                                                 // 47
			value: pdfBuffer,                                                                                      // 48
			options: {                                                                                             // 49
				filename: 'session.pdf',                                                                              // 50
				contentType: 'application/pdf'                                                                        // 51
			}                                                                                                      // 52
		}                                                                                                       // 53
	};                                                                                                       // 54
	var result;                                                                                              // 55
	try {                                                                                                    // 56
		result = HTTP.call('POST', url, { npmRequestOptions: { formData: formData } });                         // 57
	} catch (e) {                                                                                            // 58
		//console.log('error: ',e);                                                                             // 59
	}                                                                                                        // 60
	return result.data;                                                                                      // 61
};                                                                                                        // 62
                                                                                                          // 63
SFax.receiveOutboundFax = function() {                                                                    // 64
	var token = getToken();                                                                                  // 65
	var url = endpoint + '/ReceiveOutboundFax?token=' + encodeURIComponent(token) +                          // 66
	          '&ApiKey=' + encodeURIComponent(config.apiKey);                                                // 67
	var result;                                                                                              // 68
	try {                                                                                                    // 69
		result = HTTP.get(url);                                                                                 // 70
	} catch (e) {                                                                                            // 71
		//console.log(e);                                                                                       // 72
	}                                                                                                        // 73
	return result.data.OutboundFaxItems;                                                                     // 74
};                                                                                                        // 75
                                                                                                          // 76
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.sfax = {
  SFax: SFax
};

})();

//# sourceMappingURL=sfax.js.map
