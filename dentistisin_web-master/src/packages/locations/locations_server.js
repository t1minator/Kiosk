//var bcrypt = NpmModuleBcrypt;
//var bcryptHash = Meteor.wrapAsync(bcrypt.hash);
//var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);

var Uuid = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
var secret = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\-_]{43}$/;
var code = code = /^[0-9]{6}$/;

Locations._schemaObjectDB = {
	createdAt: {
		type: Date,
		index: 1,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	modifiedAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert || this.isUpdate) {
				return new Date;
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date };
			} else {
				this.unset();
			}
		}
	},
	'kiosk.handle': {
		type: String,
		unique: true,
		regEx: Uuid
	},
	'kiosk.apiKey': {
		type: String,
		unique: true,
		index: 1,
		regEx: Uuid
	},
	'kiosk.secret': {
		type: String,
		regEx: secret
	},
	'kiosk.code': {
		type: String,
		regEx: code
	},
	'kiosk.trueVault': {
		type: Object
	},
	'kiosk.trueVault.id': {
		type: String,
		regEx: Uuid
	}
};

_.extend(Locations._schemaObjectDB, Locations._schemaObject);

Locations.schemaDB = new SimpleSchema(Locations._schemaObjectDB);

Locations.collection.attachSchema(Locations.schemaDB);

var validId = Match.Where(function (x) {
	check(x, String);
	return SimpleSchema.RegEx.Id.test(x);
});

var getSecretString = function (secret) {
	if (typeof secret === 'string') {
		secret = SHA256(secret);
	} else {
		if (secret.algorithm !== 'sha-256') {
			throw new Error('Invalid secret hash algorithm. Only "sha-256" is allowed.');
		}
		secret = secret.digest;
	}
	return secret;
};

var hashSecret = function (secret) {
	secret = getSecretString(secret);
	return bcryptHash(secret, 10);
};

Locations._checkSecret = function (location, secret) {
	secret = getSecretString(secret);
	if (!bcryptCompare(secret, location.kiosk.secret)) {
		return false;
	}
	return true;
};

Meteor.methods({
	createLocation: function(location) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			Locations.schema.clean(location);
			check(location, Locations.schema);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		location.kiosk.handle = UUID.v4();
		location.kiosk.apiKey = UUID.v4();
		var secret = Random.secret();
		// TODO: switch to OTP -> JWT authentication
		location.kiosk.secret = secret;//hashSecret(secret);
		location.kiosk.code = Random._randomString(6, '0123456789');
		// TODO: Remove password from TrueVault.createUser
		var result = TrueVault.createUser(location.name);
		location.kiosk.trueVault = {
			id: result
		};
		TrueVault.updateGroup(TrueVault.groups.KIOSK, result);
		try {
			var locationId = Locations.collection.insert(location);
		} catch (e) {
			if (e.name === 'MongoError') {
				if (/E11000/.test(e.err))
					throw new Meteor.Error('location-exists');	
			}
		}
		return locationId;
	},
	updateLocation: function(modifier, locationId) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(locationId, validId);
			Locations.schema.clean(modifier, { isModifier: true });
			check(modifier, Match.Where(function (x) {
				var ctx = Locations.schema.newContext();
				return ctx.validate(x, { modifier: true });
			}));
			
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(400);
		}
		if (modifier.$set && modifier.$set.kiosk && _.has(modifier.$set.kiosk, 'active')) {
			modifier.$set['kiosk.active'] = modifier.$set.kiosk.active;
			delete modifier.$set.kiosk;
		}
		return !!Locations.collection.update({_id: locationId}, modifier);
	},
	//flipActive: function(locationId) {
	newCode: function(locationId) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(locationId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		return !!Locations.collection.update({_id: locationId}, {
			$set: {
				'kiosk.code': Random._randomString(6, '0123456789')
			}
		});
	},
	newSecret: function(locationId) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(locationId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		var secret = Random.secret();
		//var result = Locations.collection.update({_id: locationId}, {
		return !!Locations.collection.update({_id: locationId}, {
			$set: {
				'kiosk.secret': secret//hashSecret(secret)
			}
		});
		//if (result) return secret;
		//else return false;
	},
	setKioskActive: function(locationId) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(locationId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		Locations.collection.update({_id: locationId}, {
			$set: {
				'kiosk.active': true
			}
		});
	},
	setKioskInactive: function(locationId) {
		if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(locationId, validId);
		} catch (e) {
			throw new Meteor.Error(400);
		}
		Locations.collection.update({_id: locationId}, {
			$set: {
				'kiosk.active': false
			}
		});
	}
});

var fields = {
	name: true,
	address: true,
	contact: true,
	'kiosk.active': true,
	'kiosk.apiKey': true,
	'kiosk.secret': true,
	'kiosk.code': true
};

var locationsSort = new SimpleSchema({
	name: {
		type: Number,
		allowedValues: [1, -1],
		defaultValue: 1
	}
});

var locationsFilter = new SimpleSchema({
	date: {
		type: Date,
		autoValue: function() {
			if (!this.isSet) return new Date();
		}
	},
	start: {
		type: Date,
		autoValue: function() {
			var date = this.siblingField('date');
			if (date.isSet) {
				//if (_.isFunction(date.value)) date = date.value();
				//else date = date.value;
				date = date.value;
				var year = date.getFullYear();
				var month = date.getMonth();
				return new Date(year, month, 1);
			} else {
				this.unset();
			}
		}
	},
	end: {
		type: Date,
		autoValue: function() {
			var date = this.siblingField('date');
			if (date.isSet) {
				//if (_.isFunction(date.value)) date = date.value();
				//else date = date.value;
				date = date.value;
				var year = date.getFullYear();
				var month = date.getMonth();
				//return new Date(year, month + 1, 0, 23, 59, 59, 999);
				return new Date(year, month + 1);
			} else {
				this.unset();
			}
		}
	}
});

var locationFilter = new SimpleSchema({
	location: {
		type: Object,
	},
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	start: {
		type: Date
	},
	end: {
		type: Date,
	}
});

Meteor.publish('locations.filter', function() {
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
		return [];
	}
	return Locations.collection.find({}, {
		fields: {
			name: true
		}
	});
});

Meteor.publish('locations', function(filter, sort, limit) {
	var self = this;
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
		return [];
	}
	try {
		locationsFilter.clean(filter);
		locationsSort.clean(sort);
		check(filter, locationsFilter);
		check(sort, locationsSort);
		check(limit, Match.Optional(Number));
	} catch (e) {
		return [];
	}
	limit = limit || 10;

	var locationsCountHandle = Counts.publish(this, 'locationsCount', Locations.collection.find({}, { fields: { _id: true } }), { noReady: true });
	var initializing = true;
	var countHandles = {};
	var handle = Locations.collection.find({}, {
		fields: {
			name: true,
			address: true,
			'contact.name': true,
			'contact.number': true
		},
		sort: sort,
		limit: limit
	}).observeChanges({
		added: function(id, fields) {
			countHandles[id] = {};
			var query = { 'location.id': id, createdAt: { $gte: filter.start, $lt: filter.end } };
			var options = { noReady: true };
			countHandles[id].inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandles[id].finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandles[id].inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandles[id].timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);
		},
		changed: function(id, fields) {
			self.changed('locations', id, fields);
		},
		removed: function(id) {
			countHandles[id].inprogress.stop();
			countHandles[id].finished.stop();
			countHandles[id].inactive.stop();
			countHandles[id].timeout.stop();
			self.removed('locations', id);
		}
	});

	self.ready();
	self.onStop(function() {
		locationsCountHandle.stop();
		_.each(countHandles, function(id) {
			id.inprogress.stop();
			id.finished.stop();
			id.inactive.stop();
			id.timeout.stop();
		});
		handle.stop();
	});
});

Meteor.publish('location', function(filter) {
	var self = this;
	if (!Roles.userIsInRole(this.userId, ['ta', 'ma'])) {
		return [];
	}
	try {
		locationFilter.clean(filter);
		check(filter, locationFilter);
	} catch (e) {
		return [];
	}
	var countHandle = {};
	var handle = Locations.collection.find({_id: filter.location.id}, {
		fields: fields
	}).observeChanges({
		added: function(id, fields) {
			var query = { 'location.id': filter.location.id, createdAt: { $gte: filter.start, $lte: filter.end }};
			var options = { noReady: true };
			countHandle.inprogress = Counts.publish(self, 'locations.'+id+'.inprogress', Sessions.collection.find(_.extend(query, {'complete.condition': { $exists: false }})), options);
			countHandle.finished = Counts.publish(self, 'locations.'+id+'.finished', Sessions.collection.find(_.extend(query, {'complete.condition': 'finished'})), options);
			countHandle.inactive = Counts.publish(self, 'locations.'+id+'.inactive', Sessions.collection.find(_.extend(query, {'complete.condition': 'inactive'})), options);
			countHandle.timeout = Counts.publish(self, 'locations.'+id+'.timeout', Sessions.collection.find(_.extend(query, {'complete.condition': 'timeout'})), options);
			self.added('locations', id, fields);
		},
		changed: function(id, fields) {
			self.changed('locations', id, fields);
		},
		removed: function(id) {
			countHandle.inprogress.stop();
			countHandle.finished.stop();
			countHandle.inactive.stop();
			countHandle.timeout.stop();
			self.removed('locations', id);
		}
	});

	self.ready();
	self.onStop(function() {
		countHandle.inprogress.stop();
		countHandle.finished.stop();
		countHandle.inactive.stop();
		countHandle.timeout.stop();
		handle.stop();
	});
});
