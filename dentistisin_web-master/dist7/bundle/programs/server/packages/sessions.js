(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
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
var TrueVault = Package.truevault.TrueVault;
var SightCall = Package.sightcall.SightCall;
var SyncedCron = Package['percolate:synced-cron'].SyncedCron;

/* Package-scope variables */
var Sessions, sessionsCountHandle, enQueueCountsHandle, esQueueCountsHandle;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sessions/sessions_common.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Sessions = {};                                                                                                        // 1
                                                                                                                      // 2
Sessions.collection = new Mongo.Collection('sessions');                                                               // 3
Sessions.collection.deny({                                                                                            // 4
	insert: function() { return true; },                                                                                 // 5
	update: function() { return true; },                                                                                 // 6
	remove: function() { return true; }                                                                                  // 7
});                                                                                                                   // 8
                                                                                                                      // 9
Sessions.schemas = {};                                                                                                // 10
                                                                                                                      // 11
Sessions.schemas.dentistNotes = new SimpleSchema({                                                                    // 12
	clinicalImpression: {                                                                                                // 13
		type: String,                                                                                                       // 14
		label: 'Clinical Impressions',                                                                                      // 15
		max: 5000                                                                                                           // 16
	},                                                                                                                   // 17
	recommendation: {                                                                                                    // 18
		type: String,                                                                                                       // 19
		label: 'Recommendations',                                                                                           // 20
		max: 5000                                                                                                           // 21
	},                                                                                                                   // 22
	recommendedPrescriptions: {                                                                                          // 23
		type: String,                                                                                                       // 24
		label: 'Recommended Prescriptions',                                                                                 // 25
		max: 5000                                                                                                           // 26
	},                                                                                                                   // 27
	sessionId: {                                                                                                         // 28
		type: String,                                                                                                       // 29
		regEx: SimpleSchema.RegEx.Id                                                                                        // 30
	}                                                                                                                    // 31
});                                                                                                                   // 32
                                                                                                                      // 33
                                                                                                                      // 34
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/sessions/sessions_server.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;                                         // 1
                                                                                                                      // 2
var accessLog = new SimpleSchema({                                                                                    // 3
	at: {                                                                                                                // 4
		type: Date,                                                                                                         // 5
		autoValue: function() {                                                                                             // 6
			var userId = this.siblingField('userId');                                                                          // 7
			var transId = this.siblingField('transId');                                                                        // 8
			var fax = this.siblingField('fax');                                                                                // 9
			if (userId.isSet || transId.isSet || fax.isSet) {                                                                  // 10
				return new Date;                                                                                                  // 11
			} else {                                                                                                           // 12
				this.unset();                                                                                                     // 13
			}                                                                                                                  // 14
		}                                                                                                                   // 15
	},                                                                                                                   // 16
	userId: {                                                                                                            // 17
		type: String,                                                                                                       // 18
		regEx: SimpleSchema.RegEx.Id,                                                                                       // 19
		optional: true                                                                                                      // 20
	},                                                                                                                   // 21
	fax: {                                                                                                               // 22
		type: Boolean,                                                                                                      // 23
		optional: true                                                                                                      // 24
	},                                                                                                                   // 25
	transId: {                                                                                                           // 26
		type: String,                                                                                                       // 27
		regEx: UUID,                                                                                                        // 28
		optional: true                                                                                                      // 29
	}                                                                                                                    // 30
});                                                                                                                   // 31
                                                                                                                      // 32
var trueVaultRef = new SimpleSchema({                                                                                 // 33
	docId: {                                                                                                             // 34
		type: String,                                                                                                       // 35
		regEx: UUID                                                                                                         // 36
	},                                                                                                                   // 37
	schemaId: {                                                                                                          // 38
		type: String,                                                                                                       // 39
		regEx: UUID,                                                                                                        // 40
		optional: true                                                                                                      // 41
	},                                                                                                                   // 42
	vaultId: {                                                                                                           // 43
		type: String,                                                                                                       // 44
		regEx: UUID                                                                                                         // 45
	},                                                                                                                   // 46
	transId: {                                                                                                           // 47
		type: String,                                                                                                       // 48
		regEx: UUID                                                                                                         // 49
	},                                                                                                                   // 50
	accessLog: {                                                                                                         // 51
		type: [accessLog]                                                                                                   // 52
	}                                                                                                                    // 53
});                                                                                                                   // 54
                                                                                                                      // 55
var voipState = ['ready', 'queued', 'assigned', 'failed', 'done'];                                                    // 56
                                                                                                                      // 57
                                                                                                                      // 58
var voipHistory = new SimpleSchema({                                                                                  // 59
	at: {                                                                                                                // 60
		type: Date,                                                                                                         // 61
		autoValue: function() {                                                                                             // 62
			var state = this.siblingField('state');                                                                            // 63
			if (state.isSet) {                                                                                                 // 64
				return new Date;                                                                                                  // 65
			} else {                                                                                                           // 66
				this.unset();                                                                                                     // 67
			}                                                                                                                  // 68
		}                                                                                                                   // 69
	},                                                                                                                   // 70
	state: {                                                                                                             // 71
		type: String,                                                                                                       // 72
		allowedValues: voipState                                                                                            // 73
	},                                                                                                                   // 74
	reason: {                                                                                                            // 75
		type: String,                                                                                                       // 76
		optional: true                                                                                                      // 77
	},                                                                                                                   // 78
	dentist: {                                                                                                           // 79
		type: Object,                                                                                                       // 80
		optional: true,                                                                                                     // 81
	},                                                                                                                   // 82
	'dentist.id': {                                                                                                      // 83
		type: String,                                                                                                       // 84
		regEx: SimpleSchema.RegEx.Id                                                                                        // 85
	},                                                                                                                   // 86
	'dentist.username': {                                                                                                // 87
		type: String                                                                                                        // 88
	},                                                                                                                   // 89
	location: {                                                                                                          // 90
		type: Object,                                                                                                       // 91
		optional: true                                                                                                      // 92
	},                                                                                                                   // 93
	'location.id': {                                                                                                     // 94
		type: String,                                                                                                       // 95
		regEx: SimpleSchema.RegEx.Id                                                                                        // 96
	},                                                                                                                   // 97
	'location.name': {                                                                                                   // 98
		type: String,                                                                                                       // 99
		max: 100,                                                                                                           // 100
	},                                                                                                                   // 101
	'location.kioskHandle': {                                                                                            // 102
		type: String,                                                                                                       // 103
		regEx: UUID                                                                                                         // 104
	}                                                                                                                    // 105
});                                                                                                                   // 106
                                                                                                                      // 107
var faxState = ['ready', 'locked', 'failed', 'sent', 'delivered'];                                                    // 108
                                                                                                                      // 109
var faxHistory = new SimpleSchema({                                                                                   // 110
	at: {                                                                                                                // 111
		type: Date,                                                                                                         // 112
		autoValue: function() {                                                                                             // 113
			var state = this.siblingField('state');                                                                            // 114
			if (state.isSet && !this.isSet) {                                                                                  // 115
				return new Date;                                                                                                  // 116
			}                                                                                                                  // 117
		}                                                                                                                   // 118
	},                                                                                                                   // 119
	state: {                                                                                                             // 120
		type: String,                                                                                                       // 121
		allowedValues: faxState                                                                                             // 122
	},                                                                                                                   // 123
	reason: {                                                                                                            // 124
		type: String,                                                                                                       // 125
		optional: true                                                                                                      // 126
	},                                                                                                                   // 127
	SendFaxQueueId: {                                                                                                    // 128
		type: String,                                                                                                       // 129
		optional: true                                                                                                      // 130
	},                                                                                                                   // 131
	resultCode: {                                                                                                        // 132
		type: Number,                                                                                                       // 133
		optional: true                                                                                                      // 134
	},                                                                                                                   // 135
	errorCode: {                                                                                                         // 136
		type: Number,                                                                                                       // 137
		optional: true                                                                                                      // 138
	},                                                                                                                   // 139
	resultMessage: {                                                                                                     // 140
		type: String,                                                                                                       // 141
		optional: true                                                                                                      // 142
	},                                                                                                                   // 143
	faxId: {                                                                                                             // 144
		type: String,                                                                                                       // 145
		optional: true                                                                                                      // 146
	},                                                                                                                   // 147
	outboundFaxId: {                                                                                                     // 148
		type: String,                                                                                                       // 149
		optional: true                                                                                                      // 150
	},                                                                                                                   // 151
	pages: {                                                                                                             // 152
		type: Number,                                                                                                       // 153
		optional: true                                                                                                      // 154
	},                                                                                                                   // 155
	attempts: {                                                                                                          // 156
		type: Number,                                                                                                       // 157
		optional: true                                                                                                      // 158
	}                                                                                                                    // 159
});                                                                                                                   // 160
                                                                                                                      // 161
var tf = ['T', 'F'];                                                                                                  // 162
                                                                                                                      // 163
Sessions.schemas.surveyForm = new SimpleSchema({                                                                      // 164
	waitTime: {                                                                                                          // 165
		type: String,                                                                                                       // 166
		allowedValues: ['FIVE_MINUTES', 'TEN_MINUTES', 'FIFTEEN_MINUTES', 'TWENTY_MINUTES']                                 // 167
	},                                                                                                                   // 168
	understanding: {                                                                                                     // 169
		type: String,                                                                                                       // 170
		allowedValues: tf                                                                                                   // 171
	},                                                                                                                   // 172
	treatment: {                                                                                                         // 173
		type: String,                                                                                                       // 174
		allowedValues: ['THREE_DAYS', 'FIVE_DAYS', 'NEVER']                                                                 // 175
	},                                                                                                                   // 176
	pleased: {                                                                                                           // 177
		type: String,                                                                                                       // 178
		allowedValues: tf                                                                                                   // 179
	},                                                                                                                   // 180
	refer: {                                                                                                             // 181
		type: String,                                                                                                       // 182
		allowedValues: tf                                                                                                   // 183
	}                                                                                                                    // 184
});                                                                                                                   // 185
                                                                                                                      // 186
var langOptions = ['en', 'es'];                                                                                       // 187
                                                                                                                      // 188
var validLang = Match.Where(function (x) {                                                                            // 189
	check(x, String);                                                                                                    // 190
	return /^en|es$/.test(x);                                                                                            // 191
});                                                                                                                   // 192
                                                                                                                      // 193
Sessions.schemaDB = new SimpleSchema({                                                                                // 194
	createdAt: {                                                                                                         // 195
		type: Date,                                                                                                         // 196
		index: 1,                                                                                                           // 197
		autoValue: function() {                                                                                             // 198
			if (this.isInsert) {                                                                                               // 199
				return new Date;                                                                                                  // 200
			} else if (this.isUpsert) {                                                                                        // 201
				return { $setOnInsert: new Date };                                                                                // 202
			} else {                                                                                                           // 203
				this.unset();                                                                                                     // 204
			}                                                                                                                  // 205
		}                                                                                                                   // 206
	},                                                                                                                   // 207
	modifiedAt: {                                                                                                        // 208
		type: Date,                                                                                                         // 209
		autoValue: function() {                                                                                             // 210
			if (this.isInsert || this.isUpdate) {                                                                              // 211
				return new Date;                                                                                                  // 212
			} else if (this.isUpsert) {                                                                                        // 213
				return { $setOnInsert: new Date };                                                                                // 214
			} else {                                                                                                           // 215
				this.unset();                                                                                                     // 216
			}                                                                                                                  // 217
		}                                                                                                                   // 218
	},                                                                                                                   // 219
	location: {                                                                                                          // 220
		type: Object                                                                                                        // 221
	},                                                                                                                   // 222
	'location.id': {                                                                                                     // 223
		type: String,                                                                                                       // 224
		regEx: SimpleSchema.RegEx.Id                                                                                        // 225
	},                                                                                                                   // 226
	'location.name': {                                                                                                   // 227
		type: String,                                                                                                       // 228
		max: 100                                                                                                            // 229
	},                                                                                                                   // 230
	'location.kioskHandle': {                                                                                            // 231
		type: String,                                                                                                       // 232
		regEx: UUID                                                                                                         // 233
	},                                                                                                                   // 234
	dentist: {                                                                                                           // 235
		type: Object,                                                                                                       // 236
		optional: true                                                                                                      // 237
	},                                                                                                                   // 238
	'dentist.id': {                                                                                                      // 239
		type: String,                                                                                                       // 240
		regEx: SimpleSchema.RegEx.Id,                                                                                       // 241
	},                                                                                                                   // 242
	'dentist.username': {                                                                                                // 243
		type: String                                                                                                        // 244
	},                                                                                                                   // 245
	lang: {                                                                                                              // 246
		type: String,                                                                                                       // 247
		allowedValues: langOptions                                                                                          // 248
	},                                                                                                                   // 249
	state: {                                                                                                             // 250
		type: String,                                                                                                       // 251
		allowedValues: ['form', 'voip', 'survey', 'complete']                                                               // 252
	},                                                                                                                   // 253
	form: {                                                                                                              // 254
		type: Object,                                                                                                       // 255
		optional: true                                                                                                      // 256
	},                                                                                                                   // 257
	'form.at': {                                                                                                         // 258
		type: Date,                                                                                                         // 259
		autoValue: function() {                                                                                             // 260
			var ref = this.siblingField('trueVaultRef.docId');                                                                 // 261
			if (ref.isSet) {                                                                                                   // 262
				return new Date;                                                                                                  // 263
			} else {                                                                                                           // 264
				this.unset();                                                                                                     // 265
			}                                                                                                                  // 266
		}                                                                                                                   // 267
	},                                                                                                                   // 268
	'form.trueVaultRef': {                                                                                               // 269
		type: trueVaultRef                                                                                                  // 270
	},                                                                                                                   // 271
	voip: {                                                                                                              // 272
		type: Object,                                                                                                       // 273
		optional: true                                                                                                      // 274
	},                                                                                                                   // 275
	'voip.enqueuedAt': {                                                                                                 // 276
		type: Date,                                                                                                         // 277
		optional: true                                                                                                      // 278
	},                                                                                                                   // 279
	'voip.state': {                                                                                                      // 280
		type: String,                                                                                                       // 281
		allowedValues: voipState                                                                                            // 282
	},                                                                                                                   // 283
	'voip.history': {                                                                                                    // 284
		type: [voipHistory]                                                                                                 // 285
	},                                                                                                                   // 286
	survey: {                                                                                                            // 287
		type: Object,                                                                                                       // 288
		optional: true                                                                                                      // 289
	},                                                                                                                   // 290
	'survey.at': {                                                                                                       // 291
		type: Date,                                                                                                         // 292
		autoValue: function() {                                                                                             // 293
			var skipped = this.siblingField('skipped');                                                                        // 294
			var form = this.siblingField('form');                                                                              // 295
			if (skipped.isSet || form.isSet) {                                                                                 // 296
				return new Date;                                                                                                  // 297
			} else {                                                                                                           // 298
				this.unset();                                                                                                     // 299
			}                                                                                                                  // 300
		}                                                                                                                   // 301
	},                                                                                                                   // 302
	'survey.skipped': {                                                                                                  // 303
		type: Boolean,                                                                                                      // 304
		optional: true,                                                                                                     // 305
		autoValue: function() {                                                                                             // 306
			var form = this.siblingField('form');                                                                              // 307
			if (form.isSet) {                                                                                                  // 308
				this.unset();                                                                                                     // 309
			}                                                                                                                  // 310
		}                                                                                                                   // 311
	},                                                                                                                   // 312
	'survey.form': {                                                                                                     // 313
		type: Sessions.schemas.surveyForm,                                                                                  // 314
		optional: true,                                                                                                     // 315
		custom: function() {                                                                                                // 316
			var skipped = this.siblingField('skipped');                                                                        // 317
			if (!skipped.isSet && !this.isSet) {                                                                               // 318
				return 'required';                                                                                                // 319
			}                                                                                                                  // 320
		}                                                                                                                   // 321
	},                                                                                                                   // 322
	complete: {                                                                                                          // 323
		type: Object,                                                                                                       // 324
		optional: true                                                                                                      // 325
	},                                                                                                                   // 326
	'complete.at': {                                                                                                     // 327
		type: Date,                                                                                                         // 328
		autoValue: function() {                                                                                             // 329
			var condition = this.siblingField('condition');                                                                    // 330
			if (condition.isSet) {                                                                                             // 331
				return new Date;                                                                                                  // 332
			} else {                                                                                                           // 333
				this.unset();                                                                                                     // 334
			}                                                                                                                  // 335
		}                                                                                                                   // 336
	},                                                                                                                   // 337
	'complete.condition': {                                                                                              // 338
		type: String,                                                                                                       // 339
		allowedValues: ['timeout', 'inactive', 'finished']                                                                  // 340
	},                                                                                                                   // 341
	fax: {                                                                                                               // 342
		type: Object,                                                                                                       // 343
		optional: true                                                                                                      // 344
	},                                                                                                                   // 345
	'fax.state': {                                                                                                       // 346
		type: String,                                                                                                       // 347
		index: 1,                                                                                                           // 348
		allowedValues: faxState                                                                                             // 349
	},                                                                                                                   // 350
	'fax.history': {                                                                                                     // 351
		type: [faxHistory]                                                                                                  // 352
	},                                                                                                                   // 353
	dentistNotes: {                                                                                                      // 354
		type: Object,                                                                                                       // 355
		optional: true                                                                                                      // 356
	},                                                                                                                   // 357
	'dentistNotes.at': {                                                                                                 // 358
		type: Date,                                                                                                         // 359
		autoValue: function() {                                                                                             // 360
			var ref = this.siblingField('trueVaultRef.docId');                                                                 // 361
			if (ref.isSet) {                                                                                                   // 362
				return new Date;                                                                                                  // 363
			} else {                                                                                                           // 364
				this.unset();                                                                                                     // 365
			}                                                                                                                  // 366
		}                                                                                                                   // 367
	},                                                                                                                   // 368
	'dentistNotes.trueVaultRef': {                                                                                       // 369
		type: trueVaultRef                                                                                                  // 370
	}                                                                                                                    // 371
});                                                                                                                   // 372
                                                                                                                      // 373
Sessions.collection.attachSchema(Sessions.schemaDB);                                                                  // 374
                                                                                                                      // 375
var validId = Match.Where(function (x) {                                                                              // 376
	check(x, String);                                                                                                    // 377
	return SimpleSchema.RegEx.Id.test(x);                                                                                // 378
});                                                                                                                   // 379
                                                                                                                      // 380
Meteor.methods({                                                                                                      // 381
	voipFail: function(sessionId) {                                                                                      // 382
		this.unblock();                                                                                                     // 383
		var user = Meteor.users.findOne({                                                                                   // 384
			_id: this.userId                                                                                                   // 385
		}, {                                                                                                                // 386
			fields: {                                                                                                          // 387
				roles: true                                                                                                       // 388
			}                                                                                                                  // 389
		});                                                                                                                 // 390
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {                                                                 // 391
			throw new Metoer.Error(403);                                                                                       // 392
		}                                                                                                                   // 393
		try {                                                                                                               // 394
			check(sessionId, validId);                                                                                         // 395
		} catch (e) {                                                                                                       // 396
			throw new Meteor.Error(403);                                                                                       // 397
		}                                                                                                                   // 398
                                                                                                                      // 399
		var session = Sessions.collection.update({                                                                          // 400
			_id: sessionId,                                                                                                    // 401
			'dentist.id': user._id,                                                                                            // 402
			state: 'voip',                                                                                                     // 403
			'voip.state': 'assigned'                                                                                           // 404
		}, {                                                                                                                // 405
			$set: {                                                                                                            // 406
				'voip.state': 'failed',                                                                                           // 407
			},                                                                                                                 // 408
			$push: {                                                                                                           // 409
				'voip.history': { state: 'failed' }                                                                               // 410
			}                                                                                                                  // 411
		});                                                                                                                 // 412
                                                                                                                      // 413
		if (!session) {                                                                                                     // 414
			throw new Meteor.Error(404);                                                                                       // 415
		}                                                                                                                   // 416
	},                                                                                                                   // 417
	getVoipToken: function() {                                                                                           // 418
		if (!Roles.userIsInRole(this.userId, ['dentist', 'ma'])) {                                                          // 419
			throw new Meteor.Error(403);                                                                                       // 420
		}                                                                                                                   // 421
		var result;                                                                                                         // 422
		try {                                                                                                               // 423
			result = SightCall.auth(this.userId, 'standard').data.token;                                                       // 424
		} catch (e) {                                                                                                       // 425
			throw new Meteor.Error(500);                                                                                       // 426
		}                                                                                                                   // 427
		return result;                                                                                                      // 428
	},                                                                                                                   // 429
	getNextPatient: function(lang) {                                                                                     // 430
		var user = Meteor.users.findOne({                                                                                   // 431
			_id: this.userId                                                                                                   // 432
		}, {                                                                                                                // 433
			fields: {                                                                                                          // 434
				username: true,                                                                                                   // 435
				roles: true                                                                                                       // 436
			}                                                                                                                  // 437
		});                                                                                                                 // 438
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {                                                                 // 439
			throw new Meteor.Error(403);                                                                                       // 440
		}                                                                                                                   // 441
		try {                                                                                                               // 442
			check(lang, validLang);                                                                                            // 443
		} catch (e) {                                                                                                       // 444
			throw new Meteor.Error(403);                                                                                       // 445
		}                                                                                                                   // 446
		// This doesn't get checked by collection2                                                                          // 447
		// so be careful...                                                                                                 // 448
		var session = Sessions.collection.findAndModify({                                                                   // 449
			query: {                                                                                                           // 450
				state: 'voip',                                                                                                    // 451
				'voip.state': 'queued',                                                                                           // 452
				lang: lang                                                                                                        // 453
			},                                                                                                                 // 454
			sort: {                                                                                                            // 455
				'voip.enqueuedAt': 1                                                                                              // 456
			},                                                                                                                 // 457
			update: {                                                                                                          // 458
				$set: {                                                                                                           // 459
					'voip.state': 'assigned',                                                                                        // 460
					dentist: {                                                                                                       // 461
						id: user._id,                                                                                                   // 462
						username: user.username                                                                                         // 463
					}                                                                                                                // 464
				},                                                                                                                // 465
				$push: {                                                                                                          // 466
					// Manually include at                                                                                           // 467
					'voip.history': {                                                                                                // 468
						at: new Date,                                                                                                   // 469
						state: 'assigned',                                                                                              // 470
						dentist: {                                                                                                      // 471
							id: user._id,                                                                                                  // 472
							username: user.username                                                                                        // 473
						}                                                                                                               // 474
					}                                                                                                                // 475
				}                                                                                                                 // 476
			},                                                                                                                 // 477
			fields: {                                                                                                          // 478
				_id: true                                                                                                         // 479
			}                                                                                                                  // 480
		});                                                                                                                 // 481
                                                                                                                      // 482
		if (!session) {                                                                                                     // 483
			throw new Meteor.Error(404);                                                                                       // 484
		}                                                                                                                   // 485
		return session._id;                                                                                                 // 486
	},                                                                                                                   // 487
	createDentistNotes: function(notes) {                                                                                // 488
		this.unblock();                                                                                                     // 489
		var user = Meteor.users.findOne({                                                                                   // 490
			_id: this.userId                                                                                                   // 491
		}, {                                                                                                                // 492
			fields: {                                                                                                          // 493
				'trueVault.id': true,                                                                                             // 494
				roles: true                                                                                                       // 495
			}                                                                                                                  // 496
		});                                                                                                                 // 497
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {                                                                 // 498
			throw new Meteor.Error(403);                                                                                       // 499
		}                                                                                                                   // 500
		try {                                                                                                               // 501
			Sessions.schemas.dentistNotes.clean(notes);                                                                        // 502
			check(notes, Sessions.schemas.dentistNotes);                                                                       // 503
		} catch (e) {                                                                                                       // 504
			throw new Meteor.Error(400);                                                                                       // 505
		}                                                                                                                   // 506
                                                                                                                      // 507
		var session = Sessions.collection.findOne({                                                                         // 508
			_id: notes.sessionId,                                                                                              // 509
			'dentist.id': user._id,                                                                                            // 510
			state: 'voip',                                                                                                     // 511
			'voip.state': 'assigned'                                                                                           // 512
		}, {                                                                                                                // 513
			fields: {                                                                                                          // 514
				_id: true,                                                                                                        // 515
				'dentist.id': true,                                                                                               // 516
				state: true,                                                                                                      // 517
				'voip.state': true                                                                                                // 518
			}                                                                                                                  // 519
		});                                                                                                                 // 520
                                                                                                                      // 521
		if (!session) {                                                                                                     // 522
			throw new Meteor.Error(404);                                                                                       // 523
		}                                                                                                                   // 524
                                                                                                                      // 525
		var result;                                                                                                         // 526
		try {                                                                                                               // 527
			result = TrueVault.createDocument(notes, user.trueVault.id);                                                       // 528
		} catch (e) {                                                                                                       // 529
			throw new Meteor.Error(500);                                                                                       // 530
		}                                                                                                                   // 531
                                                                                                                      // 532
		session['voip.state'] = session.voip.state;                                                                         // 533
		delete session.voip;                                                                                                // 534
		session['dentist.id'] = session.dentist.id;                                                                         // 535
		delete session.dentist;                                                                                             // 536
		session.dentistNotes = {                                                                                            // 537
			$exists: false                                                                                                     // 538
		};                                                                                                                  // 539
                                                                                                                      // 540
		var updated = Sessions.collection.update(session, {                                                                 // 541
			$set: {                                                                                                            // 542
				'dentistNotes.trueVaultRef.docId': result.docId,                                                                  // 543
				'dentistNotes.trueVaultRef.vaultId': result.vaultId,                                                              // 544
				'dentistNotes.trueVaultRef.transId': result.transId,                                                              // 545
				'fax.state': 'ready'                                                                                              // 546
			},                                                                                                                 // 547
			$push: {                                                                                                           // 548
				'fax.history': { state: 'ready' }                                                                                 // 549
			}                                                                                                                  // 550
		});                                                                                                                 // 551
                                                                                                                      // 552
		if (updated === 0) {                                                                                                // 553
			throw new Meteor.Error(404);                                                                                       // 554
		}                                                                                                                   // 555
                                                                                                                      // 556
		return true;                                                                                                        // 557
	}                                                                                                                    // 558
});                                                                                                                   // 559
                                                                                                                      // 560
var sessionsSort = new SimpleSchema({                                                                                 // 561
	createdAt: {                                                                                                         // 562
		type: Number,                                                                                                       // 563
		allowedValues: [1, -1],                                                                                             // 564
		optional: true,                                                                                                     // 565
		autoValue: function() {                                                                                             // 566
			var location = this.field('location.name');                                                                        // 567
			var dentist = this.field('dentist.username');                                                                      // 568
			if (!location && !dentist) {                                                                                       // 569
				return -1;                                                                                                        // 570
			}                                                                                                                  // 571
		}                                                                                                                   // 572
	},                                                                                                                   // 573
	'location.name': {                                                                                                   // 574
		type: Number,                                                                                                       // 575
		allowedValues: [1, -1],                                                                                             // 576
		optional: true                                                                                                      // 577
	},                                                                                                                   // 578
	'dentist.username': {                                                                                                // 579
		type: Number,                                                                                                       // 580
		allowedValues: [1, -1],                                                                                             // 581
		optional: true                                                                                                      // 582
	}                                                                                                                    // 583
});                                                                                                                   // 584
                                                                                                                      // 585
var sessionsFilter = new SimpleSchema({                                                                               // 586
	'location.id': {                                                                                                     // 587
		type: String,                                                                                                       // 588
		regEx: SimpleSchema.RegEx.Id,                                                                                       // 589
		optional: true                                                                                                      // 590
	},                                                                                                                   // 591
	'dentist.id': {                                                                                                      // 592
		type: String,                                                                                                       // 593
		regEx: SimpleSchema.RegEx.Id,                                                                                       // 594
		optional: true                                                                                                      // 595
	},                                                                                                                   // 596
	start: {                                                                                                             // 597
		type: Date,                                                                                                         // 598
		optional: true                                                                                                      // 599
	},                                                                                                                   // 600
	end: {                                                                                                               // 601
		type: Date,                                                                                                         // 602
		optional: true                                                                                                      // 603
	}                                                                                                                    // 604
});                                                                                                                   // 605
                                                                                                                      // 606
var sessionsStatisticsFilter = new SimpleSchema({                                                                     // 607
	'location.id': {                                                                                                     // 608
		type: String,                                                                                                       // 609
		regEx: SimpleSchema.RegEx.Id,                                                                                       // 610
		optional: true                                                                                                      // 611
	},                                                                                                                   // 612
	start: {                                                                                                             // 613
		type: Date                                                                                                          // 614
	},                                                                                                                   // 615
	end: {                                                                                                               // 616
		type: Date                                                                                                          // 617
	}                                                                                                                    // 618
});                                                                                                                   // 619
                                                                                                                      // 620
Meteor.publish('sessions', function(filter, sort, limit) {                                                            // 621
	var self = this;                                                                                                     // 622
	if (!Roles.userIsInRole(self.userId, ['ma', 'ta'])) {                                                                // 623
		return [];                                                                                                          // 624
	}                                                                                                                    // 625
	try {                                                                                                                // 626
		sessionsFilter.clean(filter);                                                                                       // 627
		sessionsSort.clean(sort);                                                                                           // 628
		check(filter, sessionsFilter);                                                                                      // 629
		check(sort, sessionsSort);                                                                                          // 630
		check(limit, Match.Optional(Number));                                                                               // 631
	} catch (e) {                                                                                                        // 632
		return [];                                                                                                          // 633
	}                                                                                                                    // 634
	limit = limit || 10;                                                                                                 // 635
	if (filter.start || filter.end) {                                                                                    // 636
		filter.createdAt = {};                                                                                              // 637
		if (filter.start) filter.createdAt.$gte = filter.start;                                                             // 638
		if (filter.end) filter.createdAt.$lte = filter.end;                                                                 // 639
		delete filter.start;                                                                                                // 640
		delete filter.end;                                                                                                  // 641
	}                                                                                                                    // 642
	if (filter.dentist && filter.dentist.id) {                                                                           // 643
		filter['dentist.id'] = filter.dentist.id;                                                                           // 644
		delete filter.dentist;                                                                                              // 645
	}                                                                                                                    // 646
	if (filter.location && filter.location.id) {                                                                         // 647
		filter['location.id'] = filter.location.id;                                                                         // 648
		delete filter.location;                                                                                             // 649
	}                                                                                                                    // 650
	sessionsCountHandle = Counts.publish(self, 'sessionsCount', Sessions.collection.find(filter, { fields: { _id: true } }), { noReady: true });
	var handle = Sessions.collection.find(filter, {                                                                      // 652
		fields: {                                                                                                           // 653
			createdAt: true,                                                                                                   // 654
			'location.name': true,                                                                                             // 655
			'dentist.username': true,                                                                                          // 656
			state: true,                                                                                                       // 657
			'complete.condition': true                                                                                         // 658
		},                                                                                                                  // 659
		sort: sort,                                                                                                         // 660
		limit: limit                                                                                                        // 661
	}).observeChanges({                                                                                                  // 662
		added: function(id, fields) {                                                                                       // 663
			if (fields.complete && fields.complete.condition) {                                                                // 664
				fields.state = fields.complete.condition;                                                                         // 665
				delete fields.complete;                                                                                           // 666
			} else fields.state = 'inprogress';                                                                                // 667
			self.added('sessions', id, fields);                                                                                // 668
		},                                                                                                                  // 669
		changed: function(id, fields) {                                                                                     // 670
			if (fields.complete && fields.complete.condition) {                                                                // 671
				fields.state = fields.complete.condition;                                                                         // 672
				delete fields.complete;                                                                                           // 673
			} else if (fields.state) {                                                                                         // 674
				fields.state = 'inprogress';                                                                                      // 675
			}                                                                                                                  // 676
			self.changed('sessions', id, fields);                                                                              // 677
		},                                                                                                                  // 678
		removed: function(id) {                                                                                             // 679
			self.removed('sessions', id);                                                                                      // 680
		}                                                                                                                   // 681
	});                                                                                                                  // 682
                                                                                                                      // 683
	self.ready();                                                                                                        // 684
	self.onStop(function() {                                                                                             // 685
		sessionsCountHandle.stop();                                                                                         // 686
		handle.stop();                                                                                                      // 687
	});                                                                                                                  // 688
});                                                                                                                   // 689
                                                                                                                      // 690
Meteor.publish('sessions.statistics', function(filter) {                                                              // 691
	var self = this;                                                                                                     // 692
	if (!Roles.userIsInRole(self.userId, ['ma', 'ta'])) {                                                                // 693
		return [];                                                                                                          // 694
	}                                                                                                                    // 695
	var initializing = true;                                                                                             // 696
	try {                                                                                                                // 697
		sessionsStatisticsFilter.clean(filter);                                                                             // 698
		check(filter, sessionsStatisticsFilter);                                                                            // 699
	} catch (e) {                                                                                                        // 700
		return [];                                                                                                          // 701
	}                                                                                                                    // 702
	filter.createdAt = {                                                                                                 // 703
		$gte: filter.start,                                                                                                 // 704
		$lte: filter.end                                                                                                    // 705
	};                                                                                                                   // 706
	delete filter.start;                                                                                                 // 707
	delete filter.end;                                                                                                   // 708
	if (filter.location && filter.location.id) {                                                                         // 709
		filter['location.id'] = filter.location.id;                                                                         // 710
		delete filter.location;                                                                                             // 711
	}                                                                                                                    // 712
	var map = {};                                                                                                        // 713
	var locMap = {};                                                                                                     // 714
	var handle = Sessions.collection.find(filter, { fields: {                                                            // 715
		'location.id': true,                                                                                                // 716
		'complete.condition': true                                                                                          // 717
	}}).observeChanges({                                                                                                 // 718
		added: function (id, fields) {                                                                                      // 719
			var lId = fields.location.id;                                                                                      // 720
			var cond;                                                                                                          // 721
			if (!map[lId]) map[lId] = { stats: { finished: 0, inactive: 0, timeout: 0, inprogress: 0 } };                      // 722
			if (fields.complete && fields.complete.condition) {                                                                // 723
				cond = fields.complete.condition;                                                                                 // 724
			} else {                                                                                                           // 725
				cond = 'inprogress';                                                                                              // 726
			}                                                                                                                  // 727
			map[lId][id] = cond;                                                                                               // 728
			map[lId].stats[cond]++;                                                                                            // 729
			locMap[id] = lId;                                                                                                  // 730
			if (!initializing)                                                                                                 // 731
				self.changed('locations', lId, { aggregate: map[lId].stats });                                                    // 732
		},                                                                                                                  // 733
		changed: function (id, fields) {                                                                                    // 734
			if (fields.complete && fields.complete.condition) {                                                                // 735
				var lId = locMap[id];                                                                                             // 736
				var cond = map[lId][id];                                                                                          // 737
				map[lId].stats[cond]--;                                                                                           // 738
				cond = fields.complete.condition;                                                                                 // 739
				map[lId][id] = cond;                                                                                              // 740
				map[lId].stats[cond]++;                                                                                           // 741
				if (!initializing)                                                                                                // 742
					self.changed('locations', lId, { aggregate: map[lId].stats });                                                   // 743
			}                                                                                                                  // 744
		},                                                                                                                  // 745
		removed: function (id) {                                                                                            // 746
			var lId = locMap[id];                                                                                              // 747
			var cond = map[lId][id];                                                                                           // 748
			map[lId].stats[cond]--;                                                                                            // 749
			self.changed('locations', lId, { aggregate: map[lId].stats });                                                     // 750
		}                                                                                                                   // 751
	});                                                                                                                  // 752
                                                                                                                      // 753
	_.each(map, function(value, key, list) {                                                                             // 754
		self.changed('locations', key, { aggregate: value.stats });                                                         // 755
	});                                                                                                                  // 756
	initializing = false;                                                                                                // 757
	self.ready();                                                                                                        // 758
                                                                                                                      // 759
	self.onStop(function() {                                                                                             // 760
		_.each(map, function(value, key, list) {                                                                            // 761
			self.changed('locations', key, { aggregate: undefined });                                                          // 762
		});                                                                                                                 // 763
		handle.stop();                                                                                                      // 764
	});                                                                                                                  // 765
});                                                                                                                   // 766
                                                                                                                      // 767
Meteor.publish('sessions.voip.count', function() {                                                                    // 768
	var self = this;                                                                                                     // 769
	if (!Roles.userIsInRole(self.userId, ['dentist', 'ma'])) {                                                           // 770
		return [];                                                                                                          // 771
	}                                                                                                                    // 772
	enQueueCountsHandle = Counts.publish(this, 'enPatientQueue', Sessions.collection.find({                              // 773
		state: 'voip',                                                                                                      // 774
		'voip.state': 'queued',                                                                                             // 775
		lang: 'en'                                                                                                          // 776
	}, { fields: { _id: true } }), { noReady: true });                                                                   // 777
	esQueueCountsHandle = Counts.publish(this, 'esPatientQueue', Sessions.collection.find({                              // 778
		state: 'voip',                                                                                                      // 779
		'voip.state': 'queued',                                                                                             // 780
		lang: 'es'                                                                                                          // 781
	}, { fields: { _id: true } }), { noReady: true });                                                                   // 782
	//queueCountsHandle = Counts.publish(this, 'patientQueue', Sessions.collection.find({ state: 'voip', 'voip.state': 'queued' }, { fields: { _id: true } }));
	this.onStop(function() {                                                                                             // 784
		//queueCountsHandle.stop();                                                                                         // 785
		enQueueCountsHandle.stop();                                                                                         // 786
		esQueueCountsHandle.stop();                                                                                         // 787
	});                                                                                                                  // 788
	this.ready();                                                                                                        // 789
});                                                                                                                   // 790
                                                                                                                      // 791
Meteor.publish('session', function(sessionId) {                                                                       // 792
	var self = this;                                                                                                     // 793
	var user = Meteor.users.findOne({_id: self.userId}, {                                                                // 794
		fields: {                                                                                                           // 795
			username: true,                                                                                                    // 796
			'trueVault.id': true,                                                                                              // 797
			roles: true                                                                                                        // 798
		}                                                                                                                   // 799
			                                                                                                                   // 800
	});                                                                                                                  // 801
	if (!Roles.userIsInRole(user, ['ma', 'ta'])) {                                                                       // 802
		return [];                                                                                                          // 803
	}                                                                                                                    // 804
	try {                                                                                                                // 805
		check (sessionId, validId);                                                                                         // 806
	} catch (e) {                                                                                                        // 807
		return [];                                                                                                          // 808
	}                                                                                                                    // 809
                                                                                                                      // 810
	var transform = function(doc, user) {                                                                                // 811
		if (Roles.userIsInRole(user, ['ta'])) {                                                                             // 812
			                                                                                                                   // 813
		}                                                                                                                   // 814
		var formDocId, notesDocId, formVaultId, notesVaultId;                                                               // 815
		if (doc.form && doc.form.trueVaultRef) {                                                                            // 816
			var formDocId = doc.form.trueVaultRef.docId;                                                                       // 817
			var formVaultId = doc.form.trueVaultRef.vaultId;                                                                   // 818
		}                                                                                                                   // 819
		if (doc.dentistNotes && doc.dentistNotes.trueVaultRef) {                                                            // 820
			var notesDocId = doc.dentistNotes.trueVaultRef.docId;                                                              // 821
			var notesVaultId = doc.dentistNotes.trueVaultRef.vaultId;                                                          // 822
		}                                                                                                                   // 823
		if (Roles.userIsInRole(user, ['ta'])) {                                                                             // 824
			if (formDocId) {                                                                                                   // 825
				doc.form.exists = true;                                                                                           // 826
				delete doc.form.trueVaultRef;                                                                                     // 827
			}                                                                                                                  // 828
			if (notesDocId) {                                                                                                  // 829
				doc.dentistNotes.exists = true;                                                                                   // 830
				delete doc.dentistNotes.trueVaultRef;                                                                             // 831
			}                                                                                                                  // 832
		} else {                                                                                                            // 833
			try {                                                                                                              // 834
				var result, update;                                                                                               // 835
				if (formDocId && notesDocId && formVaultId === notesVaultId) {                                                    // 836
					result = TrueVault.readTwoDocuments(formVaultId, formDocId, notesDocId, user.trueVault.id);                      // 837
					delete result.docOne.sessionId;                                                                                  // 838
					delete result.docTwo.sessionId;                                                                                  // 839
					result.docOne.at = doc.form.at;                                                                                  // 840
					doc.form = result.docOne;                                                                                        // 841
					result.docTwo.at = doc.dentistNotes.at;                                                                          // 842
					doc.dentistNotes = result.docTwo;                                                                                // 843
					update = {                                                                                                       // 844
						$push: {                                                                                                        // 845
							'form.trueVaultRef.accessLog': {                                                                               // 846
								userId: self.userId,                                                                                          // 847
								transId: result.docOne.transaction_id                                                                         // 848
							},                                                                                                             // 849
							'dentistNotes.trueVaultRef.accessLog': {                                                                       // 850
								userId: self.userId,                                                                                          // 851
								transId: result.docTwo.transaction_id                                                                         // 852
							}                                                                                                              // 853
						}                                                                                                               // 854
					};                                                                                                               // 855
				} else if (formDocId && notesDocId && formVaultId !== notesVaultId) {                                             // 856
					return null;                                                                                                     // 857
				} else if (formDocId) {                                                                                           // 858
					result = TrueVault.readDocument(formVaultId, formDocId, user.trueVault.id);                                      // 859
					delete result.sessionId;                                                                                         // 860
					result.at = doc.form.at;                                                                                         // 861
					doc.form = result;                                                                                               // 862
					update = {                                                                                                       // 863
						$push: {                                                                                                        // 864
							'form.trueVaultRef.accessLog': {                                                                               // 865
								userId: self.userId                                                                                           // 866
							}                                                                                                              // 867
						}                                                                                                               // 868
					};                                                                                                               // 869
				} else if (notesDocId) {                                                                                          // 870
					result = TrueVault.readDocument(notesVaultId, notesDocId, user.trueVault.id);                                    // 871
					delete result.sessionId;                                                                                         // 872
					result.at = doc.dentistNotes.at;                                                                                 // 873
					doc.dentistNotes = result;                                                                                       // 874
					update = {                                                                                                       // 875
						$push: {                                                                                                        // 876
							'dentistNotes.trueVaultRef.accessLog': {                                                                       // 877
								userId: self.userId                                                                                           // 878
							}                                                                                                              // 879
						}                                                                                                               // 880
					};                                                                                                               // 881
				}                                                                                                                 // 882
				Sessions.collections.update({_id: sessionId}, update);                                                            // 883
			} catch (e) {                                                                                                      // 884
				// Something what wrong...                                                                                        // 885
			}                                                                                                                  // 886
		}                                                                                                                   // 887
		return doc;                                                                                                         // 888
	};                                                                                                                   // 889
                                                                                                                      // 890
	var handle = Sessions.collection.find({_id: sessionId}, {                                                            // 891
		fields: {                                                                                                           // 892
			'location.kioskHandle': false,                                                                                     // 893
			'form.trueVaultRef.accessLog': false,                                                                              // 894
			'dentistNotes.trueVaultRef.accessLog': false,                                                                      // 895
			'modifiedAt': false                                                                                                // 896
		}                                                                                                                   // 897
	}).observeChanges({                                                                                                  // 898
		added: function (id, fields) {                                                                                      // 899
			self.added('sessions', id, transform(fields, user));                                                               // 900
		},                                                                                                                  // 901
		changed: function (id, fields) {                                                                                    // 902
			self.changed('sessions', id, transform(fields, user));                                                             // 903
		},                                                                                                                  // 904
		removed: function (id) {                                                                                            // 905
			self.remove('sessions', id);                                                                                       // 906
		}                                                                                                                   // 907
	});                                                                                                                  // 908
	self.ready();                                                                                                        // 909
	self.onStop(function () {                                                                                            // 910
		handle.stop();                                                                                                      // 911
	});                                                                                                                  // 912
});                                                                                                                   // 913
                                                                                                                      // 914
Meteor.publish('session.voip', function(sessionId) {                                                                  // 915
	check(sessionId, String);                                                                                            // 916
	var self = this;                                                                                                     // 917
                                                                                                                      // 918
	var user = Meteor.users.findOne({_id: self.userId}, {                                                                // 919
		fields: {                                                                                                           // 920
			'trueVault.id': true,                                                                                              // 921
			roles: true                                                                                                        // 922
		}                                                                                                                   // 923
	});                                                                                                                  // 924
	if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {                                                                  // 925
		return [];                                                                                                          // 926
	}                                                                                                                    // 927
	try {                                                                                                                // 928
		check(sessionId, validId);                                                                                          // 929
	} catch (e) {                                                                                                        // 930
		return [];                                                                                                          // 931
	}                                                                                                                    // 932
                                                                                                                      // 933
	var transform = function(doc, user) {                                                                                // 934
		var result;                                                                                                         // 935
		try {                                                                                                               // 936
			result = TrueVault.readDocument(doc.form.trueVaultRef.vaultId, doc.form.trueVaultRef.docId, user.trueVault.id);    // 937
			delete result.sessionId;                                                                                           // 938
			result.at = doc.form.at;                                                                                           // 939
			doc.form = result;                                                                                                 // 940
                                                                                                                      // 941
			// At the time of this writing (pi day) TrueVault doesn't return a transaction_id if you read a single document    // 942
			Sessions.update({                                                                                                  // 943
				_id: doc._id                                                                                                      // 944
			}, {                                                                                                               // 945
				$push: {                                                                                                          // 946
					'form.trueVaultRef.accessLog': {                                                                                 // 947
						userId: user._id                                                                                                // 948
					}                                                                                                                // 949
				}                                                                                                                 // 950
			});                                                                                                                // 951
		} catch (e) {                                                                                                       // 952
			                                                                                                                   // 953
		}                                                                                                                   // 954
		return doc;                                                                                                         // 955
	};                                                                                                                   // 956
                                                                                                                      // 957
	var handle = Sessions.collection.find({                                                                              // 958
		_id: sessionId,                                                                                                     // 959
		'dentist.id': self.userId,                                                                                          // 960
		state: 'voip'                                                                                                       // 961
	}, {                                                                                                                 // 962
		fields: {                                                                                                           // 963
			lang: true,                                                                                                        // 964
			'location.kioskHandle': true,                                                                                      // 965
			'form.trueVaultRef.docId': true,                                                                                   // 966
			'form.trueVaultRef.vaultId': true                                                                                  // 967
		}                                                                                                                   // 968
	}).observeChanges({                                                                                                  // 969
		added: function (id, fields) {                                                                                      // 970
			self.added('sessions', id, transform(fields, user));                                                               // 971
		},                                                                                                                  // 972
		changed: function (id, fields) {                                                                                    // 973
			self.changed('sessions', id, transform(fields, user));                                                             // 974
		},                                                                                                                  // 975
		removed: function (id) {                                                                                            // 976
			self.removed('sessions', id);                                                                                      // 977
		}                                                                                                                   // 978
	});                                                                                                                  // 979
	self.ready();                                                                                                        // 980
                                                                                                                      // 981
	self.onStop(function () {                                                                                            // 982
		handle.stop();                                                                                                      // 983
	});                                                                                                                  // 984
});                                                                                                                   // 985
                                                                                                                      // 986
SyncedCron.add({                                                                                                      // 987
	name: 'Timeout sessions',                                                                                            // 988
	schedule: function(parser) {                                                                                         // 989
		return parser.text('every 2 hour');                                                                                 // 990
	},                                                                                                                   // 991
	job: function() {                                                                                                    // 992
		var date = new Date;                                                                                                // 993
		date.setHours(date.getHours() - 6);                                                                                 // 994
		Sessions.collection.update({                                                                                        // 995
			createdAt: { $lt: date },                                                                                          // 996
			state: { $ne: 'complete' }                                                                                         // 997
		}, {                                                                                                                // 998
			$set: {                                                                                                            // 999
				state: 'complete',                                                                                                // 1000
				'complete.condition': 'timeout'                                                                                   // 1001
			}                                                                                                                  // 1002
		}, {                                                                                                                // 1003
			multi: true                                                                                                        // 1004
		});                                                                                                                 // 1005
	}                                                                                                                    // 1006
});                                                                                                                   // 1007
                                                                                                                      // 1008
SyncedCron.add({                                                                                                      // 1009
	name: 'Get SFax Results',                                                                                            // 1010
	schedule: function(parser) {                                                                                         // 1011
		return parser.text('every 1 hour');                                                                                 // 1012
	},                                                                                                                   // 1013
	job: function() {                                                                                                    // 1014
		var items = SFax.receiveOutboundFax();                                                                              // 1015
		_.each(items, function (item) {                                                                                     // 1016
			if (item.TrackingCode) {                                                                                           // 1017
				var state = (item.IsSuccess && item.FaxSuccess === '1') ? 'delivered' : 'failed';                                 // 1018
				Sessions.collection.update({                                                                                      // 1019
					_id: item.TrackingCode                                                                                           // 1020
				}, {                                                                                                              // 1021
					$set: {                                                                                                          // 1022
						'fax.state': state                                                                                              // 1023
					},                                                                                                               // 1024
					$push: {                                                                                                         // 1025
						'fax.history': {                                                                                                // 1026
							state: state,                                                                                                  // 1027
							resultCode: item.ResultCode,                                                                                   // 1028
							errorCode: item.ErrorCode,                                                                                     // 1029
							resultMessage: item.ResultMessage,                                                                             // 1030
							faxId: item.FaxId,                                                                                             // 1031
							pages: item.Pages,                                                                                             // 1032
							attempts: item.Attempts,                                                                                       // 1033
							outboundFaxId: item.OutboundFaxId                                                                              // 1034
						}                                                                                                               // 1035
					}                                                                                                                // 1036
				});                                                                                                               // 1037
			}                                                                                                                  // 1038
		});                                                                                                                 // 1039
	}                                                                                                                    // 1040
});                                                                                                                   // 1041
                                                                                                                      // 1042
Meteor.startup(function () {                                                                                          // 1043
	var failFax = function(id, reason) {                                                                                 // 1044
		Sessions.collection.update({_id: id}, {                                                                             // 1045
			$set: {                                                                                                            // 1046
				'fax.state': 'failed'                                                                                             // 1047
			},                                                                                                                 // 1048
			$push: {                                                                                                           // 1049
				'fax.history': {                                                                                                  // 1050
					'state': 'failed',                                                                                               // 1051
					'reason': reason                                                                                                 // 1052
				}                                                                                                                 // 1053
			}                                                                                                                  // 1054
		});                                                                                                                 // 1055
	};                                                                                                                   // 1056
                                                                                                                      // 1057
	// Quick and dirty                                                                                                   // 1058
	var trans = {                                                                                                        // 1059
		en: {                                                                                                               // 1060
			form: {                                                                                                            // 1061
				header: 'Dentist is In Session Report',                                                                           // 1062
				patientInfo: {                                                                                                    // 1063
					header: 'Patient Information',                                                                                   // 1064
					name: 'Name: ',                                                                                                  // 1065
					address: 'Address: ',                                                                                            // 1066
					email: 'E-mail: ',                                                                                               // 1067
					phone: 'Phone Number: ',                                                                                         // 1068
					dob: 'Date of Birth: ',                                                                                          // 1069
					sex: 'Sex: ',                                                                                                    // 1070
					payment: 'Payment Method: ',                                                                                     // 1071
					M: 'Male',                                                                                                       // 1072
					F: 'Female',                                                                                                     // 1073
					Insurance: 'Insurance',                                                                                          // 1074
					Medicaid: 'Medicaid',                                                                                            // 1075
					Self: 'Self Pay'                                                                                                 // 1076
				},                                                                                                                // 1077
				medicalInfo: {                                                                                                    // 1078
					header: 'Patient Medical Information',                                                                           // 1079
					conditions: 'Medical Conditions: ',                                                                              // 1080
					medicalConditionsHivAids: 'HIV/AIDS',                                                                            // 1081
					medicalConditionsPregnant: 'Pregnant/Trying to get Pregnant',                                                    // 1082
					medicalConditionsContraceptives: 'Taking Contraceptives',                                                        // 1083
					medicalConditionsCancer: 'Cancer',                                                                               // 1084
					medicalConditionsDiabetes: 'Diabetes',                                                                           // 1085
					medicalConditionsHeart: 'Heart Condition',                                                                       // 1086
					medicalConditionsBlood: 'Blood Pressure Issues',                                                                 // 1087
					medicalConditionsKidneyLiver: 'Kidney or Liver Issues',                                                          // 1088
					medicalConditionsStomach: 'Stomach Problems',                                                                    // 1089
					medicalConditionsBleeding: 'Bleeding Problems',                                                                  // 1090
					medicalConditionsPsychiatric: 'Psychiatric Care',                                                                // 1091
					medicalConditionsRadiation: 'Radiation Treatment to the Head and Neck',                                          // 1092
					medications: 'Current Medications: ',                                                                            // 1093
					allergies: 'Allergies: ',                                                                                        // 1094
					medicalAllergiesAspirin: 'Aspirin',                                                                              // 1095
					medicalAllergiesCodeine: 'Codeine',                                                                              // 1096
					medicalAllergiesPenicillin: 'Penicillin',                                                                        // 1097
					medicalAllergiesSulfa: 'Sulfa Drugs',                                                                            // 1098
					none: 'None'                                                                                                     // 1099
				},                                                                                                                // 1100
				dentalComplaint: {                                                                                                // 1101
					header: 'Patient Dental Complaint',                                                                              // 1102
					pain: 'Area of Pain: ',                                                                                          // 1103
					duration: 'Duration of Pain: ',                                                                                  // 1104
					swelling: 'Sweeling Present: ',                                                                                  // 1105
					Y: 'Yes',                                                                                                        // 1106
					N: 'No',                                                                                                         // 1107
					severity: 'Severity of Pain (1-10): '                                                                            // 1108
				},                                                                                                                // 1109
				dentistNotes: {                                                                                                   // 1110
					header: 'Dentist Notes',                                                                                         // 1111
					impressions: 'Clinical Impressions: ',                                                                           // 1112
					recommendations: 'Recommendations: ',                                                                            // 1113
					prescriptions: 'Recommended Prescriptions: '                                                                     // 1114
				}                                                                                                                 // 1115
			},                                                                                                                 // 1116
			privacy: {                                                                                                         // 1117
				title: 'Notice of Privacy Practices',                                                                             // 1118
				description: 'This notice describes how Medical/Protected Health Information about you may be used and Disclosed and how you can get access to this Information. Please review it carefully.',
				summary: 'Summary:',                                                                                              // 1120
				p1: 'By law, we are required to provide you with our Notice of Privacy Practices. (NPP)',                         // 1121
				p2: 'This notice describes how you medical information may be used and disclosed by us.',                         // 1122
				p3: 'It also tells you how you can obtain access to this information.',                                           // 1123
				p4: 'As a patient, you have the following rights:',                                                               // 1124
				item1: 'The right to inspect and copy your information;',                                                         // 1125
				item2: 'The right to request corrections to your information;',                                                   // 1126
				item3: 'The right to request that your information be restricted;',                                               // 1127
				item4: 'The right to request confidential communications;',                                                       // 1128
				item5: 'The right to report of disclosures of your information, and',                                             // 1129
				item6: 'The right to paper copy of this notice.',                                                                 // 1130
				p5: 'We want to assure you that your medical/protected health information is secure with us. This Notice contains information about how we will insure that your information remains private.',
				p6: 'If you have any questions about this notice, the name and phone number of our contact person is listed on this page.',
				effective: 'Effective date of this notice: June 1, 2015',                                                         // 1133
				contact: 'Contact person: Michael Sigler',                                                                        // 1134
				phone: 'Phone number: 816-550-2615',                                                                              // 1135
				acknowledgement: 'Acknowledgment of Notice of Privacy practices:',                                                // 1136
				p7: 'By checking the box, I hereby acknowledge that I have received a copy of the Notice of Privacy Practices. I understand that if I have questions or complaints about my privacy rights I can Contact the person listed above. I further understand that The Dentist Is IN will offer the updates to this Notice of Privacy Practices should it be amended, modified or changed in any way.'
			},                                                                                                                 // 1138
			consent: {                                                                                                         // 1139
				title: 'Informed Consent for Telemedicine Consultation Services',                                                 // 1140
				h1: 'Introduction',                                                                                               // 1141
				p1: 'Telemedicine involves the use of electronic communications to enable health care providers at different locations to share individual patient medical information for the purpose of improving patient care. Providers may include primary care practitioners, specialists, and/or subspecialists. The information may be used for diagnosis, therapy, follow-up and/or education, and may include any of the following:',
				i11: 'Patient medical records',                                                                                   // 1143
				i12: 'Medical images',                                                                                            // 1144
				i13: 'Live two-way audio and video',                                                                              // 1145
				i14: 'Output data from medical devices and sound and video files',                                                // 1146
				p2: 'Electronic systems used will incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data and will include measures to safeguard the data and to ensure its integrity against intentional or unintentional corruption.',
				h2: 'Expected Benefits:',                                                                                         // 1148
				i21: 'Improved access to medical care by enabling a patient to remain at a remote site while the dentist consults with healthcare practitioners at distant/other sites.',
				i22: 'More efficient medical evaluation and management.',                                                         // 1150
				i23: 'Obtaining expertise of a distant specialist.',                                                              // 1151
				h3: 'Possible Risks:',                                                                                            // 1152
				i31: 'In rare cases, information transmitted may not be sufficient (e.g. poor resolution of images) to allow for appropriate medical decision making by the nurse and consultant(s);',
				i32: 'Delays in medical evaluation and treatment could occur due to deficiencies or failures of the equipment;',  // 1154
				i33: 'In very rare instances, security protocols could fail, causing a breach of privacy of personal medical information;',
				i34: 'In rare cases, a lack of access to complete medical records may result in adverse drug interactions or allergic reactions or other judgment errors;',
				h4: 'By signing this form, I understand the following:',                                                          // 1157
				i41: 'I understand that the laws that protect privacy and the confidentiality of medical information also apply to telemedicine, and that no information obtained in the use of telemedicine which identifies me will be disclosed to researchers or other entities without my consent.',
				i42: 'I understand that I have the right to withhold or withdraw my consent to the use of telemedicine in the course of my care at any time, without affecting my right to future care or treatment.',
				i43: 'I understand that I have the right to inspect all information obtained and recorded in the course of a telemedicine interaction, and may receive copies of this information for a reasonable fee.',
				i44: 'I understand that a variety of alternative methods of medical care may be available to me, and that I may choose one or more of these at any time. My nurse has explained the alternatives to my satisfaction.',
				i45: 'I understand that telemedicine may involve electronic communication of my personal medical information to other medical practitioners who may be located in other areas, including out of state.',
				i46: 'I understand that it is my duty to inform my doctor of electronic interactions regarding my care that I may have with other healthcare providers.',
				i47: 'I understand that I may expect the anticipated benefits from the use of telemedicine in my care, but that no results can be guaranteed or assured.',
				h5: 'Patient Consent To The Use of Telemedicine',                                                                 // 1165
				p3: 'I have read and understand the information provided above regarding telemedicine, have discussed it with my nurse or such assistants as may be designated, and all of my questions have been answered to my satisfaction. I hereby give my informed consent for the use of telemedicine in my medical care.',
				p4: 'I hereby authorize The Dentist Is IN (consultant) to use telemedicine in the course of my dental consultation.'
			}                                                                                                                  // 1168
		},                                                                                                                  // 1169
		es: {                                                                                                               // 1170
			form: {                                                                                                            // 1171
				header: 'Dentista es en informe del período de sesiones',                                                         // 1172
				patientInfo: {                                                                                                    // 1173
					header: 'Información para el paciente',                                                                          // 1174
					name: 'Nombre: ',                                                                                                // 1175
					address: 'Dirección: ',                                                                                          // 1176
					email: 'Correo electrónico: ',                                                                                   // 1177
					phone: 'Número de teléfono: ',                                                                                   // 1178
					dob: 'Fecha de nacimiento: ',                                                                                    // 1179
					sex: 'Género: ',                                                                                                 // 1180
					payment: 'Método de pago: ',                                                                                     // 1181
					M: 'Hombre',                                                                                                     // 1182
					F: 'Mujer',                                                                                                      // 1183
					Insurance: 'Seguro dental',                                                                                      // 1184
					Medicaid: 'Medicaid',                                                                                            // 1185
					Self: 'Pago del uno mismo'                                                                                       // 1186
				},                                                                                                                // 1187
				medicalInfo: {                                                                                                    // 1188
					header: 'Información médica del paciente',                                                                       // 1189
					conditions: 'Condiciones médicas: ',                                                                             // 1190
					medicalConditionsHivAids: 'SIDA/HIV Positivo',                                                                   // 1191
					medicalConditionsPregnant: 'Embarazada/tratando de quedar embarazada',                                           // 1192
					medicalConditionsContraceptives: 'Toma anticonceptivos orales',                                                  // 1193
					medicalConditionsCancer: 'Cancer',                                                                               // 1194
					medicalConditionsDiabetes: 'Diabetes',                                                                           // 1195
					medicalConditionsHeart: 'Problemsa/Enfermedad del corazon',                                                      // 1196
					medicalConditionsBlood: 'Presion arterial alta',                                                                 // 1197
					medicalConditionsKidneyLiver: 'Problemas de los ninones/higado',                                                 // 1198
					medicalConditionsStomach: 'Enfermedad estomacal/intestinal',                                                     // 1199
					medicalConditionsBleeding: 'Enermedad Arterial',                                                                 // 1200
					medicalConditionsPsychiatric: 'Atencion Psiquiatrica',                                                           // 1201
					medicalConditionsRadiation: 'Tratamiento con radicion de cabeza',                                                // 1202
					medications: 'Tomando Medicamentos: ',                                                                           // 1203
					allergies: 'Alergicos: ',                                                                                        // 1204
					medicalAllergiesAspirin: 'Aspirina',                                                                             // 1205
					medicalAllergiesCodeine: 'Codenia',                                                                              // 1206
					medicalAllergiesPenicillin: 'Penicilina',                                                                        // 1207
					medicalAllergiesSulfa: 'Sulfamida',                                                                              // 1208
					none: 'Nada'                                                                                                     // 1209
				},                                                                                                                // 1210
				dentalComplaint: {                                                                                                // 1211
					header: 'Queja paciente Dental',                                                                                 // 1212
					pain: 'Área de dolor: ',                                                                                         // 1213
					duration: 'Duración del dolor: ',                                                                                // 1214
					swelling: 'Presente hinchazón: ',                                                                                // 1215
					Y: 'Sí',                                                                                                         // 1216
					N: 'No',                                                                                                         // 1217
					severity: 'Intensidad del dolor (1-10): '                                                                        // 1218
				},                                                                                                                // 1219
				dentistNotes: {                                                                                                   // 1220
					header: 'Dentista notas',                                                                                        // 1221
					impressions: 'Impresiones clínicas: ',                                                                           // 1222
					recommendations: 'Recomendaciones: ',                                                                            // 1223
					prescriptions: 'Recetas recomendadas: '                                                                          // 1224
				}                                                                                                                 // 1225
			},                                                                                                                 // 1226
			privacy: {                                                                                                         // 1227
				title: 'viso de Prácticas Privadas',                                                                              // 1228
				description: 'Este Aviso Describe de Qué Modo Su Informatición Médica/de Salud Protegida Puede Ser untilizada Y Divulgada Y Cómo Puede Acceder A Dicha Informatición Revíselo Atentamente',
				summary: 'Resumen:',                                                                                              // 1230
				p1: 'La ley nos exige suministrar a los pacentes el Avíso de Normas de Confidencialidad de',                      // 1231
				p2: 'Nuestro estalecimiento, qe describe cómo puede utilizarse y divulgarse su información',                      // 1232
				p3: 'Médica y establece las fromas en que el paciente pude accede a esta información.',                           // 1233
				p4: 'El paciente goza de los siguientes derechos:',                                                               // 1234
				item1: 'Derecho á accede a la información y realizer copias.',                                                    // 1235
				item2: 'Derecho á solicitor correcciones',                                                                        // 1236
				item3: 'Derecho a solicitor restriciones.',                                                                       // 1237
				item4: 'Derecho a solicitor confidenicaidad en las communications.',                                              // 1238
				item5: 'Derecho a solicitor un detaile de la información divulgada , y',                                          // 1239
				item6: 'Derecho a recibír una copia impressa de ester aviso.',                                                    // 1240
				p5: 'Queremos asegurar que su información de salud médica/protegido es segura con nosotros. Este aviso contiene información acerca de cómo nos asegurará que su información se mantenga privada.',
				p6: 'Si usted tiene alguna pregunta acerca de este aviso, el nombre y número de teléfono de nuestra persona de contacto aparece en esta página.',
				effective: 'Fecha de vigencia de este aviso: de 01 de junio de 2015',                                             // 1243
				contact: 'Persona de contacto: Leah Sigler',                                                                      // 1244
				phone: 'Número de teléfono: 8169312191',                                                                          // 1245
				acknowledgement: 'Reconocimiento del aviso de privacidad',                                                        // 1246
				p7: 'Por la presente reconozco que he recibido una copia de la Aviso de prácticas de privacidad. Yo entiendo que si tengo preguntas o quejas acerca de mi derechos de privacidad que puedo contactar a la persona indicada anteriormente. Además, entiendo que esta práctica ofrecerá las actualizaciones a este aviso de prácticas de privacidad si ser modificado, modificado o cambiado en de cualquier manera.'
			},                                                                                                                 // 1248
			consent: {                                                                                                         // 1249
				title: 'Autorización para recibir Servicios o Consulta de Telemedicine',                                          // 1250
				h1: 'Introducción',                                                                                               // 1251
				p1: 'Telemedicine involucra el uso de comunicación electrónica para acercar a los proveedores del cuidado de la salud ubicados en diferentes lugares, para compartir información médica de un paciente con el objetivo de mejorar su atención. Los proveedores pueden incluir médicos generales, especialistas o subespecialistas. La información podrá ser usada para diagnóstico, terapia, seguimiento y/o educación, y podrá incluir cualquiera de los siguientes conceptos:',
				i11: 'Historia clínica del paciente',                                                                             // 1253
				i12: 'Imágenes médicas',                                                                                          // 1254
				i13: 'Audio y video en vivo',                                                                                     // 1255
				i14: 'Información producida por dispositivos médicos y archivos de audio y video',                                // 1256
				p2: 'Los sistemas electrónicos utilizados contendrán protocolos de seguridad para proteger la confidencialidad del paciente y sus imágenes, así como incluir medidas para salvaguardar la información y cuidar su integridad en contra de cualquier daño, con o sin intención.',
				h2: 'Beneficios:',                                                                                                // 1258
				i21: 'Mejorar el acceso a la asistencia médica, permitiéndole al paciente dirigirse a un sitio remoto mientras el dentista consulta con otros médicos que se encuentran en distintos lugares.',
				i22: 'Evaluación y manejo médico eficiente',                                                                      // 1260
				i23: 'Obtener asesoría de especialistas a distancia',                                                             // 1261
				h3: 'Riesgos:',                                                                                                   // 1262
				i31: 'En contadas ocasiones, la información transmitida puede ser insuficiente (e.g. mala calidad de las imágenes) y derivar en una mala decisión de la enfermera o el médico;',
				i32: 'Podría ocurrir algún retraso en la evaluación y tratamiento médico debido a fallas o deficiencias del equipo;',
				i33: 'Rara vez pueden fallar los protocolos de seguridad, causando una violación a la información privada de los pacientes;',
				i34: 'En algunas ocasiones, por falta de acceso a la historia clínica completa, podría haber errores en la prescripción de fármacos y causar reacciones alérgicas o algún otro error;',
				h4: 'Al firmar esta forma entiendo lo siguiente:',                                                                // 1267
				i41: 'Entiendo que las leyes que protegen la privacidad y confidencialidad de la información médica también aplican para Telemedicine y que ninguna información de Telemedicine que me identifique podrá ser divulgada a los investigadores u otras agencias sin mi consentimiento.',
				i42: 'Entiendo que tengo derecho de otorgar o no mi consentimiento al uso de Telemedicine durante mi atención medica en cualquier momento, sin que eso afecte mi derecho a obtener atención o tratamiento en el futuro.',
				i43: 'Entiendo que tengo derecho a examinar toda la información obtenida y grabada durante la interacción con Telemedicine y puedo obtener copias de esta a un costo razonable.',
				i44: 'Entiendo que hay una variedad de métodos accesibles para mí y que puedo escoger uno o varios en cualquier momento. La enfermera me ha explicado las opciones a mi entera satisfacción. ',
				i45: 'Entiendo que Telemedicine puede enviar mi información médica por medios electrónicos a otros profesionales que pueden localizarse en diferentes áreas, incluso fuera del estado.',
				i46: 'Entiendo que es mi obligación informar a mi doctor sobre interacciones electrónicas que haya tenido en el pasado con otros doctores, relacionadas con mi salud/cuidado.',
				i47: 'Entiendo que espero beneficios anticipados en mi salud por el uso de Telemedicine, pero ningún resultado puede garantizarse o asegurarse.',
				h5: 'Consentimiento del Paciente para el uso de Telemedicine',                                                    // 1275
				p3: 'He leído y entendido la información arriba mencionada respecto a Telemedicine. La he revisado con la enfermera o los asistentes designados y todas mis preguntas han sido respondidas a mi entera satisfacción. Doy mi consentimiento a Telemedicine para mi cuidado médico.',
				p4: 'Doy mi autorización a The Dentist Is In (consultor) para utilizar Telemedicine durante mis consultas dentales.'
			}                                                                                                                  // 1278
		}                                                                                                                   // 1279
	};                                                                                                                   // 1280
                                                                                                                      // 1281
	var makeReport = function(fax, lang, form, notes) {                                                                  // 1282
		var table = trans[lang].form;                                                                                       // 1283
		fax.fontSize(20);                                                                                                   // 1284
		fax.text(table.header, { align: 'center' });                                                                        // 1285
		fax.fontSize(12);                                                                                                   // 1286
		fax.text(moment().locale(lang).format('LLLL'), { align: 'center' });                                                // 1287
		var patientInfo = table.patientInfo;                                                                                // 1288
		fax.text(patientInfo.header, { underline: true });                                                                  // 1289
		var name = form.patientNameFirst;                                                                                   // 1290
		if (form.patientNamePreferred) name += ' (' + form.patientNamePreferred + ')';                                      // 1291
		if (form.patientNameMiddle) name += ' ' + form.patientNameMiddle;                                                   // 1292
		name += ' ' + form.patientNameLast;                                                                                 // 1293
		fax.text(patientInfo.name + name);                                                                                  // 1294
		fax.text(patientInfo.address);                                                                                      // 1295
		fax.text(form.patientAddressOne, { indent: 30 });                                                                   // 1296
		if (form.patientAddressTwo) fax.text(form.patientAddressTwo, { indent: 30 });                                       // 1297
		fax.text(form.patientAddressCity + ', ' + form.patientAddressState + ' ' + form.patientAddressZip, { indent: 30 }); // 1298
		if (form.patientContactEmail) fax.text(patientInfo.email + form.patientContactEmail);                               // 1299
		if (form.patientContactPhone) fax.text(patientInfo.phone + form.patientContactPhone);                               // 1300
		//fax.text(patientInfo.dob + moment(form.patientDobDob).locale(lang).format('LL'));                                 // 1301
		fax.text(patientInfo.dob + form.patientDobDob);                                                                     // 1302
		fax.text(patientInfo.sex + patientInfo[form.patientSexSex]);                                                        // 1303
		fax.text(patientInfo.payment + patientInfo[form.patientInsuranceInsurance]);                                        // 1304
		fax.moveDown();                                                                                                     // 1305
                                                                                                                      // 1306
		var medicalInfo = table.medicalInfo;                                                                                // 1307
		fax.text(medicalInfo.header, { underline: true });                                                                  // 1308
		var re = /^medicalCondition/;                                                                                       // 1309
		var list = _.reduce(form, function(memo, val, key) {                                                                // 1310
			if (re.test(key) && val) {                                                                                         // 1311
				if (memo === '') return medicalInfo[key];                                                                         // 1312
				else return memo + ', ' + medicalInfo[key];                                                                       // 1313
			} else return memo;                                                                                                // 1314
		}, '');                                                                                                             // 1315
		if (list === '') list = medicalInfo.none;                                                                           // 1316
		fax.text(medicalInfo.conditions + list);                                                                            // 1317
		var medications = (!form.medicalMedications || form.medicalMedications === '') ? medicalInfo.none : form.medicalMedications;
		fax.text(medicalInfo.medications + medications);                                                                    // 1319
		re = /^medicalAllergies/;                                                                                           // 1320
		list = _.reduce(form, function (memo, val, key) {                                                                   // 1321
			if (re.test(key) && key !== 'medicalAllergiesOther' && val) {                                                      // 1322
				if (memo === '') return medicalInfo[key];                                                                         // 1323
				else return memo + ', ' + medicalInfo[key];                                                                       // 1324
			} else return memo;                                                                                                // 1325
		}, '');                                                                                                             // 1326
		if (form.medicalAllergiesOther) list += ', ' + form.medicalAllergiesOther;                                          // 1327
		if (list === '') list = medicalInfo.none;                                                                           // 1328
		fax.text(medicalInfo.allergies + list);                                                                             // 1329
		fax.moveDown();                                                                                                     // 1330
                                                                                                                      // 1331
		var dentalComplaint = table.dentalComplaint;                                                                        // 1332
		fax.text(dentalComplaint.header, { underline: true });                                                              // 1333
		fax.text(dentalComplaint.pain + form.dentalPain);                                                                   // 1334
		fax.text(dentalComplaint.duration + form.dentalDuration);                                                           // 1335
		fax.text(dentalComplaint.swelling + dentalComplaint[form.dentalSwelling]);                                          // 1336
		fax.text(dentalComplaint.severity + form.dentalSeverity);                                                           // 1337
		fax.moveDown();                                                                                                     // 1338
                                                                                                                      // 1339
		var dentistNotes = table.dentistNotes;                                                                              // 1340
		fax.text(dentistNotes.header, { underline: true });                                                                 // 1341
		fax.text(dentistNotes.impressions);                                                                                 // 1342
		fax.text(notes.clinicalImpression, { indent: 30 });                                                                 // 1343
		fax.text(dentistNotes.recommendations);                                                                             // 1344
		fax.text(notes.recommendation, { indent: 30 });                                                                     // 1345
		fax.text(dentistNotes.prescriptions);                                                                               // 1346
		fax.text(notes.recommendedPrescriptions, { indent: 30 });                                                           // 1347
	};                                                                                                                   // 1348
                                                                                                                      // 1349
	var makePrivacy = function(fax, lang) {                                                                              // 1350
		var table = trans[lang].privacy;                                                                                    // 1351
		fax.fontSize(20);                                                                                                   // 1352
		fax.text(table.title, { align: 'center' });                                                                         // 1353
		fax.fontSize(12);                                                                                                   // 1354
		fax.text(table.description, { align: 'center' });                                                                   // 1355
		fax.moveDown();                                                                                                     // 1356
                                                                                                                      // 1357
		fax.text(table.summary, { underline: true });                                                                       // 1358
		fax.text(table.p1);                                                                                                 // 1359
		fax.text(table.p2);                                                                                                 // 1360
		fax.text(table.p3);                                                                                                 // 1361
		fax.text(table.p4);                                                                                                 // 1362
		fax.text('\u2022 ' + table.item1, { indent: 30 });                                                                  // 1363
		fax.text('\u2022 ' + table.item2, { indent: 30 });                                                                  // 1364
		fax.text('\u2022 ' + table.item3, { indent: 30 });                                                                  // 1365
		fax.text('\u2022 ' + table.item4, { indent: 30 });                                                                  // 1366
		fax.text('\u2022 ' + table.item5, { indent: 30 });                                                                  // 1367
		fax.text('\u2022 ' + table.item6, { indent: 30 });                                                                  // 1368
		fax.moveDown();                                                                                                     // 1369
                                                                                                                      // 1370
		fax.text(table.p5);                                                                                                 // 1371
		fax.text(table.p6);                                                                                                 // 1372
		fax.text(table.effective);                                                                                          // 1373
		fax.text(table.contact);                                                                                            // 1374
		fax.text(table.phone);                                                                                              // 1375
		fax.moveDown();                                                                                                     // 1376
                                                                                                                      // 1377
		fax.fontSize(20);                                                                                                   // 1378
		fax.text(table.acknowledgement, { align: 'center' });                                                               // 1379
		fax.fontSize(12);                                                                                                   // 1380
		fax.text(table.p7);                                                                                                 // 1381
	};                                                                                                                   // 1382
                                                                                                                      // 1383
	var makeConsent = function(fax, lang) {                                                                              // 1384
		var table = trans[lang].consent;                                                                                    // 1385
		fax.fontSize(20);                                                                                                   // 1386
		fax.text(table.title, { align: 'center' });                                                                         // 1387
		fax.moveDown();                                                                                                     // 1388
                                                                                                                      // 1389
		fax.fontSize(12);                                                                                                   // 1390
		fax.text(table.h1, { underline: true });                                                                            // 1391
		fax.text(table.p1);                                                                                                 // 1392
		fax.text('\u2022 ' + table.i11, { indent: 30 });                                                                    // 1393
		fax.text('\u2022 ' + table.i12, { indent: 30 });                                                                    // 1394
		fax.text('\u2022 ' + table.i13, { indent: 30 });                                                                    // 1395
		fax.text('\u2022 ' + table.i14, { indent: 30 });                                                                    // 1396
		fax.text(table.p2);                                                                                                 // 1397
		fax.moveDown();                                                                                                     // 1398
                                                                                                                      // 1399
		fax.text(table.h2, { underline: true });                                                                            // 1400
		fax.text('\u2022 ' + table.i21, { indent: 30 });                                                                    // 1401
		fax.text('\u2022 ' + table.i22, { indent: 30 });                                                                    // 1402
		fax.text('\u2022 ' + table.i23, { indent: 30 });                                                                    // 1403
		fax.moveDown();                                                                                                     // 1404
                                                                                                                      // 1405
		fax.text(table.h3, { underline: true });                                                                            // 1406
		fax.text('\u2022 ' + table.i31, { indent: 30 });                                                                    // 1407
		fax.text('\u2022 ' + table.i32, { indent: 30 });                                                                    // 1408
		fax.text('\u2022 ' + table.i33, { indent: 30 });                                                                    // 1409
		fax.text('\u2022 ' + table.i34, { indent: 30 });                                                                    // 1410
		fax.moveDown();                                                                                                     // 1411
                                                                                                                      // 1412
		fax.text(table.h4, { underline: true });                                                                            // 1413
		fax.text('1. ' + table.i41, { indent: 30 });                                                                        // 1414
		fax.text('2. ' + table.i42, { indent: 30 });                                                                        // 1415
		fax.text('3. ' + table.i43, { indent: 30 });                                                                        // 1416
		fax.text('4. ' + table.i44, { indent: 30 });                                                                        // 1417
		fax.text('5. ' + table.i45, { indent: 30 });                                                                        // 1418
		fax.text('6. ' + table.i46, { indent: 30 });                                                                        // 1419
		fax.text('7. ' + table.i47, { indent: 30 });                                                                        // 1420
		fax.moveDown();                                                                                                     // 1421
                                                                                                                      // 1422
		fax.fontSize(20);                                                                                                   // 1423
		fax.text(table.h5, { align: 'center' });                                                                            // 1424
		fax.fontSize(12);                                                                                                   // 1425
		fax.text(table.p3);                                                                                                 // 1426
		fax.text(table.p4);                                                                                                 // 1427
	};                                                                                                                   // 1428
                                                                                                                      // 1429
	var getFaxBuffer = function(formDoc, notesDoc, lang, callback) {                                                     // 1430
		var buffer = new Buffer(0);                                                                                         // 1431
		var fax = new PDFDocument();                                                                                        // 1432
                                                                                                                      // 1433
		fax.on('readable', function() {                                                                                     // 1434
			buffer = Buffer.concat([buffer, fax.read()]);                                                                      // 1435
		});                                                                                                                 // 1436
                                                                                                                      // 1437
		fax.on('error', function(err) {                                                                                     // 1438
			callback(err, null);                                                                                               // 1439
		});                                                                                                                 // 1440
                                                                                                                      // 1441
		fax.on('end', function() {                                                                                          // 1442
			callback(null, buffer);                                                                                            // 1443
		});                                                                                                                 // 1444
                                                                                                                      // 1445
		makeReport(fax, 'en', formDoc, notesDoc);                                                                           // 1446
		fax.addPage();                                                                                                      // 1447
		makePrivacy(fax, 'en');                                                                                             // 1448
		fax.addPage();                                                                                                      // 1449
		makeConsent(fax, 'en');                                                                                             // 1450
		fax.addPage();                                                                                                      // 1451
		makeReport(fax, lang, formDoc, notesDoc);                                                                           // 1452
		fax.addPage();                                                                                                      // 1453
		makePrivacy(fax, lang);                                                                                             // 1454
		fax.addPage();                                                                                                      // 1455
		makeConsent(fax, lang);                                                                                             // 1456
		fax.end();                                                                                                          // 1457
/**                                                                                                                   // 1458
		fax.text('Dentist is In Session Reporrt', { align: 'center' });                                                     // 1459
		fax.text(new Date(), { align: 'center' });                                                                          // 1460
		fax.text('Patient Information', { underline: true });                                                               // 1461
		var name = formDoc.patientNameFirst;                                                                                // 1462
		if (formDoc.patientNamePreferred) name += ' (' + formDoc.patientNamePreferred + ')';                                // 1463
		if (formDoc.patientNameMiddle) name += ' ' + formDoc.patientNameMiddle;                                             // 1464
		name += ' ' + formDoc.patientNameLast;                                                                              // 1465
		fax.text('Name: ' + name);                                                                                          // 1466
		fax.text('Address:');                                                                                               // 1467
		fax.text('         ' + formDoc.patientAddressOne);                                                                  // 1468
		if (formDoc.patientAddressTwo) fax.text('         ' + formDoc.patientAddressTwo);                                   // 1469
		fax.text('         ' + formDoc.patientAddressCity + ', ' + formDoc.patientAddressState + ' ' + formDoc.patientAddressZip);
		if (formDoc.patientContactEmail) fax.text('E-mail: ' + formDoc.patientContactEmail);                                // 1471
		if (formDoc.patientContactPhone) fax.text('Phone Number: ' + formDoc.patientContactPhone);                          // 1472
		fax.text('Date of Birth: ' + moment(formDoc.patientDobDob).format('MM-DD-YYYY'));                                   // 1473
		var sex = (formDoc.patientSexSex === 'F') ? 'Female' : 'Male';                                                      // 1474
		fax.text('Sex: ' + sex);                                                                                            // 1475
		var insurance = (formDoc.patientInsuranceInsurance === 'Self') ? 'Self Pay' : formDoc.patientInsuranceInsurance;    // 1476
		fax.text('Payment Method: ' + insurance);                                                                           // 1477
		fax.moveDown();                                                                                                     // 1478
		fax.text('Patient Medical Information', { underline: true });                                                       // 1479
		var table = {                                                                                                       // 1480
			medicalConditionsHivAids: 'HIV/AIDS',                                                                              // 1481
			medicalConditionsPregnant: 'Pregnant/Trying to get Pregnant',                                                      // 1482
			medicalConditionsContraceptives: 'Taking Contraceptives',                                                          // 1483
			medicalConditionsCancer: 'Cancer',                                                                                 // 1484
			medicalConditionsDiabetes: 'Diabetes',                                                                             // 1485
			medicalConditionsHeart: 'Heart Condition',                                                                         // 1486
			medicalConditionsBlood: 'Blood Pressure Issues',                                                                   // 1487
			medicalConditionsKidneyLiver: 'Kidney or Liver Issues',                                                            // 1488
			medicalConditionsStomach: 'Stomach Problems',                                                                      // 1489
			medicalConditionsBleeding: 'Bleeding Problems',                                                                    // 1490
			medicalConditionsPsychiatric: 'Psychiatric Care',                                                                  // 1491
			medicalConditionsRadiation: 'Radiation Treatment to the Head and Neck',                                            // 1492
		};                                                                                                                  // 1493
		var re = /^medicalCondition/;                                                                                       // 1494
		var list = _.reduce(formDoc, function(memo, val, key) {                                                             // 1495
			if (re.test(key) && val) {                                                                                         // 1496
				if (memo === '') return table[key];                                                                               // 1497
				else return memo + ', ' + table[key];                                                                             // 1498
			} else return memo;                                                                                                // 1499
		}, '');                                                                                                             // 1500
		if (list === '') list = 'None';                                                                                     // 1501
		fax.text('Medical Conditions: ' + list);                                                                            // 1502
		var medications = (!formDoc.medicalMedications || formDoc.medicalMedications === '') ? 'None' : formDoc.medicalMedications;
		fax.text('Current Medications: ' + medications);                                                                    // 1504
		table = {                                                                                                           // 1505
			medicalAllergiesAspirin: 'Aspirin',                                                                                // 1506
			medicalAllergiesCodeine: 'Codeine',                                                                                // 1507
			medicalAllergiesPenicillin: 'Penicillin',                                                                          // 1508
			medicalAllergiesSulfa: 'Sulfa Drugs'                                                                               // 1509
		};                                                                                                                  // 1510
		re = /^medicalAllergies/;                                                                                           // 1511
		list = _.reduce(formDoc, function(memo, val, key) {                                                                 // 1512
			if (re.test(key) && key !== 'medicalAllergiesOther' && val) {                                                      // 1513
				if (memo === '') return table[key];                                                                               // 1514
				else return memo + ', ' + table[key];                                                                             // 1515
			} else return memo;                                                                                                // 1516
		}, '');                                                                                                             // 1517
		if (formDoc.medicalAllergiesOther) list += ', ' + formDoc.medicalAllergiesOther;                                    // 1518
		if (list === '') list = 'None';                                                                                     // 1519
		fax.text('Allergies: ' + list);                                                                                     // 1520
		fax.moveDown();                                                                                                     // 1521
		fax.text('Patient Dental Complaint', { underline: true });                                                          // 1522
		fax.text('Area of Pain: ' + formDoc.dentalPain);                                                                    // 1523
		fax.text('Duration of Pain: ' + formDoc.dentalDuration);                                                            // 1524
		var swelling = (formDoc.dentalSwelling === 'Y') ? 'Yes' : 'No';                                                     // 1525
		fax.text('Swelling Present: ' + swelling);                                                                          // 1526
		fax.text('Severity of Pain (1-10): ' + formDoc.dentalSeverity);                                                     // 1527
		fax.moveDown();                                                                                                     // 1528
		fax.text('Dentist Notes', { underline: true });                                                                     // 1529
		fax.text('Clinical Impressions:');                                                                                  // 1530
		fax.text(notesDoc.clinicalImpression);                                                                              // 1531
		fax.text('Recommendations:');                                                                                       // 1532
		fax.text(notesDoc.recommendation);                                                                                  // 1533
		fax.text('Recommended Prescriptions:');                                                                             // 1534
		fax.text(notesDoc.recommendedPrescriptions);                                                                        // 1535
		fax.end();                                                                                                          // 1536
**/                                                                                                                   // 1537
	};                                                                                                                   // 1538
	var getFaxBufferSync = Meteor.wrapAsync(getFaxBuffer);                                                               // 1539
                                                                                                                      // 1540
	var handle = Sessions.collection.find({                                                                              // 1541
		'fax.state': 'ready'                                                                                                // 1542
	}, {                                                                                                                 // 1543
		_id: true}                                                                                                          // 1544
	).observeChanges({                                                                                                   // 1545
		added: function(id, session) {                                                                                      // 1546
			var locked = Sessions.collection.findAndModify({                                                                   // 1547
				query: {                                                                                                          // 1548
					 _id: id                                                                                                         // 1549
				},                                                                                                                // 1550
				update: {                                                                                                         // 1551
					$set: {                                                                                                          // 1552
						'fax.state': 'locked'                                                                                           // 1553
					},                                                                                                               // 1554
					$push: {                                                                                                         // 1555
						'fax.history': { at: new Date, state: 'locked' }                                                                // 1556
					}                                                                                                                // 1557
				},                                                                                                                // 1558
				fields: {                                                                                                         // 1559
					'location.id': true,                                                                                             // 1560
					lang: true,                                                                                                      // 1561
					'form.trueVaultRef.docId': true,                                                                                 // 1562
					'form.trueVaultRef.vaultId': true,                                                                               // 1563
					'dentistNotes.trueVaultRef.docId': true,                                                                         // 1564
					'dentistNotes.trueVaultRef.vaultId': true                                                                        // 1565
				}                                                                                                                 // 1566
			});                                                                                                                // 1567
                                                                                                                      // 1568
			if (!locked) return;                                                                                               // 1569
			if (!locked.form) {                                                                                                // 1570
				failFax(id, 'Missing form');                                                                                      // 1571
				return;                                                                                                           // 1572
			} else if (!locked.form.trueVaultRef) {                                                                            // 1573
				failFax(id, 'Missing form reference');                                                                            // 1574
				return;                                                                                                           // 1575
			} else {                                                                                                           // 1576
				if (!locked.form.trueVaultRef.vaultId) {                                                                          // 1577
					failFax(id, 'Missing form vault reference');                                                                     // 1578
					return;                                                                                                          // 1579
				}                                                                                                                 // 1580
				if (!locked.form.trueVaultRef.docId) {                                                                            // 1581
					failFax(id, 'Missing form doc reference');                                                                       // 1582
					return;                                                                                                          // 1583
				}                                                                                                                 // 1584
			}                                                                                                                  // 1585
			if (!locked.dentistNotes) {                                                                                        // 1586
				failFax(id, 'Missing notes');                                                                                     // 1587
				return;                                                                                                           // 1588
			} else if (!locked.dentistNotes.trueVaultRef) {                                                                    // 1589
				failFax(id, 'Missing notes reference');                                                                           // 1590
				return;                                                                                                           // 1591
			} else {                                                                                                           // 1592
				if (!locked.dentistNotes.trueVaultRef.vaultId) {                                                                  // 1593
					failFax(id, 'Missing notes vault reference');                                                                    // 1594
					return;                                                                                                          // 1595
				}                                                                                                                 // 1596
				if (!locked.dentistNotes.trueVaultRef.docId) {                                                                    // 1597
					failFax(id, 'Missing notes doc reference');                                                                      // 1598
					return;                                                                                                          // 1599
				}                                                                                                                 // 1600
			}                                                                                                                  // 1601
			var formId = locked.form.trueVaultRef.docId;                                                                       // 1602
			var notesId = locked.dentistNotes.trueVaultRef.docId;                                                              // 1603
                                                                                                                      // 1604
			var forms = TrueVault.readTwoDocuments(locked.form.trueVaultRef.vaultId, formId, notesId);                         // 1605
			Sessions.collection.update({_id: id}, {                                                                            // 1606
				$push: {                                                                                                          // 1607
					'form.trueVaultRef.accessLog': {                                                                                 // 1608
						fax: true,                                                                                                      // 1609
						transId: forms.transId                                                                                          // 1610
					},                                                                                                               // 1611
					'dentistNotes.trueVaultRef.accessLog': {                                                                         // 1612
						fax: true,                                                                                                      // 1613
						transId: forms.transId                                                                                          // 1614
					}                                                                                                                // 1615
				}                                                                                                                 // 1616
			});                                                                                                                // 1617
                                                                                                                      // 1618
			var buf = getFaxBufferSync(forms.docOne, forms.docTwo, locked.lang);                                               // 1619
                                                                                                                      // 1620
			var location = Locations.collection.findOne({ _id: locked.location.id}, { fields: { name: true, 'contact.fax': true } });
			var sendFax = SFax.sendFax(id, location.name, location.contact.fax, buf);                                          // 1622
			Sessions.collection.update({                                                                                       // 1623
				_id: id,                                                                                                          // 1624
				'fax.state': 'locked'                                                                                             // 1625
			}, {                                                                                                               // 1626
				$set: {                                                                                                           // 1627
					'fax.state': 'sent'                                                                                              // 1628
				},                                                                                                                // 1629
				$push: {                                                                                                          // 1630
					'fax.history': { state: 'sent', SendFaxQueueId: sendFax.SendFaxQueueId }                                         // 1631
				}                                                                                                                 // 1632
			});                                                                                                                // 1633
		}                                                                                                                   // 1634
	});                                                                                                                  // 1635
});                                                                                                                   // 1636
                                                                                                                      // 1637
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.sessions = {
  Sessions: Sessions
};

})();

//# sourceMappingURL=sessions.js.map
