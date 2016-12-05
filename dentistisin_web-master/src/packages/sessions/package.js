Package.describe({
	summary: 'Sessions package',
	name: 'sessions',
	version: '1.0.0'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('momentjs:moment', server);
	api.use('rzymek:moment-locale-es', server);
	api.use('mongo', both);
	api.use('check', server);
	api.use('underscore', server);
	api.use('aldeed:simple-schema', both);
	api.use('aldeed:collection2', server);
	api.use('alanning:roles', server);
	api.use('tmeasday:publish-counts', server);
	api.use('truevault', server);
	api.use('sightcall', server);
	api.use('percolate:synced-cron', server);
	api.use('fongandrew:find-and-modify', server);
	api.export('Sessions', both);
	api.addFiles('sessions_common.js', both);
	api.addFiles('sessions_server.js', server);
});
