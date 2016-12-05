Package.describe({
	summary: 'DIN Schemas',
	name: 'din-schemas',
	version: '0.0.2'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('underscore', server);
	api.use('aldeed:simple-schema');
	api.export('Schemas', both);
	api.addFiles('schemas_common.js', both);
	api.addFiles('schemas_server.js', server);
});

Npm.depends({
	//jsonwebtoken: '4.1.0'
});
