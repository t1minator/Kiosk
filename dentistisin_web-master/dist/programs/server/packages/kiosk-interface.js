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
		if(!session) {                                                                                       // 448
			throw new Meteor.Error('bad-session');                                                              // 449
		}                                                                                                    // 450
                                                                                                       // 451
		message.data.patient.sessionId = session._id;                                                        // 452
                                                                                                       // 453
		var result = TrueVault.createDocument(message.data.patient, message.location.kiosk.trueVault.id);    // 454
                                                                                                       // 455
		//if (result.data.result !== 'success') {                                                            // 456
		//	throw new Meteor.Error('internal-error');                                                         // 457
		//}                                                                                                  // 458
                                                                                                       // 459
		session['location.id'] = session.location.id;                                                        // 460
		session['location.kioskHandle'] = session.location.kioskHandle;                                      // 461
		delete session.location;                                                                             // 462
		var updated = Sessions.collection.update(session, {                                                  // 463
			$set: {                                                                                             // 464
				state: 'voip',                                                                                     // 465
				'voip.state': 'ready',                                                                             // 466
				'form.trueVaultRef.docId': result.docId,                                                           // 467
				'form.trueVaultRef.vaultId': result.vaultId,                                                       // 468
				'form.trueVaultRef.transId': result.transId                                                        // 469
			},                                                                                                  // 470
			$push: {                                                                                            // 471
				'voip.history': { state: 'ready' }                                                                 // 472
			}                                                                                                   // 473
		});                                                                                                  // 474
		if (updated === 0) {                                                                                 // 475
			throw new Meteor.Error('bad-session');                                                              // 476
		}                                                                                                    // 477
		return true;                                                                                         // 478
	},                                                                                                    // 479
                                                                                                       // 480
	// Get a voip token                                                                                   // 481
	kiosk_voip_token: function(token) {                                                                   // 482
		this.unblock();                                                                                      // 483
		check(token, String);                                                                                // 484
		var subject = 'kiosk_voip_token';                                                                    // 485
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});      // 486
		var session = Sessions.collection.findOne({                                                          // 487
			_id: message.data.session,                                                                          // 488
			'location.id': message.location._id,                                                                // 489
			'location.kioskHandle': message.location.kiosk.handle,                                              // 490
			state: 'voip'                                                                                       // 491
		}, {                                                                                                 // 492
			fields: {                                                                                           // 493
				_id: true                                                                                          // 494
			}                                                                                                   // 495
		});                                                                                                  // 496
                                                                                                       // 497
		if(!session) {                                                                                       // 498
			throw new Meteor.Error('bad-session');                                                              // 499
		}                                                                                                    // 500
		return SightCall.auth(message.location.kiosk.handle, 'standard').data.token;                         // 501
	},                                                                                                    // 502
	kiosk_voip_fail: function(token) {                                                                    // 503
		this.unblock();                                                                                      // 504
		check(token, String);                                                                                // 505
		var subject = 'kiosk_voip_fail';                                                                     // 506
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});      // 507
		var session = Sessions.collection.update({                                                           // 508
			_id: message.data.session,                                                                          // 509
			'location.id': message.location._id,                                                                // 510
			'location.kioskHandle': message.location.kiosk.handle,                                              // 511
			state: 'voip'                                                                                       // 512
		}, {                                                                                                 // 513
			$set: {                                                                                             // 514
				'voip.state': 'failed',                                                                            // 515
			},                                                                                                  // 516
			$push: {                                                                                            // 517
				'voip.history': { state: 'failed' }                                                                // 518
			}                                                                                                   // 519
		});                                                                                                  // 520
                                                                                                       // 521
		if (session === 0) {                                                                                 // 522
			throw new Meteor.Error('bad-session');                                                              // 523
		}                                                                                                    // 524
                                                                                                       // 525
		return true;                                                                                         // 526
	},                                                                                                    // 527
	kiosk_voip_enqueue: function(token) {                                                                 // 528
		this.unblock();                                                                                      // 529
		check(token, String);                                                                                // 530
		var subject = 'kiosk_voip_enqueue';                                                                  // 531
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })     // 532
		var session = Sessions.collection.update({                                                           // 533
			_id: message.data.session,                                                                          // 534
			'location.id': message.location._id,                                                                // 535
			'location.kioskHandle': message.location.kiosk.handle,                                              // 536
			state: 'voip',                                                                                      // 537
			'voip.state': 'ready'                                                                               // 538
		}, {                                                                                                 // 539
			$set: {                                                                                             // 540
				'voip.state': 'queued',                                                                            // 541
				'voip.enqueuedAt': new Date                                                                        // 542
			},                                                                                                  // 543
			$push: {                                                                                            // 544
				'voip.history': { state: 'queued' }                                                                // 545
			}                                                                                                   // 546
		});                                                                                                  // 547
                                                                                                       // 548
		if (session === 0) {                                                                                 // 549
			throw new Meteor.Error('bad-session');                                                              // 550
		}                                                                                                    // 551
                                                                                                       // 552
		return true;                                                                                         // 553
	},                                                                                                    // 554
                                                                                                       // 555
	kiosk_voip_reenqueue: function(token) {                                                               // 556
		this.unblock();                                                                                      // 557
		check(token, String);                                                                                // 558
		var subject = 'kiosk_voip_reenqueue';                                                                // 559
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })     // 560
		var session = Sessions.collection.update({                                                           // 561
			_id: message.data.session,                                                                          // 562
			'location.id': message.location._id,                                                                // 563
			'location.kioskHandle': message.location.kiosk.handle,                                              // 564
			state: 'voip',                                                                                      // 565
			'voip.state': 'failed'                                                                              // 566
		}, {                                                                                                 // 567
			$set: {                                                                                             // 568
				'voip.state': 'queued'                                                                             // 569
			},                                                                                                  // 570
			$push: {                                                                                            // 571
				'voip.history': { state: 'queued' }                                                                // 572
			}                                                                                                   // 573
		});                                                                                                  // 574
                                                                                                       // 575
		if (session === 0) {                                                                                 // 576
			throw new Meteor.Error('bad-session');                                                              // 577
		}                                                                                                    // 578
                                                                                                       // 579
		return true;                                                                                         // 580
	},                                                                                                    // 581
                                                                                                       // 582
	kiosk_voip_finish: function(token) {                                                                  // 583
		this.unblock();                                                                                      // 584
		check(token, String);                                                                                // 585
		var subject = 'kiosk_voip_finish';                                                                   // 586
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });    // 587
		var session = Sessions.collection.update({                                                           // 588
			_id: message.data.session,                                                                          // 589
			'location.id': message.location._id,                                                                // 590
			'location.kioskHandle': message.location.kiosk.handle,                                              // 591
			state: 'voip',                                                                                      // 592
			'voip.state': 'assigned'                                                                            // 593
		}, {                                                                                                 // 594
			$set: {                                                                                             // 595
				state: 'survey',                                                                                   // 596
				'voip.state': 'done'                                                                               // 597
			},                                                                                                  // 598
			$push: {                                                                                            // 599
				'voip.history': { state: 'done' }                                                                  // 600
			}                                                                                                   // 601
		});                                                                                                  // 602
                                                                                                       // 603
		if (session === 0) {                                                                                 // 604
			throw new Meteor.Error('bad-session');                                                              // 605
		}                                                                                                    // 606
                                                                                                       // 607
		return true;                                                                                         // 608
	},                                                                                                    // 609
                                                                                                       // 610
	kiosk_createSurvey: function(token) {                                                                 // 611
		this.unblock();                                                                                      // 612
		check(token, String);                                                                                // 613
		var subject = 'kiosk_createSurvey';                                                                  // 614
		var message = validateMessage(token, subject, Kiosk.schemas.createSurvey, { 'kiosk.handle': true }); // 615
                                                                                                       // 616
		var update = {                                                                                       // 617
			$set: {                                                                                             // 618
				state: 'complete',                                                                                 // 619
				'complete.condition': 'finished'                                                                   // 620
			}                                                                                                   // 621
		};                                                                                                   // 622
                                                                                                       // 623
		if(message.data.survey) {                                                                            // 624
			update.$set['survey.form'] = message.data.survey;                                                   // 625
		} else {                                                                                             // 626
			update.$set['survey.skipped'] = true;                                                               // 627
		}                                                                                                    // 628
		var session = Sessions.collection.update({                                                           // 629
			_id: message.data.session,                                                                          // 630
			'location.id': message.location._id,                                                                // 631
			'location.kioskHandle': message.location.kiosk.handle,                                              // 632
			state: 'survey'                                                                                     // 633
		}, update);                                                                                          // 634
                                                                                                       // 635
		if (session === 0) {                                                                                 // 636
			throw new Meteor.Error('bad-session');                                                              // 637
		}                                                                                                    // 638
                                                                                                       // 639
		return true;                                                                                         // 640
	}                                                                                                     // 641
});                                                                                                    // 642
                                                                                                       // 643
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kiosk-interface'] = {
  Kiosk: Kiosk
};

})();

//# sourceMappingURL=kiosk-interface.js.map
