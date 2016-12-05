Kiosk = {};

Kiosk.logs = new Mongo.Collection('kiosk.logs');

var UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

var logSchema = new SimpleSchema({
	at: { 
		type: Date,
		autoValue: function() {
			return new Date;
		}
	},
	sessionId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	kioskHandle: {
		type: String,
		regEx: UUID
	},
	message: {
		type: String,
		max: 150
	}
});

Kiosk.schemas = {};

Kiosk.schemas.log = new SimpleSchema({
	session: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	message: {
		type: String,
		max: 150
	}
});

Kiosk.schemas.accessCode = new SimpleSchema({
	code: {
		type: String,
		regEx: /^[0-9]*$/,
		max: 20
	},
	lang: {
		type: String,
		allowedValues: ['en', 'es']
	}
});

Kiosk.schemas.message = new SimpleSchema({
	aud: { type: String },
	exp: { type: Date },
	iat: { type: Date },
	iss: {
		type: String
	},
	sub: { type: String },
	data: {
		type: String
	}
});

var sessionId = {
	session: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
};

Kiosk.schemas.sessionId = new SimpleSchema(sessionId);

Kiosk.schemas.createSurvey = new SimpleSchema(_.extend({
	survey: {
		type: Sessions.schemas.surveyForm,
		optional: true
	}
}, sessionId));


Kiosk.schemas.patientForm = new SimpleSchema({
	patientNameFirst: {
		type: String,
		max: 100
	},
	patientNameMiddle: {
		type: String,
		max: 100,
		optional: true
	},
	patientNameLast: {
		type: String,
		max: 100
	},
	patientNamePreferred: {
		type: String,
		max: 100,
		optional: true
	},
	patientAddressOne: {
		type: String,
		max: 100
	},
	patientAddressTwo: {
		type: String,
		max: 100,
		optional: true
	},
	patientAddressCity: {
		type: String,
		max: 100
	},
	patientAddressState: {
		type: String,
		allowedValues: [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ]
	},
	patientAddressZip: {
		type: String,
		regEx: /^[0-9]{5}$/
	},
	patientDobDob: {
		//type: Date
		type: String,
		regEx: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
	},
	patientSexSex: {
		type: String,
		allowedValues: [ 'M', 'F' ]
	},
	patientContactEmail: {
		type: String,
		max: 100,
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	patientContactPhone: {
		type: String,
		min: 9,
		max: 25,
		optional: true
	},
	patientInsuranceInsurance: {
		type: String,
		allowedValues: [ 'Insurance', 'Medicaid', 'Self' ]
	},
	medicalConditionsHivAids: {
		type: Boolean,
		optional: true
	},
	medicalConditionsPregnant: {
		type: Boolean,
		optional: true
	},
	medicalConditionsContraceptives: {
		type: Boolean,
		optional: true
	},
	medicalConditionsCancer: {
		type: Boolean,
		optional: true
	},
	medicalConditionsDiabetes: {
		type: Boolean,
		optional: true
	},
	medicalConditionsHeart: {
		type: Boolean,
		optional: true
	},
	medicalConditionsBlood: {
		type: Boolean,
		optional: true
	},
	medicalConditionsKidneyLiver: {
		type: Boolean,
		optional: true
	},
	medicalConditionsStomach: {
		type: Boolean,
		optional: true
	},
	medicalConditionsBleeding: {
		type: Boolean,
		optional: true
	},
	medicalConditionsPsychiatric: {
		type: Boolean,
		optional: true
	},
	medicalConditionsRadiation: {
		type: Boolean,
		optional: true
	},
	medicalMedications: {
		type: String,
		max: 1000,
		optional: true
	},
	medicalAllergiesAspirin: {
		type: Boolean,
		optional: true
	},
	medicalAllergiesCodeine: {
		type: Boolean,
		optional: true
	},
	medicalAllergiesPenicillin: {
		type: Boolean,
		optional: true
	},
	medicalAllergiesSulfa: {
		type: Boolean,
		optional: true
	},
	medicalAllergiesOther: {
		type: String,
		max: 1000,
		optional: true
	},
	dentalPain: {
		type: String,
		max: 250
	},
	dentalDuration: {
		type: String,
		max: 250
	},
	dentalSwelling: {
		type: String,
		allowedValues: ['Y', 'N']
	},
	dentalSeverity: {
		type: String,
		regEx: /^[1-9]$|^10$/
	}
});

Kiosk.schemas.createForm = new SimpleSchema(_.extend({
	patient: {
		type: Kiosk.schemas.patientForm
	}
}, sessionId));

// TODO: Replace with address
var audience = 'DentistIsIn';

var checkSchema = function(obj, schema) {
	schema.clean(obj);
	var ctx = schema.newContext();
	if (!ctx.validate(obj)) {
		throw new Meteor.Error('bad-data', 'Error validating data', ctx.invalidKeys());
	}
};

var badMessage = 'The received message was malformed';

var checkMessage = function(token) {
	var decoded;
	try {
		decoded = JWT.decode(token);
		decoded.iat = new Date(decoded.iat);
		decoded.exp = new Date(decoded.exp);
		checkSchema(decoded, Kiosk.schemas.message);
	} catch (e) {
		throw new Meteor.Error('bad-message', badMessage);
	}

	return decoded.iss;
};

var badAuth = 'The provided credentials are not valid';

var getLocation = function(key, fields) {
	var location = Locations.collection.findOne({
		'kiosk.apiKey': key,
		'kiosk.active': true
	}, { fields: fields });
	if (!location) {
		throw new Meteor.Error('bad-auth', badAuth);
	}

	return location;
};

var verifyMessage = function(token, secret, subject) {
	var verified;
	try {
		verified = JWT.verify(token, secret, { audience: audience, subject: 'HS256' });
	} catch (e) {
		throw new Meteor.Error('bad-auth', badAuth);
	}

	var data;
	try {
		data = EJSON.parse(verified.data);
	} catch (e) {
		throw new Meteor.Error('bad-message', badMessage);
	}
	return data;
};

var validateMessage = function(token, subject, dataSchema, fields) {
	fields = fields || {};
	var issuer = checkMessage(token);
	fields = _.extend(fields, { 'kiosk.secret': true });
	var location = getLocation(issuer, fields);
	var data = verifyMessage(token, location.kiosk.secret, subject);
	if (dataSchema) {
		checkSchema(data, dataSchema);
	} else {
		data = {};
	}
	delete location.kiosk.secret;
	return {
		location: location,
		data: data
	};
};

Meteor.publish('kiosk_voip_state', function(token) {
	check(token, String);
	var subject = 'kiosk_voip_state';
	var message;
	try {
		message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });
	} catch (e) {
		return [];
	}
	return Sessions.collection.find({
		_id: message.data.session,
		'location.id': message.location._id,
		'location.kioskHandle': message.location.kiosk.handle,
		state: 'voip'
	}, {
		fields: {
			_id: true,
			'voip.state': true
		}
	});
});

Meteor.methods({
	kiosk_log: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_log';
		var message = validateMessage(token, subject, Kiosk.schemas.log, { 'kiosk.handle': true });
		var session = Sessions.collection.findOne({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: {
				$exists: true,
				$ne: 'complete'
			}
		}, {
			fields: {
				_id: true
			}
		});

		if (!session) {
			throw new Meteor.Error('bad-session');
		}

		Kiosk.logs.insert({
			sessionId: message.data.session,
			kioskHandle: message.location.kiosk.handle,
			message: message.data.message
		});
			
	},
	kiosk_auth: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_auth';
		validateMessage(token, subject);
		return true;
	},
	// Session closed due to inactivity
	kiosk_inactive: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_inactive';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });

		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle
		}, {
			$set: {
				state: 'complete',
				'complete.condition': 'inactive'
			}
		});

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}
	
		return true;
	},

	// Create a new session
	kiosk_createSession: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_createSession';
		var message = validateMessage(token, subject, Kiosk.schemas.accessCode, { name: true, 'kiosk.code': true, 'kiosk.handle': true });

		if(message.data.code !== message.location.kiosk.code) {
			throw new Meteor.Error('bad-code');
		}

		// TODO Deactivate all sessions for this kiosk
		return Sessions.collection.insert({
			location: {
				id: message.location._id,
				name: message.location.name,
				kioskHandle: message.location.kiosk.handle
			},
			lang: message.data.lang,
			state: 'form'
		});
	},

	// Submit patient form
	kiosk_createForm: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_createForm';
		var message = validateMessage(token, subject, Kiosk.schemas.createForm, { 'kiosk.trueVault.id': true, 'kiosk.handle': true});
		var session = Sessions.collection.findOne({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'form'
		}, {
			fields: {
				_id: true,
				location: true,
				state: true
			}
		});
		console.log('server recieve create form ' + token);
		if(!session) {
			throw new Meteor.Error('bad-session');
		}

		message.data.patient.sessionId = session._id;

		var result = TrueVault.createDocument(message.data.patient, message.location.kiosk.trueVault.id);

		//if (result.data.result !== 'success') {
		//	throw new Meteor.Error('internal-error');
		//}

		session['location.id'] = session.location.id;
		session['location.kioskHandle'] = session.location.kioskHandle;
		delete session.location;
		var updated = Sessions.collection.update(session, {
			$set: {
				state: 'voip',
				'voip.state': 'ready',
				'form.trueVaultRef.docId': result.docId,
				'form.trueVaultRef.vaultId': result.vaultId,
				'form.trueVaultRef.transId': result.transId
			},
			$push: {
				'voip.history': { state: 'ready' }
			}
		});
		if (updated === 0) {
			throw new Meteor.Error('bad-session');
		}
		return true;
	},

	// Get a voip token
	kiosk_voip_token: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_voip_token';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});
		var session = Sessions.collection.findOne({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'voip'
		}, {
			fields: {
				_id: true
			}
		});

		if(!session) {
			throw new Meteor.Error('bad-session');
		}
		return SightCall.auth(message.location.kiosk.handle, 'standard').data.token;
	},
	kiosk_voip_fail: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_voip_fail';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, {'kiosk.handle': true});
		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'voip'
		}, {
			$set: {
				'voip.state': 'failed',
			},
			$push: {
				'voip.history': { state: 'failed' }
			}
		});

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}

		return true;
	},
	kiosk_voip_enqueue: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_voip_enqueue';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })
		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'voip',
			'voip.state': 'ready'
		}, {
			$set: {
				'voip.state': 'queued',
				'voip.enqueuedAt': new Date
			},
			$push: {
				'voip.history': { state: 'queued' }
			}
		});

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}

		return true;
	},

	kiosk_recieve_reconnect_message: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_send_reconnect_message';
		var message = validateMessage(token, subject, Kiosk.schemas.log, { 'kiosk.handle': true });
		var session = Sessions.collection.findOne({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: {
				$exists: true,
				$ne: 'complete'
			}
		}, {
			fields: {
				_id: true
			}
		});

		if (!session) {
			throw new Meteor.Error('bad-session');
		}

		Kiosk.logs.insert({
			sessionId: message.data.session,
			kioskHandle: message.location.kiosk.handle,
			message: message.data.message
		});
	},

	kiosk_voip_reenqueue: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_voip_reenqueue';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true })
		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'voip',
			'voip.state': 'failed'
		}, {
			$set: {
				'voip.state': 'queued'
			},
			$push: {
				'voip.history': { state: 'queued' }
			}
		});

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}

		return true;
	},

	kiosk_voip_finish: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_voip_finish';
		var message = validateMessage(token, subject, Kiosk.schemas.sessionId, { 'kiosk.handle': true });
		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'voip',
			'voip.state': 'assigned'
		}, {
			$set: {
				state: 'survey',
				'voip.state': 'done'
			},
			$push: {
				'voip.history': { state: 'done' }
			}
		});

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}

		return true;
	},

	kiosk_createSurvey: function(token) {
		this.unblock();
		check(token, String);
		var subject = 'kiosk_createSurvey';
		var message = validateMessage(token, subject, Kiosk.schemas.createSurvey, { 'kiosk.handle': true });

		var update = {
			$set: {
				state: 'complete',
				'complete.condition': 'finished'
			}
		};

		if(message.data.survey) {
			update.$set['survey.form'] = message.data.survey;
		} else {
			update.$set['survey.skipped'] = true;
		}
		var session = Sessions.collection.update({
			_id: message.data.session,
			'location.id': message.location._id,
			'location.kioskHandle': message.location.kiosk.handle,
			state: 'survey'
		}, update);

		if (session === 0) {
			throw new Meteor.Error('bad-session');
		}

		return true;
	}
});
