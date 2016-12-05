Accounts.emailTemplates.siteName = "Dentist is IN";
Accounts.emailTemplates.from = "Dentist is IN Admin <no-reply@dentistisin.com>";

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset-password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify-email/' + token);
};

Accounts.urls.enrollAccount = function (token) {
	return Meteor.absoluteUrl('enroll-account/' + token);
};

var validGroup = Match.Where(function (x) {
	check(x, String);
	return /^ta|ma|dentist$/.test(x);
});

var validId = Match.Where(function (x) {
	check(x, String);
	return SimpleSchema.RegEx.Id.test(x);
});

var validUsername = Match.Where(function (x) {
	check(x, String);
	return /^[a-z0-9A-Z_]{6,20}$/.test(x);
});

var validEmail = Match.Where(function (x) {
	check(x, String);
	return SimpleSchema.RegEx.Email.test(x);
});

var changeEmailSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	},
	password: {
		type: Object
	},
	'password.digest': {
		type: String
	},
	'password.algorithm': {
		type: String,
		allowedValues: ['sha-256']
	}
});

var schema = new SimpleSchema({
	profile:{
		type: Object
	},
	'profile.name': {
		type: String
	},
	trueVault:{
		type: Object
	},
	'trueVault.id': {
		type: String
	},
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{6,20}$/,
		optional: true
	},
	address: {
		type: String,
		optional: true
	},
	phone: {
		type: String,
		regEx: /^[0-9]{10,13}$/,
		optional: true
	},
	emails: {
		type: [Object]
	},
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	'emails.$.verified': {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	roles: {
		type: [String]
	},
	active: {
		type: Boolean
	},
	loginFailures: {
		type: Number
	},
	status: {
		type: Object,
		optional: true
	},
	'status.online': {
		type: Boolean,
		optional: true
	},
	'status.lastLogin': {
		type: Object,
		optional: true
	},
	'status.lastLogin.date': {
		type: Date,
		optional: true
	},
	'status.lastLogin.ipAddr': {
		type: String,
		optional: true
	},
	'status.lastLogin.userAgent': {
		type: String,
		optional: true
	},
	'status.idle': {
		type: Boolean,
		optional: true
	},
	'status.lastActivity': {
		type: Date,
		optional: true
	}
});

Meteor.users.attachSchema(schema);

Meteor.publish('dentists.filter', function() {
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {
		return [];
	}
	return Meteor.users.find({}, { fields: { username: true } });
});

Meteor.publish('dentists.online', function() {
	if (!Roles.userIsInRole(this.userId, ['dentist', 'ma', 'ta'])) {
		return [];
	}
	Counts.publish(this, 'dentistsOnline', Meteor.users.find({ 'status.online': true }, { fields: { _id: true } }));
});

Meteor.publish('user.show', function(userId) {
	try {
		check(userId, validId);
	} catch (e) {
		return [];
	}
	var user = Meteor.users.findOne({_id: this.userId}, { fields: { username: true, roles: true }});
	if (user._id !== userId && !Roles.userIsInRole(user, ['ma', 'ta'])) {
		return [];
	}
	return Meteor.users.find({_id: userId}, { fields: { profile: true, trueVault: true, username: true, address: true, phone: true, emails: true, active: true, roles: true }});
});

var usersSort = new SimpleSchema({
	username: {
		type: Number,
		allowedValues: [1, -1],
		defaultValue: 1
	}
});

Meteor.publish('users', function(sort, limit) {
	var self = this;
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
		return [];
	}
	try {
		usersSort.clean(sort);
		check(sort, usersSort);
		check(limit, Match.Optional(Number));
	} catch (e) {
		return [];
	}
	limit = limit || 10;
	var usersCountHandle = Counts.publish(this, 'usersCount', Meteor.users.find({}, { fields: { _id: true } }), { noReady: true });
	
	return Meteor.users.find({}, {
		fields: {
			username: true,
			emails: true,
			active: true,
			roles: true
		},
		sort: sort,
		limit: limit
	});
	
});

Accounts.onCreateUser(function(options, user) {
	if (user.profile) delete user.profile;
	user.active = true;
	user.loginFailures = 0;
	var userId = TrueVault.createUser(user.emails[0].address);
	user.trueVault = { id: userId };
	var map = {
			'ta': TrueVault.groups.TA,
			'ma': TrueVault.groups.MA,
			'dentist': TrueVault.groups.DENTIST
		};
	TrueVault.updateGroup(map[options.roles], userId);
	user.profile = {name:options.name};
	user.roles = [options.roles];
	return user;
});

Accounts.validateLoginAttempt(function(attempt) {
	if (attempt.user && !attempt.user.active) throw new Meteor.Error('disabled');
	return true;
});

Accounts.validateLoginAttempt(function(attempt) {
	if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) return false;
	return true;
});

Accounts.onLogin(function(attempt) {
	Meteor.users.update({
		_id: attempt.user._id
	}, {
		$set: {
			loginFailures: 0
		}
	});
});

Accounts.onLoginFailure(function(attempt) {
	if(attempt.user) {
		if (attempt.user.loginFailures >= 4) {
			Meteor.users.update({
				_id: attempt.user._id
			}, {
				$inc: {
					loginFailures: 1
				},
				$set: {
					active: false
				}
			});
		} else {
			Meteor.users.update({
				_id: attempt.user._id
			}, {
				$inc: {
					loginFailures: 1
				}
			});
		}
	}
});

var checkPwd = function(user, pwd) {
	if (_.isString(user) || (_.isObject(user) && (!user.services || !user.services.password || !user.services.password ))) {
		var user = Meteor.users.findOne({
			_id: _.isString(user) ? user : user._id
		}, {
			fields: {
				'services.password.bcrypt': true
			}
		});
	}
	var result = Accounts._checkPassword(user, pwd);
	if (result.error) throw new Meteor.Error(403);
};

Meteor.methods({
	setGroup: function(userId, group) {
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(userId, validId);
			check(group, validGroup);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		var user = Meteor.users.findOne({_id: userId}, {
			fields: {
				'trueVault.id': true,
				roles: true
			}
		});
		var map = {
			'ta': TrueVault.groups.TA,
			'ma': TrueVault.groups.MA,
			'dentist': TrueVault.groups.DENTIST
		};
		user.roles = user.roles || ['dentist'];
		TrueVault.updateGroup(map[user.roles[0]], user.trueVault.id, true);
		TrueVault.updateGroup(map[group], user.trueVault.id);
		Meteor.users.update({_id: userId}, {
			$set: {
				roles: [ group ]
			}
		});
	},
	disableUser: function(userId) {
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(userId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		Meteor.users.update({
			_id: userId
		}, {
			$set: {
				active: false
			}
		});
	},
	activateUser: function(userId) {
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(userId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		Meteor.users.update({
			_id: userId
		}, {
			$set: {
				active: true
			}
		});
	},
	deleteUser: function(userId) {
		console.log("AVA 001 - " + userId);
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(userId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		var user = Meteor.users.findOne({_id: userId}, { fields: { 'trueVault.id': true }});
		console.log("AVA 002 - " + user.trueVault.id);
		//Meteor.users.remove({_id: userId});
		//TrueVault.deleteTVUser(user.trueVault.id);
	},
	// custom validation to ensure email doesn't already exist
	inviteUser: function(user) {
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(user, Match.Any);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		console.log(user);
		var accountId = Accounts.createUser({
			email: user.email,
			roles: user.roles,
			name: user.name
		});
		Accounts.sendEnrollmentEmail(accountId);
	},
	setUsername: function(username) {
		if (!this.userId) {
			throw new Meteor.Error(403);
		}
		try {
			check(username, validUsername);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		try {
			Meteor.users.update({
				_id: this.userId,
				username: {
					$exists: false
				}
			}, {
				$set: {
					username: username
				}
			});
		} catch (e) {
			if (e.name === 'MongoError') {
				var match = e.err.match(/E11000 duplicate key error index: ([^ ]+)/);
				if (match[1].indexOf('username') !== -1)
					throw new Meteor.Error('username-exists');
			}
		}
	},
	updateEmail: function(doc) {
		if (!this.userId) {
			throw new Meteor.Error(403);
		}
		try {
			changeEmailSchema.clean(doc);
			check(doc, changeEmailSchema);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		checkPwd(this.userId, doc.password);
		Meteor.users.update({
			_id: this.userId
		}, {
			$set: {
				emails: [{
					address: doc.email,
					verified: true
				}]
			}
		});
	},
	updateUser: function(docu) {
		if (!Roles.userIsInRole(this.userId, ['ma', 'ta'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(docu, Match.Any);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		try {
			Meteor.users.update({
				_id: docu.id
			}, {
				$set: {
					username: docu.username,
					address: docu.address,
					phone: docu.phone,
					emails: [{
						address: docu.email,
						verified: true
					}]
				}
			});
		} catch (e) {
			if (e.name === 'MongoError') {
				var match = e.err.match(/E11000 duplicate key error index: ([^ ]+)/);
				if (match[1].indexOf('username') !== -1){
					throw new Meteor.Error('username-exists');
				}	
			}
		}

	}
/**
	addEmail: function(obj) {
		if (!this.userId) {
			throw new Meteor.Error(403);
		}
		if (this.userId !== obj.userId) {
			throw new Meteor.Error(403);
		}
		try {
			// clean
			// validate
		} catch (e) {
			throw new Meteor.Error(400);
		}
		checkPwd(this.userId, obj.password);
		Meteor.users.update({
			_id: obj.userId
		}, {
			$addToSet: {
				emails: {
					address: obj.address,
					verified: false
				}
			}
		});
		Accounts.sendVerificationEmail(obj.userId, obj.email);
	},
	removeEmail: function(obj) {
		if (!this.userId) {
			throw new Meteor.Error(403);
		}
		if (this.userId !== obj.userId) {
			throw new Meteor.Error(403);
		}
		try {
			// clean
			// validate
		} catch (e) {
			throw new Meteor.Error(400);
		}
		var user = Meteor.user();
		checkPwd(user, obj.password);
		// In order to remove an e-mail it has to unverified or there must be another verified e-mail in the list
		var target;
		var emails = _.filter(user.emails, function(email) {
			if (email.address === obj.address) target = email;
			return email.verified;
		});
		if (!target) {
			throw new Meteor.Error(404);
		}
		if (target.verified && emails.length < 2) {
			throw new Meteor.Error(403);
		}
		Meteor.users.update({
			_id: obj.userId
		}, {
			$pull: {
				emails: {
					address: obj.address
				}
			}
		});
	}
**/
});

SyncedCron.add({
	name: 'Password Reset Token Expiration',
	schedule: function(parser) {
		return parser.text('every 1 hours');
	},
	job: function() {
		var date = new Date();
		date.setHours(date.getHours() - 24);
		Meteor.users.update({
			'services.password.reset.when': { $lt: date }
		}, {
			$unset: {
				'services.password.reset': true
			}
		}, {
			multi: true
		});
	}
});

SyncedCron.add({
	name: 'Email Verification Token Expiration',
	schedule: function(parser) {
		return parser.text('every 1 hours');
	},
	job: function() {
		var date = new Date();
		date.setHours(date.getHours() - 24);
		Meteor.users.update({}, {
			$pull: {
				'services.email.verificationTokens': { when: { $lt: date } }
			}
		}, {
			multi: true
		});
	}
});
