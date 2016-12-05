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
	name: {                                                                                                  // 11
		label: 'Name',                                                                                          // 12
		type: String,                                                                                           // 13
		unique: true,                                                                                           // 14
		index: 'text',                                                                                          // 15
		max: 100,                                                                                               // 16
		denyUpdate: true,                                                                                       // 17
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
			label: false,                                                                                          // 30
			placeholder: 'Address Line 1'                                                                          // 31
		}                                                                                                       // 32
	},                                                                                                       // 33
	'address.two': {                                                                                         // 34
		type: String,                                                                                           // 35
		max: 100,                                                                                               // 36
		optional: true,                                                                                         // 37
		autoform: {                                                                                             // 38
			label: false,                                                                                          // 39
			placeholder: 'Address Line 2'                                                                          // 40
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
		label: 'Contact Name:',                                                                                 // 72
		type: String,                                                                                           // 73
		max: 100,                                                                                               // 74
		autoform: {                                                                                             // 75
			placeholder: 'Contact Name'                                                                            // 76
		}                                                                                                       // 77
	},                                                                                                       // 78
	'contact.number': {                                                                                      // 79
		label: 'Contact Phone Number:',                                                                         // 80
		type: String,                                                                                           // 81
		max: 25,                                                                                                // 82
		autoform: {                                                                                             // 83
			placeholder: 'Phone Number'                                                                            // 84
		}                                                                                                       // 85
	},                                                                                                       // 86
	'contact.fax': {                                                                                         // 87
		label: 'Fax Number:',                                                                                   // 88
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
                                                                                                          // 106
Locations.schema = new SimpleSchema(Locations._schemaObject);                                             // 107
                                                                                                          // 108
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
		} catch (e) {                                                                                           // 143
			console.log(e);                                                                                        // 144
			throw new Meteor.Error(400);                                                                           // 145
		}                                                                                                       // 146
		if (modifier.$set && modifier.$set.kiosk && _.has(modifier.$set.kiosk, 'active')) {                     // 147
			modifier.$set['kiosk.active'] = modifier.$set.kiosk.active;                                            // 148
			delete modifier.$set.kiosk;                                                                            // 149
		}                                                                                                       // 150
		return !!Locations.collection.update({_id: locationId}, modifier);                                      // 151
	},                                                                                                       // 152
	//flipActive: function(locationId) {                                                                     // 153
	newCode: function(locationId) {                                                                          // 154
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 155
			throw new Meteor.Error(403);                                                                           // 156
		}                                                                                                       // 157
		try {                                                                                                   // 158
			check(locationId, validId);                                                                            // 159
		} catch (e) {                                                                                           // 160
			throw new Meteor.Error(400);                                                                           // 161
		}                                                                                                       // 162
		return !!Locations.collection.update({_id: locationId}, {                                               // 163
			$set: {                                                                                                // 164
				'kiosk.code': Random._randomString(6, '0123456789')                                                   // 165
			}                                                                                                      // 166
		});                                                                                                     // 167
	},                                                                                                       // 168
	newSecret: function(locationId) {                                                                        // 169
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 170
			throw new Meteor.Error(403);                                                                           // 171
		}                                                                                                       // 172
		try {                                                                                                   // 173
			check(locationId, validId);                                                                            // 174
		} catch (e) {                                                                                           // 175
			throw new Meteor.Error(400);                                                                           // 176
		}                                                                                                       // 177
		var secret = Random.secret();                                                                           // 178
		//var result = Locations.collection.update({_id: locationId}, {                                         // 179
		return !!Locations.collection.update({_id: locationId}, {                                               // 180
			$set: {                                                                                                // 181
				'kiosk.secret': secret//hashSecret(secret)                                                            // 182
			}                                                                                                      // 183
		});                                                                                                     // 184
		//if (result) return secret;                                                                            // 185
		//else return false;                                                                                    // 186
	},                                                                                                       // 187
	setKioskActive: function(locationId) {                                                                   // 188
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 189
			throw new Meteor.Error(403);                                                                           // 190
		}                                                                                                       // 191
		try {                                                                                                   // 192
			check(locationId, validId);                                                                            // 193
		} catch (e) {                                                                                           // 194
			throw new Meteor.Error(400);                                                                           // 195
		}                                                                                                       // 196
		Locations.collection.update({_id: locationId}, {                                                        // 197
			$set: {                                                                                                // 198
				'kiosk.active': true                                                                                  // 199
			}                                                                                                      // 200
		});                                                                                                     // 201
	},                                                                                                       // 202
	setKioskInactive: function(locationId) {                                                                 // 203
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                   // 204
			throw new Meteor.Error(403);                                                                           // 205
		}                                                                                                       // 206
		try {                                                                                                   // 207
			check(locationId, validId);                                                                            // 208
		} catch (e) {                                                                                           // 209
			throw new Meteor.Error(400);                                                                           // 210
		}                                                                                                       // 211
		Locations.collection.update({_id: locationId}, {                                                        // 212
			$set: {                                                                                                // 213
				'kiosk.active': false                                                                                 // 214
			}                                                                                                      // 215
		});                                                                                                     // 216
	}                                                                                                        // 217
});                                                                                                       // 218
                                                                                                          // 219
var fields = {                                                                                            // 220
	name: true,                                                                                              // 221
	address: true,                                                                                           // 222
	contact: true,                                                                                           // 223
	'kiosk.active': true,                                                                                    // 224
	'kiosk.apiKey': true,                                                                                    // 225
	'kiosk.secret': true,                                                                                    // 226
	'kiosk.code': true                                                                                       // 227
};                                                                                                        // 228
                                                                                                          // 229
var locationsSort = new SimpleSchema({                                                                    // 230
	name: {                                                                                                  // 231
		type: Number,                                                                                           // 232
		allowedValues: [1, -1],                                                                                 // 233
		defaultValue: 1                                                                                         // 234
	}                                                                                                        // 235
});                                                                                                       // 236
                                                                                                          // 237
var locationsFilter = new SimpleSchema({                                                                  // 238
	date: {                                                                                                  // 239
		type: Date,                                                                                             // 240
		autoValue: function() {                                                                                 // 241
			if (!this.isSet) return new Date();                                                                    // 242
		}                                                                                                       // 243
	},                                                                                                       // 244
	start: {                                                                                                 // 245
		type: Date,                                                                                             // 246
		autoValue: function() {                                                                                 // 247
			var date = this.siblingField('date');                                                                  // 248
			if (date.isSet) {                                                                                      // 249
				//if (_.isFunction(date.value)) date = date.value();                                                  // 250
				//else date = date.value;                                                                             // 251
				date = date.value;                                                                                    // 252
				var year = date.getFullYear();                                                                        // 253
				var month = date.getMonth();                                                                          // 254
				return new Date(year, month, 1);                                                                      // 255
			} else {                                                                                               // 256
				this.unset();                                                                                         // 257
			}                                                                                                      // 258
		}                                                                                                       // 259
	},                                                                                                       // 260
	end: {                                                                                                   // 261
		type: Date,                                                                                             // 262
		autoValue: function() {                                                                                 // 263
			var date = this.siblingField('date');                                                                  // 264
			if (date.isSet) {                                                                                      // 265
				//if (_.isFunction(date.value)) date = date.value();                                                  // 266
				//else date = date.value;                                                                             // 267
				date = date.value;                                                                                    // 268
				var year = date.getFullYear();                                                                        // 269
				var month = date.getMonth();                                                                          // 270
				//return new Date(year, month + 1, 0, 23, 59, 59, 999);                                               // 271
				return new Date(year, month + 1);                                                                     // 272
			} else {                                                                                               // 273
				this.unset();                                                                                         // 274
			}                                                                                                      // 275
		}                                                                                                       // 276
	}                                                                                                        // 277
});                                                                                                       // 278
                                                                                                          // 279
var locationFilter = new SimpleSchema({                                                                   // 280
	location: {                                                                                              // 281
		type: Object,                                                                                           // 282
	},                                                                                                       // 283
	'location.id': {                                                                                         // 284
		type: String,                                                                                           // 285
		regEx: SimpleSchema.RegEx.Id                                                                            // 286
	},                                                                                                       // 287
	start: {                                                                                                 // 288
		type: Date                                                                                              // 289
	},                                                                                                       // 290
	end: {                                                                                                   // 291
		type: Date,                                                                                             // 292
	}                                                                                                        // 293
});                                                                                                       // 294
                                                                                                          // 295
Meteor.publish('locations.filter', function() {                                                           // 296
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 297
		return [];                                                                                              // 298
	}                                                                                                        // 299
	return Locations.collection.find({}, {                                                                   // 300
		fields: {                                                                                               // 301
			name: true                                                                                             // 302
		}                                                                                                       // 303
	});                                                                                                      // 304
});                                                                                                       // 305
                                                                                                          // 306
Meteor.publish('locations', function(filter, sort, limit) {                                               // 307
	var self = this;                                                                                         // 308
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 309
		return [];                                                                                              // 310
	}                                                                                                        // 311
	try {                                                                                                    // 312
		locationsFilter.clean(filter);                                                                          // 313
		locationsSort.clean(sort);                                                                              // 314
		check(filter, locationsFilter);                                                                         // 315
		check(sort, locationsSort);                                                                             // 316
		check(limit, Match.Optional(Number));                                                                   // 317
	} catch (e) {                                                                                            // 318
		return [];                                                                                              // 319
	}                                                                                                        // 320
	limit = limit || 10;                                                                                     // 321
                                                                                                          // 322
	var locationsCountHandle = Counts.publish(this, 'locationsCount', Locations.collection.find({}, { fields: { _id: true } }), { noReady: true });
	var initializing = true;                                                                                 // 324
	var countHandles = {};                                                                                   // 325
	var handle = Locations.collection.find({}, {                                                             // 326
		fields: {                                                                                               // 327
			name: true,                                                                                            // 328
			address: true,                                                                                         // 329
			'contact.name': true,                                                                                  // 330
			'contact.number': true                                                                                 // 331
		},                                                                                                      // 332
		sort: sort,                                                                                             // 333
		limit: limit                                                                                            // 334
	}).observeChanges({                                                                                      // 335
		added: function(id, fields) {                                                                           // 336
			countHandles[id] = {};                                                                                 // 337
			var query = { 'location.id': id, createdAt: { $gte: filter.start, $lt: filter.end } };                 // 338
			var options = { noReady: true };                                                                       // 339
			countHandles[id].inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandles[id].finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandles[id].inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandles[id].timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);                                                                   // 344
		},                                                                                                      // 345
		changed: function(id, fields) {                                                                         // 346
			self.changed('locations', id, fields);                                                                 // 347
		},                                                                                                      // 348
		removed: function(id) {                                                                                 // 349
			countHandles[id].inprogress.stop();                                                                    // 350
			countHandles[id].finished.stop();                                                                      // 351
			countHandles[id].inactive.stop();                                                                      // 352
			countHandles[id].timeout.stop();                                                                       // 353
			self.removed('locations', id);                                                                         // 354
		}                                                                                                       // 355
	});                                                                                                      // 356
                                                                                                          // 357
	self.ready();                                                                                            // 358
	self.onStop(function() {                                                                                 // 359
		locationsCountHandle.stop();                                                                            // 360
		_.each(countHandles, function(id) {                                                                     // 361
			id.inprogress.stop();                                                                                  // 362
			id.finished.stop();                                                                                    // 363
			id.inactive.stop();                                                                                    // 364
			id.timeout.stop();                                                                                     // 365
		});                                                                                                     // 366
		handle.stop();                                                                                          // 367
	});                                                                                                      // 368
});                                                                                                       // 369
                                                                                                          // 370
Meteor.publish('location', function(filter) {                                                             // 371
	var self = this;                                                                                         // 372
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                    // 373
		return [];                                                                                              // 374
	}                                                                                                        // 375
	try {                                                                                                    // 376
		locationFilter.clean(filter);                                                                           // 377
		check(filter, locationFilter);                                                                          // 378
	} catch (e) {                                                                                            // 379
		return [];                                                                                              // 380
	}                                                                                                        // 381
	var countHandle = {};                                                                                    // 382
	var handle = Locations.collection.find({_id: filter.location.id}, {                                      // 383
		fields: fields                                                                                          // 384
	}).observeChanges({                                                                                      // 385
		added: function(id, fields) {                                                                           // 386
			var query = { 'location.id': filter.location.id, createdAt: { $gte: filter.start, $lte: filter.end }}; // 387
			var options = { noReady: true };                                                                       // 388
			countHandle.inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandle.finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandle.inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandle.timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);                                                                   // 393
		},                                                                                                      // 394
		changed: function(id, fields) {                                                                         // 395
			self.changed('locations', id, fields);                                                                 // 396
		},                                                                                                      // 397
		removed: function(id) {                                                                                 // 398
			countHandle.inprogress.stop();                                                                         // 399
			countHandle.finished.stop();                                                                           // 400
			countHandle.inactive.stop();                                                                           // 401
			countHandle.timeout.stop();                                                                            // 402
			self.removed('locations', id);                                                                         // 403
		}                                                                                                       // 404
	});                                                                                                      // 405
                                                                                                          // 406
	self.ready();                                                                                            // 407
	self.onStop(function() {                                                                                 // 408
		countHandle.inprogress.stop();                                                                          // 409
		countHandle.finished.stop();                                                                            // 410
		countHandle.inactive.stop();                                                                            // 411
		countHandle.timeout.stop();                                                                             // 412
		handle.stop();                                                                                          // 413
	});                                                                                                      // 414
});                                                                                                       // 415
                                                                                                          // 416
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.locations = {
  Locations: Locations
};

})();

//# sourceMappingURL=locations.js.map
