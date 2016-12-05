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
Meteor.users.allow({                                                                                              // 3
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
Meteor.users.deny({                                                                                               // 15
	insert: function() {                                                                                             // 16
		return true;                                                                                                    // 17
	},                                                                                                               // 18
	update: function() {                                                                                             // 19
		return true;                                                                                                    // 20
	}                                                                                                                // 21
	                                                                                                                 // 22
});                                                                                                               // 23
                                                                                                                  // 24
Meteor.roles.deny({                                                                                               // 25
	insert: function() {                                                                                             // 26
		return true;                                                                                                    // 27
	},                                                                                                               // 28
	update: function() {                                                                                             // 29
		return true;                                                                                                    // 30
	},                                                                                                               // 31
	remove: function() {                                                                                             // 32
		return true;                                                                                                    // 33
	}                                                                                                                // 34
});                                                                                                               // 35
                                                                                                                  // 36
Accounts.config({                                                                                                 // 37
	sendVerificationEmail: true,                                                                                     // 38
	forbidClientAccountCreation: true,                                                                               // 39
	loginExpirationInDays: 0                                                                                         // 40
});                                                                                                               // 41
                                                                                                                  // 42
                                                                                                                  // 43
Users.inviteUserSchema = new SimpleSchema({                                                                       // 44
	name: {                                                                                                          // 45
		type: String,                                                                                                   // 46
		label: 'Name',                                                                                                  // 47
		autoform: {                                                                                                     // 48
			placeholder: 'Name'                                                                                            // 49
		}                                                                                                               // 50
	},                                                                                                               // 51
	roles: {                                                                                                         // 52
		type: String,                                                                                                   // 53
		label: 'User Role',                                                                                             // 54
		allowedValues: [ 'dentist', 'ta', 'ma' ],                                                                       // 55
		autoform: {                                                                                                     // 56
			options: 'allowed'                                                                                             // 57
		}                                                                                                               // 58
	},                                                                                                               // 59
	email: {                                                                                                         // 60
		type: String,                                                                                                   // 61
		label: 'Invitation Email',                                                                                      // 62
		regEx: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,                    // 63
		autoform: {                                                                                                     // 64
			placeholder: 'Email Address'                                                                                   // 65
		}                                                                                                               // 66
	},                                                                                                               // 67
	confirmEmail: {                                                                                                  // 68
		type: String,                                                                                                   // 69
		label: 'Invitation Email (confirm)',                                                                            // 70
		autoform: {                                                                                                     // 71
			placeholder: 'Re-Enter Email Address'                                                                          // 72
		},                                                                                                              // 73
		custom: function() {                                                                                            // 74
			if (this.value !== this.field('email').value) {                                                                // 75
				return 'emailMismatch';                                                                                       // 76
			}                                                                                                              // 77
		}                                                                                                               // 78
	}                                                                                                                // 79
});                                                                                                               // 80
                                                                                                                  // 81
Users.setUsernameSchema = new SimpleSchema({                                                                      // 82
	username: {                                                                                                      // 83
		type: String,                                                                                                   // 84
		regEx: /^[a-z0-9A-Z_]{6,20}$/,                                                                                  // 85
		autoform: {                                                                                                     // 86
			label: false,                                                                                                  // 87
			placeholder: 'Username'                                                                                        // 88
		}                                                                                                               // 89
	}                                                                                                                // 90
});                                                                                                               // 91
                                                                                                                  // 92
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
	profile:{                                                                                                        // 54
		type: Object                                                                                                    // 55
	},                                                                                                               // 56
	'profile.name': {                                                                                                // 57
		type: String                                                                                                    // 58
	},                                                                                                               // 59
	trueVault:{                                                                                                      // 60
		type: Object                                                                                                    // 61
	},                                                                                                               // 62
	'trueVault.id': {                                                                                                // 63
		type: String                                                                                                    // 64
	},                                                                                                               // 65
	username: {                                                                                                      // 66
		type: String,                                                                                                   // 67
		regEx: /^[a-z0-9A-Z_]{6,20}$/,                                                                                  // 68
		optional: true                                                                                                  // 69
	},                                                                                                               // 70
	address: {                                                                                                       // 71
		type: String,                                                                                                   // 72
		optional: true                                                                                                  // 73
	},                                                                                                               // 74
	phone: {                                                                                                         // 75
		type: String,                                                                                                   // 76
		regEx: /^[0-9]{10,13}$/,                                                                                        // 77
		optional: true                                                                                                  // 78
	},                                                                                                               // 79
	emails: {                                                                                                        // 80
		type: [Object]                                                                                                  // 81
	},                                                                                                               // 82
	'emails.$.address': {                                                                                            // 83
		type: String,                                                                                                   // 84
		regEx: SimpleSchema.RegEx.Email                                                                                 // 85
	},                                                                                                               // 86
	'emails.$.verified': {                                                                                           // 87
		type: Boolean                                                                                                   // 88
	},                                                                                                               // 89
	createdAt: {                                                                                                     // 90
		type: Date                                                                                                      // 91
	},                                                                                                               // 92
	services: {                                                                                                      // 93
		type: Object,                                                                                                   // 94
		optional: true,                                                                                                 // 95
		blackbox: true                                                                                                  // 96
	},                                                                                                               // 97
	roles: {                                                                                                         // 98
		type: [String]                                                                                                  // 99
	},                                                                                                               // 100
	active: {                                                                                                        // 101
		type: Boolean                                                                                                   // 102
	},                                                                                                               // 103
	loginFailures: {                                                                                                 // 104
		type: Number                                                                                                    // 105
	},                                                                                                               // 106
	status: {                                                                                                        // 107
		type: Object,                                                                                                   // 108
		optional: true                                                                                                  // 109
	},                                                                                                               // 110
	'status.online': {                                                                                               // 111
		type: Boolean,                                                                                                  // 112
		optional: true                                                                                                  // 113
	},                                                                                                               // 114
	'status.lastLogin': {                                                                                            // 115
		type: Object,                                                                                                   // 116
		optional: true                                                                                                  // 117
	},                                                                                                               // 118
	'status.lastLogin.date': {                                                                                       // 119
		type: Date,                                                                                                     // 120
		optional: true                                                                                                  // 121
	},                                                                                                               // 122
	'status.lastLogin.ipAddr': {                                                                                     // 123
		type: String,                                                                                                   // 124
		optional: true                                                                                                  // 125
	},                                                                                                               // 126
	'status.lastLogin.userAgent': {                                                                                  // 127
		type: String,                                                                                                   // 128
		optional: true                                                                                                  // 129
	},                                                                                                               // 130
	'status.idle': {                                                                                                 // 131
		type: Boolean,                                                                                                  // 132
		optional: true                                                                                                  // 133
	},                                                                                                               // 134
	'status.lastActivity': {                                                                                         // 135
		type: Date,                                                                                                     // 136
		optional: true                                                                                                  // 137
	}                                                                                                                // 138
});                                                                                                               // 139
                                                                                                                  // 140
Meteor.users.attachSchema(schema);                                                                                // 141
                                                                                                                  // 142
Meteor.publish('dentists.filter', function() {                                                                    // 143
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {                                                 // 144
		return [];                                                                                                      // 145
	}                                                                                                                // 146
	return Meteor.users.find({}, { fields: { username: true } });                                                    // 147
});                                                                                                               // 148
                                                                                                                  // 149
Meteor.publish('dentists.online', function() {                                                                    // 150
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {                                                 // 151
		return [];                                                                                                      // 152
	}                                                                                                                // 153
	Counts.publish(this, 'dentistsOnline', Meteor.users.find({ 'status.online': true }, { fields: { _id: true } })); // 154
});                                                                                                               // 155
                                                                                                                  // 156
Meteor.publish('user.show', function(userId) {                                                                    // 157
	try {                                                                                                            // 158
		check(userId, validId);                                                                                         // 159
	} catch (e) {                                                                                                    // 160
		return [];                                                                                                      // 161
	}                                                                                                                // 162
	var user = Meteor.users.findOne({_id: this.userId}, { fields: { username: true, roles: true }});                 // 163
	if (user._id !== userId && !Roles.userIsInRole(user, ['ma', 'ta'])) {                                            // 164
		return [];                                                                                                      // 165
	}                                                                                                                // 166
	return Meteor.users.find({_id: userId}, { fields: { profile: true, trueVault: true, username: true, address: true, phone: true, emails: true, active: true, roles: true }});
});                                                                                                               // 168
                                                                                                                  // 169
var usersSort = new SimpleSchema({                                                                                // 170
	username: {                                                                                                      // 171
		type: Number,                                                                                                   // 172
		allowedValues: [1, -1],                                                                                         // 173
		defaultValue: 1                                                                                                 // 174
	}                                                                                                                // 175
});                                                                                                               // 176
                                                                                                                  // 177
Meteor.publish('users', function(sort, limit) {                                                                   // 178
	var self = this;                                                                                                 // 179
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {                                                            // 180
		return [];                                                                                                      // 181
	}                                                                                                                // 182
	try {                                                                                                            // 183
		usersSort.clean(sort);                                                                                          // 184
		check(sort, usersSort);                                                                                         // 185
		check(limit, Match.Optional(Number));                                                                           // 186
	} catch (e) {                                                                                                    // 187
		return [];                                                                                                      // 188
	}                                                                                                                // 189
	limit = limit || 10;                                                                                             // 190
	var usersCountHandle = Counts.publish(this, 'usersCount', Meteor.users.find({}, { fields: { _id: true } }), { noReady: true });
	                                                                                                                 // 192
	return Meteor.users.find({}, {                                                                                   // 193
		fields: {                                                                                                       // 194
			username: true,                                                                                                // 195
			emails: true,                                                                                                  // 196
			active: true,                                                                                                  // 197
			roles: true                                                                                                    // 198
		},                                                                                                              // 199
		sort: sort,                                                                                                     // 200
		limit: limit                                                                                                    // 201
	});                                                                                                              // 202
	                                                                                                                 // 203
});                                                                                                               // 204
                                                                                                                  // 205
Accounts.onCreateUser(function(options, user) {                                                                   // 206
	if (user.profile) delete user.profile;                                                                           // 207
	user.active = true;                                                                                              // 208
	user.loginFailures = 0;                                                                                          // 209
	var userId = TrueVault.createUser(user.emails[0].address);                                                       // 210
	user.trueVault = { id: userId };                                                                                 // 211
	var map = {                                                                                                      // 212
			'ta': TrueVault.groups.TA,                                                                                     // 213
			'ma': TrueVault.groups.MA,                                                                                     // 214
			'dentist': TrueVault.groups.DENTIST                                                                            // 215
		};                                                                                                              // 216
	TrueVault.updateGroup(map[options.roles], userId);                                                               // 217
	user.profile = {name:options.name};                                                                              // 218
	user.roles = [options.roles];                                                                                    // 219
	return user;                                                                                                     // 220
});                                                                                                               // 221
                                                                                                                  // 222
Accounts.validateLoginAttempt(function(attempt) {                                                                 // 223
	if (attempt.user && !attempt.user.active) throw new Meteor.Error('disabled');                                    // 224
	return true;                                                                                                     // 225
});                                                                                                               // 226
                                                                                                                  // 227
Accounts.validateLoginAttempt(function(attempt) {                                                                 // 228
	if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) return false;                       // 229
	return true;                                                                                                     // 230
});                                                                                                               // 231
                                                                                                                  // 232
Accounts.onLogin(function(attempt) {                                                                              // 233
	Meteor.users.update({                                                                                            // 234
		_id: attempt.user._id                                                                                           // 235
	}, {                                                                                                             // 236
		$set: {                                                                                                         // 237
			loginFailures: 0                                                                                               // 238
		}                                                                                                               // 239
	});                                                                                                              // 240
});                                                                                                               // 241
                                                                                                                  // 242
Accounts.onLoginFailure(function(attempt) {                                                                       // 243
	if(attempt.user) {                                                                                               // 244
		if (attempt.user.loginFailures >= 4) {                                                                          // 245
			Meteor.users.update({                                                                                          // 246
				_id: attempt.user._id                                                                                         // 247
			}, {                                                                                                           // 248
				$inc: {                                                                                                       // 249
					loginFailures: 1                                                                                             // 250
				},                                                                                                            // 251
				$set: {                                                                                                       // 252
					active: false                                                                                                // 253
				}                                                                                                             // 254
			});                                                                                                            // 255
		} else {                                                                                                        // 256
			Meteor.users.update({                                                                                          // 257
				_id: attempt.user._id                                                                                         // 258
			}, {                                                                                                           // 259
				$inc: {                                                                                                       // 260
					loginFailures: 1                                                                                             // 261
				}                                                                                                             // 262
			});                                                                                                            // 263
		}                                                                                                               // 264
	}                                                                                                                // 265
});                                                                                                               // 266
                                                                                                                  // 267
var checkPwd = function(user, pwd) {                                                                              // 268
	if (_.isString(user) || (_.isObject(user) && (!user.services || !user.services.password || !user.services.password ))) {
		var user = Meteor.users.findOne({                                                                               // 270
			_id: _.isString(user) ? user : user._id                                                                        // 271
		}, {                                                                                                            // 272
			fields: {                                                                                                      // 273
				'services.password.bcrypt': true                                                                              // 274
			}                                                                                                              // 275
		});                                                                                                             // 276
	}                                                                                                                // 277
	var result = Accounts._checkPassword(user, pwd);                                                                 // 278
	if (result.error) throw new Meteor.Error(403);                                                                   // 279
};                                                                                                                // 280
                                                                                                                  // 281
Meteor.methods({                                                                                                  // 282
	setGroup: function(userId, group) {                                                                              // 283
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 284
			throw new Meteor.Error(403);                                                                                   // 285
		}                                                                                                               // 286
		try {                                                                                                           // 287
			check(userId, validId);                                                                                        // 288
			check(group, validGroup);                                                                                      // 289
		} catch (e) {                                                                                                   // 290
			throw new Meteor.Error(400);                                                                                   // 291
		}                                                                                                               // 292
		var user = Meteor.users.findOne({_id: userId}, {                                                                // 293
			fields: {                                                                                                      // 294
				'trueVault.id': true,                                                                                         // 295
				roles: true                                                                                                   // 296
			}                                                                                                              // 297
		});                                                                                                             // 298
		var map = {                                                                                                     // 299
			'ta': TrueVault.groups.TA,                                                                                     // 300
			'ma': TrueVault.groups.MA,                                                                                     // 301
			'dentist': TrueVault.groups.DENTIST                                                                            // 302
		};                                                                                                              // 303
		user.roles = user.roles || ['dentist'];                                                                         // 304
		TrueVault.updateGroup(map[user.roles[0]], user.trueVault.id, true);                                             // 305
		TrueVault.updateGroup(map[group], user.trueVault.id);                                                           // 306
		Meteor.users.update({_id: userId}, {                                                                            // 307
			$set: {                                                                                                        // 308
				roles: [ group ]                                                                                              // 309
			}                                                                                                              // 310
		});                                                                                                             // 311
	},                                                                                                               // 312
	disableUser: function(userId) {                                                                                  // 313
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 314
			throw new Meteor.Error(403);                                                                                   // 315
		}                                                                                                               // 316
		try {                                                                                                           // 317
			check(userId, validId);                                                                                        // 318
		} catch (e) {                                                                                                   // 319
			throw new Meteor.Error(400);                                                                                   // 320
		}                                                                                                               // 321
		Meteor.users.update({                                                                                           // 322
			_id: userId                                                                                                    // 323
		}, {                                                                                                            // 324
			$set: {                                                                                                        // 325
				active: false                                                                                                 // 326
			}                                                                                                              // 327
		});                                                                                                             // 328
	},                                                                                                               // 329
	activateUser: function(userId) {                                                                                 // 330
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 331
			throw new Meteor.Error(403);                                                                                   // 332
		}                                                                                                               // 333
		try {                                                                                                           // 334
			check(userId, validId);                                                                                        // 335
		} catch (e) {                                                                                                   // 336
			throw new Meteor.Error(400);                                                                                   // 337
		}                                                                                                               // 338
		Meteor.users.update({                                                                                           // 339
			_id: userId                                                                                                    // 340
		}, {                                                                                                            // 341
			$set: {                                                                                                        // 342
				active: true                                                                                                  // 343
			}                                                                                                              // 344
		});                                                                                                             // 345
	},                                                                                                               // 346
	deleteUser: function(userId) {                                                                                   // 347
		console.log("AVA 001 - " + userId);                                                                             // 348
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 349
			throw new Meteor.Error(403);                                                                                   // 350
		}                                                                                                               // 351
		try {                                                                                                           // 352
			check(userId, validId);                                                                                        // 353
		} catch (e) {                                                                                                   // 354
			throw new Meteor.Error(400);                                                                                   // 355
		}                                                                                                               // 356
		var user = Meteor.users.findOne({_id: userId}, { fields: { 'trueVault.id': true }});                            // 357
		console.log("AVA 002 - " + user.trueVault.id);                                                                  // 358
		//Meteor.users.remove({_id: userId});                                                                           // 359
		//TrueVault.deleteTVUser(user.trueVault.id);                                                                    // 360
	},                                                                                                               // 361
	// custom validation to ensure email doesn't already exist                                                       // 362
	inviteUser: function(user) {                                                                                     // 363
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 364
			throw new Meteor.Error(403);                                                                                   // 365
		}                                                                                                               // 366
		try {                                                                                                           // 367
			check(user, Match.Any);                                                                                        // 368
		} catch (e) {                                                                                                   // 369
			throw new Meteor.Error(400);                                                                                   // 370
		}                                                                                                               // 371
		console.log(user);                                                                                              // 372
		var accountId = Accounts.createUser({                                                                           // 373
			email: user.email,                                                                                             // 374
			roles: user.roles,                                                                                             // 375
			name: user.name                                                                                                // 376
		});                                                                                                             // 377
		Accounts.sendEnrollmentEmail(accountId);                                                                        // 378
	},                                                                                                               // 379
	setUsername: function(username) {                                                                                // 380
		if (!this.userId) {                                                                                             // 381
			throw new Meteor.Error(403);                                                                                   // 382
		}                                                                                                               // 383
		try {                                                                                                           // 384
			check(username, validUsername);                                                                                // 385
		} catch (e) {                                                                                                   // 386
			throw new Meteor.Error(400);                                                                                   // 387
		}                                                                                                               // 388
		try {                                                                                                           // 389
			Meteor.users.update({                                                                                          // 390
				_id: this.userId,                                                                                             // 391
				username: {                                                                                                   // 392
					$exists: false                                                                                               // 393
				}                                                                                                             // 394
			}, {                                                                                                           // 395
				$set: {                                                                                                       // 396
					username: username                                                                                           // 397
				}                                                                                                             // 398
			});                                                                                                            // 399
		} catch (e) {                                                                                                   // 400
			if (e.name === 'MongoError') {                                                                                 // 401
				var match = e.err.match(/E11000 duplicate key error index: ([^ ]+)/);                                         // 402
				if (match[1].indexOf('username') !== -1)                                                                      // 403
					throw new Meteor.Error('username-exists');                                                                   // 404
			}                                                                                                              // 405
		}                                                                                                               // 406
	},                                                                                                               // 407
	updateEmail: function(doc) {                                                                                     // 408
		if (!this.userId) {                                                                                             // 409
			throw new Meteor.Error(403);                                                                                   // 410
		}                                                                                                               // 411
		try {                                                                                                           // 412
			changeEmailSchema.clean(doc);                                                                                  // 413
			check(doc, changeEmailSchema);                                                                                 // 414
		} catch (e) {                                                                                                   // 415
			throw new Meteor.Error(400);                                                                                   // 416
		}                                                                                                               // 417
		checkPwd(this.userId, doc.password);                                                                            // 418
		Meteor.users.update({                                                                                           // 419
			_id: this.userId                                                                                               // 420
		}, {                                                                                                            // 421
			$set: {                                                                                                        // 422
				emails: [{                                                                                                    // 423
					address: doc.email,                                                                                          // 424
					verified: true                                                                                               // 425
				}]                                                                                                            // 426
			}                                                                                                              // 427
		});                                                                                                             // 428
	},                                                                                                               // 429
	updateUser: function(docu) {                                                                                     // 430
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {                                                           // 431
			throw new Meteor.Error(403);                                                                                   // 432
		}                                                                                                               // 433
		try {                                                                                                           // 434
			check(docu, Match.Any);                                                                                        // 435
		} catch (e) {                                                                                                   // 436
			throw new Meteor.Error(400);                                                                                   // 437
		}                                                                                                               // 438
		try {                                                                                                           // 439
			Meteor.users.update({                                                                                          // 440
				_id: docu.id                                                                                                  // 441
			}, {                                                                                                           // 442
				$set: {                                                                                                       // 443
					username: docu.username,                                                                                     // 444
					address: docu.address,                                                                                       // 445
					phone: docu.phone,                                                                                           // 446
					emails: [{                                                                                                   // 447
						address: docu.email,                                                                                        // 448
						verified: true                                                                                              // 449
					}]                                                                                                           // 450
				}                                                                                                             // 451
			});                                                                                                            // 452
		} catch (e) {                                                                                                   // 453
			if (e.name === 'MongoError') {                                                                                 // 454
				var match = e.err.match(/E11000 duplicate key error index: ([^ ]+)/);                                         // 455
				if (match[1].indexOf('username') !== -1){                                                                     // 456
					throw new Meteor.Error('username-exists');                                                                   // 457
				}	                                                                                                            // 458
			}                                                                                                              // 459
		}                                                                                                               // 460
                                                                                                                  // 461
	}                                                                                                                // 462
/**                                                                                                               // 463
	addEmail: function(obj) {                                                                                        // 464
		if (!this.userId) {                                                                                             // 465
			throw new Meteor.Error(403);                                                                                   // 466
		}                                                                                                               // 467
		if (this.userId !== obj.userId) {                                                                               // 468
			throw new Meteor.Error(403);                                                                                   // 469
		}                                                                                                               // 470
		try {                                                                                                           // 471
			// clean                                                                                                       // 472
			// validate                                                                                                    // 473
		} catch (e) {                                                                                                   // 474
			throw new Meteor.Error(400);                                                                                   // 475
		}                                                                                                               // 476
		checkPwd(this.userId, obj.password);                                                                            // 477
		Meteor.users.update({                                                                                           // 478
			_id: obj.userId                                                                                                // 479
		}, {                                                                                                            // 480
			$addToSet: {                                                                                                   // 481
				emails: {                                                                                                     // 482
					address: obj.address,                                                                                        // 483
					verified: false                                                                                              // 484
				}                                                                                                             // 485
			}                                                                                                              // 486
		});                                                                                                             // 487
		Accounts.sendVerificationEmail(obj.userId, obj.email);                                                          // 488
	},                                                                                                               // 489
	removeEmail: function(obj) {                                                                                     // 490
		if (!this.userId) {                                                                                             // 491
			throw new Meteor.Error(403);                                                                                   // 492
		}                                                                                                               // 493
		if (this.userId !== obj.userId) {                                                                               // 494
			throw new Meteor.Error(403);                                                                                   // 495
		}                                                                                                               // 496
		try {                                                                                                           // 497
			// clean                                                                                                       // 498
			// validate                                                                                                    // 499
		} catch (e) {                                                                                                   // 500
			throw new Meteor.Error(400);                                                                                   // 501
		}                                                                                                               // 502
		var user = Meteor.user();                                                                                       // 503
		checkPwd(user, obj.password);                                                                                   // 504
		// In order to remove an e-mail it has to unverified or there must be another verified e-mail in the list       // 505
		var target;                                                                                                     // 506
		var emails = _.filter(user.emails, function(email) {                                                            // 507
			if (email.address === obj.address) target = email;                                                             // 508
			return email.verified;                                                                                         // 509
		});                                                                                                             // 510
		if (!target) {                                                                                                  // 511
			throw new Meteor.Error(404);                                                                                   // 512
		}                                                                                                               // 513
		if (target.verified && emails.length < 2) {                                                                     // 514
			throw new Meteor.Error(403);                                                                                   // 515
		}                                                                                                               // 516
		Meteor.users.update({                                                                                           // 517
			_id: obj.userId                                                                                                // 518
		}, {                                                                                                            // 519
			$pull: {                                                                                                       // 520
				emails: {                                                                                                     // 521
					address: obj.address                                                                                         // 522
				}                                                                                                             // 523
			}                                                                                                              // 524
		});                                                                                                             // 525
	}                                                                                                                // 526
**/                                                                                                               // 527
});                                                                                                               // 528
                                                                                                                  // 529
SyncedCron.add({                                                                                                  // 530
	name: 'Password Reset Token Expiration',                                                                         // 531
	schedule: function(parser) {                                                                                     // 532
		return parser.text('every 1 hours');                                                                            // 533
	},                                                                                                               // 534
	job: function() {                                                                                                // 535
		var date = new Date();                                                                                          // 536
		date.setHours(date.getHours() - 24);                                                                            // 537
		Meteor.users.update({                                                                                           // 538
			'services.password.reset.when': { $lt: date }                                                                  // 539
		}, {                                                                                                            // 540
			$unset: {                                                                                                      // 541
				'services.password.reset': true                                                                               // 542
			}                                                                                                              // 543
		}, {                                                                                                            // 544
			multi: true                                                                                                    // 545
		});                                                                                                             // 546
	}                                                                                                                // 547
});                                                                                                               // 548
                                                                                                                  // 549
SyncedCron.add({                                                                                                  // 550
	name: 'Email Verification Token Expiration',                                                                     // 551
	schedule: function(parser) {                                                                                     // 552
		return parser.text('every 1 hours');                                                                            // 553
	},                                                                                                               // 554
	job: function() {                                                                                                // 555
		var date = new Date();                                                                                          // 556
		date.setHours(date.getHours() - 24);                                                                            // 557
		Meteor.users.update({}, {                                                                                       // 558
			$pull: {                                                                                                       // 559
				'services.email.verificationTokens': { when: { $lt: date } }                                                  // 560
			}                                                                                                              // 561
		}, {                                                                                                            // 562
			multi: true                                                                                                    // 563
		});                                                                                                             // 564
	}                                                                                                                // 565
});                                                                                                               // 566
                                                                                                                  // 567
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.users = {
  Users: Users
};

})();

//# sourceMappingURL=users.js.map
