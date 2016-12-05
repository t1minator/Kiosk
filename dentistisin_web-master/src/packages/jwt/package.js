Package.describe({
	summary: 'JWT Wrapper',
	name: 'jwt',
	version: '5.0.0'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.export('JWT', server);
	api.addFiles('jwt.js', server);
});

Npm.depends({
	jsonwebtoken: '5.0.0'
});

Package.onTest(function (api) {
	api.use('jwt');
	api.use('tinytest@1.0.0');
	api.addFiles('jwt_test.js', 'server');
});
