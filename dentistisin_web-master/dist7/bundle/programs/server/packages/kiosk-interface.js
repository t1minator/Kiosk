(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var JWT = Package.jwt.JWT;
var Sessions = Package.sessions.Sessions;
var TrueVault = Package.truevault.TrueVault;
var SightCall = Package.sightcall.SightCall;

/* Package-scope variables */
var Kiosk;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/kiosk-interface/kiosk_server.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Kiosk = {};                                                                                            // 1
                                                                                                       // 2
Kiosk.logs = new Mongo.Collection('kiosk.logs');                                                       // 3
                                                                                                       // 4
var UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;                          // 5
                                                                                                       // 6
var logSchema = new SimpleSchema({                                                                     // 7
	at: {                                                                                                 // 8
		type: Date,                                                                                          // 9
		autoValue: function() {                                                                              // 10
			return new Date;                                                                                    // 11
		}                                                                                                    // 12
	},                                                                                                    // 13
	sessionId: {                                                                                          // 14
		type: String,                                                                                        // 15
		regEx: SimpleSchema.RegEx.Id                                                                         // 16
	},                                                                                                    // 17
	kioskHandle: {                                                                                        // 18
		type: String,                                                                                        // 19
		regEx: UUID                                                                                          // 20
	},                                                                                                    // 21
	message: {                                                                                            // 22
		type: String,                                                                                        // 23
		max: 150                                                                                             // 24
	}                                                                                                     // 25
});                                                                                                    // 26
                                                                                                       // 27
Kiosk.schemas = {};                                                                                    // 28
                                                                                                       // 29
Kiosk.schemas.log = new SimpleSchema({                                                                 // 30
	session: {                                                                                            // 31
		type: String,                                                                                        // 32
		regEx: SimpleSchema.RegEx.Id                                                                         // 33
	},                                                                                                    // 34
	message: {                                                                                            // 35
		type: String,                                                                                        // 36
		max: 150                                                                                             // 37
	}                                                                                                     // 38
});                                                                                                    // 39
                                                                                                       // 40
Kiosk.schemas.accessCode = new SimpleSchema({                                                          // 41
	code: {                                                                                               // 42
		type: String,                                                                                        // 43
		regEx: /^[0-9]*$/,                                                                                   // 44
		max: 20                                                                                              // 45
	},                                                                                                    // 46
	lang: {                                                                                               // 47
		type: String,                                                                                        // 48
		allowedValues: ['en', 'es']                                                                          // 49
	}                                                                                                     // 50
});                                                                                                    // 51
                                                                                                       // 52
Kiosk.schemas.message = new SimpleSchema({                                                             // 53
	aud: { type: String },                                                                                // 54
	exp: { type: Date },                                                                                  // 55
	iat: { type: Date },                                                                                  // 56
	iss: {                                                                                                // 57
		type: String                                                                                         // 58
	},                                                                                                    // 59
	sub: { type: String },                                                                                // 60
	data: {                                                                                               // 61
		type: String                                                                                         // 62
	}                                                                                                     // 63
});                                                                                                    // 64
                                                                                                       // 65
var sessionId = {                                                                                      // 66
	session: {                                                                                            // 67
		type: String,                                                                                        // 68
		regEx: SimpleSchema.RegEx.Id                                                                         // 69
	}                                                                                                     // 70
};                                                                                                     // 71
                                                                                                       // 72
Kiosk.schemas.sessionId = new SimpleSchema(sessionId);                                                 // 73
                                                                                                       // 74
Kiosk.schemas.createSurvey = new SimpleSchema(_.extend({                                               // 75
	survey: {                                                                                             // 76
		type: Sessions.schemas.surveyForm,                                                                   // 77
		optional: true                                                                                       // 78
	}                                                                                                     // 79
}, sessionId));                                                                                        // 80
                                                                                                       // 81
                                                                                                       // 82
Kiosk.schemas.patientForm = new SimpleSchema({                                                         // 83
	patientNameFirst: {                                                                                   // 84
		type: String,                                                                                        // 85
		max: 100                                                                                             // 86
	},                                                                                                    // 87
	patientNameMiddle: {                                                                                  // 88
		type: String,                                                                                        // 89
		max: 100,                                                                                            // 90
		optional: true                                                                                       // 91
	},                                                                                                    // 92
	patientNameLast: {                                                                                    // 93
		type: String,                                                                                        // 94
		max: 100                                                                                             // 95
	},                                                                                                    // 96
	patientNamePreferred: {                                                                               // 97
		type: String,                                                                                        // 98
		max: 100,                                                                                            // 99
		optional: true                                                                                       // 100
	},                                                                                                    // 101
	patientAddressOne: {                                                                                  // 102
		type: String,                                                                                        // 103
		max: 100                                                                                             // 104
	},                                                                                                    // 105
	patientAddressTwo: {                                                                                  // 106
		type: String,                                                                                        // 107
		max: 100,                                                                                            // 108
		optional: true                                                                                       // 109
	},                                                                                                    // 110
	patientAddressCity: {                                                                                 // 111
		type: String,                                                                                        // 112
		max: 100                                                                                             // 113
	},                                                                                                    // 114
	patientAddressState: {                                                                                // 115
		type: String,                                                                                        // 116
		allowedValues: [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ]
	},                                                                                                    // 118
	patientAddressZip: {                                                                                  // 119
		type: String,                                                                                        // 120
		regEx: /^[0-9]{5}$/                                                                                  // 121
	},                                                                                                    // 122
	patientDobDob: {                                                                                      // 123
		//type: Date                                                                                         // 124
		type: String,                                                                                        // 125
		regEx: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/                            // 126
	},                                                                                                    // 127
	patientSexSex: {                                                                                      // 128
		type: String,                                                                                        // 129
		allowedValues: [ 'M', 'F' ]                                                                          // 130
	},                                                                                                    // 131
	patientContactEmail: {                                                                                // 132
		type: String,                                                                                        // 133
		max: 100,                                                                                            // 134
		regEx: SimpleSchema.RegEx.Email,                                                                     // 135
		optional: true                                                                                       // 136
	},                                                                                                    // 137
	patientContactPhone: {                                                                                // 138
		type: String,                                                                                        // 139
		min: 9,                                                                                              // 140
		max: 25,                                                                                             // 141
		optional: true                                                                                       // 142
	},                                                                                                    // 143
	patientInsuranceInsurance: {                                                                          // 144
		type: String,                                                                                        // 145
		allowedValues: [ 'Insurance', 'Medicaid', 'Self' ]                                                   // 146
	},                                                                                                    // 147
	medicalConditionsHivAids: {                                                                           // 148
		type: Boolean,                                                                                       // 149
		optional: true                                                                                       // 150
	},                                                                                                    // 151
	medicalConditionsPregnant: {                                                                          // 152
		type: Boolean,                                                                                       // 153
		optional: true                                                                                       // 154
	},                                                                                                    // 155
	medicalConditionsContraceptives: {                                                                    // 156
		type: Boolean,                                                                                       // 157
		optional: true                                                                                       // 158
	},                                                                                                    // 159
	medicalConditionsCancer: {                                                                            // 160
		type: Boolean,                                                                                       // 161
		optional: true                                                                                       // 162
	},                                                                                                    // 163
	medicalConditionsDiabetes: {                                                                          // 164
		type: Boolean,                                                                                       // 165
		optional: true                                                                                       // 166
	},                                                                                                    // 167
	medicalConditionsHeart: {                                                                             // 168
		type: Boolean,                                                                                       // 169
		optional: true                                                                                       // 170
	},                                                                                                    // 171
	medicalConditionsBlood: {                                                                             // 172
		type: Boolean,                                                                                       // 173
		optional: true                                                                                       // 174
	},                                                                                                    // 175
	medicalConditionsKidneyLiver: {                                                                       // 176
		type: Boolean,                                                                                       // 177
		optional: true                                                                                       // 178
	},                                                                                                    // 179
	medicalConditionsStomach: {                                                                           // 180
		type: Boolean,                                                                                       // 181
		optional: true                                                                                       // 182
	},                                                                                                    // 183
	medicalConditionsBleeding: {                                                                          // 184
		type: Boolean,                                                                                       // 185
		optional: true                                                                                       // 186
	},                                                                                                    // 187
	medicalConditionsPsychiatric: {                                                                       // 188
		type: Boolean,                                                                                       // 189
		optional: true                                                                                       // 190
	},                                                                                                    // 191
	medicalConditionsRadiation: {                                                                         // 192
		type: Boolean,                                                                                       // 193
		optional: true                                                                                       // 194
	},                                                                                                    // 195
	medicalMedications: {                                                                                 // 196
		type: String,                                                                                        // 197
		max: 1000,                                                                                           // 198
		optional: true                                                                                       // 199
	},                                                                                                    // 200
	medicalAllergiesAspirin: {                                                                            // 201
		type: Boolean,                                                                                       // 202
		optional: true                                                                                       // 203
	},                                                                                                    // 204
	medicalAllergiesCodeine: {                                                                            // 205
		type: Boolean,                                                                                       // 206
		optional: true                                                                                       // 207
	},                                                                                                    // 208
	medicalAllergiesPenicillin: {                                                                         // 209
		type: Boolean,                                                                                       // 210
		optional: true                                                                                       // 211
	},                                                                                                    // 212
	medicalAllergiesSulfa: {                                                                              // 213
		type: Boolean,                                                                                       // 214
		optional: true                                                                                       // 215
	},                                                                                                    // 216
	medicalAllergiesOther: {                                                                              // 217
		type: String,                                                                                        // 218
		max: 1000,                                                                                           // 219
		optional: true                                                                                       // 220
	},                                                                                                    // 221
	dentalPain: {                                                                                         // 222
		type: String,                                                                                        // 223
		max: 250                                                                                             // 224
	},                                                                                                    // 225
	dentalDuration: {                                                                                     // 226
		type: String,                                                                                        // 227
		max: 250                                                                                             // 228
	},                                                                                                    // 229
	dentalSwelling: {                                                                                     // 230
		type: String,                                                                                        // 231
		allowedValues: ['Y', 'N']                                                                            // 232
	},                                                                                                    // 233
	dentalSeverity: {                                                                                     // 234
		type: String,                                                                                        // 235
		regEx: /^[1-9]$|^10$/                                                                                // 236
	}                                                                                                     // 237
});                                                                                                    // 238
                                                                                                       // 239
Kiosk.schemas.createForm = new SimpleSchema(_.extend({                                                 // 240
	patient: {                                                                                            // 241
		type: Kiosk.schemas.patientForm                                                                      // 242
	}                                                                                                     // 243
}, sessionId));                                                                                        // 244
                                                                                                       // 245
// TODO: Replace with address                                                                          // 246
var audience = 'DentistIsIn';                                                                          // 247
                                                                                                       // 248
var checkSchema = function(obj, schema) {                                                              // 249
	schema.clean(obj);                                                                                    // 250
	var ctx = schema.newContext();                                                                        // 251
	if (!ctx.validate(obj)) {                                                                             // 252
		throw new Meteor.Error('bad-data', 'Error validating data', ctx.invalidKeys());                      // 253
	}                                                                                                     // 254
};                                                                                                     // 255
                                                                                                       // 256
var badMessage = 'The received message was malformed';                                                 // 257
                                                                                                       // 258
var checkMessage = function(token) {                                                                   // 259
	var decoded;                                                                                          // 260
	try {                                                                                                 // 261
		decoded = JWT.decode(token);                                                                         // 262
		decoded.iat = new Date(decoded.iat);                                                                 // 263
		decoded.exp = new Date(decoded.exp);                                                                 // 264
		checkSchema(decoded, Kiosk.schemas.message);                                                         // 265
	} catch (e) {                                                                                         // 266
		throw new Meteor.Error('bad-message', badMessage);                                                   // 267
	}                                                                                                     // 268
                                                                                                       // 269
	return decoded.iss;                                                                                   // 270
};                                                                                                     // 271
                                                                                                       // 272
var badAuth = 'The provided credentials are not valid';                                                // 273
                                                                                                       // 274
var getLocation = function(key, fields) {                                                              // 275
	var location = Locations.collection.findOne({                                                         // 276
		'kiosk.apiKey': key,                                                                                 // 277
		'kiosk.active': true                                                                                 // 278
	}, { fields: fields });                                                                               // 279
	if (!location) {                                                                                      // 280
		throw new Meteor.Error('bad-auth', badAuth);                                                         // 281
	}                                                                                                     // 282
                                                                                                       // 283
	return location;                                                                                      // 284
};                                                                                                     // 285
                                                                                                       // 286
var verifyMessage = function(token, secret, subject) {                                                 // 287
	var verified;                                                                                         // 288
	try {                                                                                                 // 289
		verified = JWT.verify(token, secret, { audience: audience, subject: 'HS256' });                      // 290
	} catch (e) {                                                                                         // 291
		throw new Meteor.Error('bad-auth', badAuth);                                                         // 292
	}                                                                                                     // 293
                                                                                                       // 294
	var data;                                                                                             // 295
	try {                                                                                                 // 296
		data = EJSON.parse(verified.data);                                                                   // 297
	} catch (e) {                                                                                         // 298
		throw new Meteor.Error('bad-message', badMessage);                                                   // 299
	}                                                                                                     // 300
	return data;                                                                                          // 301
};                                                                                                     // 302
                                                                                                       // 303
var validateMessage = function(token, subject, dataSchema, fields) {                                   // 304
	fields = fields || {};                                                                                // 305
	var issuer = checkMessage(token);                                                                     // 306
	fields = _.extend(fields, { 'kiosk.secret': true });                                                  // 307
	var location = getLocation(issuer, fields);                                                           // 308
	var data = verifyMessage(token, location.kiosk.secret, subject);                                      // 309
	if (dataSchema) {                                                                                     // 310
		checkSchema(data, dataSchema);                                                                       // 311
	} else {                                                                                              // 312
		data = {};                                                                                           // 313
	}                                                                                                     // 314
	delete location.kiosk.secret;                                                                         // 315
	return {                                                                                              // 316
		location: location,                                                                                  // 317
		data: data                                                                                           // 318
	};                                                                                                    // 319
};                                                                                                     // 320
                                                                                                       // 321
Meteor.publish('kiosk_voip_state', function(token) {                                                   // 322
	check(token, String);                                                                                 // 323
	var subject = 'kiosk_voip_state';                                                                     // 324
	var message;                                                                                          // 325
	try {                                                                                                 // 326
		message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });        // 327
	} catch (e) {                                                                                         // 328
		return [];                                                                                           // 329
	}                                                                                                     // 330
	return Sessions.collection.find({                                                                     // 331
		_id: message.data.session,                                                                           // 332
		'location.id': message.location._id,                                                                 // 333
		'location.kioskHandle': message.location.kiosk.handle,                                               // 334
		state: 'voip'                                                                                        // 335
	}, {                                                                                                  // 336
		fields: {                                                                                            // 337
			_id: true,                                                                                          // 338
			'voip.state': true                                                                                  // 339
		}                                                                                                    // 340
	});                                                                                                   // 341
});                                                                                                    // 342
                                                                                                       // 343
Meteor.methods({                                                                                       // 344
	kiosk_log: function(token) {                                                                          // 345
		this.unblock();                                                                                      // 346
		check(token, String);                                                                                // 347
		var subject = 'kiosk_log';                                                                           // 348
		var message = validateMessage(token, subject, Kiosk.schemas.log, { 'kiosk.handle': true });          // 349
		var session = Sessions.collection.findOne({                                                          // 350
			_id: message.data.session,                                                                          // 351
			'location.id': message.location._id,                                                                // 352
			'location.kioskHandle': message.location.kiosk.handle,                                              // 353
			state: {                                                                                            // 354
				$exists: true,                                                                                     // 355
				$ne: 'complete'                                                                                    // 356
			}                                                                                                   // 357
		}, {                                                                                                 // 358
			fields: {                                                                                           // 359
				_id: true                                                                                          // 360
			}                                                                                                   // 361
		});                                                                                                  // 362
                                                                                                       // 363
		if (!session) {                                                                                      // 364
			throw new Meteor.Error('bad-session');                                                              // 365
		}                                                                                                    // 366
                                                                                                       // 367
		Kiosk.logs.insert({                                                                                  // 368
			sessionId: message.data.session,                                                                    // 369
			kioskHandle: message.location.kiosk.handle,                                                         // 370
			message: message.data.message                                                                       // 371
		});                                                                                                  // 372
			                                                                                                    // 373
	},                                                                                                    // 374
	kiosk_auth: function(token) {                                                                         // 375
		this.unblock();                                                                                      // 376
		check(token, String);                                                                                // 377
		var subject = 'kiosk_auth';                                                                          // 378
		validateMessage(token, subject);                                                                     // 379
		return true;                                                                                         // 380
	},                                                                                                    // 381
	// Session closed due to inactivity                                                                   // 382
	kiosk_inactive: function(token) {                                                                     // 383
		this.unblock();                                                                                      // 384
		check(token, String);                                                                                // 385
		var subject = 'kiosk_inactive';                                                                      // 386
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });    // 387
                                                                                                       // 388
		var session = Sessions.collection.update({                                                           // 389
			_id: message.data.session,                                                                          // 390
			'location.id': message.location._id,                                                                // 391
			'location.kioskHandle': message.location.kiosk.handle                                               // 392
		}, {                                                                                                 // 393
			$set: {                                                                                             // 394
				state: 'complete',                                                                                 // 395
				'complete.condition': 'inactive'                                                                   // 396
			}                                                                                                   // 397
		});                                                                                                  // 398
                                                                                                       // 399
		if (session === 0) {                                                                                 // 400
			throw new Meteor.Error('bad-session');                                                              // 401
		}                                                                                                    // 402
	                                                                                                      // 403
		return true;                                                                                         // 404
	},                                                                                                    // 405
                                                                                                       // 406
	// Create a new session                                                                               // 407
	kiosk_createSession: function(token) {                                                                // 408
		this.unblock();                                                                                      // 409
		check(token, String);                                                                                // 410
		var subject = 'kiosk_createSession';                                                                 // 411
		var message = validateMessage(token, subject, Kiosk.schemas.accessCode, { name: true, 'kiosk.code': true, 'kiosk.handle': true });
                                                                                                       // 413
		if(message.data.code !== message.location.kiosk.code) {                                              // 414
			throw new Meteor.Error('bad-code');                                                                 // 415
		}                                                                                                    // 416
                                                                                                       // 417
		// TODO Deactivate all sessions for this kiosk                                                       // 418
		return Sessions.collection.insert({                                                                  // 419
			location: {                                                                                         // 420
				id: message.location._id,                                                                          // 421
				name: message.location.name,                                                                       // 422
				kioskHandle: message.location.kiosk.handle                                                         // 423
			},                                                                                                  // 424
			lang: message.data.lang,                                                                            // 425
			state: 'form'                                                                                       // 426
		});                                                                                                  // 427
	},                                                                                                    // 428
                                                                                                       // 429
	// Submit patient form                                                                                // 430
	kiosk_createForm: function(token) {                                                                   // 431
		this.unblock();                                                                                      // 432
		check(token, String);                                                                                // 433
		var subject = 'kiosk_createForm';                                                                    // 434
		var message = validateMessage(token, subject, Kiosk.schemas.createForm, { 'kiosk.trueVault.id': true, 'kiosk.handle': true});
		var session = Sessions.collection.findOne({                                                          // 436
			_id: message.data.session,                                                                          // 437
			'location.id': message.location._id,                                                                // 438
			'location.kioskHandle': message.location.kiosk.handle,                                              // 439
			state: 'form'                                                                                       // 440
		}, {                                                                                                 // 441
			fields: {                                                                                           // 442
				_id: true,                                                                                         // 443
				location: true,                                                                                    // 444
				state: true                                                                                        // 445
			}                                                                                                   // 446
		});                                                                                                  // 447
		console.log('server recieve create form ' + token);                                                  // 448
		if(!session) {                                                                                       // 449
			throw new Meteor.Error('bad-session');                                                              // 450
		}                                                                                                    // 451
                                                                                                       // 452
		message.data.patient.sessionId = session._id;                                                        // 453
                                                                                                       // 454
		var result = TrueVault.createDocument(message.data.patient, message.location.kiosk.trueVault.id);    // 455
                                                                                                       // 456
		//if (result.data.result !== 'success') {                                                            // 457
		//	throw new Meteor.Error('internal-error');                                                         // 458
		//}                                                                                                  // 459
                                                                                                       // 460
		session['location.id'] = session.location.id;                                                        // 461
		session['location.kioskHandle'] = session.location.kioskHandle;                                      // 462
		delete session.location;                                                                             // 463
		var updated = Sessions.collection.update(session, {                                                  // 464
			$set: {                                                                                             // 465
				state: 'voip',                                                                                     // 466
				'voip.state': 'ready',                                                                             // 467
				'form.trueVaultRef.docId': result.docId,                                                           // 468
				'form.trueVaultRef.vaultId': result.vaultId,                                                       // 469
				'form.trueVaultRef.transId': result.transId                                                        // 470
			},                                                                                                  // 471
			$push: {                                                                                            // 472
				'voip.history': { state: 'ready' }                                                                 // 473
			}                                                                                                   // 474
		});                                                                                                  // 475
		if (updated === 0) {                                                                                 // 476
			throw new Meteor.Error('bad-session');                                                              // 477
		}                                                                                                    // 478
		return true;                                                                                         // 479
	},                                                                                                    // 480
                                                                                                       // 481
	// Get a voip token                                                                                   // 482
	kiosk_voip_token: function(token) {                                                                   // 483
		this.unblock();                                                                                      // 484
		check(token, String);                                                                                // 485
		var subject = 'kiosk_voip_token';                                                                    // 486
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});      // 487
		var session = Sessions.collection.findOne({                                                          // 488
			_id: message.data.session,                                                                          // 489
			'location.id': message.location._id,                                                                // 490
			'location.kioskHandle': message.location.kiosk.handle,                                              // 491
			state: 'voip'                                                                                       // 492
		}, {                                                                                                 // 493
			fields: {                                                                                           // 494
				_id: true                                                                                          // 495
			}                                                                                                   // 496
		});                                                                                                  // 497
                                                                                                       // 498
		if(!session) {                                                                                       // 499
			throw new Meteor.Error('bad-session');                                                              // 500
		}                                                                                                    // 501
		return SightCall.auth(message.location.kiosk.handle, 'standard').data.token;                         // 502
	},                                                                                                    // 503
	kiosk_voip_fail: function(token) {                                                                    // 504
		this.unblock();                                                                                      // 505
		check(token, String);                                                                                // 506
		var subject = 'kiosk_voip_fail';                                                                     // 507
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});      // 508
		var session = Sessions.collection.update({                                                           // 509
			_id: message.data.session,                                                                          // 510
			'location.id': message.location._id,                                                                // 511
			'location.kioskHandle': message.location.kiosk.handle,                                              // 512
			state: 'voip'                                                                                       // 513
		}, {                                                                                                 // 514
			$set: {                                                                                             // 515
				'voip.state': 'failed',                                                                            // 516
			},                                                                                                  // 517
			$push: {                                                                                            // 518
				'voip.history': { state: 'failed' }                                                                // 519
			}                                                                                                   // 520
		});                                                                                                  // 521
                                                                                                       // 522
		if (session === 0) {                                                                                 // 523
			throw new Meteor.Error('bad-session');                                                              // 524
		}                                                                                                    // 525
                                                                                                       // 526
		return true;                                                                                         // 527
	},                                                                                                    // 528
	kiosk_voip_enqueue: function(token) {                                                                 // 529
		this.unblock();                                                                                      // 530
		check(token, String);                                                                                // 531
		var subject = 'kiosk_voip_enqueue';                                                                  // 532
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })     // 533
		var session = Sessions.collection.update({                                                           // 534
			_id: message.data.session,                                                                          // 535
			'location.id': message.location._id,                                                                // 536
			'location.kioskHandle': message.location.kiosk.handle,                                              // 537
			state: 'voip',                                                                                      // 538
			'voip.state': 'ready'                                                                               // 539
		}, {                                                                                                 // 540
			$set: {                                                                                             // 541
				'voip.state': 'queued',                                                                            // 542
				'voip.enqueuedAt': new Date                                                                        // 543
			},                                                                                                  // 544
			$push: {                                                                                            // 545
				'voip.history': { state: 'queued' }                                                                // 546
			}                                                                                                   // 547
		});                                                                                                  // 548
                                                                                                       // 549
		if (session === 0) {                                                                                 // 550
			throw new Meteor.Error('bad-session');                                                              // 551
		}                                                                                                    // 552
                                                                                                       // 553
		return true;                                                                                         // 554
	},                                                                                                    // 555
                                                                                                       // 556
	kiosk_recieve_reconnect_message: function(token) {                                                    // 557
		this.unblock();                                                                                      // 558
		check(token, String);                                                                                // 559
		var subject = 'kiosk_send_reconnect_message';                                                        // 560
		var message = validateMessage(token, subject, Kiosk.schemas.log, { 'kiosk.handle': true });          // 561
		var session = Sessions.collection.findOne({                                                          // 562
			_id: message.data.session,                                                                          // 563
			'location.id': message.location._id,                                                                // 564
			'location.kioskHandle': message.location.kiosk.handle,                                              // 565
			state: {                                                                                            // 566
				$exists: true,                                                                                     // 567
				$ne: 'complete'                                                                                    // 568
			}                                                                                                   // 569
		}, {                                                                                                 // 570
			fields: {                                                                                           // 571
				_id: true                                                                                          // 572
			}                                                                                                   // 573
		});                                                                                                  // 574
                                                                                                       // 575
		if (!session) {                                                                                      // 576
			throw new Meteor.Error('bad-session');                                                              // 577
		}                                                                                                    // 578
                                                                                                       // 579
		Kiosk.logs.insert({                                                                                  // 580
			sessionId: message.data.session,                                                                    // 581
			kioskHandle: message.location.kiosk.handle,                                                         // 582
			message: message.data.message                                                                       // 583
		});                                                                                                  // 584
	},                                                                                                    // 585
                                                                                                       // 586
	kiosk_voip_reenqueue: function(token) {                                                               // 587
		this.unblock();                                                                                      // 588
		check(token, String);                                                                                // 589
		var subject = 'kiosk_voip_reenqueue';                                                                // 590
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })     // 591
		var session = Sessions.collection.update({                                                           // 592
			_id: message.data.session,                                                                          // 593
			'location.id': message.location._id,                                                                // 594
			'location.kioskHandle': message.location.kiosk.handle,                                              // 595
			state: 'voip',                                                                                      // 596
			'voip.state': 'failed'                                                                              // 597
		}, {                                                                                                 // 598
			$set: {                                                                                             // 599
				'voip.state': 'queued'                                                                             // 600
			},                                                                                                  // 601
			$push: {                                                                                            // 602
				'voip.history': { state: 'queued' }                                                                // 603
			}                                                                                                   // 604
		});                                                                                                  // 605
                                                                                                       // 606
		if (session === 0) {                                                                                 // 607
			throw new Meteor.Error('bad-session');                                                              // 608
		}                                                                                                    // 609
                                                                                                       // 610
		return true;                                                                                         // 611
	},                                                                                                    // 612
                                                                                                       // 613
	kiosk_voip_finish: function(token) {                                                                  // 614
		this.unblock();                                                                                      // 615
		check(token, String);                                                                                // 616
		var subject = 'kiosk_voip_finish';                                                                   // 617
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });    // 618
		var session = Sessions.collection.update({                                                           // 619
			_id: message.data.session,                                                                          // 620
			'location.id': message.location._id,                                                                // 621
			'location.kioskHandle': message.location.kiosk.handle,                                              // 622
			state: 'voip',                                                                                      // 623
			'voip.state': 'assigned'                                                                            // 624
		}, {                                                                                                 // 625
			$set: {                                                                                             // 626
				state: 'survey',                                                                                   // 627
				'voip.state': 'done'                                                                               // 628
			},                                                                                                  // 629
			$push: {                                                                                            // 630
				'voip.history': { state: 'done' }                                                                  // 631
			}                                                                                                   // 632
		});                                                                                                  // 633
                                                                                                       // 634
		if (session === 0) {                                                                                 // 635
			throw new Meteor.Error('bad-session');                                                              // 636
		}                                                                                                    // 637
                                                                                                       // 638
		return true;                                                                                         // 639
	},                                                                                                    // 640
                                                                                                       // 641
	kiosk_createSurvey: function(token) {                                                                 // 642
		this.unblock();                                                                                      // 643
		check(token, String);                                                                                // 644
		var subject = 'kiosk_createSurvey';                                                                  // 645
		var message = validateMessage(token, subject, Kiosk.schemas.createSurvey, { 'kiosk.handle': true }); // 646
                                                                                                       // 647
		var update = {                                                                                       // 648
			$set: {                                                                                             // 649
				state: 'complete',                                                                                 // 650
				'complete.condition': 'finished'                                                                   // 651
			}                                                                                                   // 652
		};                                                                                                   // 653
                                                                                                       // 654
		if(message.data.survey) {                                                                            // 655
			update.$set['survey.form'] = message.data.survey;                                                   // 656
		} else {                                                                                             // 657
			update.$set['survey.skipped'] = true;                                                               // 658
		}                                                                                                    // 659
		var session = Sessions.collection.update({                                                           // 660
			_id: message.data.session,                                                                          // 661
			'location.id': message.location._id,                                                                // 662
			'location.kioskHandle': message.location.kiosk.handle,                                              // 663
			state: 'survey'                                                                                     // 664
		}, update);                                                                                          // 665
                                                                                                       // 666
		if (session === 0) {                                                                                 // 667
			throw new Meteor.Error('bad-session');                                                              // 668
		}                                                                                                    // 669
                                                                                                       // 670
		return true;                                                                                         // 671
	}                                                                                                     // 672
});                                                                                                    // 673
                                                                                                       // 674
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kiosk-interface'] = {
  Kiosk: Kiosk
};

})();

//# sourceMappingURL=kiosk-interface.js.map
