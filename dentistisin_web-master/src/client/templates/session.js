Template.session_timeline.helpers({
	timeline: function(session) {
		events = [];
		events.push({
			type: 'created',
			at: session.createdAt,
			location: session.location
			//locationId: session.location._id,
			//name: session.location.name
		});
		if (session.form) {
			events.push({
				type: 'form',
				at: session.form.at,
			});
		}
		if (session.voip) {
			_.each(session.voip.history, function(event) {
				events.push(_.extend({}, event, { type: 'voip' }));
			});
		}
		if (session.dentistNotes) {
			events.push({
				type: 'notes',
				at: session.dentistNotes.at,
				dentist: session.dentist
				//dentistId: session.dentist._id,
				//username: session.dentist.username
			});
		}
		if (session.survey) {
			events.push({
				type: 'survey',
				at: session.survey.at,
				action: session.survey.skipped ? 'skipped' : 'completed'
			});
		}
		if (session.complete) {
			events.push({
				type: 'complete',
				at: session.complete.at,
				condition: session.complete.condition
			});
		}
		if (session.fax) {
			_.each(session.fax.history, function(event) {
				events.push(_.extend({}, event, { type: 'fax' }));
			});
		}
		events.sort(function(a,b) {
			return new Date(a.at) - new Date(b.at);
		});
		return events;
	},
	template: function() {
		return '_' + this.type;
	}
});

Template.registerHelper('timestamp', function(date) {
	if (!date) return 'Unknown';
	return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});


Template._voip.helpers({
	template: function() {
		return '_voip_' + this.state;
	}
});

Template._fax.helpers({
	template: function() {
		return '_fax_' + this.state;
	}
});

Template._survey.helpers({
	template: function() {
		return '_survey_' + this.action;
	}
});

Template._complete.helpers({
	template: function() {
		return '_complete_' + this.condition;
	}
});

var tfDict = {
	T: 'True',
	F: 'False'
};

Template.survey.helpers({
	qOne: function() {
		var dict = {
			FIVE_MINUTES: '1-5 minutes',
			TEN_MINUTES: '5-10 minutes',
			FIFTEEN_MINUTES: '10-15 minutes',
			TWENTY_MINUTES: '15-20 minutes'
		};
		return dict[this.waitTime];
	},
	qTwo: function() {
		return tfDict[this.understanding];
	},
	qThree: function() {
		var dict = {
			THREE_DAYS: '1-3 days',
			FIVE_DAYS: '3-5 days',
			NEVER: 'Never'
		};
		return dict[this.treatment];
	},
	qFour: function() {
		return tfDict[this.pleased];
	},
	qFive: function() {
		return tfDict[this.refer];
	}
});
