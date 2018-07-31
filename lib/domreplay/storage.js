'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _state = require('./state');

var _error = require('./error');

var _dispatcher = require('./dispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Stores information about the events recorded into local storage.
 * @access public
 */
var Storage = function () {
	function Storage() {
		_classCallCheck(this, Storage);

		if (!this.instance) {
			this.instance = this;
			this.storageKey = 'DOMREPLAY_EVENT_STORAGE';
		}
		return this.instance;
	}

	/**
  * Clears the event storage.
  */


	_createClass(Storage, [{
		key: 'clear',
		value: function clear() {
			window.localStorage.removeItem(this.storageKey);
			_logger2.default.debug('Event storage cleared!');
		}

		/**
   * Updates storage
   * @param {Object} eventObject
   */

	}, {
		key: 'updateStorage',
		value: function updateStorage(eventObject) {
			window.localStorage.setItem(this.storageKey, JSON.stringify(eventObject));
			(0, _dispatcher.dispatchStorageUpdateEvent)(this.getLastStored());
		}

		/**
   * Merge updates last stored event
   * @param {Object} updates
   */

	}, {
		key: 'updateLastStored',
		value: function updateLastStored(updates) {
			var events = this.events;
			events.events[events.count - 1] = _extends({}, this.getLastStored(), updates);
			this.updateStorage(events);
		}

		/**
   * Gets the last stored event in storage.
   * @returns {Object}			- last stored event.
   */

	}, {
		key: 'getLastStored',
		value: function getLastStored() {
			var events = this.events;
			if (!events) {
				return null;
			}
			return events.events[events.count - 1];
		}

		/**
   * Appends event to storage and increment storage count.
   * @param {Object} object 		- Object to append.
   * @access private
   */

	}, {
		key: '_appendEvent',
		value: function _appendEvent(object) {
			var events = this.events;
			if (!events) {
				events = {};
				events.count = 0;
				events.events = [];
			}
			events.events.push(object);
			events.count++;
			_logger2.default.debug('Count: ' + events.count + ', Event: type(' + object.type + ') id(' + object.id + ') value(' + object.value + ')');
			this.updateStorage(events);
		}

		/**
   * Gets stored event by index.
   * @param {Number} index
   * @returns {Object} 		- event object
   */

	}, {
		key: 'getItem',
		value: function getItem(index) {
			return this.events.events[index];
		}

		/**
   * Gets storage object
   * @returns {Object}
   */

	}, {
		key: 'store',


		/**
   * store event object in storage.
   * @param type
   * @param eventObject
   * @returns {Promise<Error> | Promise<Object>}
   */
		value: function store(type, eventObject) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (!(0, _state.stateIsRecord)()) {
					_logger2.default.error('Tried to add event to localstorage, but domreplay is not in record state');
					reject((0, _error.createStorageError)('Tried to add event to localstorage, but domreplay is not in record state'));
				}
				var objectToStore = _extends({
					location: window.location.href,
					type: type
				}, eventObject);
				_this._appendEvent(objectToStore);
				resolve(objectToStore);
			});
		}
	}, {
		key: 'events',
		get: function get() {
			return JSON.parse(window.localStorage.getItem(this.storageKey));
		}

		/**
   * returns the size of Storage by event count.
   * @returns {Number}
   */

	}, {
		key: 'size',
		get: function get() {
			return this.events.count;
		}
	}]);

	return Storage;
}();

exports.default = new Storage();