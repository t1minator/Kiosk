Sessions = {};

Sessions.collection = new Mongo.Collection('sessions');
Sessions.collection.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});

Sessions.schemas = {};

Sessions.schemas.dentistNotes = new SimpleSchema({
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

