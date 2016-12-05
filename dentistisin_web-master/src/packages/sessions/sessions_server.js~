var UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

var accessLog = new SimpleSchema({
	at: {
		type: Date,
		autoValue: function() {
			var userId = this.siblingField('userId');
			var transId = this.siblingField('transId');
			var fax = this.siblingField('fax');
			if (userId.isSet || transId.isSet || fax.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	fax: {
		type: Boolean,
		optional: true
	},
	transId: {
		type: String,
		regEx: UUID,
		optional: true
	}
});

var trueVaultRef = new SimpleSchema({
	docId: {
		type: String,
		regEx: UUID
	},
	schemaId: {
		type: String,
		regEx: UUID,
		optional: true
	},
	vaultId: {
		type: String,
		regEx: UUID
	},
	transId: {
		type: String,
		regEx: UUID
	},
	accessLog: {
		type: [accessLog]
	}
});

var voipState = ['ready', 'queued', 'assigned', 'failed', 'done'];


var voipHistory = new SimpleSchema({
	at: {
		type: Date,
		autoValue: function() {
			var state = this.siblingField('state');
			if (state.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	state: {
		type: String,
		allowedValues: voipState
	},
	reason: {
		type: String,
		optional: true
	},
	dentist: {
		type: Object,
		optional: true,
	},
	'dentist.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'dentist.username': {
		type: String
	},
	location: {
		type: Object,
		optional: true
	},
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'location.name': {
		type: String,
		max: 100,
	},
	'location.kioskHandle': {
		type: String,
		regEx: UUID
	}
});

var faxState = ['ready', 'locked', 'failed', 'sent', 'delivered'];

var faxHistory = new SimpleSchema({
	at: {
		type: Date,
		autoValue: function() {
			var state = this.siblingField('state');
			if (state.isSet && !this.isSet) {
				return new Date;
			}
		}
	},
	state: {
		type: String,
		allowedValues: faxState
	},
	reason: {
		type: String,
		optional: true
	},
	SendFaxQueueId: {
		type: String,
		optional: true
	},
	resultCode: {
		type: Number,
		optional: true
	},
	errorCode: {
		type: Number,
		optional: true
	},
	resultMessage: {
		type: String,
		optional: true
	},
	faxId: {
		type: String,
		optional: true
	},
	outboundFaxId: {
		type: String,
		optional: true
	},
	pages: {
		type: Number,
		optional: true
	},
	attempts: {
		type: Number,
		optional: true
	}
});

var tf = ['T', 'F'];

Sessions.schemas.surveyForm = new SimpleSchema({
	waitTime: {
		type: String,
		allowedValues: ['FIVE_MINUTES', 'TEN_MINUTES', 'FIFTEEN_MINUTES', 'TWENTY_MINUTES']
	},
	understanding: {
		type: String,
		allowedValues: tf
	},
	treatment: {
		type: String,
		allowedValues: ['THREE_DAYS', 'FIVE_DAYS', 'NEVER']
	},
	pleased: {
		type: String,
		allowedValues: tf
	},
	refer: {
		type: String,
		allowedValues: tf
	}
});

var langOptions = ['en', 'es'];

var validLang = Match.Where(function (x) {
	check(x, String);
	return /^en|es$/.test(x);
});

Sessions.schemaDB = new SimpleSchema({
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
	location: {
		type: Object
	},
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	'location.name': {
		type: String,
		max: 100
	},
	'location.kioskHandle': {
		type: String,
		regEx: UUID
	},
	dentist: {
		type: Object,
		optional: true
	},
	'dentist.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	'dentist.username': {
		type: String
	},
	lang: {
		type: String,
		allowedValues: langOptions
	},
	state: {
		type: String,
		allowedValues: ['form', 'voip', 'survey', 'complete']
	},
	form: {
		type: Object,
		optional: true
	},
	'form.at': {
		type: Date,
		autoValue: function() {
			var ref = this.siblingField('trueVaultRef.docId');
			if (ref.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'form.trueVaultRef': {
		type: trueVaultRef
	},
	voip: {
		type: Object,
		optional: true
	},
	'voip.enqueuedAt': {
		type: Date,
		optional: true
	},
	'voip.state': {
		type: String,
		allowedValues: voipState
	},
	'voip.history': {
		type: [voipHistory]
	},
	survey: {
		type: Object,
		optional: true
	},
	'survey.at': {
		type: Date,
		autoValue: function() {
			var skipped = this.siblingField('skipped');
			var form = this.siblingField('form');
			if (skipped.isSet || form.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'survey.skipped': {
		type: Boolean,
		optional: true,
		autoValue: function() {
			var form = this.siblingField('form');
			if (form.isSet) {
				this.unset();
			}
		}
	},
	'survey.form': {
		type: Sessions.schemas.surveyForm,
		optional: true,
		custom: function() {
			var skipped = this.siblingField('skipped');
			if (!skipped.isSet && !this.isSet) {
				return 'required';
			}
		}
	},
	complete: {
		type: Object,
		optional: true
	},
	'complete.at': {
		type: Date,
		autoValue: function() {
			var condition = this.siblingField('condition');
			if (condition.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'complete.condition': {
		type: String,
		allowedValues: ['timeout', 'inactive', 'finished']
	},
	fax: {
		type: Object,
		optional: true
	},
	'fax.state': {
		type: String,
		index: 1,
		allowedValues: faxState
	},
	'fax.history': {
		type: [faxHistory]
	},
	dentistNotes: {
		type: Object,
		optional: true
	},
	'dentistNotes.at': {
		type: Date,
		autoValue: function() {
			var ref = this.siblingField('trueVaultRef.docId');
			if (ref.isSet) {
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	'dentistNotes.trueVaultRef': {
		type: trueVaultRef
	}
});

Sessions.collection.attachSchema(Sessions.schemaDB);

var validId = Match.Where(function (x) {
	check(x, String);
	return SimpleSchema.RegEx.Id.test(x);
});

Meteor.methods({
	voipFail: function(sessionId) {
		this.unblock();
		var user = Meteor.users.findOne({
			_id: this.userId
		}, {
			fields: {
				roles: true
			}
		});
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {
			throw new Metoer.Error(403);
		}
		try {
			check(sessionId, validId);
		} catch (e) {
			throw new Meteor.Error(403);
		}

		var session = Sessions.collection.update({
			_id: sessionId,
			'dentist.id': user._id,
			state: 'voip',
			'voip.state': 'assigned'
		}, {
			$set: {
				'voip.state': 'failed',
			},
			$push: {
				'voip.history': { state: 'failed' }
			}
		});

		if (!session) {
			throw new Meteor.Error(404);
		}
	},
	getVoipToken: function() {
		if (!Roles.userIsInRole(this.userId, ['dentist', 'ma'])) {
			throw new Meteor.Error(403);
		}
		var result;
		try {
			result = SightCall.auth(this.userId, 'standard').data.token;
		} catch (e) {
			throw new Meteor.Error(500);
		}
		return result;
	},
	getNextPatient: function(lang) {
		var user = Meteor.users.findOne({
			_id: this.userId
		}, {
			fields: {
				username: true,
				roles: true
			}
		});
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			check(lang, validLang);
		} catch (e) {
			throw new Meteor.Error(403);
		}
		// This doesn't get checked by collection2
		// so be careful...
		var session = Sessions.collection.findAndModify({
			query: {
				state: 'voip',
				'voip.state': 'queued',
				lang: lang
			},
			sort: {
				'voip.enqueuedAt': 1
			},
			update: {
				$set: {
					'voip.state': 'assigned',
					dentist: {
						id: user._id,
						username: user.username
					}
				},
				$push: {
					// Manually include at
					'voip.history': {
						at: new Date,
						state: 'assigned',
						dentist: {
							id: user._id,
							username: user.username
						}
					}
				}
			},
			fields: {
				_id: true
			}
		});

		if (!session) {
			throw new Meteor.Error(404);
		}
		return session._id;
	},
	createDentistNotes: function(notes) {
		this.unblock();
		var user = Meteor.users.findOne({
			_id: this.userId
		}, {
			fields: {
				'trueVault.id': true,
				roles: true
			}
		});
		if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {
			throw new Meteor.Error(403);
		}
		try {
			Sessions.schemas.dentistNotes.clean(notes);
			check(notes, Sessions.schemas.dentistNotes);
		} catch (e) {
			throw new Meteor.Error(400);
		}

		var session = Sessions.collection.findOne({
			_id: notes.sessionId,
			'dentist.id': user._id,
			state: 'voip',
			'voip.state': 'assigned'
		}, {
			fields: {
				_id: true,
				'dentist.id': true,
				state: true,
				'voip.state': true
			}
		});

		if (!session) {
			throw new Meteor.Error(404);
		}

		var result;
		try {
			result = TrueVault.createDocument(notes, user.trueVault.id);
		} catch (e) {
			throw new Meteor.Error(500);
		}

		session['voip.state'] = session.voip.state;
		delete session.voip;
		session['dentist.id'] = session.dentist.id;
		delete session.dentist;
		session.dentistNotes = {
			$exists: false
		};

		var updated = Sessions.collection.update(session, {
			$set: {
				'dentistNotes.trueVaultRef.docId': result.docId,
				'dentistNotes.trueVaultRef.vaultId': result.vaultId,
				'dentistNotes.trueVaultRef.transId': result.transId,
				'fax.state': 'ready'
			},
			$push: {
				'fax.history': { state: 'ready' }
			}
		});

		if (updated === 0) {
			throw new Meteor.Error(404);
		}

		return true;
	}
});

var sessionsSort = new SimpleSchema({
	createdAt: {
		type: Number,
		allowedValues: [1, -1],
		optional: true,
		autoValue: function() {
			var location = this.field('location.name');
			var dentist = this.field('dentist.username');
			if (!location && !dentist) {
				return -1;
			}
		}
	},
	'location.name': {
		type: Number,
		allowedValues: [1, -1],
		optional: true
	},
	'dentist.username': {
		type: Number,
		allowedValues: [1, -1],
		optional: true
	}
});

var sessionsFilter = new SimpleSchema({
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	'dentist.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	start: {
		type: Date,
		optional: true
	},
	end: {
		type: Date,
		optional: true
	}
});

var sessionsStatisticsFilter = new SimpleSchema({
	'location.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	start: {
		type: Date
	},
	end: {
		type: Date
	}
});

Meteor.publish('sessions', function(filter, sort, limit) {
	var self = this;
	if (!Roles.userIsInRole(self.userId, ['ma', 'ta'])) {
		return [];
	}
	try {
		sessionsFilter.clean(filter);
		sessionsSort.clean(sort);
		check(filter, sessionsFilter);
		check(sort, sessionsSort);
		check(limit, Match.Optional(Number));
	} catch (e) {
		return [];
	}
	limit = limit || 10;
	if (filter.start || filter.end) {
		filter.createdAt = {};
		if (filter.start) filter.createdAt.$gte = filter.start;
		if (filter.end) filter.createdAt.$lte = filter.end;
		delete filter.start;
		delete filter.end;
	}
	if (filter.dentist && filter.dentist.id) {
		filter['dentist.id'] = filter.dentist.id;
		delete filter.dentist;
	}
	if (filter.location && filter.location.id) {
		filter['location.id'] = filter.location.id;
		delete filter.location;
	}
	sessionsCountHandle = Counts.publish(self, 'sessionsCount', Sessions.collection.find(filter, { fields: { _id: true } }), { noReady: true });
	var handle = Sessions.collection.find(filter, {
		fields: {
			createdAt: true,
			'location.name': true,
			'dentist.username': true,
			state: true,
			'complete.condition': true
		},
		sort: sort,
		limit: limit
	}).observeChanges({
		added: function(id, fields) {
			if (fields.complete && fields.complete.condition) {
				fields.state = fields.complete.condition;
				delete fields.complete;
			} else fields.state = 'inprogress';
			self.added('sessions', id, fields);
		},
		changed: function(id, fields) {
			if (fields.complete && fields.complete.condition) {
				fields.state = fields.complete.condition;
				delete fields.complete;
			} else if (fields.state) {
				fields.state = 'inprogress';
			}
			self.changed('sessions', id, fields);
		},
		removed: function(id) {
			self.removed('sessions', id);
		}
	});

	self.ready();
	self.onStop(function() {
		sessionsCountHandle.stop();
		handle.stop();
	});
});

Meteor.publish('sessions.statistics', function(filter) {
	var self = this;
	if (!Roles.userIsInRole(self.userId, ['ma', 'ta'])) {
		return [];
	}
	var initializing = true;
	try {
		sessionsStatisticsFilter.clean(filter);
		check(filter, sessionsStatisticsFilter);
	} catch (e) {
		return [];
	}
	filter.createdAt = {
		$gte: filter.start,
		$lte: filter.end
	};
	delete filter.start;
	delete filter.end;
	if (filter.location && filter.location.id) {
		filter['location.id'] = filter.location.id;
		delete filter.location;
	}
	var map = {};
	var locMap = {};
	var handle = Sessions.collection.find(filter, { fields: {
		'location.id': true,
		'complete.condition': true
	}}).observeChanges({
		added: function (id, fields) {
			var lId = fields.location.id;
			var cond;
			if (!map[lId]) map[lId] = { stats: { finished: 0, inactive: 0, timeout: 0, inprogress: 0 } };
			if (fields.complete && fields.complete.condition) {
				cond = fields.complete.condition;
			} else {
				cond = 'inprogress';
			}
			map[lId][id] = cond;
			map[lId].stats[cond]++;
			locMap[id] = lId;
			if (!initializing)
				self.changed('locations', lId, { aggregate: map[lId].stats });
		},
		changed: function (id, fields) {
			if (fields.complete && fields.complete.condition) {
				var lId = locMap[id];
				var cond = map[lId][id];
				map[lId].stats[cond]--;
				cond = fields.complete.condition;
				map[lId][id] = cond;
				map[lId].stats[cond]++;
				if (!initializing)
					self.changed('locations', lId, { aggregate: map[lId].stats });
			}
		},
		removed: function (id) {
			var lId = locMap[id];
			var cond = map[lId][id];
			map[lId].stats[cond]--;
			self.changed('locations', lId, { aggregate: map[lId].stats });
		}
	});

	_.each(map, function(value, key, list) {
		self.changed('locations', key, { aggregate: value.stats });
	});
	initializing = false;
	self.ready();

	self.onStop(function() {
		_.each(map, function(value, key, list) {
			self.changed('locations', key, { aggregate: undefined });
		});
		handle.stop();
	});
});

Meteor.publish('sessions.voip.count', function() {
	var self = this;
	if (!Roles.userIsInRole(self.userId, ['dentist', 'ma'])) {
		return [];
	}
	enQueueCountsHandle = Counts.publish(this, 'enPatientQueue', Sessions.collection.find({
		state: 'voip',
		'voip.state': 'queued',
		lang: 'en'
	}, { fields: { _id: true } }), { noReady: true });
	esQueueCountsHandle = Counts.publish(this, 'esPatientQueue', Sessions.collection.find({
		state: 'voip',
		'voip.state': 'queued',
		lang: 'es'
	}, { fields: { _id: true } }), { noReady: true });
	//queueCountsHandle = Counts.publish(this, 'patientQueue', Sessions.collection.find({ state: 'voip', 'voip.state': 'queued' }, { fields: { _id: true } }));
	this.onStop(function() {
		//queueCountsHandle.stop();
		enQueueCountsHandle.stop();
		esQueueCountsHandle.stop();
	});
	this.ready();
});

Meteor.publish('session', function(sessionId) {
	var self = this;
	var user = Meteor.users.findOne({_id: self.userId}, {
		fields: {
			username: true,
			'trueVault.id': true,
			roles: true
		}
			
	});
	if (!Roles.userIsInRole(user, ['ma', 'ta'])) {
		return [];
	}
	try {
		check (sessionId, validId);
	} catch (e) {
		return [];
	}

	var transform = function(doc, user) {
		if (Roles.userIsInRole(user, ['ta'])) {
			
		}
		var formDocId, notesDocId, formVaultId, notesVaultId;
		if (doc.form && doc.form.trueVaultRef) {
			var formDocId = doc.form.trueVaultRef.docId;
			var formVaultId = doc.form.trueVaultRef.vaultId;
		}
		if (doc.dentistNotes && doc.dentistNotes.trueVaultRef) {
			var notesDocId = doc.dentistNotes.trueVaultRef.docId;
			var notesVaultId = doc.dentistNotes.trueVaultRef.vaultId;
		}
		if (Roles.userIsInRole(user, ['ta'])) {
			if (formDocId) {
				doc.form.exists = true;
				delete doc.form.trueVaultRef;
			}
			if (notesDocId) {
				doc.dentistNotes.exists = true;
				delete doc.dentistNotes.trueVaultRef;
			}
		} else {
			try {
				var result, update;
				if (formDocId && notesDocId && formVaultId === notesVaultId) {
					result = TrueVault.readTwoDocuments(formVaultId, formDocId, notesDocId, user.trueVault.id);
					delete result.docOne.sessionId;
					delete result.docTwo.sessionId;
					result.docOne.at = doc.form.at;
					doc.form = result.docOne;
					result.docTwo.at = doc.dentistNotes.at;
					doc.dentistNotes = result.docTwo;
					update = {
						$push: {
							'form.trueVaultRef.accessLog': {
								userId: self.userId,
								transId: result.docOne.transaction_id
							},
							'dentistNotes.trueVaultRef.accessLog': {
								userId: self.userId,
								transId: result.docTwo.transaction_id
							}
						}
					};
				} else if (formDocId && notesDocId && formVaultId !== notesVaultId) {
					return null;
				} else if (formDocId) {
					result = TrueVault.readDocument(formVaultId, formDocId, user.trueVault.id);
					delete result.sessionId;
					result.at = doc.form.at;
					doc.form = result;
					update = {
						$push: {
							'form.trueVaultRef.accessLog': {
								userId: self.userId
							}
						}
					};
				} else if (notesDocId) {
					result = TrueVault.readDocument(notesVaultId, notesDocId, user.trueVault.id);
					delete result.sessionId;
					result.at = doc.dentistNotes.at;
					doc.dentistNotes = result;
					update = {
						$push: {
							'dentistNotes.trueVaultRef.accessLog': {
								userId: self.userId
							}
						}
					};
				}
				Sessions.collections.update({_id: sessionId}, update);
			} catch (e) {
				// Something what wrong...
			}
		}
		return doc;
	};

	var handle = Sessions.collection.find({_id: sessionId}, {
		fields: {
			'location.kioskHandle': false,
			'form.trueVaultRef.accessLog': false,
			'dentistNotes.trueVaultRef.accessLog': false,
			'modifiedAt': false
		}
	}).observeChanges({
		added: function (id, fields) {
			self.added('sessions', id, transform(fields, user));
		},
		changed: function (id, fields) {
			self.changed('sessions', id, transform(fields, user));
		},
		removed: function (id) {
			self.remove('sessions', id);
		}
	});
	self.ready();
	self.onStop(function () {
		handle.stop();
	});
});

Meteor.publish('session.voip', function(sessionId) {
	check(sessionId, String);
	var self = this;

	var user = Meteor.users.findOne({_id: self.userId}, {
		fields: {
			'trueVault.id': true,
			roles: true
		}
	});
	if (!Roles.userIsInRole(user, ['dentist', 'ma'])) {
		return [];
	}
	try {
		check(sessionId, validId);
	} catch (e) {
		return [];
	}

	var transform = function(doc, user) {
		var result;
		try {
			result = TrueVault.readDocument(doc.form.trueVaultRef.vaultId, doc.form.trueVaultRef.docId, user.trueVault.id);
			delete result.sessionId;
			result.at = doc.form.at;
			doc.form = result;

			// At the time of this writing (pi day) TrueVault doesn't return a transaction_id if you read a single document
			Sessions.update({
				_id: doc._id
			}, {
				$push: {
					'form.trueVaultRef.accessLog': {
						userId: user._id
					}
				}
			});
		} catch (e) {
			
		}
		return doc;
	};

	var handle = Sessions.collection.find({
		_id: sessionId,
		'dentist.id': self.userId,
		state: 'voip'
	}, {
		fields: {
			lang: true,
			'location.kioskHandle': true,
			'form.trueVaultRef.docId': true,
			'form.trueVaultRef.vaultId': true
		}
	}).observeChanges({
		added: function (id, fields) {
			self.added('sessions', id, transform(fields, user));
		},
		changed: function (id, fields) {
			self.changed('sessions', id, transform(fields, user));
		},
		removed: function (id) {
			self.removed('sessions', id);
		}
	});
	self.ready();

	self.onStop(function () {
		handle.stop();
	});
});

SyncedCron.add({
	name: 'Timeout sessions',
	schedule: function(parser) {
		return parser.text('every 2 hour');
	},
	job: function() {
		var date = new Date;
		date.setHours(date.getHours() - 6);
		Sessions.collection.update({
			createdAt: { $lt: date },
			state: { $ne: 'complete' }
		}, {
			$set: {
				state: 'complete',
				'complete.condition': 'timeout'
			}
		}, {
			multi: true
		});
	}
});

SyncedCron.add({
	name: 'Get SFax Results',
	schedule: function(parser) {
		return parser.text('every 1 hour');
	},
	job: function() {
		var items = SFax.receiveOutboundFax();
		_.each(items, function (item) {
			if (item.TrackingCode) {
				var state = (item.IsSuccess && item.FaxSuccess === '1') ? 'delivered' : 'failed';
				Sessions.collection.update({
					_id: item.TrackingCode
				}, {
					$set: {
						'fax.state': state
					},
					$push: {
						'fax.history': {
							state: state,
							resultCode: item.ResultCode,
							errorCode: item.ErrorCode,
							resultMessage: item.ResultMessage,
							faxId: item.FaxId,
							pages: item.Pages,
							attempts: item.Attempts,
							outboundFaxId: item.OutboundFaxId
						}
					}
				});
			}
		});
	}
});

Meteor.startup(function () {
	var failFax = function(id, reason) {
		Sessions.collection.update({_id: id}, {
			$set: {
				'fax.state': 'failed'
			},
			$push: {
				'fax.history': {
					'state': 'failed',
					'reason': reason
				}
			}
		});
	};

	// Quick and dirty
	var trans = {
		en: {
			form: {
				header: 'Dentist is In Session Report',
				patientInfo: {
					header: 'Patient Information',
					name: 'Name: ',
					address: 'Address: ',
					email: 'E-mail: ',
					phone: 'Phone Number: ',
					dob: 'Date of Birth: ',
					sex: 'Sex: ',
					payment: 'Payment Method: ',
					M: 'Male',
					F: 'Female',
					Insurance: 'Insurance',
					Medicaid: 'Medicaid',
					Self: 'Self Pay'
				},
				medicalInfo: {
					header: 'Patient Medical Information',
					conditions: 'Medical Conditions: ',
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
					medications: 'Current Medications: ',
					allergies: 'Allergies: ',
					medicalAllergiesAspirin: 'Aspirin',
					medicalAllergiesCodeine: 'Codeine',
					medicalAllergiesPenicillin: 'Penicillin',
					medicalAllergiesSulfa: 'Sulfa Drugs',
					none: 'None'
				},
				dentalComplaint: {
					header: 'Patient Dental Complaint',
					pain: 'Area of Pain: ',
					duration: 'Duration of Pain: ',
					swelling: 'Sweeling Present: ',
					Y: 'Yes',
					N: 'No',
					severity: 'Severity of Pain (1-10): '
				},
				dentistNotes: {
					header: 'Dentist Notes',
					impressions: 'Clinical Impressions: ',
					recommendations: 'Recommendations: ',
					prescriptions: 'Recommended Prescriptions: '
				}
			},
			privacy: {
				title: 'Notice of Privacy Practices',
				description: 'This notice describes how Medical/Protected Health Information about you may be used and Disclosed and how you can get access to this Information. Please review it carefully.',
				summary: 'Summary:',
				p1: 'By law, we are required to provide you with our Notice of Privacy Practices. (NPP)',
				p2: 'This notice describes how you medical information may be used and disclosed by us.',
				p3: 'It also tells you how you can obtain access to this information.',
				p4: 'As a patient, you have the following rights:',
				item1: 'The right to inspect and copy your information;',
				item2: 'The right to request corrections to your information;',
				item3: 'The right to request that your information be restricted;',
				item4: 'The right to request confidential communications;',
				item5: 'The right to report of disclosures of your information, and',
				item6: 'The right to paper copy of this notice.',
				p5: 'We want to assure you that your medical/protected health information is secure with us. This Notice contains information about how we will insure that your information remains private.',
				p6: 'If you have any questions about this notice, the name and phone number of our contact person is listed on this page.',
				effective: 'Effective date of this notice: June 1, 2015',
				contact: 'Contact person: Michael Sigler',
				phone: 'Phone number: 816-550-2615',
				acknowledgement: 'Acknowledgment of Notice of Privacy practices:',
				p7: 'By checking the box, I hereby acknowledge that I have received a copy of the Notice of Privacy Practices. I understand that if I have questions or complaints about my privacy rights I can Contact the person listed above. I further understand that The Dentist Is IN will offer the updates to this Notice of Privacy Practices should it be amended, modified or changed in any way.'
			},
			consent: {
				title: 'Informed Consent for Telemedicine Consultation Services',
				h1: 'Introduction',
				p1: 'Telemedicine involves the use of electronic communications to enable health care providers at different locations to share individual patient medical information for the purpose of improving patient care. Providers may include primary care practitioners, specialists, and/or subspecialists. The information may be used for diagnosis, therapy, follow-up and/or education, and may include any of the following:',
				i11: 'Patient medical records',
				i12: 'Medical images',
				i13: 'Live two-way audio and video',
				i14: 'Output data from medical devices and sound and video files',
				p2: 'Electronic systems used will incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data and will include measures to safeguard the data and to ensure its integrity against intentional or unintentional corruption.',
				h2: 'Expected Benefits:',
				i21: 'Improved access to medical care by enabling a patient to remain at a remote site while the dentist consults with healthcare practitioners at distant/other sites.',
				i22: 'More efficient medical evaluation and management.',
				i23: 'Obtaining expertise of a distant specialist.',
				h3: 'Possible Risks:',
				i31: 'In rare cases, information transmitted may not be sufficient (e.g. poor resolution of images) to allow for appropriate medical decision making by the nurse and consultant(s);',
				i32: 'Delays in medical evaluation and treatment could occur due to deficiencies or failures of the equipment;',
				i33: 'In very rare instances, security protocols could fail, causing a breach of privacy of personal medical information;',
				i34: 'In rare cases, a lack of access to complete medical records may result in adverse drug interactions or allergic reactions or other judgment errors;',
				h4: 'By signing this form, I understand the following:',
				i41: 'I understand that the laws that protect privacy and the confidentiality of medical information also apply to telemedicine, and that no information obtained in the use of telemedicine which identifies me will be disclosed to researchers or other entities without my consent.',
				i42: 'I understand that I have the right to withhold or withdraw my consent to the use of telemedicine in the course of my care at any time, without affecting my right to future care or treatment.',
				i43: 'I understand that I have the right to inspect all information obtained and recorded in the course of a telemedicine interaction, and may receive copies of this information for a reasonable fee.',
				i44: 'I understand that a variety of alternative methods of medical care may be available to me, and that I may choose one or more of these at any time. My nurse has explained the alternatives to my satisfaction.',
				i45: 'I understand that telemedicine may involve electronic communication of my personal medical information to other medical practitioners who may be located in other areas, including out of state.',
				i46: 'I understand that it is my duty to inform my doctor of electronic interactions regarding my care that I may have with other healthcare providers.',
				i47: 'I understand that I may expect the anticipated benefits from the use of telemedicine in my care, but that no results can be guaranteed or assured.',
				h5: 'Patient Consent To The Use of Telemedicine',
				p3: 'I have read and understand the information provided above regarding telemedicine, have discussed it with my nurse or such assistants as may be designated, and all of my questions have been answered to my satisfaction. I hereby give my informed consent for the use of telemedicine in my medical care.',
				p4: 'I hereby authorize The Dentist Is IN (consultant) to use telemedicine in the course of my dental consultation.'
			}
		},
		es: {
			form: {
				header: 'Dentista es en informe del período de sesiones',
				patientInfo: {
					header: 'Información para el paciente',
					name: 'Nombre: ',
					address: 'Dirección: ',
					email: 'Correo electrónico: ',
					phone: 'Número de teléfono: ',
					dob: 'Fecha de nacimiento: ',
					sex: 'Género: ',
					payment: 'Método de pago: ',
					M: 'Hombre',
					F: 'Mujer',
					Insurance: 'Seguro dental',
					Medicaid: 'Medicaid',
					Self: 'Pago del uno mismo'
				},
				medicalInfo: {
					header: 'Información médica del paciente',
					conditions: 'Condiciones médicas: ',
					medicalConditionsHivAids: 'SIDA/HIV Positivo',
					medicalConditionsPregnant: 'Embarazada/tratando de quedar embarazada',
					medicalConditionsContraceptives: 'Toma anticonceptivos orales',
					medicalConditionsCancer: 'Cancer',
					medicalConditionsDiabetes: 'Diabetes',
					medicalConditionsHeart: 'Problemsa/Enfermedad del corazon',
					medicalConditionsBlood: 'Presion arterial alta',
					medicalConditionsKidneyLiver: 'Problemas de los ninones/higado',
					medicalConditionsStomach: 'Enfermedad estomacal/intestinal',
					medicalConditionsBleeding: 'Enermedad Arterial',
					medicalConditionsPsychiatric: 'Atencion Psiquiatrica',
					medicalConditionsRadiation: 'Tratamiento con radicion de cabeza',
					medications: 'Tomando Medicamentos: ',
					allergies: 'Alergicos: ',
					medicalAllergiesAspirin: 'Aspirina',
					medicalAllergiesCodeine: 'Codenia',
					medicalAllergiesPenicillin: 'Penicilina',
					medicalAllergiesSulfa: 'Sulfamida',
					none: 'Nada'
				},
				dentalComplaint: {
					header: 'Queja paciente Dental',
					pain: 'Área de dolor: ',
					duration: 'Duración del dolor: ',
					swelling: 'Presente hinchazón: ',
					Y: 'Sí',
					N: 'No',
					severity: 'Intensidad del dolor (1-10): '
				},
				dentistNotes: {
					header: 'Dentista notas',
					impressions: 'Impresiones clínicas: ',
					recommendations: 'Recomendaciones: ',
					prescriptions: 'Recetas recomendadas: '
				}
			},
			privacy: {
				title: 'viso de Prácticas Privadas',
				description: 'Este Aviso Describe de Qué Modo Su Informatición Médica/de Salud Protegida Puede Ser untilizada Y Divulgada Y Cómo Puede Acceder A Dicha Informatición Revíselo Atentamente',
				summary: 'Resumen:',
				p1: 'La ley nos exige suministrar a los pacentes el Avíso de Normas de Confidencialidad de',
				p2: 'Nuestro estalecimiento, qe describe cómo puede utilizarse y divulgarse su información',
				p3: 'Médica y establece las fromas en que el paciente pude accede a esta información.',
				p4: 'El paciente goza de los siguientes derechos:',
				item1: 'Derecho á accede a la información y realizer copias.',
				item2: 'Derecho á solicitor correcciones',
				item3: 'Derecho a solicitor restriciones.',
				item4: 'Derecho a solicitor confidenicaidad en las communications.',
				item5: 'Derecho a solicitor un detaile de la información divulgada , y',
				item6: 'Derecho a recibír una copia impressa de ester aviso.',
				p5: 'Queremos asegurar que su información de salud médica/protegido es segura con nosotros. Este aviso contiene información acerca de cómo nos asegurará que su información se mantenga privada.',
				p6: 'Si usted tiene alguna pregunta acerca de este aviso, el nombre y número de teléfono de nuestra persona de contacto aparece en esta página.',
				effective: 'Fecha de vigencia de este aviso: de 01 de junio de 2015',
				contact: 'Persona de contacto: Leah Sigler',
				phone: 'Número de teléfono: 8169312191',
				acknowledgement: 'Reconocimiento del aviso de privacidad',
				p7: 'Por la presente reconozco que he recibido una copia de la Aviso de prácticas de privacidad. Yo entiendo que si tengo preguntas o quejas acerca de mi derechos de privacidad que puedo contactar a la persona indicada anteriormente. Además, entiendo que esta práctica ofrecerá las actualizaciones a este aviso de prácticas de privacidad si ser modificado, modificado o cambiado en de cualquier manera.'
			},
			consent: {
				title: 'Autorización para recibir Servicios o Consulta de Telemedicine',
				h1: 'Introducción',
				p1: 'Telemedicine involucra el uso de comunicación electrónica para acercar a los proveedores del cuidado de la salud ubicados en diferentes lugares, para compartir información médica de un paciente con el objetivo de mejorar su atención. Los proveedores pueden incluir médicos generales, especialistas o subespecialistas. La información podrá ser usada para diagnóstico, terapia, seguimiento y/o educación, y podrá incluir cualquiera de los siguientes conceptos:',
				i11: 'Historia clínica del paciente',
				i12: 'Imágenes médicas',
				i13: 'Audio y video en vivo',
				i14: 'Información producida por dispositivos médicos y archivos de audio y video',
				p2: 'Los sistemas electrónicos utilizados contendrán protocolos de seguridad para proteger la confidencialidad del paciente y sus imágenes, así como incluir medidas para salvaguardar la información y cuidar su integridad en contra de cualquier daño, con o sin intención.',
				h2: 'Beneficios:',
				i21: 'Mejorar el acceso a la asistencia médica, permitiéndole al paciente dirigirse a un sitio remoto mientras el dentista consulta con otros médicos que se encuentran en distintos lugares.',
				i22: 'Evaluación y manejo médico eficiente',
				i23: 'Obtener asesoría de especialistas a distancia',
				h3: 'Riesgos:',
				i31: 'En contadas ocasiones, la información transmitida puede ser insuficiente (e.g. mala calidad de las imágenes) y derivar en una mala decisión de la enfermera o el médico;',
				i32: 'Podría ocurrir algún retraso en la evaluación y tratamiento médico debido a fallas o deficiencias del equipo;',
				i33: 'Rara vez pueden fallar los protocolos de seguridad, causando una violación a la información privada de los pacientes;',
				i34: 'En algunas ocasiones, por falta de acceso a la historia clínica completa, podría haber errores en la prescripción de fármacos y causar reacciones alérgicas o algún otro error;',
				h4: 'Al firmar esta forma entiendo lo siguiente:',
				i41: 'Entiendo que las leyes que protegen la privacidad y confidencialidad de la información médica también aplican para Telemedicine y que ninguna información de Telemedicine que me identifique podrá ser divulgada a los investigadores u otras agencias sin mi consentimiento.',
				i42: 'Entiendo que tengo derecho de otorgar o no mi consentimiento al uso de Telemedicine durante mi atención medica en cualquier momento, sin que eso afecte mi derecho a obtener atención o tratamiento en el futuro.',
				i43: 'Entiendo que tengo derecho a examinar toda la información obtenida y grabada durante la interacción con Telemedicine y puedo obtener copias de esta a un costo razonable.',
				i44: 'Entiendo que hay una variedad de métodos accesibles para mí y que puedo escoger uno o varios en cualquier momento. La enfermera me ha explicado las opciones a mi entera satisfacción. ',
				i45: 'Entiendo que Telemedicine puede enviar mi información médica por medios electrónicos a otros profesionales que pueden localizarse en diferentes áreas, incluso fuera del estado.',
				i46: 'Entiendo que es mi obligación informar a mi doctor sobre interacciones electrónicas que haya tenido en el pasado con otros doctores, relacionadas con mi salud/cuidado.',
				i47: 'Entiendo que espero beneficios anticipados en mi salud por el uso de Telemedicine, pero ningún resultado puede garantizarse o asegurarse.',
				h5: 'Consentimiento del Paciente para el uso de Telemedicine',
				p3: 'He leído y entendido la información arriba mencionada respecto a Telemedicine. La he revisado con la enfermera o los asistentes designados y todas mis preguntas han sido respondidas a mi entera satisfacción. Doy mi consentimiento a Telemedicine para mi cuidado médico.',
				p4: 'Doy mi autorización a The Dentist Is In (consultor) para utilizar Telemedicine durante mis consultas dentales.'
			}
		}
	};

	var makeReport = function(fax, lang, form, notes) {
		var table = trans[lang].form;
		fax.fontSize(20);
		fax.text(table.header, { align: 'center' });
		fax.fontSize(12);
		fax.text(moment().locale(lang).format('LLLL'), { align: 'center' });
		var patientInfo = table.patientInfo;
		fax.text(patientInfo.header, { underline: true });
		var name = form.patientNameFirst;
		if (form.patientNamePreferred) name += ' (' + form.patientNamePreferred + ')';
		if (form.patientNameMiddle) name += ' ' + form.patientNameMiddle;
		name += ' ' + form.patientNameLast;
		fax.text(patientInfo.name + name);
		fax.text(patientInfo.address);
		fax.text(form.patientAddressOne, { indent: 30 });
		if (form.patientAddressTwo) fax.text(form.patientAddressTwo, { indent: 30 });
		fax.text(form.patientAddressCity + ', ' + form.patientAddressState + ' ' + form.patientAddressZip, { indent: 30 });
		if (form.patientContactEmail) fax.text(patientInfo.email + form.patientContactEmail);
		if (form.patientContactPhone) fax.text(patientInfo.phone + form.patientContactPhone);
		//fax.text(patientInfo.dob + moment(form.patientDobDob).locale(lang).format('LL'));
		fax.text(patientInfo.dob + form.patientDobDob);
		fax.text(patientInfo.sex + patientInfo[form.patientSexSex]);
		fax.text(patientInfo.payment + patientInfo[form.patientInsuranceInsurance]);
		fax.moveDown();

		var medicalInfo = table.medicalInfo;
		fax.text(medicalInfo.header, { underline: true });
		var re = /^medicalCondition/;
		var list = _.reduce(form, function(memo, val, key) {
			if (re.test(key) && val) {
				if (memo === '') return medicalInfo[key];
				else return memo + ', ' + medicalInfo[key];
			} else return memo;
		}, '');
		if (list === '') list = medicalInfo.none;
		fax.text(medicalInfo.conditions + list);
		var medications = (!form.medicalMedications || form.medicalMedications === '') ? medicalInfo.none : form.medicalMedications;
		fax.text(medicalInfo.medications + medications);
		re = /^medicalAllergies/;
		list = _.reduce(form, function (memo, val, key) {
			if (re.test(key) && key !== 'medicalAllergiesOther' && val) {
				if (memo === '') return medicalInfo[key];
				else return memo + ', ' + medicalInfo[key];
			} else return memo;
		}, '');
		if (form.medicalAllergiesOther) list += ', ' + form.medicalAllergiesOther;
		if (list === '') list = medicalInfo.none;
		fax.text(medicalInfo.allergies + list);
		fax.moveDown();

		var dentalComplaint = table.dentalComplaint;
		fax.text(dentalComplaint.header, { underline: true });
		fax.text(dentalComplaint.pain + form.dentalPain);
		fax.text(dentalComplaint.duration + form.dentalDuration);
		fax.text(dentalComplaint.swelling + dentalComplaint[form.dentalSwelling]);
		fax.text(dentalComplaint.severity + form.dentalSeverity);
		fax.moveDown();

		var dentistNotes = table.dentistNotes;
		fax.text(dentistNotes.header, { underline: true });
		fax.text(dentistNotes.impressions);
		fax.text(notes.clinicalImpression, { indent: 30 });
		fax.text(dentistNotes.recommendations);
		fax.text(notes.recommendation, { indent: 30 });
		fax.text(dentistNotes.prescriptions);
		fax.text(notes.recommendedPrescriptions, { indent: 30 });
	};

	var makePrivacy = function(fax, lang) {
		var table = trans[lang].privacy;
		fax.fontSize(20);
		fax.text(table.title, { align: 'center' });
		fax.fontSize(12);
		fax.text(table.description, { align: 'center' });
		fax.moveDown();

		fax.text(table.summary, { underline: true });
		fax.text(table.p1);
		fax.text(table.p2);
		fax.text(table.p3);
		fax.text(table.p4);
		fax.text('\u2022 ' + table.item1, { indent: 30 });
		fax.text('\u2022 ' + table.item2, { indent: 30 });
		fax.text('\u2022 ' + table.item3, { indent: 30 });
		fax.text('\u2022 ' + table.item4, { indent: 30 });
		fax.text('\u2022 ' + table.item5, { indent: 30 });
		fax.text('\u2022 ' + table.item6, { indent: 30 });
		fax.moveDown();

		fax.text(table.p5);
		fax.text(table.p6);
		fax.text(table.effective);
		fax.text(table.contact);
		fax.text(table.phone);
		fax.moveDown();

		fax.fontSize(20);
		fax.text(table.acknowledgement, { align: 'center' });
		fax.fontSize(12);
		fax.text(table.p7);
	};

	var makeConsent = function(fax, lang) {
		var table = trans[lang].consent;
		fax.fontSize(20);
		fax.text(table.title, { align: 'center' });
		fax.moveDown();

		fax.fontSize(12);
		fax.text(table.h1, { underline: true });
		fax.text(table.p1);
		fax.text('\u2022 ' + table.i11, { indent: 30 });
		fax.text('\u2022 ' + table.i12, { indent: 30 });
		fax.text('\u2022 ' + table.i13, { indent: 30 });
		fax.text('\u2022 ' + table.i14, { indent: 30 });
		fax.text(table.p2);
		fax.moveDown();

		fax.text(table.h2, { underline: true });
		fax.text('\u2022 ' + table.i21, { indent: 30 });
		fax.text('\u2022 ' + table.i22, { indent: 30 });
		fax.text('\u2022 ' + table.i23, { indent: 30 });
		fax.moveDown();

		fax.text(table.h3, { underline: true });
		fax.text('\u2022 ' + table.i31, { indent: 30 });
		fax.text('\u2022 ' + table.i32, { indent: 30 });
		fax.text('\u2022 ' + table.i33, { indent: 30 });
		fax.text('\u2022 ' + table.i34, { indent: 30 });
		fax.moveDown();

		fax.text(table.h4, { underline: true });
		fax.text('1. ' + table.i41, { indent: 30 });
		fax.text('2. ' + table.i42, { indent: 30 });
		fax.text('3. ' + table.i43, { indent: 30 });
		fax.text('4. ' + table.i44, { indent: 30 });
		fax.text('5. ' + table.i45, { indent: 30 });
		fax.text('6. ' + table.i46, { indent: 30 });
		fax.text('7. ' + table.i47, { indent: 30 });
		fax.moveDown();

		fax.fontSize(20);
		fax.text(table.h5, { align: 'center' });
		fax.fontSize(12);
		fax.text(table.p3);
		fax.text(table.p4);
	};

	var getFaxBuffer = function(formDoc, notesDoc, lang, callback) {
		var buffer = new Buffer(0);
		var fax = new PDFDocument();

		fax.on('readable', function() {
			buffer = Buffer.concat([buffer, fax.read()]);
		});

		fax.on('error', function(err) {
			callback(err, null);
		});

		fax.on('end', function() {
			callback(null, buffer);
		});

		makeReport(fax, 'en', formDoc, notesDoc);
		fax.addPage();
		makePrivacy(fax, 'en');
		fax.addPage();
		makeConsent(fax, 'en');
		fax.addPage();
		makeReport(fax, lang, formDoc, notesDoc);
		fax.addPage();
		makePrivacy(fax, lang);
		fax.addPage();
		makeConsent(fax, lang);
		fax.end();
/**
		fax.text('Dentist is In Session Reporrt', { align: 'center' });
		fax.text(new Date(), { align: 'center' });
		fax.text('Patient Information', { underline: true });
		var name = formDoc.patientNameFirst;
		if (formDoc.patientNamePreferred) name += ' (' + formDoc.patientNamePreferred + ')';
		if (formDoc.patientNameMiddle) name += ' ' + formDoc.patientNameMiddle;
		name += ' ' + formDoc.patientNameLast;
		fax.text('Name: ' + name);
		fax.text('Address:');
		fax.text('         ' + formDoc.patientAddressOne);
		if (formDoc.patientAddressTwo) fax.text('         ' + formDoc.patientAddressTwo);
		fax.text('         ' + formDoc.patientAddressCity + ', ' + formDoc.patientAddressState + ' ' + formDoc.patientAddressZip);
		if (formDoc.patientContactEmail) fax.text('E-mail: ' + formDoc.patientContactEmail);
		if (formDoc.patientContactPhone) fax.text('Phone Number: ' + formDoc.patientContactPhone);
		fax.text('Date of Birth: ' + moment(formDoc.patientDobDob).format('MM-DD-YYYY'));
		var sex = (formDoc.patientSexSex === 'F') ? 'Female' : 'Male';
		fax.text('Sex: ' + sex);
		var insurance = (formDoc.patientInsuranceInsurance === 'Self') ? 'Self Pay' : formDoc.patientInsuranceInsurance;
		fax.text('Payment Method: ' + insurance);
		fax.moveDown();
		fax.text('Patient Medical Information', { underline: true });
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
		var list = _.reduce(formDoc, function(memo, val, key) {
			if (re.test(key) && val) {
				if (memo === '') return table[key];
				else return memo + ', ' + table[key];
			} else return memo;
		}, '');
		if (list === '') list = 'None';
		fax.text('Medical Conditions: ' + list);
		var medications = (!formDoc.medicalMedications || formDoc.medicalMedications === '') ? 'None' : formDoc.medicalMedications;
		fax.text('Current Medications: ' + medications);
		table = {
			medicalAllergiesAspirin: 'Aspirin',
			medicalAllergiesCodeine: 'Codeine',
			medicalAllergiesPenicillin: 'Penicillin',
			medicalAllergiesSulfa: 'Sulfa Drugs'
		};
		re = /^medicalAllergies/;
		list = _.reduce(formDoc, function(memo, val, key) {
			if (re.test(key) && key !== 'medicalAllergiesOther' && val) {
				if (memo === '') return table[key];
				else return memo + ', ' + table[key];
			} else return memo;
		}, '');
		if (formDoc.medicalAllergiesOther) list += ', ' + formDoc.medicalAllergiesOther;
		if (list === '') list = 'None';
		fax.text('Allergies: ' + list);
		fax.moveDown();
		fax.text('Patient Dental Complaint', { underline: true });
		fax.text('Area of Pain: ' + formDoc.dentalPain);
		fax.text('Duration of Pain: ' + formDoc.dentalDuration);
		var swelling = (formDoc.dentalSwelling === 'Y') ? 'Yes' : 'No';
		fax.text('Swelling Present: ' + swelling);
		fax.text('Severity of Pain (1-10): ' + formDoc.dentalSeverity);
		fax.moveDown();
		fax.text('Dentist Notes', { underline: true });
		fax.text('Clinical Impressions:');
		fax.text(notesDoc.clinicalImpression);
		fax.text('Recommendations:');
		fax.text(notesDoc.recommendation);
		fax.text('Recommended Prescriptions:');
		fax.text(notesDoc.recommendedPrescriptions);
		fax.end();
**/
	};
	var getFaxBufferSync = Meteor.wrapAsync(getFaxBuffer);

	var handle = Sessions.collection.find({
		'fax.state': 'ready'
	}, {
		_id: true}
	).observeChanges({
		added: function(id, session) {
			var locked = Sessions.collection.findAndModify({
				query: {
					 _id: id
				},
				update: {
					$set: {
						'fax.state': 'locked'
					},
					$push: {
						'fax.history': { at: new Date, state: 'locked' }
					}
				},
				fields: {
					'location.id': true,
					lang: true,
					'form.trueVaultRef.docId': true,
					'form.trueVaultRef.vaultId': true,
					'dentistNotes.trueVaultRef.docId': true,
					'dentistNotes.trueVaultRef.vaultId': true
				}
			});

			if (!locked) return;
			if (!locked.form) {
				failFax(id, 'Missing form');
				return;
			} else if (!locked.form.trueVaultRef) {
				failFax(id, 'Missing form reference');
				return;
			} else {
				if (!locked.form.trueVaultRef.vaultId) {
					failFax(id, 'Missing form vault reference');
					return;
				}
				if (!locked.form.trueVaultRef.docId) {
					failFax(id, 'Missing form doc reference');
					return;
				}
			}
			if (!locked.dentistNotes) {
				failFax(id, 'Missing notes');
				return;
			} else if (!locked.dentistNotes.trueVaultRef) {
				failFax(id, 'Missing notes reference');
				return;
			} else {
				if (!locked.dentistNotes.trueVaultRef.vaultId) {
					failFax(id, 'Missing notes vault reference');
					return;
				}
				if (!locked.dentistNotes.trueVaultRef.docId) {
					failFax(id, 'Missing notes doc reference');
					return;
				}
			}
			var formId = locked.form.trueVaultRef.docId;
			var notesId = locked.dentistNotes.trueVaultRef.docId;

			var forms = TrueVault.readTwoDocuments(locked.form.trueVaultRef.vaultId, formId, notesId);
			Sessions.collection.update({_id: id}, {
				$push: {
					'form.trueVaultRef.accessLog': {
						fax: true,
						transId: forms.transId
					},
					'dentistNotes.trueVaultRef.accessLog': {
						fax: true,
						transId: forms.transId
					}
				}
			});

			var buf = getFaxBufferSync(forms.docOne, forms.docTwo, locked.lang);

			var location = Locations.collection.findOne({ _id: locked.location.id}, { fields: { name: true, 'contact.fax': true } });
			var sendFax = SFax.sendFax(id, location.name, location.contact.fax, buf);
			Sessions.collection.update({
				_id: id,
				'fax.state': 'locked'
			}, {
				$set: {
					'fax.state': 'sent'
				},
				$push: {
					'fax.history': { state: 'sent', SendFaxQueueId: sendFax.SendFaxQueueId }
				}
			});
		}
	});
});
