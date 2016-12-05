Schemas = {};

Schemas.RegEx = {};
Schemas.RegEx.UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
Schemas.RegEx.secret = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\-_]{43}$/;
Schemas.RegEx.code = /^[0-9]{8}$/;

Schemas.Object = {};
Schemas.Object.Location = {
	'name': {
		label: 'Name',
		type: String,
		//unique: true,
		index: 'text',
		max: 100,
		denyUpdate: false,
		autoform: {
			placeholder: 'A unique location name'
		}
	},
	address: {
		label: 'Address',
		type: Object
	},
	'address.one': {
		type: String,
		max: 100,
		autoform: {
			placeholder: 'Address Line 1'
		}
	},
	'address.two': {
		type: String,
		max: 100,
		optional: true,
		autoform: {
			placeholder: 'Address Line 2'
		}
	},
	'address.city': {
		type: String,
		max: 100,
		autoform: {
			placeholder: 'City'
		}
	},
	'address.state': {
		type: String,
		allowedValues: [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ]
	},
	'address.zip': {
		type: String,
		regEx: SimpleSchema.RegEx.ZipCode,
		autoform: {
			placeholder: 'Zip'
		}
	},
	contact: {
		label: 'Contact Information',
		type: Object
	},
	'contact.name': {
		type: String,
		max: 100,
		autoform: {
			placeholder: 'Name'
		}
	},
	'contact.number': {
		type: String,
		max: 25,
		autoform: {
			placeholder: 'Phone Number'
		}
	},
	'contact.fax': {
		type: String,
		max: 25,
		autoform: {
			placeholder: 'Fax Number'
		}
	},
	kiosk: {
		type: Object
	},
	'kiosk.active': {
		type: Boolean,
		autoform: {
			defaultValue: true
		}
	}
};

Schemas.Location = new SimpleSchema(Schemas.Object.Location);

Schemas.DentistNotes = new SimpleSchema({
	clinicalImpression: {
		type: String,
		label: 'Clinical Impressions',
		max: 5000
	},
	recommendation: {
		type: String,
		label: 'Recommendations',
		max: 5000
	},
	recommendedPrescriptions: {
		type: String,
		label: 'Recommended Prescriptions',
		max: 5000
	},
	sessionId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});
