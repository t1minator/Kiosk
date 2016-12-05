var inviteUser = new ReactiveVar(false);
var loading = new ReactiveVar(false);

Template._users_table.onCreated(function () {
	inviteUser = new ReactiveVar(false);
});

Template._invite_user.onCreated(function () {
	loading = new ReactiveVar(false);
});

Template._invite_user.onRendered(function () {
	AutoForm.resetForm('inviteUser');
});

Template._invite_user.helpers({
	loading: function() {
		return loading.get();
	}
});

Template._invite_user.events({
	'click #cancelInvite': function(event) {
		// Resetting the form here doesn't work
		inviteUser.set(false);
	}
});

AutoForm.hooks({
	inviteUser: {
		onSuccess: function() {
			inviteUser.set(false);
		},
		beginSubmit: function() {
			loading.set(true);
		},
		endSubmit: function() {
			loading.set(false);
		}
	}
})

Template._users_table.helpers({
	inviteUser: function() {
		return inviteUser.get();
	}
});

Template._users_table.events({
	'click #inviteUser': function(event) {
		inviteUser.set(true);
	}
});


Template._users_table_row.helpers({
	uname: function() {
		return this.username || 'Not set yet';
	},
	email: function() {
		return this.emails[0].address;
	},
	group: function() {
		groups = { ma: "Medical Admin", ta: "Technical Admin", dentist: "Dentist" };
		var display;
		try {
			display = groups[this.roles[0]];
		} catch (e) {
			display = "None";
		}
		return display;
	},
	enabled: function() {
		return this.active ? 'Yes' : 'No';
	}
});

Template._users_table_header.helpers({
	sortState: function(id) {
		var controller = Router.current();
		var sort = controller.usersSort();
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

Template._users_table_header.events({
	'click #usernameSort': function (event) {
		sort('username');
	}
});

var validId = Match.Where(function (x) {
	check(x, String);
	return SimpleSchema.RegEx.Id.test(x);
});

Template._users_table_row.events({
 'click .deleteAccount':function(){
	//console.log("Ava 01-" +this._id);
	//Meteor.call('deleteUser', this._id, function (error, result) { console.log(error, result);});
	// try {
		// check(this._id, validId);
	// } catch (e) {
		// return [];
	// }
	// var user = Meteor.users.findOne({_id: this._id}, { fields: { username: true, roles: true }});
	// if (user._id !== this._id && !Roles.userIsInRole(user, ['ma', 'ta'])) {
		// return [];
	// }	
	// var user = Meteor.users.findOne({_id: user._id}, { fields: { emails: true, 'trueVault.id': true, roles: true }});
	
	// console.log("Ava 01-" +user._id);
	// console.log("Ava 02-" +user.emails[0].address);
	// console.log("Ava 03-" +user.trueVault.id);
    // Meteor.users.remove({_id: this._id});
	// TrueVault.deleteUser(user.trueVault.id);
	try {
        check(this._id, validId)
    } catch (e) {
        return []
    }
    var user = Meteor.users.find({
        _id: this._id
    });
    console.log("User " + user);
    Meteor.users.remove({
        _id: this._id
    })
  }
});
