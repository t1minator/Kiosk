(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Roles = Package['alanning:roles'].Roles;
var SyncedCron = Package['percolate:synced-cron'].SyncedCron;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var Users;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/users/users_common.js                                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Users = {};                                                                                                       // 1
                                                                                                                  // 2
Meteor.users.deny({                                                                                               // 3
	insert: function() {                                                                                             // 4
		return true;                                                                                                    // 5
	},                                                                                                               // 6
	update: function() {                                                                                             // 7
		return true;                                                                                                    // 8
	},                                                                                                               // 9
	remove: function() {                                                                                             // 10
		return true;                                                                                                    // 11
	}                                                                                                                // 12
});                                                                                                               // 13
                                                                                                                  // 14
Meteor.roles.deny({                                                                                               // 15
	insert: function() {                                                                                             // 16
		return true;                                                                                                    // 17
	},                                                                                                               // 18
	update: function() {                                                                                             // 19
		return true;                                                                                                    // 20
	},                                                                                                               // 21
	remove: function() {                                                                                             // 22
		return true;                                                                                                    // 23
	}                                                                                                                // 24
});                                                                                                               // 25
                                                                                                                  // 26
Accounts.config({                                                                                                 // 27
	sendVerificationEmail: true,                                                                                     // 28
	forbidClientAccountCreation: true,                                                                               // 29
	loginExpirationInDays: 0                                                                                         // 30
});                                                                                                               // 31
                                                                                                                  // 32
Users.inviteUserSchema = new SimpleSchema({                                                                       // 33
	email: {                                                                                                         // 34
		type: String,                                                                                                   // 35
		label: 'Invitation Email',                                                                                      // 36
		regEx: SimpleSchema.RegEx.Email                                                                                 // 37
	},                                                                                                               // 38
	confirmEmail: {                                                                                                  // 39
		type: String,                                                                                                   // 40
		label: 'Invitation Email (confirm)',                                                                            // 41
		custom: function() {                                                                                            // 42
			if (this.value !== this.field('email').value) {                                                                // 43
				return 'emailMismatch';                                                                                       // 44
			}                                                                                                              // 45
		}                                                                                                               // 46
	}                                                                                                                // 47
});                                                                                                               // 48
                                                                                                                  // 49
Users.setUsernameSchema = new SimpleSchema({                                                                      // 50
	username: {                                                                                                      // 51
		type: String,                                                                                                   // 52
		regEx: /^[a-z0-9A-Z_]{6,20}$/,                                                                                  // 53
		autoform: {                                                                                                     // 54
			label: false,                                                                                                  // 55
			placeholder: 'Username'                                                                                        // 56
		}                                                                                                               // 57
	}                                                                                                                // 58
});                                                                                                               // 59
                                                                                                                  // 60
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/users/users_server.js                                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Accounts.emailTemplates.siteName = "Dentist is IN";                                                               // 1
Accounts.emailTemplates.from = "Dentist is IN Admin <no-reply@dentistisin.com>";                                  // 2
                                                                                                                  // 3
Accounts.urls.resetPassword = function (token) {                                                                  // 4
	return Meteor.absoluteUrl('reset-password/' + token);                                                            // 5
};                                                                                                                // 6
                                                                                                                  // 7
Accounts.urls.verifyEmail = function (token) {                                                                    // 8
	return Meteor.absoluteUrl('verify-email/' + token);                                                              // 9
};                                                                                                                // 10
                                                                                                                  // 11
Accounts.urls.enrollAccount = function (token) {                                                                  // 12
	return Meteor.absoluteUrl('enroll-account/' + token);                                                            // 13
};                                                                                                                // 14
                                                                                                                  // 15
var validGroup = Match.Where(function (x) {                                                                       // 16
	check(x, String);                                                                                                // 17
	return /^ta|ma|dentist$/.test(x);                                                                                // 18
});                                                                                                               // 19
                                                                                                                  // 20
var validId = Match.Where(function (x) {                                                                          // 21
	check(x, String);                                                                                                // 22
	return SimpleSchema.RegEx.Id.test(x);                                                                            // 23
});                                                                                                               // 24
                                                                                                                  // 25
var validUsername = Match.Where(function (x) {                                                                    // 26
	check(x, String);                                                                                                // 27
	return /^[a-z0-9A-Z_]{6,20}$/.test(x);                                                                           // 28
});                                                                                                               // 29
                                                                                                                  // 30
var validEmail = Match.Where(function (x) {                                                                       // 31
	check(x, String);                                                                                                // 32
	return SimpleSchema.RegEx.Email.test(x);                                                                         // 33
});                                                                                                               // 34
                                                                                                                  // 35
var changeEmailSchema = new SimpleSchema({                                                                        // 36
	email: {                                                                                                         // 37
		type: String,                                                                                                   // 38
		regEx: SimpleSchema.RegEx.Email,                                                                                // 39
	},                                                                                                               // 40
	password: {                                                                                                      // 41
		type: Object                                                                                                    // 42
	},                                                                                                               // 43
	'password.digest': {                                                                                             // 44
		type: String                                                                                                    // 45
	},                                                                                                               // 46
	'password.algorithm': {                                                                                          // 47
		type: String,                                                                                                   // 48
		allowedValues: ['sha-256']                                                                                      // 49
	}                                                                                                                // 50
});                                                                                                               // 51
                                                                                                                  // 52
var schema = new SimpleSchema({                                                                                   // 53
	username: {                                                                                                      // 54
		type: String,                                                                                                   // 55
		regEx: /^[a-z0-9A-Z_]{6,20}$/,                                                                                  // 56
		optional: true                                                                                                  // 57
	},                                                                                                               // 58
	emails: {                                                                                                        // 59
		type: [Object],                                                                                                 // 60
	},                                                                                                               // 61
	'emails.$.address': {                                                                                            // 62
		type: String,                                                                                                   // 63
		regEx: SimpleSchema.RegEx.Email                                                                                 // 64
	},                                                                                                               // 65
	'emails.$.verified': {                                                                                           // 66
		type: Boolean                                                                                                   // 67
	},                                                                                                               // 68
	createdAt: {                                                                                                     // 69
		type: Date                                                                                                      // 70
	},                                                                                                               // 71
	services: {                                                                                                      // 72
		type: Object,                                                                                                   // 73
		optional: true,                                                                                                 // 74
		blackbox: true                                                                                                  // 75
	},                                                                                                               // 76
	roles: {                                                                                                         // 77
		type: [String],                                                                                                 // 78
		optional: true                                                                                                  // 79
	},                                                                                                               // 80
	active: {                                                                                                        // 81
		type: Boolean                                                                                                   // 82
	},                                                                                                               // 83
	loginFailures: {                                                                                                 // 84
		type: Number                                                                                                    // 85
	},                                                                                                               // 86
	status: {                                                                                                        // 87
		type: Object,                                                                                                   // 88
		optional: true                                                                                                  // 89
	},                                                                                                               // 90
	'status.online': {                                                                                               // 91
		type: Boolean,                                                                                                  // 92
		optional: true                                                                                                  // 93
	},                                                                                                               // 94
	'status.lastLogin': {                                                                                            // 95
		type: Object,                                                                                                   // 96
		optional: true                                                                                                  // 97
	},                                                                                                               // 98
	'status.lastLogin.date': {                                                                                       // 99
		type: Date,                                                                                                     // 100
		optional: true                                                                                                  // 101
	},                                                                                                               // 102
	'status.lastLogin.ipAddr': {                                                                                     // 103
		type: String,                                                                                                   // 104
		optional: true                                                                                                  // 105
	},                                                                                                               // 106
	'status.lastLogin.userAgent': {                                                                                  // 107
		type: String,                                                                                                   // 108
		optional: true                                                                                                  // 109
	},                                                                                                               // 110
	'status.idle': {                                                                                                 // 111
		type: Boolean,                                                                                                  // 112
		optional: true                                                                                                  // 113
	},                                                                                                               // 114
	'status.lastActivity': {                                                                                         // 115
		type: Date,                                                                                                     // 116
		optional: true                                                                                                  // 117
	}                                                                                                                // 118
});                                                                                                               // 119
                                                                                                                  // 120
Meteor.users.attachSchema(schema);                                                                                // 121
                                                                                                                  // 122
Meteor.publish('dentists.filter', function() {                                                                    // 123
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {                                                 // 124
		return [];                                                                                                      // 125
	}                                                                                                                // 126
	return Meteor.users.find({}, { fields: { username: true } });                                                    // 127
});                                                                                                               // 128
                                                                                                                  // 129
Meteor.publish('dentists.online', function() {                                                                    // 130
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {                                                 // 131
		return [];                                                                                                      // 132
	}                                                                                                                // 133
	Counts.publish(this, 'dentistsOnline', Meteor.users.find({ 'status.online': true }, { fields: { _id: true } })); // 134
});                                                                                                               // 135
                                                                                                                  // 136
Meteor.publish('user.show', function(userId) {                                                                    // 137
	try {                                                                                                            // 138
		check(userId, validId);                                                                                         // 139
	} catch (e) {                                                                                                    // 140
		return [];                                                                                                      // 141
	}                                                                                                                // 142
	var user = Meteor.users.findOne({_id: this.userId}, { fields: { username: true, roles: true }});                 // 143
	if (user._id !== userId && !Roles.userIsInRole(user, ['ma', 'ta'])) {                                            // 144
		return [];                                                                                                      // 145
	}                                                                                                                // 146
	return Meteor.users.find({_id: userId}, { fields: { username: true, emails: true, active: true, roles: true }}); // 147
});                                                                                                               // 148
                                                                                                                  // 149
var usersSort = new SimpleSchema({                                                                                // 150
	username: {                                                                                                      // 151
		type: Number,                                                                                                   // 152
		allowedValues: [1, -1],                                                                                         // 153
		defaultValue: 1                                                                                                 // 154
	}                                                                                                                // 155
});                                                                                                               // 156
                                                                                                                  // 157
Meteor.publish('users', function(sort, limit) {                                                                   // 158
	var self = this;                                                                                                 // 159
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                            // 160
		return [];                                                                                                      // 161
	}                                                                                                                // 162
	try {                                                                                                            // 163
		usersSort.clean(sort);                                                                                          // 164
		check(sort, usersSort);                                                                                         // 165
		check(limit, Match.Optional(Number));                                                                           // 166
	} catch (e) {                                                                                                    // 167
		return [];                                                                                                      // 168
	}                                                                                                                // 169
	limit = limit || 10;                                                                                             // 170
	return Meteor.users.find({}, {                                                                                   // 171
		fields: {                                                                                                       // 172
			username: true,                                                                                                // 173
			emails: true,                                                                                                  // 174
			active: true,                                                                                                  // 175
			roles: true                                                                                                    // 176
		},                                                                                                              // 177
		sort: sort,                                                                                                     // 178
		limit: limit                                                                                                    // 179
	});                                                                                                              // 180
});                                                                                                               // 181
                                                                                                                  // 182
Accounts.onCreateUser(function(options, user) {                                                                   // 183
	if (user.profile) delete user.profile;                                                                           // 184
	user.active = true;                                                                                              // 185
	user.loginFailures = 0;                                                                                          // 186
	var userId = TrueVault.createUser(user.emails[0].address);                                                       // 187
	user.trueVault = { id: userId };                                                                                 // 188
	TrueVault.updateGroup(TrueVault.groups.DENTIST, userId);                                                         // 189
	user.roles = ['dentist'];                                                                                        // 190
	return user;                                                                                                     // 191
});                                                                                                               // 192
                                                                                                                  // 193
Accounts.validateLoginAttempt(function(attempt) {                                                                 // 194
	if (attempt.user && !attempt.user.active) throw new Meteor.Error('disabled');                                    // 195
	return true;                                                                                                     // 196
});                                                                                                               // 197
                                                                                                                  // 198
Accounts.validateLoginAttempt(function(attempt) {                                                                 // 199
	if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) return false;                       // 200
	return true;                                                                                                     // 201
});                                                                                                               // 202
                                                                                                                  // 203
Accounts.onLogin(function(attempt) {                                                                              // 204
	Meteor.users.update({                                                                                            // 205
		_id: attempt.user._id                                                                                           // 206
	}, {                                                                                                             // 207
		$set: {                                                                                                         // 208
			loginFailures: 0                                                                                               // 209
		}                                                                                                               // 210
	});                                                                                                              // 211
});                                                                                                               // 212
                                                                                                                  // 213
Accounts.onLoginFailure(function(attempt) {                                                                       // 214
	if(attempt.user) {                                                                                               // 215
		if (attempt.user.loginFailures >= 4) {                                                                          // 216
			Meteor.users.update({                                                                                          // 217
				_id: attempt.user._id                                                                                         // 218
			}, {                                                                                                           // 219
				$inc: {                                                                                                       // 220
					loginFailures: 1                                                                                             // 221
				},                                                                                                            // 222
				$set: {                                                                                                       // 223
					active: false                                                                                                // 224
				}                                                                                                             // 225
			});                                                                                                            // 226
		} else {                                                                                                        // 227
			Meteor.users.update({                                                                                          // 228
				_id: attempt.user._id                                                                                         // 229
			}, {                                                                                                           // 230
				$inc: {                                                                                                       // 231
					loginFailures: 1                                                                                             // 232
				}                                                                                                             // 233
			});                                                                                                            // 234
		}                                                                                                               // 235
	}                                                                                                                // 236
});                                                                                                               // 237
                                                                                                                  // 238
var checkPwd = function(user, pwd) {                                                                              // 239
	if (_.isString(user) || (_.isObject(user) && (!user.services || !user.services.password || !user.services.password ))) {
		var user = Meteor.users.findOne({                                                                               // 241
			_id: _.isString(user) ? user : user._id                                                                        // 242
		}, {                                                                                                            // 243
			fields: {                                                                                                      // 244
				'services.password.bcrypt': true                                                                              // 245
			}                                                                                                              // 246
		});                                                                                                             // 247
	}                                                                                                                // 248
	var result = Accounts._checkPassword(user, pwd);                                                                 // 249
	if (result.error) throw new Meteor.Error(403);                                                                   // 250
};                                                                                                                // 251
                                                                                                                  // 252
Meteor.methods({                                                                                                  // 253
	setGroup: function(userId, group) {                                                                              // 254
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 255
			throw new Meteor.Error(403);                                                                                   // 256
		}                                                                                                               // 257
		try {                                                                                                           // 258
			check(userId, validId);                                                                                        // 259
			check(group, validGroup);                                                                                      // 260
		} catch (e) {                                                                                                   // 261
			throw new Meteor.Error(400);                                                                                   // 262
		}                                                                                                               // 263
		var user = Meteor.users.findOne({_id: userId}, {                                                                // 264
			fields: {                                                                                                      // 265
				'trueVault.id': true,                                                                                         // 266
				roles: true                                                                                                   // 267
			}                                                                                                              // 268
		});                                                                                                             // 269
		var map = {                                                                                                     // 270
			'ta': TrueVault.groups.TA,                                                                                     // 271
			'ma': TrueVault.groups.MA,                                                                                     // 272
			'dentist': TrueVault.groups.DENTIST                                                                            // 273
		};                                                                                                              // 274
		user.roles = user.roles || ['dentist'];                                                                         // 275
		TrueVault.updateGroup(map[user.roles[0]], user.trueVault.id, true);                                             // 276
		TrueVault.updateGroup(map[group], user.trueVault.id);                                                           // 277
		Meteor.users.update({_id: userId}, {                                                                            // 278
			$set: {                                                                                                        // 279
				roles: [ group ]                                                                                              // 280
			}                                                                                                              // 281
		});                                                                                                             // 282
	},                                                                                                               // 283
	disableUser: function(userId) {                                                                                  // 284
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 285
			throw new Meteor.Error(403);                                                                                   // 286
		}                                                                                                               // 287
		try {                                                                                                           // 288
			check(userId, validId);                                                                                        // 289
		} catch (e) {                                                                                                   // 290
			throw new Meteor.Error(400);                                                                                   // 291
		}                                                                                                               // 292
		Meteor.users.update({                                                                                           // 293
			_id: userId                                                                                                    // 294
		}, {                                                                                                            // 295
			$set: {                                                                                                        // 296
				active: false                                                                                                 // 297
			}                                                                                                              // 298
		});                                                                                                             // 299
	},                                                                                                               // 300
	activateUser: function(userId) {                                                                                 // 301
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 302
			throw new Meteor.Error(403);                                                                                   // 303
		}                                                                                                               // 304
		try {                                                                                                           // 305
			check(userId, validId);                                                                                        // 306
		} catch (e) {                                                                                                   // 307
			throw new Meteor.Error(400);                                                                                   // 308
		}                                                                                                               // 309
		Meteor.users.update({                                                                                           // 310
			_id: userId                                                                                                    // 311
		}, {                                                                                                            // 312
			$set: {                                                                                                        // 313
				active: true                                                                                                  // 314
			}                                                                                                              // 315
		});                                                                                                             // 316
	},                                                                                                               // 317
	// custom validation to ensure email doesn't already exist                                                       // 318
	inviteUser: function(email) {                                                                                    // 319
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 320
			throw new Meteor.Error(403);                                                                                   // 321
		}                                                                                                               // 322
		try {                                                                                                           // 323
			Users.inviteUserSchema.clean(email);                                                                           // 324
			check(email, Users.inviteUserSchema);                                                                          // 325
		} catch (e) {                                                                                                   // 326
			throw new Meteor.Error(400);                                                                                   // 327
		}                                                                                                               // 328
		var accountId = Accounts.createUser({                                                                           // 329
			email: email.email                                                                                             // 330
		});                                                                                                             // 331
		Accounts.sendEnrollmentEmail(accountId);                                                                        // 332
	},                                                                                                               // 333
	setUsername: function(username) {                                                                                // 334
		if (!this.userId) {                                                                                             // 335
			throw new Meteor.Error(403);                                                                                   // 336
		}                                                                                                               // 337
		try {                                                                                                           // 338
			check(username, validUsername);                                                                                // 339
		} catch (e) {                                                                                                   // 340
			throw new Meteor.Error(400);                                                                                   // 341
		}                                                                                                               // 342
		try {                                                                                                           // 343
			Meteor.users.update({                                                                                          // 344
				_id: this.userId,                                                                                             // 345
				username: {                                                                                                   // 346
					$exists: false                                                                                               // 347
				}                                                                                                             // 348
			}, {                                                                                                           // 349
				$set: {                                                                                                       // 350
					username: username                                                                                           // 351
				}                                                                                                             // 352
			});                                                                                                            // 353
		} catch (e) {                                                                                                   // 354
			if (e.name === 'MongoError') {                                                                                 // 355
				var match = e.err.match(/E11000 duplicate key error index: ([^ ]+)/);                                         // 356
				if (match[1].indexOf('username') !== -1)                                                                      // 357
					throw new Meteor.Error('username-exists');                                                                   // 358
			}                                                                                                              // 359
		}                                                                                                               // 360
	},                                                                                                               // 361
	updateEmail: function(doc) {                                                                                     // 362
		if (!this.userId) {                                                                                             // 363
			throw new Meteor.Error(403);                                                                                   // 364
		}                                                                                                               // 365
		try {                                                                                                           // 366
			changeEmailSchema.clean(doc);                                                                                  // 367
			check(doc, changeEmailSchema);                                                                                 // 368
		} catch (e) {                                                                                                   // 369
			throw new Meteor.Error(400);                                                                                   // 370
		}                                                                                                               // 371
		checkPwd(this.userId, doc.password);                                                                            // 372
		Meteor.users.update({                                                                                           // 373
			_id: this.userId                                                                                               // 374
		}, {                                                                                                            // 375
			$set: {                                                                                                        // 376
				emails: [{                                                                                                    // 377
					address: doc.email,                                                                                          // 378
					verified: true                                                                                               // 379
				}]                                                                                                            // 380
			}                                                                                                              // 381
		});                                                                                                             // 382
	}                                                                                                                // 383
/**                                                                                                               // 384
	addEmail: function(obj) {                                                                                        // 385
		if (!this.userId) {                                                                                             // 386
			throw new Meteor.Error(403);                                                                                   // 387
		}                                                                                                               // 388
		if (this.userId !== obj.userId) {                                                                               // 389
			throw new Meteor.Error(403);                                                                                   // 390
		}                                                                                                               // 391
		try {                                                                                                           // 392
			// clean                                                                                                       // 393
			// validate                                                                                                    // 394
		} catch (e) {                                                                                                   // 395
			throw new Meteor.Error(400);                                                                                   // 396
		}                                                                                                               // 397
		checkPwd(this.userId, obj.password);                                                                            // 398
		Meteor.users.update({                                                                                           // 399
			_id: obj.userId                                                                                                // 400
		}, {                                                                                                            // 401
			$addToSet: {                                                                                                   // 402
				emails: {                                                                                                     // 403
					address: obj.address,                                                                                        // 404
					verified: false                                                                                              // 405
				}                                                                                                             // 406
			}                                                                                                              // 407
		});                                                                                                             // 408
		Accounts.sendVerificationEmail(obj.userId, obj.email);                                                          // 409
	},                                                                                                               // 410
	removeEmail: function(obj) {                                                                                     // 411
		if (!this.userId) {                                                                                             // 412
			throw new Meteor.Error(403);                                                                                   // 413
		}                                                                                                               // 414
		if (this.userId !== obj.userId) {                                                                               // 415
			throw new Meteor.Error(403);                                                                                   // 416
		}                                                                                                               // 417
		try {                                                                                                           // 418
			// clean                                                                                                       // 419
			// validate                                                                                                    // 420
		} catch (e) {                                                                                                   // 421
			throw new Meteor.Error(400);                                                                                   // 422
		}                                                                                                               // 423
		var user = Meteor.user();                                                                                       // 424
		checkPwd(user, obj.password);                                                                                   // 425
		// In order to remove an e-mail it has to unverified or there must be another verified e-mail in the list       // 426
		var target;                                                                                                     // 427
		var emails = _.filter(user.emails, function(email) {                                                            // 428
			if (email.address === obj.address) target = email;                                                             // 429
			return email.verified;                                                                                         // 430
		});                                                                                                             // 431
		if (!target) {                                                                                                  // 432
			throw new Meteor.Error(404);                                                                                   // 433
		}                                                                                                               // 434
		if (target.verified && emails.length < 2) {                                                                     // 435
			throw new Meteor.Error(403);                                                                                   // 436
		}                                                                                                               // 437
		Meteor.users.update({                                                                                           // 438
			_id: obj.userId                                                                                                // 439
		}, {                                                                                                            // 440
			$pull: {                                                                                                       // 441
				emails: {                                                                                                     // 442
					address: obj.address                                                                                         // 443
				}                                                                                                             // 444
			}                                                                                                              // 445
		});                                                                                                             // 446
	}                                                                                                                // 447
**/                                                                                                               // 448
});                                                                                                               // 449
                                                                                                                  // 450
SyncedCron.add({                                                                                                  // 451
	name: 'Password Reset Token Expiration',                                                                         // 452
	schedule: function(parser) {                                                                                     // 453
		return parser.text('every 1 hours');                                                                            // 454
	},                                                                                                               // 455
	job: function() {                                                                                                // 456
		var date = new Date();                                                                                          // 457
		date.setHours(date.getHours() - 24);                                                                            // 458
		Meteor.users.update({                                                                                           // 459
			'services.password.reset.when': { $lt: date }                                                                  // 460
		}, {                                                                                                            // 461
			$unset: {                                                                                                      // 462
				'services.password.reset': true                                                                               // 463
			}                                                                                                              // 464
		}, {                                                                                                            // 465
			multi: true                                                                                                    // 466
		});                                                                                                             // 467
	}                                                                                                                // 468
});                                                                                                               // 469
                                                                                                                  // 470
SyncedCron.add({                                                                                                  // 471
	name: 'Email Verification Token Expiration',                                                                     // 472
	schedule: function(parser) {                                                                                     // 473
		return parser.text('every 1 hours');                                                                            // 474
	},                                                                                                               // 475
	job: function() {                                                                                                // 476
		var date = new Date();                                                                                          // 477
		date.setHours(date.getHours() - 24);                                                                            // 478
		Meteor.users.update({}, {                                                                                       // 479
			$pull: {                                                                                                       // 480
				'services.email.verificationTokens': { when: { $lt: date } }                                                  // 481
			}                                                                                                              // 482
		}, {                                                                                                            // 483
			multi: true                                                                                                    // 484
		});                                                                                                             // 485
	}                                                                                                                // 486
});                                                                                                               // 487
                                                                                                                  // 488
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.users = {
  Users: Users
};

})();

//# sourceMappingURL=users.js.map
