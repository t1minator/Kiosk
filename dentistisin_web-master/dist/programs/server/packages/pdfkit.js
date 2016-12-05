(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var PDFDocument;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/pdfkit/pdfkit.js                                         //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
PDFDocument = Npm.require('pdfkit');                                 // 1
                                                                     // 2
var fs = Npm.require('fs');                                          // 3
PDFDocument.writeStream = function(file) {                           // 4
	return fs.createWriteStream(file);                                  // 5
};                                                                   // 6
                                                                     // 7
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.pdfkit = {
  PDFDocument: PDFDocument
};

})();

//# sourceMappingURL=pdfkit.js.map
