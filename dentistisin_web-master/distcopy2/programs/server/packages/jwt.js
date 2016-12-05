(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var JWT;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/jwt/jwt.js                                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
JWT = Npm.require('jsonwebtoken');                                   // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.jwt = {
  JWT: JWT
};

})();

//# sourceMappingURL=jwt.js.map
