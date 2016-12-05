Schemas.Object.LocationDB = {
	createdAt: {
		type: Date,
		index: 1,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	modifiedAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert || this.isUpdate) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	'kiosk.handle': {
		type: String,
		unique: true,
		regEx: Schemas.RegEx.UUID
	},
	'kiosk.apiKey': {
		type: String,
		unique: true,
		index: 1,
		regEx: Schemas.RegEx.UUID
	},
	'kiosk.secret': {
		type: String,
		regEx: Schemas.RegEx.secret
	},
	'kiosk.code': {
		type: String,
		regEx: Schemas.RegEx.code
	},
	'kiosk.trueVault': {
		type: Object
	},
/**
	'kiosk.trueVault.key': {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
**/
	'kiosk.trueVault.id': {
		type: String,
		regEx: Schemas.RegEx.UUID
	}
};

_.extend(Schemas.Object.LocationDB, Schemas.Object.Location);

Schemas.LocationDB = new SimpleSchema(Schemas.Object.LocationDB);

Schemas.Object.AccessLog = {
	at: {
		type: Date,
		autoValue: function() {
			var userId = this.siblingField('userId');
			var transId = this.siblingField('transId');
			var fax = this.siblingField('fax');
			if (userId.isSet || transId.isSet || fax.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	fax: {
		type: Boolean,
		optional: true
	},
	transId: {
		type: String,
		regEx: Schemas.RegEx.UUID,
		optional: true
	}
};

Schemas.AccessLog = new SimpleSchema(Schemas.Object.AccessLog);

Schemas.Object.TrueVaultRef = {
	docId: {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
	schemaId: {
		type: String,
		regEx: Schemas.RegEx.UUID,
		optional: true
	},
	vaultId: {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
	transId: {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
	accessLog: {
		type: [Schemas.AccessLog]
	}
};

Schemas.TrueVaultRef = new SimpleSchema(Schemas.Object.TrueVaultRef);

var voipState = ['ready', 'queued', 'assigned', 'failed', 'done'];

Schemas.Object.VoipHistory = {
	at: {
		type: Date,
		autoValue: function() {
			var state = this.siblingField('state');
			if (state.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	state: {
		type: String,
		allowedValues: voipState
	},
	reason: {
		type: String,
		optional: true
	},
	dentist: {
		type: Object,
		optional: true,
	},
	'dentist.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'dentist.username': {
		type: String
	},
/**
	dentistId: {
		type: String,
		optional: true,
		regEx: SimpleSchema.RegEx.Id
	},
**/
	location: {
		type: Object,
		optional: true
	},
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'location.name': {
		type: String,
		max: 100,
	},
	'location.kioskHandle': {
		type: String,
		regEx: Schemas.RegEx.UUID
	}
/**
	kiosk: {
		type: Object,
		optional: true
	},
	'kiosk.locationId': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'kiosk.handle': {
		type: String,
		regEx: Schemas.RegEx.UUID
	}
**/
};

Schemas.VoipHistory = new SimpleSchema(Schemas.Object.VoipHistory);

var faxState = ['ready', 'locked', 'failed', 'sent', 'delivered'];

Schemas.Object.FaxHistory = {
	at: {
		type: Date,
		autoValue: function() {
			var state = this.siblingField('state');
			if (state.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	state: {
		type: String,
		allowedValues: faxState
	},
	reason: {
		type: String,
		optional: true
	},
	SendFaxQueueId: {
		type: String,
		optional: true
	}
};

Schemas.FaxHistory = new SimpleSchema(Schemas.Object.FaxHistory);

Schemas.SurveyForm = new SimpleSchema({
	waitTime: {
		type: String,
		allowedValues: ['FIVE_MINUTES', 'TEN_MINUTES', 'FIFTEEN_MINUTES', 'TWENTY_MINUTES']
	},
	understanding: {
		type: String,
		allowedValues: ['T', 'F']
	},
	treatment: {
		type: String,
		allowedValues: ['THREE_DAYS', 'FIVE_DAYS', 'NEVER']
	},
	pleased: {
		type: String,
		allowedValues: ['T', 'F']
	},
	refer: {
		type: String,
		allowedValues: ['T', 'F']
	}
});

Schemas.Object.SessionDB = {
	createdAt: {
		type: Date,
		index: 1,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	modifiedAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert || this.isUpdate) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	location: {
		type: Object
	},
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'location.name': {
		type: String,
		max: 100
	},
	'location.kioskHandle': {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
/**
	kiosk: {
		type: Object
	},
	'kiosk.locationId': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'kiosk.handle': {
		type: String,
		regEx: Schemas.RegEx.UUID
	},
**/
	dentist: {
		type: Object,
		optional: true
	},
	'dentist.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	'dentist.username': {
		type: String
	},
/**
	dentistId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
**/
	lang: {
		type: String,
		allowedValues: ['en', 'es']
	},
	state: {
		type: String,
		allowedValues: ['form', 'voip', 'survey', 'complete']
	},
	form: {
		type: Object,
		optional: true
	},
	'form.at': {
		type: Date,
		autoValue: function() {
			var ref = this.siblingField('trueVaultRef.docId');
			if (ref.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'form.trueVaultRef': {
		type: Schemas.TrueVaultRef
	},
	voip: {
		type: Object,
		optional: true
	},
	'voip.enqueuedAt': {
		type: Date,
		optional: true
	},
	'voip.state': {
		type: String,
		allowedValues: voipState
	},
	'voip.history': {
		type: [Schemas.VoipHistory]
	},
	survey: {
		type: Object,
		optional: true
	},
	'survey.at': {
		type: Date,
		autoValue: function() {
			var skipped = this.siblingField('skipped');
			var form = this.siblingField('form');
			if (skipped.isSet || form.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'survey.skipped': {
		type: Boolean,
		optional: true,
		autoValue: function() {
			var form = this.siblingField('form');
			if (form.isSet) {
				this.unset();
			}
		}
	},
	'survey.form': {
		type: Schemas.SurveyForm,
		optional: true,
		custom: function() {
			var skipped = this.siblingField('skipped');
			if (!skipped.isSet && !this.isSet) {
				return 'required';
			}
		}
	},
	complete: {
		type: Object,
		optional: true
	},
	'complete.at': {
		type: Date,
		autoValue: function() {
			var condition = this.siblingField('condition');
			if (condition.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'complete.condition': {
		type: String,
		allowedValues: ['timeout', 'inactive', 'finished']
	},
	fax: {
		type: Object,
		optional: true
	},
	'fax.state': {
		type: String,
		index: 1,
		allowedValues: faxState
	},
	'fax.history': {
		type: [Schemas.FaxHistory]
	},
	dentistNotes: {
		type: Object,
		optional: true
	},
	'dentistNotes.at': {
		type: Date,
		autoValue: function() {
			var ref = this.siblingField('trueVaultRef.docId');
			if (ref.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'dentistNotes.trueVaultRef': {
		type: Schemas.TrueVaultRef
	}
};

Schemas.SessionDB = new SimpleSchema(Schemas.Object.SessionDB);

Schemas.AccessCode = new SimpleSchema({
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

Schemas.Message = new SimpleSchema({
	aud: { type: String },
	exp: { type: Date },
	iat: { type: Date },
	iss: {
		type: String//,
		//regEx: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	},
	sub: { type: String },
	data: {
		// JSON String, might change to B64 encoding, but have to be careful with utf8 data
		type: String
		//type: Object,
		//blackbox: true
	}
});

Schemas.Object.SessionId = {
	session: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
};

Schemas.SessionId = new SimpleSchema(Schemas.Object.SessionId);

Schemas.CreateSurvey = new SimpleSchema(_.extend({
	survey: {
		type: Schemas.SurveyForm,
		optional: true
	}
}, Schemas.Object.SessionId));

Schemas.PatientForm = new SimpleSchema({
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
		type: Date
	},
	patientSexSex: {
		type: String,
		allowedValues: [ 'M', 'F' ]
	},
	patientContactEmail: {
		type: String,
		max: 100,
		regEx: SimpleSchema.RegEx.Email
	},
	patientContactPhone: {
		type: String,
		max: 25
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


Schemas.CreateForm = new SimpleSchema(_.extend({
	patient: {
		type: Schemas.PatientForm
	}
}, Schemas.Object.SessionId));
