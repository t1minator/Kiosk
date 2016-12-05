(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Base64 = Package.base64.Base64;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var TrueVault;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/truevault/truevault.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// TODO Change to dealing with TrueVaultRefs                                                                           // 1
TrueVault = {};                                                                                                        // 2
                                                                                                                       // 3
var endpoint = 'https://api.truevault.com/v1';                                                                         // 4
                                                                                                                       // 5
var config = {                                                                                                         // 6
	vaultId: null,                                                                                                        // 7
	kioskGroupId: null,                                                                                                   // 8
	dentistGroupId: null,                                                                                                 // 9
	taGroupId: null,                                                                                                      // 10
	maGroupId: null,                                                                                                      // 11
	adminKey: null                                                                                                        // 12
};                                                                                                                     // 13
                                                                                                                       // 14
TrueVault.groups = {                                                                                                   // 15
	KIOSK: 'kioskGroupId',                                                                                                // 16
	DENTIST: 'dentistGroupId',                                                                                            // 17
	TA: 'taGroupId',                                                                                                      // 18
	MA: 'maGroupId'                                                                                                       // 19
};                                                                                                                     // 20
                                                                                                                       // 21
TrueVault.config = function (options) {                                                                                // 22
	if (_.has(options, 'vaultId')) config.vaultId = options.vaultId;                                                      // 23
	if (_.has(options, 'kioskGroupId')) config.kioskGroupId = options.kioskGroupId;                                       // 24
	if (_.has(options, 'dentistGroupId')) config.dentistGroupId = options.dentistGroupId;                                 // 25
	if (_.has(options, 'taGroupId')) config.taGroupId = options.taGroupId;                                                // 26
	if (_.has(options, 'maGroupId')) config.maGroupId = options.maGroupId;                                                // 27
	if (_.has(options, 'adminKey')) config.adminKey = options.adminKey;                                                   // 28
};                                                                                                                     // 29
                                                                                                                       // 30
// Simply stores truevault user_id, access_token, and expires (+20 hours) in memory rather than fetching a new token for each request
var tokenCache = new Mongo.Collection(null);                                                                           // 32
                                                                                                                       // 33
var getTokenTrueVault = function (userId) {                                                                            // 34
	var result;                                                                                                           // 35
	try {                                                                                                                 // 36
		result = HTTP.post(endpoint + '/users/' + userId + '/access_token', { auth: config.adminKey + ':' });                // 37
	} catch (e) {                                                                                                         // 38
		result = e;                                                                                                          // 39
		throw new Error();                                                                                                   // 40
	} finally {                                                                                                           // 41
		                                                                                                                     // 42
	}                                                                                                                     // 43
	return result.data.user.access_token;                                                                                 // 44
};                                                                                                                     // 45
                                                                                                                       // 46
var getToken = function (userId) {                                                                                     // 47
	var result = tokenCache.findOne({userId: userId});                                                                    // 48
	if (!result || new Date > result.expires) {                                                                           // 49
		result = getTokenTrueVault(userId);                                                                                  // 50
		var expires = new Date();                                                                                            // 51
		expires.setHours(expires.getHours() + 20);                                                                           // 52
		tokenCache.upsert({userId: userId}, {                                                                                // 53
			$set: {                                                                                                             // 54
				expires: expires,                                                                                                  // 55
				token: result                                                                                                      // 56
			}                                                                                                                   // 57
		});                                                                                                                  // 58
	} else {                                                                                                              // 59
		result = result.token;                                                                                               // 60
	}                                                                                                                     // 61
	return result;                                                                                                        // 62
};                                                                                                                     // 63
                                                                                                                       // 64
TrueVault.createDocument = function (doc, userId) {                                                                    // 65
	var token, result;                                                                                                    // 66
	try {                                                                                                                 // 67
		token = getToken(userId);                                                                                            // 68
		doc = Base64.encode(EJSON.stringify(doc));                                                                           // 69
		result = HTTP.post(endpoint + '/vaults/' + config.vaultId + '/documents', { params: { document: doc }, auth: token + ':' });
	} catch (e) {                                                                                                         // 71
		result = e;                                                                                                          // 72
		throw new Error();                                                                                                   // 73
	} finally {                                                                                                           // 74
		                                                                                                                     // 75
	}                                                                                                                     // 76
	return {                                                                                                              // 77
		docId: result.data.document_id,                                                                                      // 78
		vaultId: config.vaultId,                                                                                             // 79
		transId: result.data.transaction_id                                                                                  // 80
	};                                                                                                                    // 81
};                                                                                                                     // 82
/*                                                                                                                     // 83
 * At some point this should be overlaoded to accept a vaultId and a docId or                                          // 84
 * a vaultId and an array of docIds or an array of vaultId + docId pairs                                               // 85
 */                                                                                                                    // 86
TrueVault.readDocument = function (vaultId, docId, userId) {                                                           // 87
	var token;                                                                                                            // 88
	if(userId) token = getToken(userId);                                                                                  // 89
	else token = config.adminKey;                                                                                         // 90
	var result;                                                                                                           // 91
	try {                                                                                                                 // 92
		result = HTTP.get(endpoint + '/vaults/' + vaultId + '/documents/' + docId, { auth: token + ':' }).content;           // 93
		result = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(result)));                                        // 94
	} catch (e) {                                                                                                         // 95
		result = e;                                                                                                          // 96
		throw new Error();                                                                                                   // 97
	} finally {                                                                                                           // 98
		                                                                                                                     // 99
	}                                                                                                                     // 100
	return result;                                                                                                        // 101
};                                                                                                                     // 102
                                                                                                                       // 103
TrueVault.readTwoDocuments = function (vaultId, docIdOne, docIdTwo, userId) {                                          // 104
	var token;                                                                                                            // 105
	if(userId) token = getToken(userId);                                                                                  // 106
	else token = config.adminKey;                                                                                         // 107
	var docOne, docTwo;                                                                                                   // 108
	var result;                                                                                                           // 109
	try {                                                                                                                 // 110
		result = HTTP.get('https://api.truevault.com/v1/vaults/' + vaultId + '/documents/' + docIdOne + ',' + docIdTwo, { auth: token + ':' }).content;
		result = EJSON.parse(result);                                                                                        // 112
	} catch (e) {                                                                                                         // 113
		result = e;                                                                                                          // 114
		throw new Error();                                                                                                   // 115
	} finally {                                                                                                           // 116
		                                                                                                                     // 117
	}                                                                                                                     // 118
	_.each(result.documents, function(document) {                                                                         // 119
		if (document.id === docIdOne) {                                                                                      // 120
			docOne = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(document.document)));                            // 121
		}                                                                                                                    // 122
		if (document.id === docIdTwo) {                                                                                      // 123
			docTwo = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(document.document)));                            // 124
		}                                                                                                                    // 125
	});                                                                                                                   // 126
	return {                                                                                                              // 127
		docOne: docOne,                                                                                                      // 128
		docTwo: docTwo,                                                                                                      // 129
		transId: result.transaction_id                                                                                       // 130
	};                                                                                                                    // 131
};                                                                                                                     // 132
                                                                                                                       // 133
TrueVault.createUser = function (username) {                                                                           // 134
	var result;                                                                                                           // 135
	try {                                                                                                                 // 136
		result = HTTP.post(endpoint + '/users', { params: { username: username }, auth: config.adminKey + ':' });            // 137
	} catch (e) {                                                                                                         // 138
		result = e;                                                                                                          // 139
		throw new Error();                                                                                                   // 140
	} finally {                                                                                                           // 141
                                                                                                                       // 142
	}                                                                                                                     // 143
	return result.data.user.user_id;                                                                                      // 144
};                                                                                                                     // 145
                                                                                                                       // 146
TrueVault.deleteTVUser = function (trueVaultId) {                                                                      // 147
	var result;                                                                                                           // 148
	try {                                                                                                                 // 149
		console.log("test- "+trueVaultId);                                                                                   // 150
		result = HTTP.call('DELETE', endpoint + '/users', { params: { user_id: trueVaultId}, auth: config.adminKey + ':' }); // 151
	} catch (e) {                                                                                                         // 152
		result = e;                                                                                                          // 153
		throw new Error();                                                                                                   // 154
	} finally {                                                                                                           // 155
                                                                                                                       // 156
	}                                                                                                                     // 157
	                                                                                                                      // 158
};                                                                                                                     // 159
                                                                                                                       // 160
TrueVault.updateGroup = function (group, userId, remove) {                                                             // 161
	var result;                                                                                                           // 162
	try {                                                                                                                 // 163
		result = HTTP.put(endpoint + '/groups/' + config[group], { params: { user_ids: userId, operation: remove ? 'REMOVE' : 'APPEND' }, auth: config.adminKey + ':' });
	} catch (e) {                                                                                                         // 165
		result = e;                                                                                                          // 166
		throw new Error();                                                                                                   // 167
	} finally {                                                                                                           // 168
		                                                                                                                     // 169
	}                                                                                                                     // 170
};                                                                                                                     // 171
                                                                                                                       // 172
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.truevault = {
  TrueVault: TrueVault
};

})();

//# sourceMappingURL=truevault.js.map
