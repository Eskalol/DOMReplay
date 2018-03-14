'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _state = require('./state');

var _error = require('./error');

var _dispatcher = require('./dispatcher');

var _domhound = require('./domhound');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
	function Storage() {
		_classCallCheck(this, Storage);

		if (!this.instance) {
			this.instance = this;
			this.storageKey = 'DOMREPLAY_EVENT_STORAGE';
		}
		return this.instance;
	}

	_createClass(Storage, [{
		key: 'clear',
		value: function clear() {
			window.localStorage.removeItem(this.storageKey);
			_logger2.default.debug('Event storage cleared!');
		}
	}, {
		key: '_appendEvent',
		value: function _appendEvent(object) {
			var eventObject = JSON.parse(window.localStorage.getItem(this.storageKey));
			var eventList = [];
			if (!!eventObject) {
				eventList = eventObject.eventList;
			} else {
				eventObject = {};
				eventObject.count = 0;
				eventList = [];
			}
			eventList.push(object);
			eventObject.eventList = eventList;
			eventObject.count++;
			_logger2.default.debug('Count: ' + eventObject.count + ', Event: type(' + object.type + ') id(' + object.id + ') value(' + object.value + ')');
			window.localStorage.setItem(this.storageKey, JSON.stringify(eventObject));
		}
	}, {
		key: 'addEvent',
		value: function addEvent(element, type) {
			var _this = this;

			var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			return new Promise(function (resolve, reject) {
				if (!(0, _state.stateIsRecord)()) {
					_logger2.default.error('Tried to add event to localstorage, but domreplay is not in record state');
					reject((0, _error.createStorageError)('Tried to add event to localstorage, but domreplay is not in record state'));
				}
				var object = {
					type: type,
					location: window.location.href,
					trail: (0, _domhound.trail)(element, null, null)
				};
				if (value) {
					object.value = value;
				}
				console.log(object);
				(0, _domhound.tracker)(object.trail).then(function (element) {
					console.log(element);
				});
				_this._appendEvent(object);
				resolve(object);
			});
		}
	}, {
		key: 'eventList',
		get: function get() {
			return JSON.parse(window.localStorage.getItem(this.storageKey));
		}
	}]);

	return Storage;
}();

exports.default = new Storage();

// export default class Storage {
//   constructor(main) {
//     this.main = main;
//     this.util = main.util;
//     this.data = [];
//     this.isInitialized = true;
//     this.util.debug('Initializing Storage');
//   }

//   reset() {
//     this.data = [];
//   }

//   okToStoreEvent(element) {
//     if (!this.isInitialized) {
//       this.util.error('attempting to add element before storage was initialized!');
//       return false;
//     }
//     if (!this.main.operatingStateIsRecording()) {
//       this.util.debug('cancelling storage due to current operating state not set to record');
//       return false;
//     }
//     if (element.hasAttribute('DomReplayIgnore')) {
//       this.util.error('Cannot track ignored element');
//       return false;
//     }
//     if (!element || !element.id) {
//       this.util.error('Cannot add element to storage without valid id!');
//       return false;
//     }
//     return true;
//   }

//   addEvent(element, event, addValue = false) {
//     this.util.debug('adding event to storage');
//     if (!this.okToStoreEvent(element)) {
//       return;
//     }
//     const object = {
//       eventType: event,
//       id: element.id,
//     };
//     if (addValue) {
//       object.value = element.value;
//     }
//     this.data.push(object);
//   }

//   updateStorage(newData) {
//     this.util.debug('updating storage.data.');
//     this.util.debug('new data:');
//     this.util.debugLiteral(newData);
//     this.data = newData;
//   }
// }