/**
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
	}
});
**/

Template.patient_form.rendered = function() {
	Session.setDefault('activeTab', 'patientInfo');
	this.$('.ui.checkbox').checkbox({
		onChecked: function() {
			Session.set('readAll', true);
		},
		onUnchecked: function() {
			Session.set('readAll', false);
		}
	});
};

Template.patient_form.events({
	'click #callPatient': function (event) {
		Session.set('enabledTab', true);
		Session.set('activeTab', 'dentistNotes');
		Session.set('disabledCall', true);
		console.log('call patient ' + this.patient.kiosk.handle);
		SightCall.call(this.patient.kiosk.handle);
	},
	'click #patientTab': function (event) {
		Session.set('activeTab', 'patientInfo');
	},
	'click #dentistTab': function (event) {
		Session.set('activeTab', 'dentistNotes');
	}
});

Template.patient_form.helpers({
	activeTab: function(tab) {
		return Session.equals('activeTab', tab) ? 'active' : '';
	},
	enabledTab: function() {
		return Session.get('enabledTab') ? '' : 'disabled';
	},
	disabledCall: function() {
		return Session.get('disabledCall') ? 'hidden' : '';
	},
	language: function() {
		if (this.patient.lang === 'en') return 'English';
		if (this.patient.lang === 'es') return 'Spanish';
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
		return this.patientDobDob;//moment(this.patientDobDob).format('MM-DD-YYYY');
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
	readAll: function() {
		return Session.get('readAll') ? '' : 'disabled';
	}
});
