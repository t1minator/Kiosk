Users = {};

Meteor.users.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
});

Meteor.users.deny({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	}
	
});

Meteor.roles.deny({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
});

Accounts.config({
	sendVerificationEmail: true,
	forbidClientAccountCreation: true,
	loginExpirationInDays: 0
});


Users.inviteUserSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
		autoform: {
			placeholder: 'Name'
		}
	},
	roles: {
		type: String,
		label: 'User Role',
		allowedValues: [ 'dentist', 'ta', 'ma' ],
		autoform: {
			options: 'allowed'
		}
	},
	email: {
		type: String,
		label: 'Invitation Email',
		regEx: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		autoform: {
			placeholder: 'Email Address'
		}
	},
	confirmEmail: {
		type: String,
		label: 'Invitation Email (confirm)',
		autoform: {
			placeholder: 'Re-Enter Email Address'
		},
		custom: function() {
			if (this.value !== this.field('email').value) {
				return 'emailMismatch';
			}
		}
	}
});

Users.setUsernameSchema = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{6,20}$/,
		autoform: {
			label: false,
			placeholder: 'Username'
		}
	}
});
