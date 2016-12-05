Template.body.onRendered(function () {
	$(window).on('beforeunload', function () {
		localStorage.clear();
	});
});
