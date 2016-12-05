// TODO Change to dealing with TrueVaultRefs
TrueVault = {};

var endpoint = 'https://api.truevault.com/v1';

var config = {
	vaultId: null,
	kioskGroupId: null,
	dentistGroupId: null,
	taGroupId: null,
	maGroupId: null,
	adminKey: null
};

TrueVault.groups = {
	KIOSK: 'kioskGroupId',
	DENTIST: 'dentistGroupId',
	TA: 'taGroupId',
	MA: 'maGroupId'
};

TrueVault.config = function (options) {
	if (_.has(options, 'vaultId')) config.vaultId = options.vaultId;
	if (_.has(options, 'kioskGroupId')) config.kioskGroupId = options.kioskGroupId;
	if (_.has(options, 'dentistGroupId')) config.dentistGroupId = options.dentistGroupId;
	if (_.has(options, 'taGroupId')) config.taGroupId = options.taGroupId;
	if (_.has(options, 'maGroupId')) config.maGroupId = options.maGroupId;
	if (_.has(options, 'adminKey')) config.adminKey = options.adminKey;
};

// Simply stores truevault user_id, access_token, and expires (+20 hours) in memory rather than fetching a new token for each request
var tokenCache = new Mongo.Collection(null);

var getTokenTrueVault = function (userId) {
	var result;
	try {
		result = HTTP.post(endpoint + '/users/' + userId + '/access_token', { auth: config.adminKey + ':' });
	} catch (e) {
		result = e;
		throw new Error();
	} finally {
		
	}
	return result.data.user.access_token;
};

var getToken = function (userId) {
	var result = tokenCache.findOne({userId: userId});
	if (!result || new Date > result.expires) {
		result = getTokenTrueVault(userId);
		var expires = new Date();
		expires.setHours(expires.getHours() + 20);
		tokenCache.upsert({userId: userId}, {
			$set: {
				expires: expires,
				token: result
			}
		});
	} else {
		result = result.token;
	}
	return result;
};

TrueVault.createDocument = function (doc, userId) {
	var token, result;
	try {
		token = getToken(userId);
		doc = Base64.encode(EJSON.stringify(doc));
		result = HTTP.post(endpoint + '/vaults/' + config.vaultId + '/documents', { params: { document: doc }, auth: token + ':' });
	} catch (e) {
		result = e;
		throw new Error();
	} finally {
		
	}
	return {
		docId: result.data.document_id,
		vaultId: config.vaultId,
		transId: result.data.transaction_id
	};
};
/*
 * At some point this should be overlaoded to accept a vaultId and a docId or
 * a vaultId and an array of docIds or an array of vaultId + docId pairs
 */
TrueVault.readDocument = function (vaultId, docId, userId) {
	var token;
	if(userId) token = getToken(userId);
	else token = config.adminKey;
	var result;
	try {
		result = HTTP.get(endpoint + '/vaults/' + vaultId + '/documents/' + docId, { auth: token + ':' }).content;
		result = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(result)));
	} catch (e) {
		result = e;
		throw new Error();
	} finally {
		
	}
	return result;
};

TrueVault.readTwoDocuments = function (vaultId, docIdOne, docIdTwo, userId) {
	var token;
	if(userId) token = getToken(userId);
	else token = config.adminKey;
	var docOne, docTwo;
	var result;
	try {
		result = HTTP.get('https://api.truevault.com/v1/vaults/' + vaultId + '/documents/' + docIdOne + ',' + docIdTwo, { auth: token + ':' }).content;
		result = EJSON.parse(result);
	} catch (e) {
		result = e;
		throw new Error();
	} finally {
		
	}
	_.each(result.documents, function(document) {
		if (document.id === docIdOne) {
			docOne = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(document.document)));
		}
		if (document.id === docIdTwo) {
			docTwo = EJSON.parse(String.fromCharCode.apply(null, Base64.decode(document.document)));
		}
	});
	return {
		docOne: docOne,
		docTwo: docTwo,
		transId: result.transaction_id
	};
};

TrueVault.createUser = function (username) {
	var result;
	try {
		result = HTTP.post(endpoint + '/users', { params: { username: username }, auth: config.adminKey + ':' });
	} catch (e) {
		result = e;
		throw new Error();
	} finally {

	}
	return result.data.user.user_id;
};

TrueVault.deleteTVUser = function (trueVaultId) {
	var result;
	try {
		console.log("test- "+trueVaultId);
		result = HTTP.call('DELETE', endpoint + '/users', { params: { user_id: trueVaultId}, auth: config.adminKey + ':' });
	} catch (e) {
		result = e;
		throw new Error();
	} finally {

	}
	
};

TrueVault.updateGroup = function (group, userId, remove) {
	var result;
	try {
		result = HTTP.put(endpoint + '/groups/' + config[group], { params: { user_ids: userId, operation: remove ? 'REMOVE' : 'APPEND' }, auth: config.adminKey + ':' });
	} catch (e) {
		result = e;
		throw new Error();
	} finally {
		
	}
};
