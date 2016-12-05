var conf = {
	allowPassphrases: true,
	maxLength: 128,
	minLength: 10,
	minPhraseLength: 20,
	minOptionalTestsToPass: 4
};
owaspPasswordStrengthTest.config(conf);

var errors = ['The password must be at least ' + conf.minLength + ' characters long.',
              'The password must be fewer than ' + conf.maxLength + ' characters.',
              'The password may not contain sequences of three or more repeated characters.',
              'The password must contain at least one lowercase letter.',
              'The password must contain at least one uppercase letter.',
              'The password must contain at least one number.',
              'The password must contain at least one special character.'];

Template.registerHelper('passwordRequirements', function() {
	return errors;
});

var msgs = {
	'passwordMismatch': 'Passwords do not match.',
	'invalidPassword': 'Invalid password.'
};
_.each(errors, function(error, idx) {
	msgs['password'+idx] = error;
});

SimpleSchema.messages(msgs);

Users.resetPasswordSchema = new SimpleSchema({
	newPassword: {
		type: String,
		autoform: {
			type: 'password',
			placeholder: 'New Password',
			autocomplete: 'off'
		},
		custom: function() {
			var result = owaspPasswordStrengthTest.test(this.value);
			if (result.errors.length > 0) {
				return 'password' + result.failedTests[0];
			}
		}
	},
	confirmPassword: {
		type: String,
		autoform: {
			type: 'password',
			placeholder: 'New Password (confirm)'
		},
		custom: function() {
			if (this.value !== this.field('newPassword').value) {
				return 'passwordMismatch';
			}
		}
	}
});

Users.changePasswordSchema = new SimpleSchema({
	currentPassword: {
		type: String,
		//label: 'Old Password',
		autoform: {
			type: 'password',
			//label: false,
			placeholder: 'Current Password'
		}
	},
	newPassword: {
		type: String,
		//label: 'New Password',
		autoform: {
			type: 'password',
			//label: false,
			placeholder: 'New Password'
		},
		custom: function() {
			var result = owaspPasswordStrengthTest.test(this.value);
			if (result.errors.length > 0) {
				//return result.errors[0];
				return 'password' + result.failedTests[0];
			}
		}
	},
	confirmPassword: {
		type: String,
		//label: 'New Password (confirm)',
		autoform: {
			type: 'password',
			//label: false,
			placeholder: 'New Password (confirm)'
		},
		custom: function() {
			if (this.value !== this.field('newPassword').value) {
				return 'passwordMismatch';
			}
		}
	}
});

Users.loginSchema = new SimpleSchema({
	username: {
		type: String,
		autoform: {
			label: false,
			placeholder: 'Username'
		}
	},
	password: {
		type: String,
		autoform: {
			label: false,
			placeholder: 'Password',
			autocomplete: 'off'
		}
	}
});

Users.forgotPasswordSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		autoform: {
			label: false,
			placeholder: 'Email Address'
		}
	}
});

Users.changeEmailSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		autoform: {
			label: false,
			placeholder: 'New Email Address'
		}
	},
	password: {
		type: String,
		autoform: {
			label: false,
			type: 'password',
			placeholder: 'Confirm Password'
		}
	}
});

var msgs = {
	'invalidUsername': 'Username already exists.'
};

SimpleSchema.messages(msgs);

Users.updateUserSchema = new SimpleSchema({
	username: {
		label: 'Username',
		unique: true,
		max: 20,
		type: String,
		regEx: /^[a-z0-9A-Z_]{6,20}$/,
		autoform: {
			placeholder: 'Username'
		}
	},
	address: {
		label: 'Address',
		type: String,
		autoform: {
			afFieldInput: {
				type: "textarea",
				placeholder: 'Address'
			}
		}
	},
	email: {
		label: 'Email Address',
		type: String,
		regEx: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		autoform: {
			placeholder: 'New Email Address'
		}
	},
	phone: {
		label: 'Phone number',
		type: String,
		regEx: /^[0-9]{10,13}$/,
		autoform: {
			placeholder: 'Contact Phone number'
		}
	},
	id: {
		type: String,
		autoform: {
		  afFieldInput: {
			type: "hidden"
		  },
		  afFormGroup: {
			label: false
		  }	
		}
	}
});

