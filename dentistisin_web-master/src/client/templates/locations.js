var createLocation = new ReactiveVar(false);
var loading = new ReactiveVar(false);

Template._locations_table.onCreated(function () {
	createLocation = new ReactiveVar(false);
});

Template._new_location.onCreated(function () {
	loading = new ReactiveVar(false);
});

Template._new_location.onRendered(function () {
	AutoForm.resetForm('newLocation');
});

Template._new_location.helpers({
	loading: function() {
		return loading.get();
	}
});

Template._new_location.events({
	'click #cancelCreate': function(event) {
		// Resetting the form here doesn't work
		createLocation.set(false);
	}
});

AutoForm.hooks({
	newLocation: {
		onSuccess: function() {
			createLocation.set(false);
		},
		beginSubmit: function() {
			loading.set(true);
		},
		endSubmit: function() {
			loading.set(false);
		},
		onError: function (formType, error) {
			this.validationContext.addInvalidKeys([{name: 'name', type: 'invalidLocation'}]);
		}
	}
})

Template._locations_table.helpers({
	createLocation: function() {
		return createLocation.get();
	}
});

Template._locations_table.events({
	'click #createLocation': function(event) {
		createLocation.set(true);
	}
});

Template._locations_table_row.helpers({
	getCounts: function(type, id) {
		return Counts.get('locations.'+id+'.'+type) || 0;
	}
});

Template._locations_table_header.helpers({
	sortState: function(id) {
		var controller = Router.current();
		var sort = controller.locationsSort();
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

Template._locations_table_header.events({
	'click #nameSort': function (event) {
		sort('name');
	}
});

Template._locations_menu.onRendered(function() {
	var self = this;
	var controller = Router.current();
	self.autorun(function() {
		var params = controller.getParams();
		if (params.query.date) {
			$('#date').val(params.query.date);
		} else {
			var date = new Date();
			var month = (date.getMonth() + 1).toString();
			if (month.length === 1) month = '0' + month;
			params.query.date = date.getFullYear() + '-' + month;
			$('#date').val(params.query.date);
		}
	});
});

Template._locations_menu.events({
	'change #date': function(event) {
		var controller = Router.current();
		var query = _.clone(controller.params.query);
		query.date = $(event.target).val();
		var path = controller.route.path({}, { query: query });
		Router.go(path);
	}
});

