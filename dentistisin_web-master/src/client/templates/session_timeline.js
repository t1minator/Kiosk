Template.session_timeline.helpers({
	timestamp: function(date) {
		return moment(date).format('MMMM Do YYYY, h:mm:ss');
	},
	locationId: function() {
		return {locationId: this.location._id};
	}
});
