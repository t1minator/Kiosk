(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var EJSON = Package.ejson.EJSON;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/zimme:iron-router-auth/server/hooks.coffee.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var hooks, skip;

hooks = Iron.Router.hooks;

skip = function() {
  return this.next();
};

hooks.authenticate = skip;

hooks.authorize = skip;
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/zimme:iron-router-auth/server/plugins.coffee.js          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var plugins;

plugins = Iron.Router.plugins;

plugins.auth = function() {};
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['zimme:iron-router-auth'] = {};

})();

//# sourceMappingURL=zimme_iron-router-auth.js.map
