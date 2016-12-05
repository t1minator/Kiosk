AutoForm.hooks({
	resetPassword: {
		onSubmit: function(insertDoc) {
			var self = this;
			var controller = Router.current();
			Accounts.resetPassword(controller.params.token, insertDoc.newPassword, function(error) {
				self.resetForm();
				self.done();
				Router.go('/');
			});
			return false;
		}
	}
});
