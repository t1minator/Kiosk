'use strict';

Package.describe({
	name: 'sightcall',
	summary: 'Authentication client for SightCall',
	version: '1.0.0',
});

Package.onUse(function (api) {
	api.use('alanning:roles', 'client');
	api.use('reactive-var', 'client');
	api.use('underscore', 'server');
	api.use('accounts-base', 'client');
	api.use('session', 'client');
	api.use('jquery', 'client');
	api.use('dandv:http-more@1.0.7_1', 'server');
	api.export('SightCall');
	api.addFiles('server/sightcall.js', 'server');
	api.addFiles('client/sightcall.js', 'client');
	api.addFiles('public/rtcc.css', 'client');
});
