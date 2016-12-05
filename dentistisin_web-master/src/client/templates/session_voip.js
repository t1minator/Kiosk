ReactiveTabs.createInterface({
	template: 'session_voip_tabs'
});

AutoForm.addHooks('createDentistNotes', {
	formToDoc: function(doc) {
		doc.sessionId = Router.current().params.sessionId;
		return doc;
	},
	docToForm: function(doc) {
		delete doc.sessionId;
		return doc;
	},
	onSuccess: function(formType, result) {
		SightCall.hangup();
		Router.go('/queue');
		activeTab.set('patient_info');
	}
});

var readAll = new ReactiveVar(false);
var canSubmit = new ReactiveVar(false);
var activeTab = new ReactiveVar('patient_info');
var location_patient = '';

Template.patient_info_form.rendered = function() {
	this.$('.ui.checkbox').checkbox({
		onChecked: function() {
			readAll.set(true);
			//Session.set('readAll', true);
		},
		onUnchecked: function() {
			readAll.set(false);
			//Session.set('readAll', false);
		}
	});
};

Template.patient_info_form.events({
	'click #callPatient': function (event) {
		//SightCall.call(this.patient.location.kioskHandle);
		//Session.set('activeTab', 'dentist_notes');
		location_patient = this.location.kioskHandle;
		console.log('location call '+ this.location.kioskHandle);
		SightCall.call(this.location.kioskHandle);
		activeTab.set('dentist_notes');
	}
	
});

Template.session_voip.events({
	'click #tryCallToPatient' : function(event){
		console.log('location try to call '+location_patient);
		//SightCall.rtcc.destroy
		SightCall.initReconnect(location_patient);
	}
});

Template.patient_info_form.helpers({
	readAll: function() {
		return readAll.get() ? '' : 'disabled'; //Session.get('readAll') ? '' : 'disabled';
	},
	scReady: function() {
		return SightCall.ready.get() ? '' : 'loading'; //Session.get('scReady') ? '' : 'loading';
	},
	callActive: function() {
		return SightCall.callActive.get(); //Session.get('callActive');
	}
});

Template.patient_info.helpers({
	language: function() {
		if (this.lang) {
			return this.lang === 'en' ? 'English' : 'Spanish';
		}
	},
	name: function() {
		var name = this.patientNameFirst;
		if (this.patientNamePreferred) name += ' (' + this.patientNamePreferred + ')';
		if (this.patientNameMiddle) name += ' ' + this.patientNameMiddle;
		name += ' ' + this.patientNameLast;
		return name;
	},
	sex: function() {
		if (this.patientSexSex === 'F') return 'Female';
		else return 'Male';
	},
	dob: function() {
		return _.isNumber(this.patientDobDob) ? moment(this.patientDobDob).format('LL') : this.patientDobDob;
	},
	payment: function(option) {
		if (this.patientInsuranceInsurance === 'Self') return 'Self Pay';
		else return this.patientInsuranceInsurance;
	},
	conditions: function() {
		var self = this;
		var table = {
                        medicalConditionsHivAids: 'HIV/AIDS',
                        medicalConditionsPregnant: 'Pregnant/Trying to get Pregnant',
                        medicalConditionsContraceptives: 'Taking Contraceptives',
                        medicalConditionsCancer: 'Cancer',
                        medicalConditionsDiabetes: 'Diabetes',
                        medicalConditionsHeart: 'Heart Condition',
                        medicalConditionsBlood: 'Blood Pressure Issues',
                        medicalConditionsKidneyLiver: 'Kidney or Liver Issues',
                        medicalConditionsStomach: 'Stomach Problems',
                        medicalConditionsBleeding: 'Bleeding Problems',
                        medicalConditionsPsychiatric: 'Psychiatric Care',
                        medicalConditionsRadiation: 'Radiation Treatment to the Head and Neck',
		};
		var re = /^medicalCondition/;
		var list = _.reduce(self, function(memo, val, key) {
			if (re.test(key) && val) {
				if (memo === '') return table[key];
				else return memo + ', ' + table[key];
			} else return memo;
		}, '');

		if (list === '') return 'None';
		else return list;
	},
	medications: function() {
		if (!this.medicalMedications || this.medicalMedications === '') return 'None';
		else return this.medicalMedications;
	},
	allergies: function() {
		var self = this;
		var table = {
			medicalAllergiesAspirin: 'Aspirin',
			medicalAllergiesCodeine: 'Codeine',
			medicalAllergiesPenicillin: 'Penicillin',
			medicalAllergiesSulfa: 'Sulfa Drugs'
		};
		var re = /^medicalAllergies/;
		var list = _.reduce(self, function(memo, val, key) {
			if (re.test(key) && key !== 'medicalAllergiesOther' && val) {
				if (memo === '') return table[key];
				else return memo + ', ' + table[key];
			} else return memo;
		}, '');
		if (self.medicalAllergiesOther) list += ', ' + self.medicalAllergiesOther;
		if (list === '') return 'None';
		else return list;
	},
	swelling: function() {
		return this.dentalSwelling === 'Y' ? 'Yes' : 'No';
	}
});

Template._end_call.rendered = function() {
	this.$('.ui.checkbox').checkbox({
		onChecked: function() {
			canSubmit.set(true);
		},
		onUnchecked: function() {
			canSubmit.set(false);
		}
	});
};

Template._end_call.helpers({
	canSubmit: function() {
		return canSubmit.get() ? '' : 'disabled';
	}
});

Template.dentist_notes_form.helpers({
	callActive: function() {
		//return SightCall.callActive.get() ? '' : 'disabled'; //Session.get('callActive') ? '' : 'disabled';
		//return SightCall.callActive.get();
		//return SightCall.callActive.get() ? '' : 'disabled';
		return SightCall.callActive.get() ? true : false;
	}
});

Template.session_voip.helpers({
	tabs: function() {
		return [
			{ name: 'Patient Information', slug: 'patient_info' },
			{ name: 'Dentist Notes', slug: 'dentist_notes' }
		];
	},
	activeTab: function() {
		return activeTab.get();//Session.get('activeTab');
	}
});

Template.session_voip.onCreated(function() {
	SightCall.errorCallback = function(msg) {
		Meteor.call('voipFail', Router.current().params.sessionId);
		Router.go('/queue', {}, {query: { error: msg }});
		activeTab.set('patient_info');
	};
});

Template.session_voip.onDestroyed(function() {
	SightCall.errorCallback = function() {};
});
