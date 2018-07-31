'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _error = require('./error');

var _domhound = require('./domhound');

var _state = require('./state');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Extend this when implementing custom events that should be recorded/replayed.
 * @access public
 */
var EventBaseClass = function () {
	function EventBaseClass() {
		_classCallCheck(this, EventBaseClass);

		if (new.target === EventBaseClass) {
			throw new TypeError('Cannot construct EventBaseClass instances directly');
		}
		this._trailFunc = _domhound.trail;
		this._trackerFunc = _domhound.tracker;
		this._replayTiming = 1000;
		this._replaySpeed = 1.0;
	}

	/**
  * Replay speed.
  * 2.0 is twice as fast.
  * @param divider		- higher is faster, lower is slower
  */


	_createClass(EventBaseClass, [{
		key: 'executeTimingRelative',


		/**
   * Executes function after timeout
   * @param func 							- function to call
   * @param {float} ratio 		- relative to timing.
   * @param args 							- arguments to be passed to the passed function.
   * @returns {Promise} 			- resolves with function return value after function has been executed.
   */
		value: function executeTimingRelative(func) {
			for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				args[_key - 2] = arguments[_key];
			}

			var _this = this;

			var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

			return new Promise(function (resolve) {
				setTimeout(function () {
					var retval = func.apply(undefined, args);
					resolve(retval);
				}, _this.timing * ratio);
			});
		}

		/**
   * Should return a string with event type, needs to be overridden by subclass.
   * @abstract
   */

	}, {
		key: 'addDomReplayBorderToElement',


		/**
   * add border to element.
   * @param {HTMLElement} element 	- HTML element.
   */
		value: function addDomReplayBorderToElement(element) {
			element.classList.add(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
		}

		/**
   * remove border from element.
   * @param {HTMLElement} element		- HTML element.
   */

	}, {
		key: 'removeDomReplayBorderFromElement',
		value: function removeDomReplayBorderFromElement(element) {
			element.classList.remove(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
		}

		/**
   * track element in HTML DOM by trail.
   * @param {Object} trail
   * @returns {*}
   */

	}, {
		key: 'trackElementOnTrail',
		value: function trackElementOnTrail(trail) {
			return this._trackerFunc(trail);
		}

		/**
   * make trail for element in HTML DOM.
   * @param {HTMLElement} element
   * @returns {*}
   */

	}, {
		key: 'makeTrailForElement',
		value: function makeTrailForElement(element) {
			return this._trailFunc(element);
		}

		/**
   * Set trail function
   * @param {function} trailFunc
   */

	}, {
		key: 'handler',


		/**
   * This is handler called when event is dispatched.
   * Should be overridden by subclass and store event to storage.
   * @abstract
   * @param {HTMLElement} element
   */
		value: function handler(element) {
			throw new _error.ProgrammingError('Not Implemented Error, please implement handler function');
		}

		/**
   * This is the function subscribed to the event.
   * This ensures only to call this.handler when the framework is in record state.
   * @param {HTMLElement} element
   * @access private
   */

	}, {
		key: '_handler',
		value: function _handler(element) {
			if ((0, _state.stateIsRecord)()) {
				_logger2.default.debug('handling ' + this.eventType + ' event on ' + element);
				this.handler(element);
			}
		}

		/**
   * This should be overridden by subclass, and should do the correct
   * replay sequence for the event.
   * @abstract
   * @param {Object} eventObject
   */

	}, {
		key: 'replay',
		value: function replay(eventObject) {
			throw new _error.ProgrammingError('Not implemented Error, please implement replay function');
		}

		/**
   * Gets the last stored event from storage.
   * @returns {Object} an object of the last stored event.
   */

	}, {
		key: 'getLastStored',
		value: function getLastStored() {
			return _storage2.default.getLastStored();
		}

		/**
   * Merge update the last stored event, useful when recording input events and such.
   * @param {Object} updates 	- update object.
   */

	}, {
		key: 'updateLastStored',
		value: function updateLastStored(updates) {
			return _storage2.default.updateLastStored(updates);
		}

		/**
   * Should be called when event is about to be stored.
   * @param {Object} eventObject
   * @returns {*|Promise<object>}
   */

	}, {
		key: 'store',
		value: function store(eventObject) {
			return _storage2.default.store(this.eventType, eventObject).catch(function (error) {
				throw error;
			});
		}

		/**
   * waits for the promise returned by this.store to be resolved.
   * @param {Object} eventObject
   * @returns {Promise<object>}
   */

	}, {
		key: 'syncStore',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventObject) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.store(eventObject);

							case 2:
								return _context.abrupt('return', _context.sent);

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function syncStore(_x2) {
				return _ref.apply(this, arguments);
			}

			return syncStore;
		}()
	}, {
		key: 'replaySpeed',
		set: function set(divider) {
			this._replaySpeed = divider;
		}

		/**
   * Sets the replay timing variable.
   * @param {Number} ms 		- time in milliseconds.
   */

	}, {
		key: 'timing',
		set: function set(ms) {
			this._replayTiming = ms;
		}

		/**
   * Gets the timing variable
   * @returns {number} gets the timing.
   */
		,
		get: function get() {
			return this._replayTiming / this._replaySpeed;
		}
	}, {
		key: 'eventType',
		get: function get() {
			throw new _error.ProgrammingError('Please override get eventType function to return a event type');
		}

		/**
   * Should return a list og tagnames which handlers should be subscribed to.
   * @abstract
   */

	}, {
		key: 'tagnames',
		get: function get() {
			throw new _error.ProgrammingError('Please override get tagnames function to return list of tagnames');
		}
	}, {
		key: 'trailFunc',
		set: function set(trailFunc) {
			this._trailFunc = trailFunc;
		}

		/**
   * set tracker function.
   * @param {function} trackerFunc
   */

	}, {
		key: 'trackerFunc',
		set: function set(trackerFunc) {
			this._trackerFunc = trackerFunc;
		}
	}]);

	return EventBaseClass;
}();

EventBaseClass.DOM_REPLAY_BORDER_CLASS = 'dom-replay-border';
exports.default = EventBaseClass;