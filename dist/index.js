/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Logger Singleton class,
 * used for debug, error and warning logging
 * @access private
 */
var Logger = function () {
	function Logger() {
		_classCallCheck(this, Logger);

		if (!this.instance) {
			this._debug = false;
			this.instance = this;
		}
		return this.instance;
	}

	/**
  * Debug logging.
  * @param  {String} message - message to log.
  */


	_createClass(Logger, [{
		key: 'debug',
		value: function debug(message) {
			if (this._debug) {
				console.log('%c[DOMReplay - Debug]: ' + message, 'background: #222; color: #bada55');
			}
		}

		/**
   * Warning logging.
   * @param  {String} message - message to log
   */

	}, {
		key: 'warning',
		value: function warning(message) {
			console.warn('[DOMReplay - Debug]: ' + message);
		}

		/**
   * Error logging.
   * @param  {String} message - message to log
   */

	}, {
		key: 'error',
		value: function error(message) {
			console.error('[DOMReplay - Debug]: ' + message);
		}

		/**
   * Set to true if we should log debug information
   * @param  {Boolean} debug - true if debug
   */

	}, {
		key: 'logging',
		set: function set(debug) {
			this._debug = debug;
		}
	}]);

	return Logger;
}();

exports.default = new Logger();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setStateReplay = exports.setStateRecord = exports.setStateReady = exports.stateIsReady = exports.stateIsRecord = exports.stateIsReplay = exports.clearStateStorage = exports.getState = exports.DOMREPLAY_STATE_READY = exports.DOMREPLAY_STATE_RECORD = exports.DOMREPLAY_STATE_REPLAY = undefined;

var _error = __webpack_require__(2);

var _dispatcher = __webpack_require__(4);

/**
 * Store the Domreplay state in local storage and provides functions to
 * change state safely and check state.
 */
var DOMREPLAY_STATE_STORAGE_KEY = 'DOMREPLAY_STATE';
var DOMREPLAY_STATE_REPLAY = exports.DOMREPLAY_STATE_REPLAY = 'DOMREPLAY_STATE_REPLAY';
var DOMREPLAY_STATE_RECORD = exports.DOMREPLAY_STATE_RECORD = 'DOMREPLAY_STATE_RECORD';
var DOMREPLAY_STATE_READY = exports.DOMREPLAY_STATE_READY = 'DOMREPLAY_STATE_READY';

/**
 * Gets the state from localstorage
 * @return {String} - current state
 */
var getState = exports.getState = function getState() {
	return window.localStorage.getItem(DOMREPLAY_STATE_STORAGE_KEY);
};

/**
 * Sets state
 * @param  {String} state - State to set
 */
var setState = function setState(state) {
	window.localStorage.setItem(DOMREPLAY_STATE_STORAGE_KEY, state);
};

/**
 * Clears the state storage
 */
var clearStateStorage = exports.clearStateStorage = function clearStateStorage() {
	window.localstorage.removeItem(DOMREPLAY_STATE);
};

/**
 * returns true if state is empy
 * @return {Boolean} - true if state is empty otherwise false.
 */
var stateIsEmpty = function stateIsEmpty() {
	return !getState();
};

/**
 * True if state is Replay
 * @return {Boolean} - True if state is Replay
 */
var stateIsReplay = exports.stateIsReplay = function stateIsReplay() {
	return getState() === DOMREPLAY_STATE_REPLAY;
};

/**
 * True if state is Record
 * @return {Boolean} - True if state is Record
 */
var stateIsRecord = exports.stateIsRecord = function stateIsRecord() {
	return getState() === DOMREPLAY_STATE_RECORD;
};

/**
 * True if state is Ready
 * @return {Boolean} - True if state is Ready
 */
var stateIsReady = exports.stateIsReady = function stateIsReady() {
	return getState() === DOMREPLAY_STATE_READY;
};

/**
 * Sets the state to ready.
 * Resolves when state has changed
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 */
var setStateReady = exports.setStateReady = function setStateReady() {
	var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return new Promise(function (resolve, reject) {
		if (force || stateIsEmpty()) {
			setState(DOMREPLAY_STATE_READY);
			(0, _dispatcher.dispatchStateChangeEvent)(getState());
			resolve(getState());
		} else if (stateIsReady()) {
			resolve(DOMREPLAY_STATE_READY);
		} else {
			reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_READY + '"'));
		}
	});
};

/**
 * Set state safely to record.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 * @return {Promise}        - Returns a Promise.
 */
var setStateRecord = exports.setStateRecord = function setStateRecord() {
	var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return new Promise(function (resolve, reject) {
		if (force || stateIsReady()) {
			setState(DOMREPLAY_STATE_RECORD);
			(0, _dispatcher.dispatchStateChangeEvent)(getState());
			resolve(getState());
		} else if (stateIsReplay()) {
			resolve(DOMREPLAY_STATE_RECORD);
		} else {
			reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_RECORD + '"'));
		}
	});
};

/**
 * Set state safely to replay.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force - no safe
 * @return {Promise}       - Returns a Promise.
 */
var setStateReplay = exports.setStateReplay = function setStateReplay() {
	var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return new Promise(function (resolve, reject) {
		if (force || stateIsReady()) {
			setState(DOMREPLAY_STATE_REPLAY);
			(0, _dispatcher.dispatchStateChangeEvent)(getState());
			resolve(getState());
		} else if (stateIsReplay()) {
			resolve(DOMREPLAY_STATE_REPLAY);
		} else {
			reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_REPLAY + '"'));
		}
	});
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Constants and error objects which is thrown
 */

var STATE_ERROR = exports.STATE_ERROR = 'STATE_ERROR';

var createStateError = exports.createStateError = function createStateError(message) {
	return {
		type: STATE_ERROR,
		message: message
	};
};

var STORAGE_ERROR = exports.STORAGE_ERROR = 'STORAGE_ERROR';

var createStorageError = exports.createStorageError = function createStorageError(message) {
	return {
		type: STORAGE_ERROR,
		message: message
	};
};

/**
 * Thrown when the framework is wrongly used.
 * Please read error and fix it.
 */

var ProgrammingError = exports.ProgrammingError = function (_Error) {
	_inherits(ProgrammingError, _Error);

	function ProgrammingError(message) {
		var _ref;

		_classCallCheck(this, ProgrammingError);

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = ProgrammingError.__proto__ || Object.getPrototypeOf(ProgrammingError)).call.apply(_ref, [this, 'DOM-Replay programming Error: ' + message].concat(args)));

		_this.name = _this.constructor.name;
		Error.captureStackTrace(_this, _this.constructor);
		return _this;
	}

	return ProgrammingError;
}(Error);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(7);

var _storage2 = _interopRequireDefault(_storage);

var _error = __webpack_require__(2);

var _domhound = __webpack_require__(10);

var _state = __webpack_require__(1);

var _logger = __webpack_require__(0);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dispatchReplayUpdateEventListener = exports.addReplayUpdateEventListener = exports.dispatchStorageUpdateEvent = exports.addStorageUpdateEventListener = exports.dispatchStateChangeEvent = exports.addStateChangeEventListener = undefined;

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMREPLAY_STATE_CHANGE_EVENT = 'DOMREPLAY_STATE_CHANGE_EVENT'; /**
                                                                    * Useful when we want to react on state change events in the ui.
                                                                    */

var DOMREPLAY_STORAGE_UPDATE_EVENT = 'DOMREPLAY_STORAGE_UPDATE_EVENT';
var DOMREPLAY_REPLAY_UPDATE_EVENT = 'DOMREPLAY_REPLAY_UPDATE_EVENT';

/**
 * Adds an event listener to the state change event.
 * @param  {function} func - the function to be called when the event has been dispached.
 * @access public
 */
var addStateChangeEventListener = exports.addStateChangeEventListener = function addStateChangeEventListener(func) {
	_logger2.default.debug('adding add state event listener');
	window.addEventListener(DOMREPLAY_STATE_CHANGE_EVENT, func);
};

/**
 * State change event dispatcher.
 * @param  {String} state - the current state.
 */
var dispatchStateChangeEvent = exports.dispatchStateChangeEvent = function dispatchStateChangeEvent(state) {
	_logger2.default.debug('dispatching state change event');
	var event = new CustomEvent(DOMREPLAY_STATE_CHANGE_EVENT, {
		detail: {
			state: state,
			message: 'State has changed to ' + state
		}
	});
	window.dispatchEvent(event);
};

/**
 * Adds an event listener to the storage update event.
 * @param  {function} func 	- the function to be called when the event has been dispatched.
 * @access public
 */
var addStorageUpdateEventListener = exports.addStorageUpdateEventListener = function addStorageUpdateEventListener(func) {
	_logger2.default.debug('adding storage update event listener');
	window.addEventListener(DOMREPLAY_STORAGE_UPDATE_EVENT, func);
};

/**
 * Storage update event dispatcher.
 * @param  {Object} update - object with update information.
 */
var dispatchStorageUpdateEvent = exports.dispatchStorageUpdateEvent = function dispatchStorageUpdateEvent(update) {
	_logger2.default.debug('dispatching storage update event');
	var event = new CustomEvent(DOMREPLAY_STORAGE_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
};

/**
 * Adds an event event listener to the replay update event.
 * @param {function} func - the function to be called when the event has been dispatched.
 * @access public
 */
var addReplayUpdateEventListener = exports.addReplayUpdateEventListener = function addReplayUpdateEventListener(func) {
	_logger2.default.debug('adding replay update event listener');
	window.addEventListener(DOMREPLAY_REPLAY_UPDATE_EVENT, func);
};

/**
 * Replay update event dispatcher
 * @param {Object} update - object with update information
 */
var dispatchReplayUpdateEventListener = exports.dispatchReplayUpdateEventListener = function dispatchReplayUpdateEventListener(update) {
	_logger2.default.debug('dispatching replay ipdate event');
	var event = new CustomEvent(DOMREPLAY_REPLAY_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Registry = exports.EventBaseClass = exports.default = exports.Hud = exports.Storage = exports.events = exports.state = exports.dispatcher = exports.domreplayIgnoreAttributeName = undefined;

var _loader = __webpack_require__(8);

Object.defineProperty(exports, 'domreplayIgnoreAttributeName', {
	enumerable: true,
	get: function get() {
		return _loader.domreplayIgnoreAttributeName;
	}
});

var _storage = __webpack_require__(7);

Object.defineProperty(exports, 'Storage', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_storage).default;
	}
});

var _hud = __webpack_require__(13);

Object.defineProperty(exports, 'Hud', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_hud).default;
	}
});

var _domreplay = __webpack_require__(15);

Object.defineProperty(exports, 'default', {
	enumerable: true,
	get: function get() {
		return _domreplay.DomReplay;
	}
});

var _eventbaseclass = __webpack_require__(3);

Object.defineProperty(exports, 'EventBaseClass', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_eventbaseclass).default;
	}
});

var _registry = __webpack_require__(6);

Object.defineProperty(exports, 'Registry', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_registry).default;
	}
});

var _dispatcher = __webpack_require__(4);

var _state = __webpack_require__(1);

var _defaultEvents = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatcher = exports.dispatcher = {
	addStateChangeEventListener: _dispatcher.addStateChangeEventListener,
	addStorageUpdateEventListener: _dispatcher.addStorageUpdateEventListener,
	addReplayUpdateEventListener: _dispatcher.addReplayUpdateEventListener
};

var state = exports.state = {
	DOMREPLAY_STATE_REPLAY: _state.DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD: _state.DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY: _state.DOMREPLAY_STATE_READY,
	stateIsReplay: _state.stateIsReplay,
	stateIsRecord: _state.stateIsRecord,
	stateIsReady: _state.stateIsReady
};

var events = exports.events = {
	ClickEvent: _defaultEvents.ClickEvent,
	InputEvent: _defaultEvents.InputEvent
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = __webpack_require__(3);

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

var _error = __webpack_require__(2);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _state = __webpack_require__(1);

var _error = __webpack_require__(2);

var _dispatcher = __webpack_require__(4);

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domloader = exports.domreplayIgnoreAttributeName = undefined;

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _registry = __webpack_require__(6);

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(elementByTagNameIterator),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(getFlatElementIterator);

// HTMLElements using this attribute will be ignored
var domreplayIgnoreAttributeName = exports.domreplayIgnoreAttributeName = 'dom-replay-ignore';

/**
 * Generator function that creates an iterator of
 * elements by tag name
 * @param {String} tagname     - HTML tag name
 * @yield {HTMLElement} Element
 */
function elementByTagNameIterator(tagname) {
	var elements;
	return regeneratorRuntime.wrap(function elementByTagNameIterator$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					elements = document.getElementsByTagName(tagname);
					return _context.delegateYield(Array.from(elements).map(function (element) {
						return element;
					}), 't0', 2);

				case 2:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked, this);
}

/**
 * Initializes events on elements in the dom.
 */
var initializeEvents = function initializeEvents() {
	_logger2.default.debug('Initializing existing events.');
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = _registry2.default.getTagnames()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var tagname = _step.value;

			var events = _registry2.default.getEventsByTagname(tagname);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				var _loop = function _loop() {
					var element = _step2.value;

					if (!element.hasAttribute(domreplayIgnoreAttributeName)) {
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							var _loop2 = function _loop2() {
								var event = _step3.value;

								_logger2.default.debug('Adding ' + event.eventType + ' event listener to element');
								element.addEventListener(event.eventType, function () {
									return event._handler(element);
								}, false);
							};

							for (var _iterator3 = events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								_loop2();
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
				};

				for (var _iterator2 = elementByTagNameIterator(tagname)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					_loop();
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
};

/**
 * Flattens the node tree and yields only,
 * HTML elements with tagnames that should,
 * be tracked.
 * @param {[type]} mutation      		- mutation object from the mutation observer.
 * @param {Array[]} tagfilter     - tagnames that should be tracked
 * @yield {HTMLElement} yields trackable HTMLElements.
 */
function getFlatElementIterator(mutation, tagfilter) {
	var recursiveFlat, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, node;

	return regeneratorRuntime.wrap(function getFlatElementIterator$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					recursiveFlat = /*#__PURE__*/regeneratorRuntime.mark(function recursiveFlat(node) {
						var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, n;

						return regeneratorRuntime.wrap(function recursiveFlat$(_context2) {
							while (1) {
								switch (_context2.prev = _context2.next) {
									case 0:
										if (!(node instanceof HTMLElement && tagfilter.includes(node.tagName.toLowerCase()) && !node.hasAttribute(domreplayIgnoreAttributeName))) {
											_context2.next = 5;
											break;
										}

										_context2.next = 3;
										return node;

									case 3:
										_context2.next = 31;
										break;

									case 5:
										if (!(node.childNodes.length > 0)) {
											_context2.next = 31;
											break;
										}

										_iteratorNormalCompletion4 = true;
										_didIteratorError4 = false;
										_iteratorError4 = undefined;
										_context2.prev = 9;
										_iterator4 = Array.from(node.childNodes)[Symbol.iterator]();

									case 11:
										if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
											_context2.next = 17;
											break;
										}

										n = _step4.value;
										return _context2.delegateYield(recursiveFlat(n, tagfilter), 't0', 14);

									case 14:
										_iteratorNormalCompletion4 = true;
										_context2.next = 11;
										break;

									case 17:
										_context2.next = 23;
										break;

									case 19:
										_context2.prev = 19;
										_context2.t1 = _context2['catch'](9);
										_didIteratorError4 = true;
										_iteratorError4 = _context2.t1;

									case 23:
										_context2.prev = 23;
										_context2.prev = 24;

										if (!_iteratorNormalCompletion4 && _iterator4.return) {
											_iterator4.return();
										}

									case 26:
										_context2.prev = 26;

										if (!_didIteratorError4) {
											_context2.next = 29;
											break;
										}

										throw _iteratorError4;

									case 29:
										return _context2.finish(26);

									case 30:
										return _context2.finish(23);

									case 31:
									case 'end':
										return _context2.stop();
								}
							}
						}, recursiveFlat, this, [[9, 19, 23, 31], [24,, 26, 30]]);
					});
					_iteratorNormalCompletion5 = true;
					_didIteratorError5 = false;
					_iteratorError5 = undefined;
					_context3.prev = 4;
					_iterator5 = Array.from(mutation.addedNodes)[Symbol.iterator]();

				case 6:
					if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
						_context3.next = 12;
						break;
					}

					node = _step5.value;
					return _context3.delegateYield(recursiveFlat(node), 't0', 9);

				case 9:
					_iteratorNormalCompletion5 = true;
					_context3.next = 6;
					break;

				case 12:
					_context3.next = 18;
					break;

				case 14:
					_context3.prev = 14;
					_context3.t1 = _context3['catch'](4);
					_didIteratorError5 = true;
					_iteratorError5 = _context3.t1;

				case 18:
					_context3.prev = 18;
					_context3.prev = 19;

					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}

				case 21:
					_context3.prev = 21;

					if (!_didIteratorError5) {
						_context3.next = 24;
						break;
					}

					throw _iteratorError5;

				case 24:
					return _context3.finish(21);

				case 25:
					return _context3.finish(18);

				case 26:
				case 'end':
					return _context3.stop();
			}
		}
	}, _marked2, this, [[4, 14, 18, 26], [19,, 21, 25]]);
}

/**
 * Initializes mutation observer,
 * when ever a new element has been added, it will automaticly
 * add event listener to the element.
 */
var initializeMutationObserver = function initializeMutationObserver() {
	_logger2.default.debug('Initializing mutation observer.');
	var analyzeElement = function analyzeElement(element) {
		if (_registry2.default.getTagnames().includes(element.tagName.toLowerCase())) {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				var _loop3 = function _loop3() {
					var event = _step6.value;

					_logger2.default.debug('mutationobserver is adding a ' + event.eventType + '-listener to element ' + element.id);
					element.addEventListener(event.eventType, function () {
						return event._handler(element);
					}, false);
				};

				for (var _iterator6 = _registry2.default.getEventsByTagname(element.tagName.toLowerCase())[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					_loop3();
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
	};

	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {
				for (var _iterator7 = getFlatElementIterator(mutation, _registry2.default.getTagnames())[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var _element = _step7.value;

					analyzeElement(_element);
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}
		});
	});

	var config = {
		childList: true,
		subtree: true
	};
	observer.observe(document.body, config);
};

/**
 * Initializes events on existing elements,
 * and initializes the mutation observer when
 * document is ready.
 * @access private
 * @param  {Boolean} test -  if true mutation observer is disabled.
 */
var domloader = exports.domloader = function domloader() {
	var test = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return new Promise(function (resolve) {
		var time = setInterval(function () {
			if (document.readyState !== 'complete') {
				_logger2.default.debug('Ready-state check failed!');
				return;
			}
			clearInterval(time);
			initializeEvents();

			// Don't initialize mutation observer when testing.
			if (!test) {
				initializeMutationObserver();
			}
			_logger2.default.debug('Done initializing events');
			resolve();
		}, 100);
	});
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(22);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trail = __webpack_require__(11);

Object.defineProperty(exports, 'trail', {
  enumerable: true,
  get: function get() {
    return _trail.trail;
  }
});

var _tracker = __webpack_require__(12);

Object.defineProperty(exports, 'tracker', {
  enumerable: true,
  get: function get() {
    return _tracker.tracker;
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Iterates over previous siblings to find its index.
 * @param {HTMLElement} element		- HTMLElement to find index.
 * @param {Number} index 					- current index.
 * @returns {Number}							- sibling index of element passed.
 * @private
 */
var _getSiblingIndex = function _getSiblingIndex(element, index) {
	if (element.previousElementSibling == null) {
		return index;
	}
	return _getSiblingIndex(element.previousElementSibling, ++index);
};

/**
 * Creates a trail according to its ancestors and siblings recursively.
 * @param {HTMLElement} element 	- HTMLElement to make trail of
 * @param {Object} child					- child branch.
 * @param {Number} childIndex
 * @returns {Object}
 * @access public
 */
var trail = exports.trail = function trail(element) {
	var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var childIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	if (element.id) {
		return {
			id: element.id,
			child: child,
			tag: null,
			childIndex: childIndex
		};
	} else if (element.tagName.toLowerCase() === 'body') {
		return {
			id: null,
			child: child,
			tag: element.tagName.toLowerCase(),
			childIndex: childIndex
		};
	}
	return trail(element.parentNode, {
		id: null,
		child: child,
		tag: null,
		childIndex: childIndex
	}, _getSiblingIndex(element, 0));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Recursively tracks down the element according to its trail.
 * @param element
 * @param trail
 * @returns {*}
 * @access private
 */
var _recursiveTracker = function _recursiveTracker(element, trail) {
	if (!trail.child) {
		return element;
	} else {
		return _recursiveTracker(element.children.item(trail.childIndex), trail.child);
	}
	return null;
};

/**
 * Tracks down element according to trail.
 * @param trail
 * @returns {Promise<HTMLElement> | Promise<null>}
 * @access public
 */
var tracker = exports.tracker = function tracker(trail) {
	return new Promise(function (resolve, reject) {
		var element = void 0;
		if (trail.id && !trail.child) {
			element = document.getElementById(trail.id);
		} else if (trail.id && trail.child) {
			element = _recursiveTracker(document.getElementById(trail.id), trail);
		} else if (trail.tag === 'body' && trail.child) {
			element = _recursiveTracker(document.body, trail);
		}
		if (!element) {
			reject(null);
		} else {
			resolve(element);
		}
	});
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(5);

var _modal = __webpack_require__(14);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var button = function button() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.className = 'dom-hud-btn ' + classes;
  button.setAttribute(_.domreplayIgnoreAttributeName, '');
  return button;
};

var div = function div() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var div = document.createElement('div');
  div.className = classes;
  div.id = id;
  return div;
};

var inputRange = function inputRange() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var input = document.createElement('input');
  input.className = 'dom-slider ' + classes;
  input.setAttribute(_.domreplayIgnoreAttributeName, '');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.value = '' + value;
  return input;
};

var span = function span() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var span = document.createElement('span');
  span.className = classes;
  return span;
};

var Hud = function () {
  function Hud(domreplay) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Hud);

    this.config = config;
    this.domreplay = domreplay;
    this.replayButton = button('    Replay', 'play');
    this.stopButton = button('    Stop', 'stop');
    this.recordButton = button('    Record', 'record');
    this.loadFromStorageButton = button('    Load from storage', 'load');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');
    this.shareButton = button('    Share', 'share');

    this.addEventListenerToElement(this.shareButton, 'click', this.getShareButtonEvent());
    this.addEventListenerToElement(this.replayButton, 'click', this.getReplayButtonEvent());
    this.addEventListenerToElement(this.loadFromStorageButton, 'click', this.getLoadFromStorageButtonEvent());
    this.addEventListenerToElement(this.recordButton, 'click', this.getRecordButtonEvent());
    this.addEventListenerToElement(this.stopButton, 'click', this.getStopButtonEvent());
    this.addEventListenerToElement(this.dropDownButton, 'click', this.getDropDownButtonEvent());
    this._initializeIndicators();
    this._initializeEventListeners();
  }

  _createClass(Hud, [{
    key: '_initializeIndicators',
    value: function _initializeIndicators() {
      this.replayStateIndicator = null;
      this.recordStateIndicator = null;
      if (this.config.showRecordIndicator && _.state.stateIsRecord()) {
        this._renderRecordStateIndicator();
      } else if (this.config.showReplayIndicator && _.state.stateIsReplay()) {
        this._renderReplayStateIndicator();
      }
    }
  }, {
    key: '_initializeEventListeners',
    value: function _initializeEventListeners() {
      var _this = this;

      _.dispatcher.addStateChangeEventListener(function (event) {
        if (_.state.stateIsRecord() && _this.config.showRecordIndicator) {
          _this._renderRecordStateIndicator();
        } else if (_.state.stateIsReplay() && _this.config.showReplayIndicator) {
          _this._renderReplayStateIndicator();
        } else {
          _this._removeRecordStateIndicator();
          _this._removeReplayStateIndicator();
        }
      });
    }
  }, {
    key: 'getShareButtonEvent',
    value: function getShareButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        var modal = new _modal2.default();
        modal.render();
        modal.handleResponse(domreplay.pushStorageToServer());
      };
    }
  }, {
    key: 'getLoadFromStorageButtonEvent',
    value: function getLoadFromStorageButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.loadEventsFromLocalStorage();
      };
    }
  }, {
    key: 'getReplayButtonEvent',
    value: function getReplayButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.play();
      };
    }
  }, {
    key: 'getRecordButtonEvent',
    value: function getRecordButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.startRecord();
      };
    }
  }, {
    key: 'getStopButtonEvent',
    value: function getStopButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.stop();
      };
    }
  }, {
    key: 'getDropDownButtonEvent',
    value: function getDropDownButtonEvent() {
      var header = this.header;
      var button = this.dropDownButton;

      return function () {
        if (header.className.indexOf('slide-down') !== -1) {
          header.className = header.className.substring(0, header.className.indexOf(' slide-down'));
          header.className += ' slide-up';
        } else {
          if (header.className.indexOf('slide-up') !== -1) {
            header.className = header.className.substring(0, header.className.indexOf(' slide-up'));
          }
          header.className += ' slide-down';
        }

        if (button.className.indexOf('slide-down') !== -1) {
          button.className = button.className.substring(0, button.className.indexOf(' slide-down'));
          button.className += ' slide-up';
        } else {
          if (button.className.indexOf('slide-up') !== -1) {
            button.className = button.className.substring(0, button.className.indexOf(' slide-up'));
          }
          button.className += ' slide-down';
        }
      };
    }
  }, {
    key: 'addEventListenerToElement',
    value: function addEventListenerToElement(element, type, event) {
      element.addEventListener(type, event);
    }
  }, {
    key: '_renderReplayStateIndicator',
    value: function _renderReplayStateIndicator() {
      this.replayStateIndicator = div('dom-state-indicator replay');
      var text = document.createElement('h1');
      text.innerHTML = "REPLAY";
      this.replayStateIndicator.appendChild(text);
      document.getElementsByTagName('body')[0].appendChild(this.replayStateIndicator);
    }
  }, {
    key: '_removeReplayStateIndicator',
    value: function _removeReplayStateIndicator() {
      if (this.replayStateIndicator) {
        this.replayStateIndicator.parentNode.removeChild(this.replayStateIndicator);
      }
    }
  }, {
    key: '_renderRecordStateIndicator',
    value: function _renderRecordStateIndicator() {
      this.recordStateIndicator = div('dom-state-indicator record');
      var text = document.createElement('h1');
      text.innerHTML = 'REC';
      this.recordStateIndicator.appendChild(text);
      document.getElementsByTagName('body')[0].appendChild(this.recordStateIndicator);
    }
  }, {
    key: '_removeRecordStateIndicator',
    value: function _removeRecordStateIndicator() {
      if (this.recordStateIndicator) {
        this.recordStateIndicator.parentNode.removeChild(this.recordStateIndicator);
      }
    }
  }, {
    key: '_getNewSlider',
    value: function _getNewSlider() {
      var _this2 = this;

      var currentReplaySpeed = this.domreplay.getCurrentReplaySpeed();
      var sliderContainer = div('dom-slidecontainer');
      var slider = inputRange('', "1", "100", '' + (currentReplaySpeed - 0.2) / 2 * 100);
      var sliderSpan = span('speed');
      slider.oninput = function () {
        sliderSpan.innerText = '  x ' + Math.round(Number(slider.value) / 50 * 100 + 20) / 100;
      };
      slider.onchange = function () {
        _this2.domreplay.setReplaySpeed(Math.round(Number(slider.value) / 50 * 100 + 20) / 100);
      };
      sliderContainer.appendChild(slider);
      sliderSpan.innerText = '  x ' + this.domreplay.getCurrentReplaySpeed();
      return [sliderContainer, sliderSpan];
    }
  }, {
    key: 'getContainer',
    value: function getContainer() {
      var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var container = div(classes);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var e = _step.value;

          container.appendChild(e);
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

      return container;
    }
  }, {
    key: 'render',
    value: function render() {
      var recordReplay = this.getContainer.apply(this, ['dom-container', this.replayButton, this.stopButton, this.recordButton].concat(_toConsumableArray(this._getNewSlider())));
      var storageContainer = this.getContainer('dom-container', this.loadFromStorageButton, this.shareButton);
      this.header.appendChild(recordReplay);
      this.header.appendChild(storageContainer);
      var body = document.getElementsByTagName('body')[0];
      body.prepend(this.header);
      body.prepend(this.dropDownButton);
    }
  }]);

  return Hud;
}();

exports.default = Hud;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var div = function div() {
	var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	var div = document.createElement('div');
	div.className = classes;
	div.id = id;
	return div;
};

var input = function input() {
	var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	var input = document.createElement('input');
	input.type = 'text';
	input.className = classes;
	input.setAttribute(_.domreplayIgnoreAttributeName, '');
	return input;
};

var button = function button() {
	var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	var button = document.createElement('button');
	button.innerHTML = text;
	button.id = id;
	button.className = 'dom-hud-btn ' + classes;
	button.setAttribute(_.domreplayIgnoreAttributeName, '');
	return button;
};

var Modal = function () {
	function Modal() {
		_classCallCheck(this, Modal);

		this.modalContainer = div('dom-modal');
		this.modalContent = div('dom-modal-content');
		this.close = document.createElement('span');
		this.close.className = 'dom-modal-close';
		this.close.setAttribute(_.domreplayIgnoreAttributeName, '');
		this.close.addEventListener('click', this.getCloseHandler());
		this.modalContent.appendChild(this.close);
		this.modalContainer.appendChild(this.modalContent);
	}

	_createClass(Modal, [{
		key: 'getCloseHandler',
		value: function getCloseHandler() {
			var modalContainer = this.modalContainer;
			return function () {
				modalContainer.parentNode.removeChild(modalContainer);
			};
		}
	}, {
		key: 'createInputCopyButtonPair',
		value: function createInputCopyButtonPair(text, inputValue) {
			var container = div();
			container.innerHTML = '<span>' + text + '</span>';
			var urlInput = input();
			urlInput.value = inputValue;
			var copyButton = button('', 'info');
			var innerButtonSpan = document.createElement('span');
			innerButtonSpan.className = 'copy';
			innerButtonSpan.innerText = '    Copy';
			copyButton.appendChild(innerButtonSpan);
			copyButton.addEventListener('click', function () {
				urlInput.select();
				document.execCommand("copy");
			});
			container.appendChild(urlInput);
			container.appendChild(copyButton);
			return container;
		}
	}, {
		key: 'handleResponse',
		value: function handleResponse(promise) {
			var _this = this;

			var p = document.createElement('p');
			p.innerText = 'Pushing data to server...';
			this.modalContent.appendChild(p);
			promise.then(function (data) {
				console.log(data);
				p.parentNode.removeChild(p);
				_this.modalContent.appendChild(_this.createInputCopyButtonPair('Normal link:   ', data.url));
				_this.modalContent.appendChild(_this.createInputCopyButtonPair('Autoplay link:   ', data.autoplayUrl));
			});
		}
	}, {
		key: 'getShareButtonHandler',
		value: function getShareButtonHandler() {
			var urlInput = this.urlInput;
			return function () {
				urlInput.select();
				document.execCommand("copy");
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var body = document.getElementsByTagName('body')[0];
			body.prepend(this.modalContainer);
		}
	}]);

	return Modal;
}();

exports.default = Modal;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DomReplay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(7);

var _storage2 = _interopRequireDefault(_storage);

var _serverstorage = __webpack_require__(16);

var _serverstorage2 = _interopRequireDefault(_serverstorage);

var _urlparser = __webpack_require__(17);

var _urlparser2 = _interopRequireDefault(_urlparser);

var _replay = __webpack_require__(18);

var _replay2 = _interopRequireDefault(_replay);

var _loader = __webpack_require__(8);

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _error = __webpack_require__(2);

var _state = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @access public
 */
var DomReplay = exports.DomReplay = function () {
	/**
  * The core DomReplay class
  * @param  {Boolean}  config.debugmode - if true, debug messages wil be logged.
  * @return {DomReplay} an instance of DomReplay
  */
	function DomReplay() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, DomReplay);

		this.config = config;
		if (config.debugmode) {
			_logger2.default.logging = true;
		}

		if (config.apiUrl) {
			_serverstorage2.default.setApiUrl(config.apiUrl);
		}
	}

	/**
  * @brief Initializes the framework.
  * This will initialize all handlers and mutation observer.
  * @returns {Promise<*>}
  */


	_createClass(DomReplay, [{
		key: 'initialize',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this = this;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _loader.domloader)().then(function () {
									return (0, _state.setStateReady)();
								}).then(function () {
									var urlparser = new _urlparser2.default();
									if (urlparser.containsId() && !!_this.config.apiUrl) {
										if (urlparser.autoplay()) {
											_this.autoplay = true;
										}
										return _serverstorage2.default.load(urlparser.getId());
									}
									return null;
								}).then(function (response) {
									if (!!response) {
										_replay2.default.load(response);
										if (_this.autoplay) {
											_replay2.default.replay();
										}
									}
								}).catch(function (err) {
									if (err.type === _error.STATE_ERROR) {
										_logger2.default.debug('could not set ready state, current state is ' + (0, _state.getState)());
									}
									if ((0, _state.stateIsReplay)()) {
										_this.tryToContinueReplay();
									}
								});

							case 2:
								return _context.abrupt('return', _context.sent);

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function initialize() {
				return _ref.apply(this, arguments);
			}

			return initialize;
		}()

		/**
   * checks for replay state and try to continue replay
   * usually happens after navigation event during replay.
   */

	}, {
		key: 'tryToContinueReplay',
		value: function tryToContinueReplay() {
			if ((0, _state.stateIsReplay)()) {
				_replay2.default.replay();
			}
		}

		/**
   * Start recording
   */

	}, {
		key: 'startRecord',
		value: function startRecord() {
			(0, _state.setStateRecord)().catch(function (err) {
				if (err === _error.STATE_ERROR) {
					_logger2.default.warning(err.message);
				} else {
					throw err;
				}
			});
		}

		/**
   * Stop recording
   */

	}, {
		key: 'stopRecord',
		value: function stopRecord() {
			(0, _state.setStateReady)(true).catch(function (err) {
				if (err === _error.STATE_ERROR) {
					_logger2.default.warning(err.message);
				} else {
					throw err;
				}
			});
		}

		/**
   * Play events
   */

	}, {
		key: 'play',
		value: function play() {
			_replay2.default.replay();
		}

		/**
   * Stop replay
   */

	}, {
		key: 'stopReplay',
		value: function stopReplay() {
			_replay2.default.stop();
			(0, _state.setStateReady)(true);
		}

		/**
   * Stop recording or replaying.
   */

	}, {
		key: 'stop',
		value: function stop() {
			if ((0, _state.stateIsRecord)()) {
				this.stopRecord();
			} else if ((0, _state.stateIsReplay)()) {
				this.stopReplay();
			}
		}

		/**
   * Load events from storage into replay storage.
   */

	}, {
		key: 'loadEventsFromLocalStorage',
		value: function loadEventsFromLocalStorage() {
			_replay2.default.load(_storage2.default.events);
		}

		/**
   * Sets the replay speed divider.
   * @param divider		- higher is faster, lower is slower.
   */

	}, {
		key: 'setReplaySpeed',
		value: function setReplaySpeed(divider) {
			_replay2.default.setReplaySpeed(divider);
		}

		/**
   * Gets the current replay speed.
   * @returns {*}
   */

	}, {
		key: 'getCurrentReplaySpeed',
		value: function getCurrentReplaySpeed() {
			return _replay2.default.getReplaySpeed();
		}

		/**
   * Push storage data to server.
   */

	}, {
		key: 'pushStorageToServer',
		value: function pushStorageToServer() {
			return _serverstorage2.default.push(_storage2.default.events).then(function (response) {
				return {
					url: '' + new _urlparser2.default().buildUrl(response.id, false),
					autoplayUrl: '' + new _urlparser2.default().buildUrl(response.id, true),
					id: response.id
				};
			});
		}
	}]);

	return DomReplay;
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerStorage = function () {
	function ServerStorage() {
		_classCallCheck(this, ServerStorage);

		if (!this.instance) {
			this.instance = this;
		}
		return this.instance;
	}

	_createClass(ServerStorage, [{
		key: 'setApiUrl',
		value: function setApiUrl(apiUrl) {
			this.apiUrl = apiUrl;
		}
	}, {
		key: 'load',
		value: function load(id) {
			var _this = this;

			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
			var config = {
				method: 'GET',
				headers: headers
			};
			console.log('fetch Url: ' + this.apiUrl + '/' + id);
			return fetch(this.apiUrl + '/' + id, config).then(function (response) {
				if (response.status === 200) {
					_logger2.default.debug('GET ' + _this.apiUrl + ' returned with status ' + response.status);
					_logger2.default.debug('' + response.body);
					return response.json();
				} else {
					throw new Error('GET ' + _this.apiUrl + ' returned with status ' + response.status);
				}
			}).catch(function (error) {
				_logger2.default.error(error);
			});
		}
	}, {
		key: 'push',
		value: function push(data) {
			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
			var config = {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
			};

			return fetch(this.apiUrl, config).then(function (response) {
				return response.json();
			}).then(function (response) {
				console.log(response);
				return response;
			}).catch(function (error) {
				_logger2.default.error(error);
			});
		}
	}]);

	return ServerStorage;
}();

exports.default = new ServerStorage();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlParser = function () {
	function UrlParser() {
		_classCallCheck(this, UrlParser);
	}

	_createClass(UrlParser, [{
		key: 'buildUrl',
		value: function buildUrl(id) {
			var autoplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			return window.location.origin + '?replayjs_id=' + id + (autoplay ? '&replayjs_autoplay=true' : '');
		}
	}, {
		key: 'autoplay',
		value: function autoplay() {
			var auto = new URLSearchParams(document.location.search).get('replayjs_autoplay');
			console.log(auto);
			return !!auto && auto === 'true';
		}
	}, {
		key: 'containsId',
		value: function containsId() {
			return !!new URLSearchParams(document.location.search).get('replayjs_id');
		}
	}, {
		key: 'getId',
		value: function getId() {
			console.log(new URLSearchParams(document.location.search).get('replayjs_id'));
			return new URLSearchParams(document.location.search).get('replayjs_id');
		}
	}]);

	return UrlParser;
}();

exports.default = UrlParser;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _state = __webpack_require__(1);

var _registry = __webpack_require__(6);

var _registry2 = _interopRequireDefault(_registry);

var _dispatcher = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Replay singleton takes care of replay.
 * @access public
 */
var Replay = function () {
	function Replay() {
		_classCallCheck(this, Replay);

		this.storageKey = 'DOMREPLAY_REPLAY_EVENTS';
		if (!this.instance) {
			this.instance = this;
			this.cancel = false;
		}
		return this.instance;
	}

	/**
  * Get event object stored in local storage.
  * @returns {Object}
  */


	_createClass(Replay, [{
		key: 'stop',


		/**
   * Stop replay execution.
   */
		value: function stop() {
			this.cancel = true;
		}

		/**
   * update replay storage
   * @param {Object} object object to store.
   */

	}, {
		key: 'updateReplayStorage',
		value: function updateReplayStorage(object) {
			window.localStorage.setItem(this.storageKey, JSON.stringify(object));
		}

		/**
   * Gets the current event index.
   * @returns {*|number}
   */

	}, {
		key: 'getCurrentEventIndex',
		value: function getCurrentEventIndex() {
			return this.events.currentEventIndex;
		}
	}, {
		key: 'getReplaySpeed',
		value: function getReplaySpeed() {
			return this.events ? this.events.replaySpeed : 1;
		}

		/**
   * Increment current event index.
   */

	}, {
		key: 'incrementCurrentEventIndedx',
		value: function incrementCurrentEventIndedx() {
			this.updateReplayStorage(_extends({}, this.events, {
				currentEventIndex: this.getCurrentEventIndex() + 1
			}));
		}

		/**
   * Get event Item by Index.
   * @param index
   * @returns {Object}
   */

	}, {
		key: 'getItem',
		value: function getItem(index) {
			return this.events.events[index];
		}

		/**
   * Gets number of total evnets
   * @returns {Number}
   */

	}, {
		key: 'getTotalEvents',
		value: function getTotalEvents() {
			return this.events.count;
		}

		/**
   * Clears the storage.
   */

	}, {
		key: 'clear',
		value: function clear() {
			window.localStorage.removeItem(this.storageKey);
			_logger2.default.debug('Replay stoage cleared!');
		}

		/**
   * Load events into storage.
   * adds a currentEventIndex which will be used
   * to keep track on which event we are currently playing.
   * @param events
   */

	}, {
		key: 'load',
		value: function load(events) {
			this.updateReplayStorage(_extends({}, events, {
				replaySpeed: 1.0,
				currentEventIndex: 0
			}));
		}

		/**
   * Sets the replay speed
   * @param divider		- higher is faster, lower is slower.
   */

	}, {
		key: 'setReplaySpeed',
		value: function setReplaySpeed(divider) {
			_registry2.default.setReplaySpeedForAllEventsInRegistry(divider);
			this.updateReplayStorage(_extends({}, this.events, {
				replaySpeed: divider
			}));
		}

		/**
   * Ready state check, checks wheter the document is ready.
   * resolves when the document is ready.
   * @return {Promise} resolves when document is ready.
   */

	}, {
		key: 'readyStateCheck',
		value: function readyStateCheck() {
			return new Promise(function (resolve) {
				var time = setInterval(function () {
					if (document.readyState !== 'complete') {
						_logger2.default.debug('Waiting for dom to complete loading after navigation');
						return;
					}
					clearInterval(time);
					resolve();
				}, 500);
			});
		}

		/**
   * Returns a promise which executes an event.
   * Checks for cancellation which occurs when this.stop() has been called.
   * Finds the event to be executed in replay storage.
   * Increment the current event index.
   * Finds the correct class based on event type in Registry.
   * Execute the replay function on the event class and wait for it to resolve.
   * @returns {Promise<Object> | Promise<undefined>}  returns a Promise which rejects to an error and resolves to undefined.
   */

	}, {
		key: 'playNextEvent',
		value: function playNextEvent() {
			var _this = this;

			return new Promise(function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
					var eventIndex, event, urlWithoutAnchor, eventClass;
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (_this.cancel) {
										_this.cancel = false;
										_logger2.default.debug('Replay promise chain cancelled.');
										reject('Cancelled by user');
									}
									eventIndex = _this.getCurrentEventIndex();
									event = _this.getItem(eventIndex);

									if (!(window.location.href !== event.location)) {
										_context.next = 8;
										break;
									}

									window.location.assign(event.location);
									urlWithoutAnchor = window.location.origin + window.location.pathname + '#';

									if (event.location.includes(urlWithoutAnchor)) {
										window.location.reload();
									}
									return _context.abrupt('return', reject('Navigation needed'));

								case 8:
									(0, _dispatcher.dispatchReplayUpdateEventListener)({ number: eventIndex + 1, of: _this.getTotalEvents() });
									_logger2.default.debug('Replaying event number ' + eventIndex);
									_this.incrementCurrentEventIndedx();
									eventClass = _registry2.default.getEvent(event.type);
									_context.next = 14;
									return eventClass.replay(event).then(function () {
										_logger2.default.debug('Done replaying event number ' + eventIndex);
									}).catch(function (err) {
										return reject(err);
									});

								case 14:
									return _context.abrupt('return', resolve());

								case 15:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this);
				}));

				return function (_x, _x2) {
					return _ref.apply(this, arguments);
				};
			}());
		}

		/**
   * Builds the promise chain for replaying events, so every event will be executed in
   * correct order.
   * @access private
   */

	}, {
		key: '_buildReplayChain',
		value: function _buildReplayChain() {
			var _this2 = this;

			var currentIndex = this.getCurrentEventIndex();
			var totalEvents = this.getTotalEvents();
			var promise = this.readyStateCheck();

			for (var i = currentIndex; i < totalEvents; i++) {
				promise = promise.then(function () {
					return _this2.playNextEvent();
				});
			}
			promise.then(function () {
				return (0, _state.setStateReady)(true);
			});
			_logger2.default.debug('Done building replay chain');
		}

		/**
   * Replay events.
   * @returns {Promise<void>}
   */

	}, {
		key: 'replay',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this3 = this;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _state.setStateReplay)().then(function () {
									_this3.setReplaySpeed(_this3.getReplaySpeed());
									_this3._buildReplayChain();
								});

							case 2:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function replay() {
				return _ref2.apply(this, arguments);
			}

			return replay;
		}()
	}, {
		key: 'events',
		get: function get() {
			return JSON.parse(window.localStorage.getItem(this.storageKey));
		}
	}]);

	return Replay;
}();

exports.default = new Replay();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clickEvent = __webpack_require__(20);

Object.defineProperty(exports, 'ClickEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_clickEvent).default;
  }
});

var _inputEvent = __webpack_require__(21);

Object.defineProperty(exports, 'InputEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_inputEvent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = __webpack_require__(3);

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic Click Event.
 */
var ClickEvent = function (_EventBaseClass) {
	_inherits(ClickEvent, _EventBaseClass);

	function ClickEvent() {
		_classCallCheck(this, ClickEvent);

		return _possibleConstructorReturn(this, (ClickEvent.__proto__ || Object.getPrototypeOf(ClickEvent)).apply(this, arguments));
	}

	_createClass(ClickEvent, [{
		key: 'handler',
		value: function handler(element) {
			var trail = this.makeTrailForElement(element);
			this.syncStore({ trail: trail });
		}
	}, {
		key: 'replay',
		value: function replay(eventObject) {
			var _this2 = this;

			return this.trackElementOnTrail(eventObject.trail).then(function (element) {
				_this2.addDomReplayBorderToElement(element);
				return _this2.executeTimingRelative(function () {
					element.click();
					_this2.removeDomReplayBorderFromElement(element);
					return element;
				});
			}).then(function () {
				return _this2.executeTimingRelative(function () {});
			});
		}
	}, {
		key: 'eventType',
		get: function get() {
			return 'click';
		}
	}, {
		key: 'tagnames',
		get: function get() {
			return ['button', 'a'];
		}
	}]);

	return ClickEvent;
}(_eventbaseclass2.default);

exports.default = ClickEvent;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = __webpack_require__(3);

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic Input Event.
 */
var CustomInputEvent = function (_EventBaseClass) {
	_inherits(CustomInputEvent, _EventBaseClass);

	function CustomInputEvent() {
		_classCallCheck(this, CustomInputEvent);

		return _possibleConstructorReturn(this, (CustomInputEvent.__proto__ || Object.getPrototypeOf(CustomInputEvent)).apply(this, arguments));
	}

	_createClass(CustomInputEvent, [{
		key: 'handler',
		value: function handler(element) {
			_logger2.default.debug('Input event handler');
			var lastEvent = this.getLastStored();
			var trail = this.makeTrailForElement(element);
			if (lastEvent && JSON.stringify(this.makeTrailForElement(element)) === JSON.stringify(lastEvent.trail)) {
				_logger2.default.debug('Updates last event');
				this.updateLastStored({ value: element.value });
			} else {
				this.syncStore({
					value: element.value,
					trail: trail
				});
			}
		}
	}, {
		key: 'replay',
		value: function replay(eventObject) {
			var _this2 = this;

			var value = eventObject.value;

			return this.trackElementOnTrail(eventObject.trail).then(function (element) {
				_this2.addDomReplayBorderToElement(element);
				element.focus();
				return new Promise(function (resolve) {
					var index = 0;
					var time = setInterval(function () {
						if (index === eventObject.value.length) {
							clearInterval(time);
							return resolve(element);
						}
						element.value = value.substring(0, index + 1);
						var inputEvent = new InputEvent('input', { bubbles: true, data: value[index], inputType: 'insertText' });
						var textInputEvent = new Event('textInput', { bubbles: true, data: value[index] });
						element.dispatchEvent(inputEvent);
						element.dispatchEvent(textInputEvent);
						index++;
					}, _this2.timing * 0.1);
				});
			}).then(function (element) {
				return _this2.executeTimingRelative(function () {
					_this2.removeDomReplayBorderFromElement(element);
					return element;
				}, 0.5);
			});
		}
	}, {
		key: 'eventType',
		get: function get() {
			return 'input';
		}
	}, {
		key: 'tagnames',
		get: function get() {
			return ['input', 'textarea'];
		}
	}]);

	return CustomInputEvent;
}(_eventbaseclass2.default);

exports.default = CustomInputEvent;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);