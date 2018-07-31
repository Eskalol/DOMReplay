'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DomReplay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _serverstorage = require('./serverstorage');

var _serverstorage2 = _interopRequireDefault(_serverstorage);

var _urlparser = require('./urlparser');

var _urlparser2 = _interopRequireDefault(_urlparser);

var _replay = require('./replay');

var _replay2 = _interopRequireDefault(_replay);

var _loader = require('./loader');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _error = require('./error');

var _state = require('./state');

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