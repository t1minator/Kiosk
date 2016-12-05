Package.describe({
	summary: 'TrueVault API Wrapper',
	name: 'truevault',
	version: '1.1.0'
});

Package.onUse(function (api) {
	var both = ['server', 'client'];
	var client = 'client';
	var server = 'server';
	api.use('underscore', both);
	api.use('http', both);
	api.use('base64', both);
	api.use('mongo', both);
	api.export('TrueVault', both);
	api.addFiles('truevault.js', both);
});
