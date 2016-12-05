Package.describe({
	summary: 'Kiosk interface package',
	name: 'kiosk-interface',
	version: '1.0.0'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('mongo', server);
	api.use('check', server);
	api.use('underscore', server);
	api.use('aldeed:simple-schema', server);
	api.use('jwt', server);
	api.use('sessions', server);
	api.use('truevault', server);
	api.use('sightcall', server);
	api.export('Kiosk', both);
	api.addFiles('kiosk_server.js', server);
});
