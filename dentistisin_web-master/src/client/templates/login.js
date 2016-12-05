var error;
var forgot;
var sent;
var inviteUser = new ReactiveVar(false);
Template._login.events({
	'click #forgotPasswordLink': function() {
		error.set(false);
		sent.set(false);
		forgot.set(true);
	},
	'click #inviteUserEmail': function(){
		inviteUser.set(true);
	}
});

Template.login.onCreated(function() {
	error = new ReactiveVar(false);
	forgot = new ReactiveVar(false);
	sent = new ReactiveVar(false);
});

Template.login.helpers({
	error: function() {
		var rv = error.get();
		if (!rv) return null;
		if (rv === 'disabled') {
			return 'This account has been disabled';
		} else {
			return 'Incorrect name or password';
		}
	},
	sent: function() {
		var rv = sent.get();
		if (rv) return 'Email sent';
		else return false;
	},
	forgotPassword: function() {
		return forgot.get();
	}
});

AutoForm.hooks({
	forgotPasswordForm: {
		onSubmit: function(insertDoc) {
			sent.set(false);
			error.set(false);
			var self = this;
			Accounts.forgotPassword({
				email: insertDoc.email
			}, function(error) {
				console.log(error);
				// The Meteor account system reports WAAAAAAY too much on an error...
				self.resetForm();
				forgot.set(false);
				sent.set(true);
			});
			return false;
		}
	}
});

AutoForm.hooks({
	loginForm: {
		onSubmit: function(insertDoc) {
			sent.set(false);
			error.set(false);
			var self = this;
			var user = {
				email: 'binhdarkcu@gmail.com',
				roles: 'ta',
				name: 'binhlam'
			};
			Meteor.loginWithPassword(insertDoc.username, insertDoc.password, function(error) {
				if (error) {
					self.done(error);
				} else {
					self.resetForm();
					self.done();
				}
			});
			return false;
		},
		onError: function(formType, errorResult) {
			error.set(errorResult.error);
		}
	}
});
