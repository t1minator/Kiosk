Package.describe({
	summary: 'Users package',
	name: 'users',
	version: '1.0.0'
});

Npm.depends({
	"owasp-password-strength-test": "1.2.2"
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('check', server);
	api.use('templating', client);
	api.use('mquandalle:bower', client);
	api.use('accounts-base', both);
	api.use('accounts-password', server);
	api.use('underscore', both);
	api.use('aldeed:simple-schema', both);
	api.use('aldeed:collection2', server);
	api.use('alanning:roles', server);
	api.use('percolate:synced-cron', server);
	api.export('Users', both);
	api.addFiles('bower/bower.json', client);
	api.addFiles('users_common.js', both);
	api.addFiles('users_client.js', client);
	api.addFiles('users_server.js', server);
	
});
