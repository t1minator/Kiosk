AutoForm.hooks({
	setPassword: {
		onSubmit: function(insertDoc) {
			var self = this;
			var controller = Router.current();
			Accounts.resetPassword(controller.params.token, insertDoc.newPassword, function(error) {
				console.log(insertDoc.newPassword);
				self.resetForm();
				self.done();
				Router.go('enrollUsername', {token: controller.params.token});
			});
			return false;
		}
	}
});
