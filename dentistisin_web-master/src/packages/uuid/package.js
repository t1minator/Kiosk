Package.describe({
	summary: 'UUID Wrapper',
	name: 'uuid',
	version: '1.4.3'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.export('UUID', server);
	api.addFiles('uuid.js', server);
});

Npm.depends({
	'node-uuid': '1.4.3'
});

Package.onTest(function (api) {
	api.use('uuid');
	api.use('tinytest@1.0.0');
	api.addFiles('uuid_test.js', 'server');
});
