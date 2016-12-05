Template.nav.rendered = function() {
	this.$('#nav-profile').dropdown({
		on: 'hover'
	});
};

Template.nav.helpers({
	userId: function() {
		var user = Meteor.user();
		if (!user) return null;
		//if (user.username) return user.username;
		return user._id;
	}
});

Template.nav.events({
	'click #signOut': function() {
		Meteor.logout();
	}
});
