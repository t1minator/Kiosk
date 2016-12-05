Template._session_table_row.helpers({
	date: function(date) {
		return moment(date).format('MM/DD/YY hh:mmA');
	},
	status: function() {
		return '_session_state_' + this.state;
	}
});

Template._session_table_header.helpers({
	sortState: function(id) {
		var controller = Router.current();
		var sort = controller.sessionsSort();
		if (sort[id] === '-1') return 'descending';
		if (sort[id] === '1') return 'ascending';
		return '';
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
	var path = controller.route.path({}, { query: query });
	Router.go(path);
};

Template._session_table_header.events({
	'click #createdAtSort': function (event) {
		sort('createdAt');
	},
	'click #locationSort': function (event) {
		sort('location.name');
	},
	'click #dentistSort': function (event) {
		sort('dentist.username');
	} 
});

Template._dentist_filter.onRendered(function () {
	var self = this;
	var controller = Router.current();
	var dropdown = self.$('.ui.dropdown');
	dropdown.dropdown({
		action: 'activate',
		forceSelection: false,
		sortSelect: true,
		onChange: function(value, text, $choice) {
			var query = _.clone(controller.params.query);
			if(typeof value === 'undefined' || typeof value === ''){query.dentistId = '';}
			else{query.dentistId = value;}
			var parms = {};
			if (controller.params.locationId) parms.locationId = controller.params.locationId;
			var path = controller.route.path(parms, { query: query });
			Router.go(path);
		}
	});
	self.autorun(function() {
		var params = controller.getParams();
		if (params.query.dentistId) {
			dropdown.dropdown('set selected', params.query.dentistId);
		} else dropdown.dropdown('clear');
	});
});

Template._dentist_filter.helpers({
	test: function() {
		var controller = Router.current();
		var selection = controller.getParams().query.dentistId || '';
		this.$('.ui.dropdown').has('#dentistFilter').dropdown('set selected', selection);
	}
});

Template._location_filter.onRendered(function() {
//Template._location_filter.rendered = function() {
	var self = this;
	var controller = Router.current();
	var dropdown = self.$('.ui.dropdown');
	dropdown.dropdown({
		action: 'activate',
		forceSelection: false,
		sortSelect: true,
		onChange: function(value, text, $choice) {
			var query = _.clone(controller.params.query);
			query.locationId = value;
			var path = controller.route.path({}, { query: query });
			Router.go(path);
		}
	});
	self.autorun(function() {
		var params = controller.getParams();
		if (params.query.locationId) {
			dropdown.dropdown('set selected', params.query.locationId);
		} else dropdown.dropdown('clear');
	});
});

Template._menu.onRendered(function() {
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

Template._menu.events({
	'change #dateStart': function(event) {
		var controller = Router.current();
		var query = _.clone(controller.params.query);
		query.start = $(event.target).val();
		var path = controller.route.path({}, { query: query });
		Router.go(path);
	},
	'change #dateEnd': function(event) {
		var controller = Router.current();
		var query = _.clone(controller.params.query);
		query.end = $(event.target).val();
		var path = controller.route.path({}, { query: query });
		Router.go(path);
	}
});
