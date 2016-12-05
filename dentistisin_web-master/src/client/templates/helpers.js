Template.registerHelper('displayName', function(id) {
	var user;
	if (id) {
		user = Meteor.users.findOne({_id: id});
	} else {
		user = Meteor.user();
	}
	if (!user)
		return '';
	if (user.username)
		return user.username;
	if (user.emails && user.emails[0] && user.emails[0].address)
		return user.emails[0].address;
	return '';
});

Template.registerHelper('isMe', function(id) {
	return Meteor.user()._id === id;
});
