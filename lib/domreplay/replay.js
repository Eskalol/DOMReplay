'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _state = require('./state');

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

var _dispatcher = require('./dispatcher');

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