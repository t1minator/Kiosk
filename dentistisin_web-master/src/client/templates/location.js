var edit = new ReactiveVar(false);
Template.location.onCreated(function () {
	edit = new ReactiveVar(false);
});

Template.location.helpers({
	edit: function() {
		return edit.get();
	}
});

Template._location_details.events({
	'click #editLocation': function(event) {
		edit.set(true);
	}
});

var loading = new ReactiveVar(false);

Template._edit_location.onCreated(function () {
	loading = new ReactiveVar(false);
});

Template._edit_location.helpers({
	loading: function() {
		return loading.get();
	}
});

AutoForm.hooks({
	updateLocation: {
		beginSubmit: function() {
			loading.set(true);
		},
		endSubmit: function() {
			loading.set(false);
		},
		onSuccess: function(formType, result) {
			edit.set(false);
		}
	}
});

var kioskLoading = new ReactiveVar(false);

Template._kiosk_details.onCreated(function () {
	kioskLoading = new ReactiveVar(false);
});

Template._kiosk_details.helpers({
	loading: function() {
		return kioskLoading.get();
	}
});

Template._kiosk_details.events({
	'click #kioskEnabled': function(event) {
		var controller = Router.current();
		Meteor.call('setKioskInactive', controller.params.locationId);
	},
	'click #kioskDisabled': function(event) {
		var controller = Router.current();
		Meteor.call('setKioskActive', controller.params.locationId);
	},
	'click #newSecret': function(event) {
		kioskLoading.set(true);
		var controller = Router.current();
		Meteor.call('newSecret', controller.params.locationId, function(e, r) {
			kioskLoading.set(false);
		});
	},
	'click #newCode': function(event) {
		kioskLoading.set(true);
		var controller = Router.current();
		Meteor.call('newCode', controller.params.locationId, function(e, r) {
			kioskLoading.set(false);
		});
	}
});

Template._location_statistics.helpers({
	getCounts: function(type, id) {
		return Counts.get('locations.'+id+'.'+type) || 0;
	}
	
});

Template._location_menu.onRendered(function() {
	var self = this;
	var controller = Router.current();
	self.autorun(function() {
		var params = controller.getParams();
		if (params.query.start) {
			$('#dateStart').val(params.query.start);
		} else $('#dateStart').val('');
		if (params.query.end) {
			$('#dateEnd').val(params.query.end);
		} else $('#dateEnd').val('');
	});
});

Template._location_menu.events({
	'change #dateStart': function(event) {
		var controller = Router.current();
		var query = _.clone(controller.params.query);
		query.start = $(event.target).val();
		var path = controller.route.path({ locationId: controller.params.locationId }, { query: query });
		Router.go(path)
	},
	'change #dateEnd': function(event) {
		var controller = Router.current();
		var query = _.clone(controller.params.query);
		query.end = $(event.target).val();
		var path = controller.route.path({ locationId: controller.params.locationId }, { query: query });
		Router.go(path)
	}
});

Template._location_sessions_table_header.helpers({
	sortState: function(id) {
		var controller = Router.current();
		var sort = controller.sessionsSort();
		if (sort[id] === '-1') return 'descending';
		if (sort[id] === '1') return 'ascending';
		return '';
	}
});

Template._location_sessions_table_row.helpers({
	date: function(date) {
		return moment(date).format('MM/DD/YY hh:mmA');
	},
	status: function() {
		return '_session_state_' + this.state;
	}
});

var sort = function(id) {
	var controller = Router.current();
	var query = _.clone(controller.params.query);
	if (query.sortKey === id) {
		var dir;
		if (query.sortDir === '-1') dir = '1';
		else if (query.sortDir === '1') dir = '-1';
		else dir = '1';
		query.sortDir = dir;
	} else {
		query.sortKey = id;
		if (id === 'createdAt') query.sortDir = '-1';
		else query.sortDir = '1';
	}
	var path = controller.route.path({ locationId: controller.params.locationId }, { query: query });
	Router.go(path);
};

Template._location_sessions_table_header.events({
	'click #createdAtSort': function (event) {
		sort('createdAt');
	},
	'click #dentistSort': function (event) {
		sort('dentist.username');
	}
});
