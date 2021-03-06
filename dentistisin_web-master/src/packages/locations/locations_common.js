Locations = {};

Locations.collection = new Mongo.Collection('locations');
Locations.collection.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});

Locations._schemaObject = {
	'name': {
		label: 'Name',
		type: String,
		unique: true,
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
			label: 'Address',
			placeholder: 'Address Line 1'
		}
	},
	'address.two': {
		type: String,
		max: 100,
		optional: true,
		autoform: {
			label: false,
			placeholder: 'Address Line 2 (optional)'
		}
	},
	'address.city': {
		type: String,
		max: 100,
		autoform: {
			label: false,
			placeholder: 'City'
		}
	},
	'address.state': {
		type: String,
		allowedValues: [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ],
		autoform: {
			label: false,
			options: 'allowed'
		}
	},
	'address.zip': {
		type: String,
		regEx: SimpleSchema.RegEx.ZipCode,
		autoform: {
			label: false,
			placeholder: 'Zip'
		}
	},
	contact: {
		label: 'Contact Information',
		type: Object
	},
	'contact.name': {
		label: 'Contact Name',
		type: String,
		max: 100,
		autoform: {
			placeholder: 'Contact Name'
		}
	},
	'contact.number': {
		label: 'Contact Phone Number',
		type: String,
		max: 25,
		autoform: {
			placeholder: 'Phone Number'
		}
	},
	'contact.fax': {
		label: 'Fax Number',
		type: String,
		regEx: /^\d{11}$/,
		autoform: {
			placeholder: 'Fax Number'
		}
	},
	kiosk: {
		type: Object
	},
	'kiosk.active': {
		type: Boolean,
		defaultValue: true,
		autoform: {
			defaultValue: true
		}
	}
};
var msgs = {
	'invalidLocation': 'Name already exists.'
};

SimpleSchema.messages(msgs);

Locations.schema = new SimpleSchema(Locations._schemaObject);
