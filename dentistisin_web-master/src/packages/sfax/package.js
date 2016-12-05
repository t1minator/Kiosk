'use strict';

Package.describe({
	name: 'sfax',
	summary: 'SFax API Wrapper',
	version: '1.0.0',
});

Package.onUse(function (api) {
	api.use('underscore', 'server');
	api.use('base64', 'server');
	api.use('momentjs:moment', 'server');
	api.export('SFax');
	api.addFiles('server/sfax.js', 'server');
});
