(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var UUID;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/uuid/uuid.js                                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
UUID = Npm.require('node-uuid');                                     // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.uuid = {
  UUID: UUID
};

})();

//# sourceMappingURL=uuid.js.map
