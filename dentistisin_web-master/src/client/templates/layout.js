Template.layout.helpers({
	loggingIn: function() {
		return Meteor.loggingIn();
	}
});

Template.layout.onRendered(function() {
	var self = this;
	self.modal = self.$('.modal');
	self.modal.modal({
		onShow: function() {
			self.handle = Meteor.setTimeout(function() {
				self.modal.modal('hide');
				Meteor.logout();
			}, 5*60*1000);
		},
		onHide: function() {
			if (self.handle) {
				Meteor.clearTimeout(self.handle);
				self.handle = null;
			}
		}
	});
	Tracker.autorun(function(c) {
		try {
			UserStatus.startMonitor({
				threshold: 8*60*60*1000,
				idleOnBlur: false
			});
			c.stop();
		} catch (e) {}
	});
	self.autorun(function(c) {
		if (UserStatus.isIdle() && Meteor.user()) {
			self.modal.modal('show');
		} else {
			if (self.handle) {
				Meteor.clearTimeout(self.handle);
				self.handle = null;
			}
		}
	});
});

Template.layout.onDestroyed(function() {
	try {
		UserStatus.stopMonitor();
	} catch (e) {}
});
