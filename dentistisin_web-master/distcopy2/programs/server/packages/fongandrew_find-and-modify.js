(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/fongandrew:find-and-modify/find_and_modify.js                        //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
(function() {                                                                    // 1
  'use strict';                                                                  // 2
  // Code adapted from https://github.com/meteor/meteor/issues/1070              // 3
                                                                                 // 4
  // Helper func to run shared validation code                                   // 5
  function validate(collection, args) {                                          // 6
    if(!collection._name)                                                        // 7
        throw new Meteor.Error(405,                                              // 8
                               "findAndModify: Must have collection name.");     // 9
                                                                                 // 10
    if(!args)                                                                    // 11
      throw new Meteor.Error(405, "findAndModify: Must have args.");             // 12
                                                                                 // 13
    if(!args.query)                                                              // 14
      throw new Meteor.Error(405, "findAndModify: Must have query.");            // 15
                                                                                 // 16
    if(!args.update && !args.remove)                                             // 17
      throw new Meteor.Error(405,                                                // 18
                             "findAndModify: Must have update or remove.");      // 19
  };                                                                             // 20
                                                                                 // 21
  if (Meteor.isServer) {                                                         // 22
    Mongo.Collection.prototype.findAndModify = function(args){                   // 23
      validate(this, args);                                                      // 24
                                                                                 // 25
      var q = {};                                                                // 26
      q.query = args.query || {};                                                // 27
      q.sort = args.sort || {};                                                  // 28
      if (args.update)                                                           // 29
        q.update = args.update;                                                  // 30
                                                                                 // 31
      q.options = {};                                                            // 32
      if (args.new !== undefined)                                                // 33
        q.options.new = args.new;                                                // 34
      if (args.remove !== undefined)                                             // 35
        q.options.remove = args.remove;                                          // 36
      if (args.upsert !== undefined)                                             // 37
        q.options.upsert = args.upsert;                                          // 38
      if (args.fields !== undefined)                                             // 39
        q.options.fields = args.fields;                                          // 40
                                                                                 // 41
      // If upsert, assign a string Id to $setOnInsert unless otherwise provided // 42
      if (q.options.upsert) {                                                    // 43
        q.update = q.update || {};                                               // 44
        q.update.$setOnInsert = q.update.$setOnInsert || {};                     // 45
        q.update.$setOnInsert._id = q.update.$setOnInsert._id || Random.id(17);  // 46
      }                                                                          // 47
                                                                                 // 48
      // Use rawCollection object introduced in Meteor 1.0.4.                    // 49
      var collectionObj = this.rawCollection();                                  // 50
                                                                                 // 51
      var wrappedFunc = Meteor.wrapAsync(collectionObj.findAndModify,            // 52
                                         collectionObj);                         // 53
      return wrappedFunc(                                                        // 54
        q.query,                                                                 // 55
        q.sort,                                                                  // 56
        q.update,                                                                // 57
        q.options                                                                // 58
      );                                                                         // 59
    };                                                                           // 60
  }                                                                              // 61
                                                                                 // 62
  if (Meteor.isClient) {                                                         // 63
    Mongo.Collection.prototype.findAndModify = function(args) {                  // 64
      validate(this, args);                                                      // 65
                                                                                 // 66
      var findOptions = {};                                                      // 67
      if (args.sort !== undefined)                                               // 68
        findOptions.sort = args.sort;                                            // 69
      if (args.fields !== undefined)                                             // 70
        findOptions.fields = args.fields;                                        // 71
      if (args.skip !== undefined)                                               // 72
        findOptions.skip = args.skip;                                            // 73
                                                                                 // 74
      var ret = this.findOne(args.query, findOptions);                           // 75
      if (args.remove) {                                                         // 76
        if (ret) this.remove({_id: ret._id});                                    // 77
      }                                                                          // 78
                                                                                 // 79
      else {                                                                     // 80
        if (args.upsert && !ret) {                                               // 81
          var writeResult = this.upsert(args.query, args.update);                // 82
          if (writeResult.insertedId && args.new)                                // 83
            return this.findOne({_id: writeResult.insertedId}, findOptions);     // 84
          else if (findOptions.sort)                                             // 85
            return {};                                                           // 86
          return null;                                                           // 87
        }                                                                        // 88
                                                                                 // 89
        else if (ret) {                                                          // 90
                                                                                 // 91
          // If we're in a simulation, it's safe to call update with normal      // 92
          // selectors (which is needed, e.g., for modifiers with positional     // 93
          // operators). Otherwise, we'll have to do an _id only update to       // 94
          // get around the restriction that lets untrusted (e.g. client)        // 95
          // code update collections by _id only.                                // 96
          var enclosing = DDP._CurrentInvocation.get();                          // 97
          var alreadyInSimulation = enclosing && enclosing.isSimulation;         // 98
          if (alreadyInSimulation) {                                             // 99
            // Add _id to query because Meteor's update doesn't include certain  // 100
            // options that the full findAndModify does (like sort). Create      // 101
            // shallow copy before update so as not to mess with user's          // 102
            // original query object                                             // 103
            var updatedQuery = {};                                               // 104
            for (var prop in args.query) {                                       // 105
              updatedQuery[prop] = args.query[prop];                             // 106
            }                                                                    // 107
            updatedQuery._id = ret._id;                                          // 108
            this.update(updatedQuery, args.update);                              // 109
          }                                                                      // 110
                                                                                 // 111
          else {                                                                 // 112
            this.update({_id: ret._id}, args.update);                            // 113
          }                                                                      // 114
                                                                                 // 115
          if (args.new)                                                          // 116
            return this.findOne({_id: ret._id}, findOptions);                    // 117
        }                                                                        // 118
      }                                                                          // 119
                                                                                 // 120
      return ret;                                                                // 121
    };                                                                           // 122
  }                                                                              // 123
                                                                                 // 124
})();                                                                            // 125
                                                                                 // 126
                                                                                 // 127
                                                                                 // 128
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fongandrew:find-and-modify'] = {};

})();

//# sourceMappingURL=fongandrew_find-and-modify.js.map
