(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Random = Package.random.Random;
var moment = Package['momentjs:moment'].moment;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Roles = Package['alanning:roles'].Roles;
var Counts = Package['tmeasday:publish-counts'].Counts;
var publishCount = Package['tmeasday:publish-counts'].publishCount;
var Sessions = Package.sessions.Sessions;
var TrueVault = Package.truevault.TrueVault;

/* Package-scope variables */
var Locations;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/locations/locations_common.js                                                                 //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Locations = {};                                                                                           // 1
                                                                                                          // 2
Locations.collection = new Mongo.Collection('locations');                                                 // 3
Locations.collection.deny({                                                                               // 4
	insert: function() { return true; },                                                                     // 5
	update: function() { return true; },                                                                     // 6
	remove: function() { return true; }                                                                      // 7
});                                                                                                       // 8
                                                                                                          // 9
Locations._schemaObject = {                                                                               // 10
	'name': {                                                                                                // 11
		label: 'Name',                                                                                          // 12
		type: String,                                                                                           // 13
		unique: true,                                                                                           // 14
		index: 'text',                                                                                          // 15
		max: 100,                                                                                               // 16
		denyUpdate: false,                                                                                      // 17
		autoform: {                                                                                             // 18
			placeholder: 'A unique location name'                                                                  // 19
		}                                                                                                       // 20
	},                                                                                                       // 21
	address: {                                                                                               // 22
		label: 'Address',                                                                                       // 23
		type: Object                                                                                            // 24
	},                                                                                                       // 25
	'address.one': {                                                                                         // 26
		type: String,                                                                                           // 27
		max: 100,                                                                                               // 28
		autoform: {                                                                                             // 29
			label: 'Address',                                                                                      // 30
			placeholder: 'Address Line 1'                                                                          // 31
		}                                                                                                       // 32
	},                                                                                                       // 33
	'address.two': {                                                                                         // 34
		type: String,                                                                                           // 35
		max: 100,                                                                                               // 36
		optional: true,                                                                                         // 37
		autoform: {                                                                                             // 38
			label: false,                                                                                          // 39
			placeholder: 'Address Line 2 (optional)'                                                               // 40
		}                                                                                                       // 41
	},                                                                                                       // 42
	'address.city': {                                                                                        // 43
		type: String,                                                                                           // 44
		max: 100,                                                                                               // 45
		autoform: {                                                                                             // 46
			label: false,                                                                                          // 47
			placeholder: 'City'                                                                                    // 48
		}                                                                                                       // 49
	},                                                                                                       // 50
	'address.state': {                                                                                       // 51
		type: String,                                                                                           // 52
		allowedValues: [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ],
		autoform: {                                                                                             // 54
			label: false,                                                                                          // 55
			options: 'allowed'                                                                                     // 56
		}                                                                                                       // 57
	},                                                                                                       // 58
	'address.zip': {                                                                                         // 59
		type: String,                                                                                           // 60
		regEx: SimpleSchema.RegEx.ZipCode,                                                                      // 61
		autoform: {                                                                                             // 62
			label: false,                                                                                          // 63
			placeholder: 'Zip'                                                                                     // 64
		}                                                                                                       // 65
	},                                                                                                       // 66
	contact: {                                                                                               // 67
		label: 'Contact Information',                                                                           // 68
		type: Object                                                                                            // 69
	},                                                                                                       // 70
	'contact.name': {                                                                                        // 71
		label: 'Contact Name',                                                                                  // 72
		type: String,                                                                                           // 73
		max: 100,                                                                                               // 74
		autoform: {                                                                                             // 75
			placeholder: 'Contact Name'                                                                            // 76
		}                                                                                                       // 77
	},                                                                                                       // 78
	'contact.number': {                                                                                      // 79
		label: 'Contact Phone Number',                                                                          // 80
		type: String,                                                                                           // 81
		max: 25,                                                                                                // 82
		autoform: {                                                                                             // 83
			placeholder: 'Phone Number'                                                                            // 84
		}                                                                                                       // 85
	},                                                                                                       // 86
	'contact.fax': {                                                                                         // 87
		label: 'Fax Number',                                                                                    // 88
		type: String,                                                                                           // 89
		regEx: /^\d{11}$/,                                                                                      // 90
		autoform: {                                                                                             // 91
			placeholder: 'Fax Number'                                                                              // 92
		}                                                                                                       // 93
	},                                                                                                       // 94
	kiosk: {                                                                                                 // 95
		type: Object                                                                                            // 96
	},                                                                                                       // 97
	'kiosk.active': {                                                                                        // 98
		type: Boolean,                                                                                          // 99
		defaultValue: true,                                                                                     // 100
		autoform: {                                                                                             // 101
			defaultValue: true                                                                                     // 102
		}                                                                                                       // 103
	}                                                                                                        // 104
};                                                                                                        // 105
var msgs = {                                                                                              // 106
	'invalidLocation': 'Name already exists.'                                                                // 107
};                                                                                                        // 108
                                                                                                          // 109
SimpleSchema.messages(msgs);                                                                              // 110
                                                                                                          // 111
Locations.schema = new SimpleSchema(Locations._schemaObject);                                             // 112
                                                                                                          // 113
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/locations/locations_server.js                                                                 //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
//var bcrypt = NpmModuleBcrypt;                                                                           // 1
//var bcryptHash = Meteor.wrapAsync(bcrypt.hash);                                                         // 2
//var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);                                                   // 3
                                                                                                          // 4
var Uuid = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;                             // 5
var secret = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\-_]{43}$/;                 // 6
var code = code = /^[0-9]{6}$/;                                                                           // 7
                                                                                                          // 8
Locations._schemaObjectDB = {                                                                             // 9
	createdAt: {                                                                                             // 10
		type: Date,                                                                                             // 11
		index: 1,                                                                                               // 12
		autoValue: function() {                                                                                 // 13
			if (this.isInsert) {                                                                                   // 14
				return new Date;                                                                                      // 15
			} else if (this.isUpsert) {                                                                            // 16
				return { $setOnInsert: new Date };                                                                    // 17
			} else {                                                                                               // 18
				this.unset();                                                                                         // 19
			}                                                                                                      // 20
		}                                                                                                       // 21
	},                                                                                                       // 22
	modifiedAt: {                                                                                            // 23
		type: Date,                                                                                             // 24
		autoValue: function() {                                                                                 // 25
			if (this.isInsert || this.isUpdate) {                                                                  // 26
				return new Date;                                                                                      // 27
			} else if (this.isUpsert) {                                                                            // 28
				return { $setOnInsert: new Date };                                                                    // 29
			} else {                                                                                               // 30
				this.unset();                                                                                         // 31
			}                                                                                                      // 32
		}                                                                                                       // 33
	},                                                                                                       // 34
	'kiosk.handle': {                                                                                        // 35
		type: String,                                                                                           // 36
		unique: true,                                                                                           // 37
		regEx: Uuid                                                                                             // 38
	},                                                                                                       // 39
	'kiosk.apiKey': {                                                                                        // 40
		type: String,                                                                                           // 41
		unique: true,                                                                                           // 42
		index: 1,                                                                                               // 43
		regEx: Uuid                                                                                             // 44
	},                                                                                                       // 45
	'kiosk.secret': {                                                                                        // 46
		type: String,                                                                                           // 47
		regEx: secret                                                                                           // 48
	},                                                                                                       // 49
	'kiosk.code': {                                                                                          // 50
		type: String,                                                                                           // 51
		regEx: code                                                                                             // 52
	},                                                                                                       // 53
	'kiosk.trueVault': {                                                                                     // 54
		type: Object                                                                                            // 55
	},                                                                                                       // 56
	'kiosk.trueVault.id': {                                                                                  // 57
		type: String,                                                                                           // 58
		regEx: Uuid                                                                                             // 59
	}                                                                                                        // 60
};                                                                                                        // 61
                                                                                                          // 62
_.extend(Locations._schemaObjectDB, Locations._schemaObject);                                             // 63
                                                                                                          // 64
Locations.schemaDB = new SimpleSchema(Locations._schemaObjectDB);                                         // 65
                                                                                                          // 66
Locations.collection.attachSchema(Locations.schemaDB);                                                    // 67
                                                                                                          // 68
var validId = Match.Where(function (x) {                                                                  // 69
	check(x, String);                                                                                        // 70
	return SimpleSchema.RegEx.Id.test(x);                                                                    // 71
});                                                                                                       // 72
                                                                                                          // 73
var getSecretString = function (secret) {                                                                 // 74
	if (typeof secret === 'string') {                                                                        // 75
		secret = SHA256(secret);                                                                                // 76
	} else {                                                                                                 // 77
		if (secret.algorithm !== 'sha-256') {                                                                   // 78
			throw new Error('Invalid secret hash algorithm. Only "sha-256" is allowed.');                          // 79
		}                                                                                                       // 80
		secret = secret.digest;                                                                                 // 81
	}                                                                                                        // 82
	return secret;                                                                                           // 83
};                                                                                                        // 84
                                                                                                          // 85
var hashSecret = function (secret) {                                                                      // 86
	secret = getSecretString(secret);                                                                        // 87
	return bcryptHash(secret, 10);                                                                           // 88
};                                                                                                        // 89
                                                                                                          // 90
Locations._checkSecret = function (location, secret) {                                                    // 91
	secret = getSecretString(secret);                                                                        // 92
	if (!bcryptCompare(secret, location.kiosk.secret)) {                                                     // 93
		return false;                                                                                           // 94
	}                                                                                                        // 95
	return true;                                                                                             // 96
};                                                                                                        // 97
                                                                                                          // 98
Meteor.methods({                                                                                          // 99
	createLocation: function(location) {                                                                     // 100
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 101
			throw new Meteor.Error(403);                                                                           // 102
		}                                                                                                       // 103
		try {                                                                                                   // 104
			Locations.schema.clean(location);                                                                      // 105
			check(location, Locations.schema);                                                                     // 106
		} catch (e) {                                                                                           // 107
			throw new Meteor.Error(400);                                                                           // 108
		}                                                                                                       // 109
		location.kiosk.handle = UUID.v4();                                                                      // 110
		location.kiosk.apiKey = UUID.v4();                                                                      // 111
		var secret = Random.secret();                                                                           // 112
		// TODO: switch to OTP -> JWT authentication                                                            // 113
		location.kiosk.secret = secret;//hashSecret(secret);                                                    // 114
		location.kiosk.code = Random._randomString(6, '0123456789');                                            // 115
		// TODO: Remove password from TrueVault.createUser                                                      // 116
		var result = TrueVault.createUser(location.name);                                                       // 117
		location.kiosk.trueVault = {                                                                            // 118
			id: result                                                                                             // 119
		};                                                                                                      // 120
		TrueVault.updateGroup(TrueVault.groups.KIOSK, result);                                                  // 121
		try {                                                                                                   // 122
			var locationId = Locations.collection.insert(location);                                                // 123
		} catch (e) {                                                                                           // 124
			if (e.name === 'MongoError') {                                                                         // 125
				if (/E11000/.test(e.err))                                                                             // 126
					throw new Meteor.Error('location-exists');	                                                          // 127
			}                                                                                                      // 128
		}                                                                                                       // 129
		return locationId;                                                                                      // 130
	},                                                                                                       // 131
	updateLocation: function(modifier, locationId) {                                                         // 132
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 133
			throw new Meteor.Error(403);                                                                           // 134
		}                                                                                                       // 135
		try {                                                                                                   // 136
			check(locationId, validId);                                                                            // 137
			Locations.schema.clean(modifier, { isModifier: true });                                                // 138
			check(modifier, Match.Where(function (x) {                                                             // 139
				var ctx = Locations.schema.newContext();                                                              // 140
				return ctx.validate(x, { modifier: true });                                                           // 141
			}));                                                                                                   // 142
			                                                                                                       // 143
		} catch (e) {                                                                                           // 144
			console.log(e);                                                                                        // 145
			throw new Meteor.Error(400);                                                                           // 146
		}                                                                                                       // 147
		if (modifier.$set && modifier.$set.kiosk && _.has(modifier.$set.kiosk, 'active')) {                     // 148
			modifier.$set['kiosk.active'] = modifier.$set.kiosk.active;                                            // 149
			delete modifier.$set.kiosk;                                                                            // 150
		}                                                                                                       // 151
		return !!Locations.collection.update({_id: locationId}, modifier);                                      // 152
	},                                                                                                       // 153
	//flipActive: function(locationId) {                                                                     // 154
	newCode: function(locationId) {                                                                          // 155
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 156
			throw new Meteor.Error(403);                                                                           // 157
		}                                                                                                       // 158
		try {                                                                                                   // 159
			check(locationId, validId);                                                                            // 160
		} catch (e) {                                                                                           // 161
			throw new Meteor.Error(400);                                                                           // 162
		}                                                                                                       // 163
		return !!Locations.collection.update({_id: locationId}, {                                               // 164
			$set: {                                                                                                // 165
				'kiosk.code': Random._randomString(6, '0123456789')                                                   // 166
			}                                                                                                      // 167
		});                                                                                                     // 168
	},                                                                                                       // 169
	newSecret: function(locationId) {                                                                        // 170
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 171
			throw new Meteor.Error(403);                                                                           // 172
		}                                                                                                       // 173
		try {                                                                                                   // 174
			check(locationId, validId);                                                                            // 175
		} catch (e) {                                                                                           // 176
			throw new Meteor.Error(400);                                                                           // 177
		}                                                                                                       // 178
		var secret = Random.secret();                                                                           // 179
		//var result = Locations.collection.update({_id: locationId}, {                                         // 180
		return !!Locations.collection.update({_id: locationId}, {                                               // 181
			$set: {                                                                                                // 182
				'kiosk.secret': secret//hashSecret(secret)                                                            // 183
			}                                                                                                      // 184
		});                                                                                                     // 185
		//if (result) return secret;                                                                            // 186
		//else return false;                                                                                    // 187
	},                                                                                                       // 188
	setKioskActive: function(locationId) {                                                                   // 189
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 190
			throw new Meteor.Error(403);                                                                           // 191
		}                                                                                                       // 192
		try {                                                                                                   // 193
			check(locationId, validId);                                                                            // 194
		} catch (e) {                                                                                           // 195
			throw new Meteor.Error(400);                                                                           // 196
		}                                                                                                       // 197
		Locations.collection.update({_id: locationId}, {                                                        // 198
			$set: {                                                                                                // 199
				'kiosk.active': true                                                                                  // 200
			}                                                                                                      // 201
		});                                                                                                     // 202
	},                                                                                                       // 203
	setKioskInactive: function(locationId) {                                                                 // 204
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 205
			throw new Meteor.Error(403);                                                                           // 206
		}                                                                                                       // 207
		try {                                                                                                   // 208
			check(locationId, validId);                                                                            // 209
		} catch (e) {                                                                                           // 210
			throw new Meteor.Error(400);                                                                           // 211
		}                                                                                                       // 212
		Locations.collection.update({_id: locationId}, {                                                        // 213
			$set: {                                                                                                // 214
				'kiosk.active': false                                                                                 // 215
			}                                                                                                      // 216
		});                                                                                                     // 217
	}                                                                                                        // 218
});                                                                                                       // 219
                                                                                                          // 220
var fields = {                                                                                            // 221
	name: true,                                                                                              // 222
	address: true,                                                                                           // 223
	contact: true,                                                                                           // 224
	'kiosk.active': true,                                                                                    // 225
	'kiosk.apiKey': true,                                                                                    // 226
	'kiosk.secret': true,                                                                                    // 227
	'kiosk.code': true                                                                                       // 228
};                                                                                                        // 229
                                                                                                          // 230
var locationsSort = new SimpleSchema({                                                                    // 231
	name: {                                                                                                  // 232
		type: Number,                                                                                           // 233
		allowedValues: [1, -1],                                                                                 // 234
		defaultValue: 1                                                                                         // 235
	}                                                                                                        // 236
});                                                                                                       // 237
                                                                                                          // 238
var locationsFilter = new SimpleSchema({                                                                  // 239
	date: {                                                                                                  // 240
		type: Date,                                                                                             // 241
		autoValue: function() {                                                                                 // 242
			if (!this.isSet) return new Date();                                                                    // 243
		}                                                                                                       // 244
	},                                                                                                       // 245
	start: {                                                                                                 // 246
		type: Date,                                                                                             // 247
		autoValue: function() {                                                                                 // 248
			var date = this.siblingField('date');                                                                  // 249
			if (date.isSet) {                                                                                      // 250
				//if (_.isFunction(date.value)) date = date.value();                                                  // 251
				//else date = date.value;                                                                             // 252
				date = date.value;                                                                                    // 253
				var year = date.getFullYear();                                                                        // 254
				var month = date.getMonth();                                                                          // 255
				return new Date(year, month, 1);                                                                      // 256
			} else {                                                                                               // 257
				this.unset();                                                                                         // 258
			}                                                                                                      // 259
		}                                                                                                       // 260
	},                                                                                                       // 261
	end: {                                                                                                   // 262
		type: Date,                                                                                             // 263
		autoValue: function() {                                                                                 // 264
			var date = this.siblingField('date');                                                                  // 265
			if (date.isSet) {                                                                                      // 266
				//if (_.isFunction(date.value)) date = date.value();                                                  // 267
				//else date = date.value;                                                                             // 268
				date = date.value;                                                                                    // 269
				var year = date.getFullYear();                                                                        // 270
				var month = date.getMonth();                                                                          // 271
				//return new Date(year, month + 1, 0, 23, 59, 59, 999);                                               // 272
				return new Date(year, month + 1);                                                                     // 273
			} else {                                                                                               // 274
				this.unset();                                                                                         // 275
			}                                                                                                      // 276
		}                                                                                                       // 277
	}                                                                                                        // 278
});                                                                                                       // 279
                                                                                                          // 280
var locationFilter = new SimpleSchema({                                                                   // 281
	location: {                                                                                              // 282
		type: Object,                                                                                           // 283
	},                                                                                                       // 284
	'location.id': {                                                                                         // 285
		type: String,                                                                                           // 286
		regEx: SimpleSchema.RegEx.Id                                                                            // 287
	},                                                                                                       // 288
	start: {                                                                                                 // 289
		type: Date                                                                                              // 290
	},                                                                                                       // 291
	end: {                                                                                                   // 292
		type: Date,                                                                                             // 293
	}                                                                                                        // 294
});                                                                                                       // 295
                                                                                                          // 296
Meteor.publish('locations.filter', function() {                                                           // 297
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 298
		return [];                                                                                              // 299
	}                                                                                                        // 300
	return Locations.collection.find({}, {                                                                   // 301
		fields: {                                                                                               // 302
			name: true                                                                                             // 303
		}                                                                                                       // 304
	});                                                                                                      // 305
});                                                                                                       // 306
                                                                                                          // 307
Meteor.publish('locations', function(filter, sort, limit) {                                               // 308
	var self = this;                                                                                         // 309
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 310
		return [];                                                                                              // 311
	}                                                                                                        // 312
	try {                                                                                                    // 313
		locationsFilter.clean(filter);                                                                          // 314
		locationsSort.clean(sort);                                                                              // 315
		check(filter, locationsFilter);                                                                         // 316
		check(sort, locationsSort);                                                                             // 317
		check(limit, Match.Optional(Number));                                                                   // 318
	} catch (e) {                                                                                            // 319
		return [];                                                                                              // 320
	}                                                                                                        // 321
	limit = limit || 10;                                                                                     // 322
                                                                                                          // 323
	var locationsCountHandle = Counts.publish(this, 'locationsCount', Locations.collection.find({}, { fields: { _id: true } }), { noReady: true });
	var initializing = true;                                                                                 // 325
	var countHandles = {};                                                                                   // 326
	var handle = Locations.collection.find({}, {                                                             // 327
		fields: {                                                                                               // 328
			name: true,                                                                                            // 329
			address: true,                                                                                         // 330
			'contact.name': true,                                                                                  // 331
			'contact.number': true                                                                                 // 332
		},                                                                                                      // 333
		sort: sort,                                                                                             // 334
		limit: limit                                                                                            // 335
	}).observeChanges({                                                                                      // 336
		added: function(id, fields) {                                                                           // 337
			countHandles[id] = {};                                                                                 // 338
			var query = { 'location.id': id, createdAt: { $gte: filter.start, $lt: filter.end } };                 // 339
			var options = { noReady: true };                                                                       // 340
			countHandles[id].inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandles[id].finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandles[id].inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandles[id].timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);                                                                   // 345
		},                                                                                                      // 346
		changed: function(id, fields) {                                                                         // 347
			self.changed('locations', id, fields);                                                                 // 348
		},                                                                                                      // 349
		removed: function(id) {                                                                                 // 350
			countHandles[id].inprogress.stop();                                                                    // 351
			countHandles[id].finished.stop();                                                                      // 352
			countHandles[id].inactive.stop();                                                                      // 353
			countHandles[id].timeout.stop();                                                                       // 354
			self.removed('locations', id);                                                                         // 355
		}                                                                                                       // 356
	});                                                                                                      // 357
                                                                                                          // 358
	self.ready();                                                                                            // 359
	self.onStop(function() {                                                                                 // 360
		locationsCountHandle.stop();                                                                            // 361
		_.each(countHandles, function(id) {                                                                     // 362
			id.inprogress.stop();                                                                                  // 363
			id.finished.stop();                                                                                    // 364
			id.inactive.stop();                                                                                    // 365
			id.timeout.stop();                                                                                     // 366
		});                                                                                                     // 367
		handle.stop();                                                                                          // 368
	});                                                                                                      // 369
});                                                                                                       // 370
                                                                                                          // 371
Meteor.publish('location', function(filter) {                                                             // 372
	var self = this;                                                                                         // 373
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 374
		return [];                                                                                              // 375
	}                                                                                                        // 376
	try {                                                                                                    // 377
		locationFilter.clean(filter);                                                                           // 378
		check(filter, locationFilter);                                                                          // 379
	} catch (e) {                                                                                            // 380
		return [];                                                                                              // 381
	}                                                                                                        // 382
	var countHandle = {};                                                                                    // 383
	var handle = Locations.collection.find({_id: filter.location.id}, {                                      // 384
		fields: fields                                                                                          // 385
	}).observeChanges({                                                                                      // 386
		added: function(id, fields) {                                                                           // 387
			var query = { 'location.id': filter.location.id, createdAt: { $gte: filter.start, $lte: filter.end }}; // 388
			var options = { noReady: true };                                                                       // 389
			countHandle.inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandle.finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandle.inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandle.timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);                                                                   // 394
		},                                                                                                      // 395
		changed: function(id, fields) {                                                                         // 396
			self.changed('locations', id, fields);                                                                 // 397
		},                                                                                                      // 398
		removed: function(id) {                                                                                 // 399
			countHandle.inprogress.stop();                                                                         // 400
			countHandle.finished.stop();                                                                           // 401
			countHandle.inactive.stop();                                                                           // 402
			countHandle.timeout.stop();                                                                            // 403
			self.removed('locations', id);                                                                         // 404
		}                                                                                                       // 405
	});                                                                                                      // 406
                                                                                                          // 407
	self.ready();                                                                                            // 408
	self.onStop(function() {                                                                                 // 409
		countHandle.inprogress.stop();                                                                          // 410
		countHandle.finished.stop();                                                                            // 411
		countHandle.inactive.stop();                                                                            // 412
		countHandle.timeout.stop();                                                                             // 413
		handle.stop();                                                                                          // 414
	});                                                                                                      // 415
});                                                                                                       // 416
                                                                                                          // 417
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.locations = {
  Locations: Locations
};

})();

//# sourceMappingURL=locations.js.map
