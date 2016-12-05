Template.queue.helpers({
	isDisabled: function(lang) {
		return Counts.get(lang + 'PatientQueue') > 0 ? '' : 'disabled';
	},
	error: function() {
			return null;//'Hi';
	}
});

Template.queue.events({
	'click #next-en-patient': function (event) {
		Meteor.call('getNextPatient', 'en', function(e, r) {
			if (e) {
				console.log(e);
			}
			if (r) {
				Router.go('session.voip.show', { sessionId: r });
			}
		});
	},
	'click #next-es-patient': function (event) {
		Meteor.call('getNextPatient', 'es', function(e, r) {
			if (e) {
				console.log(e);
			}
			if (r) {
				Router.go('session.voip.show', { sessionId: r });
			}
		});
	}
});

var beep;
var handle;
var playSound = function() {
	var en = Counts.findOne({_id: 'enPatientQueue'});
	var es = Counts.findOne({_id: 'esPatientQueue'});
	if ((en && en.count && en.count > 0) ||
	    (es && es.count && es.count > 0)) {
		beep.play();
	}
};

Template.queue.onRendered(function () {
	beep = this.$('#newPatientBeep')[0];
	handle = Meteor.setInterval(playSound, 5000);
	//handle = Counts.find({_id: 'patientQueue'}).observe({
	//	changed: function(newDoc, oldDoc) {
	//		if (newDoc.count > oldDoc.count) {
	//			beep.play();
	//		}
	//	}
	//});
});

Template.queue.onDestroyed(function () {
	if (handle) {
		//handle.stop();
		Meteor.clearInterval(handle);
	}
});
