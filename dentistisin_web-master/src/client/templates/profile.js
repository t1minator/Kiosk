var edit = new ReactiveVar(false);;

Template.profile.onCreated(function () {
	edit = new ReactiveVar(false);
});

Template.profile.helpers({
	edit: function() {
		return edit.get();
	}
		
});

Template._edit_user.onDestroyed(function () {
	AutoForm.resetForm('changeUser');
});

Template._user_details.events({
	'click #editUser': function(event) {
		edit.set(true);
	}
});


var loading = new ReactiveVar(false);

Template._edit_user.onCreated(function () {
	loading = new ReactiveVar(false);
});

Template._edit_user.helpers({
	loading: function() {
		return loading.get();
	}
});

AutoForm.hooks({
	changePassword: {
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			var self = this;
			Accounts.changePassword(insertDoc.currentPassword, insertDoc.newPassword, function(error) {
				if (error) {
					self.done(new Error(error));
				}
				self.done();
			});
			return false;
		},
		onError: function (formType, error) {
			this.validationContext.addInvalidKeys([{name: 'currentPassword', type: 'invalidPassword'}]);
		},
		onSuccess: function (formType, result) {
			this.resetForm();
		}
	},
	changeEmail: {
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			var self = this;
			insertDoc.password = Accounts._hashPassword(insertDoc.password);
			Meteor.call('updateEmail', insertDoc, function(error) {
				if (error) {
					self.done(new Error(error));
				}
				self.done();
			});
			return false;
		},
		onError: function (formType, error) {
			console.log(error);
		},
		onSuccess: function (formType, result) {
			this.resetForm();
		}
	},
	changeUser: {
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			var self = this;
			
			Meteor.call('updateUser', insertDoc, function(error) {
				
				if (error) {
					self.done(new Error(error));
				}
				self.done();
			});
			return false;
		},
		onError: function (formType, error) {
			this.validationContext.addInvalidKeys([{name: 'username', type: 'invalidUsername'}]);
		},
		onSuccess: function (formType, result) {
			edit.set(false);
			this.resetForm();
		}
	}
});

Template._list_verified_emails.helpers({
	verifiedEmails: function() {
		return _.filter(this.profile.emails, function(email) {
			return email.verified;
		});
	}
});

Template._list_unverified_emails.helpers({
	unverifiedEmails: function() {
		return _.filter(this.profile.emails, function(email) {
			return !email.verified;
		});
	}
});

Template._verified_email.helpers({
	canDelete: function() {
		if (Meteor.user() && Meteor.user()._id === this.data.profile._id) {
			return _.reduce(Meteor.user().emails, function(memo, email) {
				return memo + (email.verified ? 1 : 0);
			}, 0) >= 2;
		} else return false;
	}
});

Template._unverified_email.onCreated(function () {
	this.data.edit = new ReactiveVar(false);
});

Template._unverified_email.events({
	'click .remove': function() {
		this.edit.set(true);
	}
});

Template._unverified_email.helpers({
	editing: function() {
		return this.edit.get();
	}
});

Template._verified_email.events({

});

var loading = new ReactiveVar(false);
Template._admin_enable.events({
	'click #enableAcct': function() {
		loading.set(true);
		Meteor.call('activateUser', this.profile._id, function (error, result) {
			loading.set(false);
		});
	},
	'click #disableAcct': function() {
		loading.set(true);
		Meteor.call('disableUser', this.profile._id, function (error, result) {
			loading.set(false);
		});
	}
});

Template._admin_enable.helpers({
	loading: function() {
		return loading.get() ? 'loading' : '';
	}
});

Template.afFormGroup_textarea.helpers({
	innerContext: function afFormGroupContext(options) {
		var c = Utility.normalizeContext(options.hash, "afFormGroup_textarea");
		return {
			afFieldLabelAtts: formGroupLabelAtts(c.atts),
			afFieldInputAtts: formGroupInputAtts(c.atts),
			atts: {name: c.atts.name}
		};
	}
});