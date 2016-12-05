(function(){

'use strict';

var meteor = angular.module('ngMeteor', ['ngWebSocket', 'ngLodash']);

//function $MeteorFactory($ddp, $q) {
meteor.provider('$meteor', function $MeteorProvider() {
	var url = 'ws://localhost:3000/websocket';

	this.setUrl = function(newUrl) {
		url = newUrl;
	};

	this.$get = ['$ddp', '$q', '$timeout', function $MeteorFactory($ddp, $q, $timeout) {
		function $Meteor(url) {
			var self = this;

			self.url = url || 'ws://localhost:3000/websocket';
			self.ddp = null;
			self.connected = false;
			self.error = null;
			self.reconnecting = false;

			self.connect();
		}

		$Meteor.prototype._connect = function() {
			var self = this;
			self.ddp = $ddp(self.url);
			self.ddp.connect(function(error, reconnecting) {
				self.error = error;
				self.reconnecting = reconnecting;
				if(!error && !reconnecting) {
					self.connected = true;
				} else {
					self.connected = false;
				}
			});
		};

		$Meteor.prototype.connect = function() {
			var self = this;
			if (!self.ddp) {
				self._connect();
			}
			if (self.error) {
				self._connect();
			}
		};

		$Meteor.prototype.close = function() {
			var self = this;
			if (self.ddp) {
				self.ddp.close();
			}
		};

		$Meteor.prototype.call = function(method, params) {
			var self = this;
			if (!self.ddp) {
				self.connect();
			}
			var deferred = $q.defer();
			var timeout = $timeout(function() {
				deferred.reject({error: 'timeout'});
			}, 10000);
			self.ddp.call(method, params, function(err, result) {
				if(err) {
					deferred.reject(err);
					$timeout.cancel(timeout);
				}
				if(result) {
					deferred.resolve(result);
					$timeout.cancel(timeout);
				}
			});
			return deferred.promise;
		};

		$Meteor.prototype.subscribe = function(name, params) {
			var self = this;
			if (!self.ddp) {
				self.connect();
			}
			var deferred = $q.defer();
			var timeout = $timeout(function() {
				deferred.reject({error: 'timeout'});
			}, 10000);
			var id = self.ddp.subscribe(name, params, function(err) {
				if(err) {
					deferred.reject(err);
					$timeout.cancel(timeout);
				} else {
					deferred.resolve(id);
					$timeout.cancel(timeout);
				}
			});
			return deferred.promise;
			//return { id: id, subscription: deferred.promise };
		};

		$Meteor.prototype.unsubscribe = function(id) {
			var self = this;
			//if (!self.ddp) {
			//	self.connect();
			//}
			if (self.ddp) {
				self.ddp.unsubscribe(id);
			}
		};

		$Meteor.prototype.observe = function(name, events) {
			var self = this;
			if (!self.ddp) {
				self.connect();
			}
			return self.ddp.observe(name, events.added, events.updated, events.removed);
		};

		//return function(url) {
		return new $Meteor(url);
		//};
	}];
});

function $DdpProvider($rootScope, $q, $timeout, $websocket, _) {

	function $Ddp(url) {
		var self = this;

		self.url = url || 'ws://localhost:3000/websocket';

		//self.EJSON = EJSON // somehow

		self.autoReconnect = true;
		self.autoReconnectTimer = 5000;
		self.ddpVersion = '1';
		self.supportedDdpVersions = [self.ddpVersion];
		self.collections = {};
		self._isConnecting = false;
		self._isReconnecting = false;
		self._nextId = 0;
		self._callbacks = {};
		self._updatedCallbacks = {};
		self._observers = {};
	}

	$Ddp.prototype._prepareHandlers = function() {
		var self = this;

		self.socket.onOpen(function() {
			self._send({
				msg: 'connect',
				version: self.ddpVersion,
				support: self.supportedDdpVersions
			});
		});

		self.socket.onError(function(error) {
			if (self._isConncting) {
				$rootScope.$broadcast('MeteorConnectionFailed', error.message);
			}
			$rootScope.$broadcast('MeteorSocketError', error);
		});

		self.socket.onClose(function(event) {
			$rootScope.$broadcast('MeteorSocketClosed', event.code, event.reason);
			self._recoverNetworkError();
		});

		self.socket.onMessage(function(event) {
			self._message(event.data);
			$rootScope.$broadcast('MeteorMessage', event.data);
		});
	};

	$Ddp.prototype._clearReconnectTimeout = function() {
		var self = this;
		if (self.reconnectTimeout) {
			$timeout.cancel(self.reconnectTimeout);
			self.reconnectTimeout = null;
		}
	};

	$Ddp.prototype._recoverNetworkError = function() {
		var self = this;
		if (self.autoReconnect && !self._connectionFailed && !self._isClosing) {
			self._clearReconnectTimeout();
			self.reconnectTimeout = $timeout(function() { self.connect(); }, self.autoReconnectTimer);
			self._isReconnecting = true;
		}
	};

	$Ddp.prototype._send = function(data) {
		var self = this;
		self.socket.send(JSON.stringify(data));
	};

	$Ddp.prototype._message = function(data) {
		var self = this;
		try {
			data = JSON.parse(data);
		} catch (e) {
			return;
		}

		if (!data.msg) {
			return;
		} else if (data.msg === 'failed') {
			if (self.supportedDdpVersions.indexOf(data.version) !== -1) {
				self.ddpVersion = data.version;
				self.connect();
			} else {
				self.autoReconnect = false;
				$rootScope.$broadcast('MeteorConnectionFailed', 'Cannot negotiate DDP version');
			}
		} else if (data.msg === 'connected') {
			self.session = data.session;
			$rootScope.$broadcast('MeteorConnected');
		} else if (data.msg === 'result') {
			var cb = self._callbacks[data.id];
			if (cb) {
				cb(data.error, data.result);
				delete self._callbacks[data.id];
			}
		} else if (data.msg === 'updated') {
			_.each(data.methods, function (method) {
				var cb = self._updatedCallbacks[method];
				if (cb) {
					cb();
					delete self._updatedCallbacks[method];
				}
			});
		} else if (data.msg === 'nosub') {
			var cb = self._callbacks[data.id];
			if (cb) {
				cb(data.error);
				delete self._callbacks[data.id];
			}
		} else if (data.msg === 'added') {
			if (data.collection) {
				var name = data.collection, id = data.id;
				if (!self.collections[name]) {
					self.collections[name] = {};
				}
				if (!self.collections[name][id]) {
					self.collections[name][id] = {};
				}
				self.collections[name][id]._id = id;
				if (data.fields) {
					_.each(data.fields, function(value, key) {
						self.collections[name][id][key] = value;
					});
				}
				if (self._observers[name]) {
					_.each(self._observers[name], function(observer) {
						observer.added(id);
					});
				}
			}
		} else if (data.msg === 'removed') {
			if (data.collection) {
				var name = data.collection, id = data.id;
				if (!self.collections[name][id]) {
					return;
				}
				var oldValue = self.collections[name][id];
				delete self.collections[name][id];
				if (self._observers[name]) {
					_.each(self._observers[name], function(observer) {
						observer.removed(id, oldValue);
					});
				}
			}
		} else if (data.msg === 'changed') {
			if (data.collection) {
				var name = data.collection, id = data.id;
				if (!self.collections[name]) {
					return;
				}
				if (!self.collections[name][id]) {
					return;
				}
				var oldFields = {};
				var clearedFields = data.cleared || [];
				var newFields = {};
				if (data.fields) {
					_.each(data.fields, function(value, key) {
						oldFields[key] = self.collections[name][id][key];
						newFields[key] = value;
						self.collections[name][id][key] = value;
					});
				}
				if (data.cleared) {
					_.each(data.cleared, function(value) {
						delete self.collections[name][id][value];
					});
				}
				if (self._observers[name]) {
					_.each(self._observers[name], function(observer) {
						observer.updated(id, oldFields, clearedFields, newFields);
					});
				}
			}
		} else if (data.msg === 'ready') {
			_.each(data.subs, function(id) {
				var cb = self._callbacks[id];
				if (cb) {
					cb();
					delete self._callbacks[id];
				}
			});
		} else if (data.msg === 'ping') {
			self._send(
				_.has(data, 'id') ? { msg : 'pong', id : data.id } : { msg : 'pong' }
			);
		}
	};

	$Ddp.prototype._getNextId = function() {
		return (this._nextId +=1).toString();
	};

	$Ddp.prototype._addObserver = function(observer) {
		var self = this;
		if (!self._observers[observer.name]) {
			self._observers[observer.name] = {};
		}
		self._observers[observer.name][observer._id] = observer;
	};

	$Ddp.prototype._removeObserver = function(observer) {
		var self = this;
		if(!self._observers[observer.name]) {
			return;
		}
		delete self._observers[observer.name][observer._id];
	};

	$Ddp.prototype.connect = function(connected) {
		var self = this;
		self._isConnecting = true;
		self._connectionFailed = false;
		self._isClosing = false;

		if (connected) {
			self._connectedCbEnd = $rootScope.$on('MeteorConnected', function() {
				self._clearReconnectTimeout();
				connected(undefined, self._isReconnecting);
				self._isConnecting = false;
				self._isReconnecting = false;
			});
			self._failedCbEnd = $rootScope.$on('MeteorConnectionFailed', function(error) {
				self._isConnecting = false;
				self._connectionFailed = true;
				connected(error, self._isReconnecting);
			});
		}

		self.socket = $websocket(self.url);
		self._prepareHandlers();
	};

	$Ddp.prototype.close = function() {
		var self = this;
		self._isClosing = true;
		self.socket.close();
		self._connectedCbEnd();
		self._failedCbEnd();
	};

	$Ddp.prototype.call = function(name, params, callback, updatedCallback) {
		var self = this;
		var id = self._getNextId();

		if (callback) {
			self._callbacks[id] = callback;
		}

		if (updatedCallback) {
			self._updatedCallbacks[id] = updatedCallback;
		}

		self._send({
			msg: 'method',
			id: id,
			method: name,
			params: params
		});
	};

	$Ddp.prototype.callWithRandomSeed = function(name, params, randomSeed, callback, updatedCallback) {
		var self = this;
		var id = self._getNextId();

		if (callback) {
			self._callbacks[id] = callback;
		}

		if (updatedCallback) {
			self._updatedCallbacks[id] = updatedCallback;
		}

		self._send({
			msg: 'method',
			id: id,
			method: name,
			randomSeed: randomSeed,
			params: params
		});
	};

	$Ddp.prototype.subscribe = function(name, params, callback) {
		var self = this;
		var id = self._getNextId();

		if (callback) {
			self._callbacks[id] = callback;
		}

		self._send({
			msg: 'sub',
			id: id,
			name: name,
			params: params
		});

		return id;
	};

	$Ddp.prototype.unsubscribe = function(id) {
		var self = this;

		self._send({
			msg: 'unsub',
			id: id
		});
	};

	$Ddp.prototype.observe = function(name, added, updated, removed) {
		var self = this;
		var observer = {};
		var id = self._getNextId();

		Object.defineProperty(observer, 'name', {
			get: function() { return name; },
			enumerable: true
		});
		Object.defineProperty(observer, '_id', { get: function() { return id; }});

		observer.added = added || function() {};
		observer.updated = updated || function() {};
		observer.removed = removed || function() {};
		observer.stop = function() {
			self._removeObserver(observer);
		};

		self._addObserver(observer);
		return observer;
	};

	return function(url) {
		return new $Ddp(url);
	};
}

//var meteor = angular.module('ngMeteor', ['ngWebSocket', 'ngLodash']);
meteor.factory('$ddp', ['$rootScope', '$q', '$timeout', '$websocket', '_', $DdpProvider]);
//meteor.factory('$meteor', ['$ddp', '$q', $MeteorProvider]);
})();
