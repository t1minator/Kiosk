Package.describe({
	summary: 'Locations package',
	name: 'locations',
	version: '1.0.0'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('random', server);
	api.use('momentjs:moment', server);
	api.use('mongo', both);
	api.use('check', server);
	api.use('underscore', server);
	api.use('aldeed:simple-schema', both);
	api.use('aldeed:collection2', server);
	api.use('alanning:roles', server);
	api.use('tmeasday:publish-counts', server);
	api.use('sessions', server);
	api.use('truevault', server);
	api.export('Locations', both);
	api.addFiles('locations_common.js', both);
	api.addFiles('locations_server.js', server);
});
