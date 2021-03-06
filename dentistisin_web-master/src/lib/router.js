//Router.plugin('ensureSignedIn');
Router.plugin('auth', {
	authenticate: {
		route: 'login'
	},
	except: ['login', 'resetPassword', 'verifyEmail', 'enrollPassword', 'enrollUsername']
});

Router.route('/', function () {
	this.redirect('/queue');
});

Router.route('/reset-password/:token', {
	name: 'resetPassword',
	template: 'resetPassword',
	loadingTemplate: 'loading'
});

Router.route('/verify-email/:token', function() {
	Accounts.verifyEmail(this.params.token, function() {
		var user = Meteor.user();
		if (user) {
			Router.go('user.show', {userId:  user.username || user._id});
		} else {
			Router.go('/')
		}
	});
});

Router.route('/enroll-account/:token', {
	name: 'enrollPassword',
	template: 'enrollPassword',
	loadingTemplate: 'loading'
});

Router.route('/enroll-account/:token/username', {
	name: 'enrollUsername',
	template: 'enrollUsername',
	loadingTemplate: 'loading'
});

Router.route('/login', {
	name:'login',
	template: 'login',
	loadingTemplate: 'loading',
	onBeforeAction: ['noAuth']
});

Router.route('/user/:userId', {
	name: 'user.show',
	template: 'profile',
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('user.show', this.params.userId)
	},
	data: function() {
		return { profile: Meteor.users.findOne({_id: this.params.userId}) };
	},
	authorize: {
		deny: function() {
			if (!Meteor.user() && !Roles.userIsInRole(Meteor.user(), ['ma'])) return true;
		}
	}
});

UsersController = RouteController.extend({
	name: 'users.show',
	template: 'users',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['ta', 'ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	increment: 10,
	usersLimit: function() {
		return parseInt(this.params.query.limit) || this.increment;
	},
	usersSort: function() {
		var keys = ['username'];
		var sort = {};
		var sortKey, sortDir;
		if (this.params.query.sortKey) {
			if (_.contains(keys, this.params.query.sortKey)) sortKey = this.params.query.sortKey;
			else sortKey = 'username';
		} else sortKey = 'username';
		if (this.params.query.sortDir) {
			if (this.params.query.sortDir === '-1' || this.params.query.sortDir === '1') sortDir = this.params.query.sortDir;
			else sortDir = '1';
		} else sortDir = '1';
		sort[sortKey] = sortDir;
		return sort;
	},
	users: function() {
		return Meteor.users.find({}, { sort: this.usersSort(), limit: this.usersLimit() });
	},
	subscriptions: function() {
		this.usersSub = Meteor.subscribe('users', this.usersSort(), this.usersLimit());
	},
	data: function() {
		var hasMore =  Counts.get('usersCount') > this.usersLimit();
		var query = _.clone(this.params.query);
		query.limit = this.usersLimit() + this.increment;
		var nextPath = this.route.path({}, {
			query: query
		});
		return {
			users: this.users().fetch(),
			usersReady: this.usersSub.ready,
			loadMoreUsers: hasMore ? nextPath : null,
		};
        }
});

Router.route('/users', {
	name: 'users.show',
	controller: 'UsersController'
});

Router.route('/queue', {
	name: 'queue.show',
	template: 'queue',
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	waitOn: function() {
		return [
			Meteor.subscribe('sessions.voip.count'),
			Meteor.subscribe('dentists.online')
		];
	},
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['dentist', 'ma'])) return true;
		}
	}
});

SessionsController = RouteController.extend({
	name: 'sessions.show',
	template: 'sessions',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	increment: 10,
	sessionsLimit: function() {
		return parseInt(this.params.query.limit) || this.increment;
	},
	sessionsFilter: function() {
		var filter = {};
		if (this.params.query.dentistId) filter.dentist = { id: this.params.query.dentistId };
		if (this.params.query.locationId) filter.location = { id: this.params.query.locationId };
		if (this.params.query.start) filter.start = new Date(this.params.query.start);
		if (this.params.query.end) filter.end = new Date(this.params.query.end);
		return filter;
	},
	sessionsSort: function() {
		var keys = ['createdAt', 'location.name', 'dentist.username'];
		var sort = {};
		var sortKey, sortDir;
		if (this.params.query.sortKey) {
			if (_.contains(keys, this.params.query.sortKey)) sortKey = this.params.query.sortKey;
			else sortKey = 'createdAt';
		} else sortKey = 'createdAt';
		if (this.params.query.sortDir) {
			if (this.params.query.sortDir === '-1' || this.params.query.sortDir === '1') sortDir = this.params.query.sortDir;
			else sortDir = '1';
		} else sortDir = '1';
		sort[sortKey] = sortDir;
		return sort;
	},
	sessions: function() {
		return Sessions.collection.find({}, { sort: this.sessionsSort(), limit: this.sessionsLimit() });
	},
	subscriptions: function() {
		this.sessionsSub = Meteor.subscribe('sessions', this.sessionsFilter(), this.sessionsSort(), this.sessionsLimit());
	},
	waitOn: function() { 
		return [
			Meteor.subscribe('locations.filter'),
			Meteor.subscribe('dentists.filter')
		];
	},
	data: function() {
		var hasMore = Counts.get('sessionsCount') > this.sessionsLimit();
		var query = _.clone(this.params.query);
		query.limit = this.sessionsLimit() + this.increment;
		var nextPath = this.route.path({}, {
			query: query
		});
		return {
			sessions: this.sessions().fetch(),
			sessionsReady: this.sessionsSub.ready,
			loadMoreSessions: hasMore ? nextPath : null,
			locations: Locations.collection.find().fetch(),
			dentists: Meteor.users.find().fetch()
		};
	}
});

Router.route('/sessions', {
	name: 'sessions.show',
	controller: 'SessionsController'
});

Router.route('/session/:sessionId', {
	name: 'session.show',
	template: 'session',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('session', this.params.sessionId);
	},
	data: function() {
		return {
			session: Sessions.collection.findOne({_id: this.params.sessionId})
		};
	}
});

Router.route('/session/:sessionId/voip', {
	name: 'session.voip.show',
	template: 'session_voip',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['dentist', 'ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	waitOn: function() {
		return [
			Meteor.subscribe('session.voip', this.params.sessionId)
			//IRLibLoader.load('https://download.rtccloud.net/js/webappid/6xjg7qx65zz0')
		];
	},
	data: function() {
		return {
			patient: Sessions.collection.findOne({_id: this.params.sessionId})
		};
	}
});

LocationsController = RouteController.extend({
	name: 'locations.show',
	template: 'locations',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['ta', 'ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	increment: 10,
	locationsLimit: function() {
		return parseInt(this.params.query.limit) || this.increment;
	},
	locationsFilter: function() {
		var filter = {};
		if (this.params.query.date) {
			var split = this.params.query.date.split('-');
			var year = parseInt(split[0]);
			var month = parseInt(split[1]) - 1;
			filter.date = new Date(year, month);
		}
		return filter;
	},
	locationsSort: function() {
		var keys = ['name'];
		var sort = {};
		var sortKey, sortDir;
		if (this.params.query.sortKey) {
			if (_.contains(keys, this.params.query.sortKey)) sortKey = this.params.query.sortKey;
			else sortKey = 'name';
		} else sortKey = 'name';
		if (this.params.query.sortDir) {
			if (this.params.query.sortDir === '-1' || this.params.query.sortDir === '1') sortDir = this.params.query.sortDir;
			else sortDir = '1';
		}
		else sortDir = '1';
		sort[sortKey] = sortDir;
		return sort;
	},
	locations: function() {
		return Locations.collection.find({}, { sort: this.locationsSort(), limit: this.locationsLimit() });
	},
	subscriptions: function() {
		this.locationsSub = Meteor.subscribe('locations', this.locationsFilter(), this.locationsSort(), this.locationsLimit());
	},
	data: function() {
		var hasMore = Counts.get('locationsCount') > this.locationsLimit();
		var query = _.clone(this.params.query);
		query.limit = this.locationsLimit() + this.increment;
		var nextPath = this.route.path({}, {
			query: query
		});
		return {
			locations: this.locations().fetch(),
			locationsReady: this.locationsSub.ready,
			loadMoreLocations: hasMore ? nextPath: null
		};
	}
});

Router.route('/locations', {
	name: 'locations.show',
	controller: 'LocationsController'
});

LocationController = RouteController.extend({
	name: 'location.show',
	template: 'location',
	authorize: {
		deny: function() {
			if (!Roles.userIsInRole(Meteor.user(), ['ta', 'ma'])) return true;
		}
	},
	loadingTemplate: 'loading',
	layoutTemplate: 'layout',
	increment: 10,
	sessionsLimit: function() {
		return parseInt(this.params.query.limit) || this.increment;
	},
	sessionsFilter: function() {
		var filter = {};
		filter.location = { id: this.params.locationId };
		if (this.params.query.dentistId) filter.dentist = { id: this.params.query.dentistId };
		if (this.params.query.start) filter.start = new Date(this.params.query.start);
		if (this.params.query.end) filter.end = new Date(this.params.query.end);
		else {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			filter.start = new Date(year, month, 1);
			filter.end = new Date(year, month + 1, 0, 23, 59, 59, 999);
		}
		return filter;
	},
	sessionsSort: function() {
		var keys = ['createdAt', 'dentist.username'];
		var sort = {};
		var sortKey, sortDir;
		if (this.params.query.sortKey) {
			if (_.contains(keys, this.params.query.sortKey)) sortKey = this.params.query.sortKey;
			else sortKey = 'createdAt';
		} else sortKey = 'createdAt';
		if (this.params.query.sortDir) {
			if (this.params.query.sortDir === '-1' || this.params.query.sortDir === '1') sortDir = this.params.query.sortDir;
			else sortDir = '1';
		} else sortDir = '1';
		sort[sortKey] = sortDir;
		return sort;
	},
	sessions: function() {
		return Sessions.collection.find({}, { sort: this.sessionsSort(), limit: this.sessionsLimit() });
	},
	subscriptions: function() {
		this.sessionsSub = Meteor.subscribe('sessions', this.sessionsFilter(), this.sessionsSort(), this.sessionsLimit());
	},
	waitOn: function() {
		return [
			Meteor.subscribe('location', this.sessionsFilter()),
			//Meteor.subscribe('sessions.statistics', this.sessionsFilter()),
			Meteor.subscribe('dentists.filter')
		]
	},
	data: function() {
		var hasMore = Counts.get('sessionsCount') > this.sessionsLimit();
		var query = _.clone(this.params.query);
		query.limit = this.sessionsLimit() + this.increment;
		var nextPath = this.route.path({ locationId: this.params.locationId }, {
			query: query
		});
		return {
			sessions: this.sessions().fetch(),
			sessionsReady: this.sessionsSub.ready,
			loadMoreSessions: hasMore ? nextPath : null,
			location: Locations.collection.findOne({_id: this.params.locationId}),
			dentists: Meteor.users.find().fetch()
		};
	}
});

Router.route('/location/:locationId', {
	name: 'location.show',
	controller: 'LocationController',
});

