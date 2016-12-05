PDFDocument = Npm.require('pdfkit');

var fs = Npm.require('fs');
PDFDocument.writeStream = function(file) {
	return fs.createWriteStream(file);
};
