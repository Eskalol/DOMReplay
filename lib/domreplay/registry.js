'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = require('./eventbaseclass');

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Use this singleton to register events you want to record/replay.
 * the objects registered should extend EventBaseClass.
 * @access public
 */
var RegistrySingleton = function () {
	function RegistrySingleton() {
		_classCallCheck(this, RegistrySingleton);

		if (!this.instance) {
			this.instance = this;
			this._events = new Map();
		}
	}

	/**
  * Register an event.
  * Object passed should be an instance of EventBaseClass.
  * @param {EventBaseClass} event
  */


	_createClass(RegistrySingleton, [{
		key: 'registerEvent',
		value: function registerEvent(event) {
			if (!(event instanceof _eventbaseclass2.default)) {
				throw new _error.ProgrammingError('RegistrySingleton should only contain classes with EventBaseClass as superclass');
			}
			this._events.set(event.eventType, event);
		}

		/**
   * Gets an event from registry by event type.
   * @param {String} eventType
   * @returns {String | undefined}
   */

	}, {
		key: 'getEvent',
		value: function getEvent(eventType) {
			return this._events.get(eventType);
		}

		/**
   * Gets a list of events by tagname
   * @param {String} tagname
   * @returns {Array[]}
   */

	}, {
		key: 'getEventsByTagname',
		value: function getEventsByTagname(tagname) {
			var events = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this._events.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var event = _step.value;

					if (event.tagnames.includes(tagname)) {
						events.push(event);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return events;
		}

		/**
   * Delete an event from registry by event type.
   * @param {String} eventType
   */

	}, {
		key: 'deleteEvent',
		value: function deleteEvent(eventType) {
			this._events.delete(eventType);
		}

		/**
   * Clears all events from registry.
   */

	}, {
		key: 'clearAllEvents',
		value: function clearAllEvents() {
			this._events.clear();
		}

		/**
   * Gets event types in registry.
   * @returns {IterableIterator<String>}
   */

	}, {
		key: 'getEventTypes',
		value: function getEventTypes() {
			return this._events.keys();
		}

		/**
   * Gets tag names in registry.
   * @returns {Array}
   */

	}, {
		key: 'getTagnames',
		value: function getTagnames() {
			var tagnames = [];
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this._events.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var event = _step2.value;

					tagnames.push.apply(tagnames, _toConsumableArray(event.tagnames));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return tagnames;
		}

		/**
   * Gets registry size
   * @returns {number}
   */

	}, {
		key: 'setTrailFuncForAllEventsInRegistry',


		/**
   * Sets trail function for all events in registry.
   * @param {function} trailFunc
   */
		value: function setTrailFuncForAllEventsInRegistry(trailFunc) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this._events.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var event = _step3.value;

					event.trailFunc = trailFunc;
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}

		/**
   * Sets tracker function for all events in registry.
  	 * @param {function} trackerFunc
   */

	}, {
		key: 'setTrackerFuncForAllEventsInRegistry',
		value: function setTrackerFuncForAllEventsInRegistry(trackerFunc) {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this._events.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var event = _step4.value;

					event.trackerFunc = trackerFunc;
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}

		/**
   * @brief Set timing for all events in registry
   * Usually called when slowing down or speeding up replays.
   * @param {Number} timing - timing in ms
   */

	}, {
		key: 'setTimingForAllEventsInRegistry',
		value: function setTimingForAllEventsInRegistry(timing) {
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = this._events.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var event = _step5.value;

					event.timing = timing;
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}
		}

		/**
   * Sets replay speed for all events in registry
   * 2.0 is twice as fast.
   * @param divider 	- higher is faster, lower is slower.
   */

	}, {
		key: 'setReplaySpeedForAllEventsInRegistry',
		value: function setReplaySpeedForAllEventsInRegistry(divider) {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = this._events.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var event = _step6.value;

					event.replaySpeed = divider;
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}
		}
	}, {
		key: 'size',
		get: function get() {
			return this._events.size;
		}
	}]);

	return RegistrySingleton;
}();

exports.default = new RegistrySingleton();