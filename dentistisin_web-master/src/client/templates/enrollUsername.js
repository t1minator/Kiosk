AutoForm.hooks({
	setUsername: {
		onSubmit: function(insertDoc) {
			var self = this;
			Meteor.call('setUsername', insertDoc.username, function(error) {
				self.resetForm();
				self.done();
				Router.go('/');
			});
			return false;
		}
	}
});
