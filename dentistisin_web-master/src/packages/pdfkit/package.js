Package.describe({
	version: '1.0.1'
});

Npm.depends({
	pdfkit: '0.7.1'
});

Package.onUse(function (api) {
	api.export('PDFDocument', 'server');
	api.addFiles('pdfkit.js', 'server');
});
