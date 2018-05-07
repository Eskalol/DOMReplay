'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _state = require('./state');

var _domhound = require('./domhound');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Replay = function () {
	function Replay() {
		_classCallCheck(this, Replay);

		this.storageKey = 'DOMREPLAY_REPLAY_EVENTS';
	}

	_createClass(Replay, [{
		key: 'load',
		value: function load(eventObject) {
			var replayObject = {
				nextEvent: 0,
				eventObject: eventObject
			};
			this._replayObject = replayObject;
		}
	}, {
		key: 'clear',
		value: function clear() {
			window.localStorage.removeItem(this.storageKey);
		}
	}, {
		key: 'reset',
		value: function reset() {
			this._nextEventIndex = 0;
		}
	}, {
		key: 'getNextStep',
		value: function getNextStep() {
			var _this = this;

			return new Promise(function (resolve) {
				if (_this._nextEventIndex >= _this._totalEventCount) {
					resolve(null);
				} else {
					resolve(_this._nextEvent);
				}
			});
		}
	}, {
		key: 'executeClickEvent',
		value: function executeClickEvent(element) {
			return new Promise(function (resolve) {
				setTimeout(function () {
					element.click();
					resolve(false);
				}, 1000);
			});
		}
	}, {
		key: 'executeFocusElement',
		value: function executeFocusElement(element) {
			return new Promise(function (resolve) {
				setTimeout(function () {
					element.focus();
					resolve(false);
				}, 1000);
			});
		}
	}, {
		key: 'executeInputEvent',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element, value) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.executeFocusElement(element);

							case 2:
								return _context.abrupt('return', new Promise(function (resolve) {
									var index = 0;
									var time = setInterval(function () {
										if (index == value.length) {
											clearInterval(time);
											resolve(false);
										}
										element.value = element.value + value.substring(index, index + 1);
										var event = new InputEvent('input', { bubbles: true, data: value[index], inputType: 'insertText' });
										var textInputEvent = new Event('textInput', { bubbles: true, data: value[index++] });
										element.dispatchEvent(event);
										element.dispatchEvent(textInputEvent);
									}, 100);
								}));

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function executeInputEvent(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return executeInputEvent;
		}()
	}, {
		key: 'executeChangeEvent',
		value: function executeChangeEvent(element) {
			return new Promise(function (resolve) {
				setTimeout(function () {
					var event = new Event('change', { bubbles: true });
					element.dispatchEvent(event);
					resolve(false);
				}, 1000);
			});
		}
	}, {
		key: 'executeEvent',
		value: function executeEvent(element, eventObject) {
			_logger2.default.debug('Executing ' + eventObject.type + ' event.');
			if (eventObject.type === 'click') {
				return this.executeClickEvent(element);
			} else if (eventObject.type === 'input') {
				return this.executeInputEvent(element, eventObject.value);
			} else if (eventObject.type === 'change') {
				return this.executeChangeEvent(element);
			}
		}
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
	}, {
		key: 'playStep',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var nextStep, element, result;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.readyStateCheck();

							case 2:
								_context2.next = 4;
								return this.getNextStep();

							case 4:
								nextStep = _context2.sent;

								if (nextStep) {
									_context2.next = 7;
									break;
								}

								return _context2.abrupt('return', new Promise(function (resolve) {
									return resolve(true);
								}));

							case 7:
								_context2.next = 9;
								return (0, _domhound.tracker)(nextStep.trail);

							case 9:
								element = _context2.sent;

								if (!(!nextStep && !element)) {
									_context2.next = 12;
									break;
								}

								return _context2.abrupt('return', new Promise(function (resolve) {
									return resolve(true);
								}));

							case 12:
								_context2.next = 14;
								return this.executeEvent(element, nextStep);

							case 14:
								result = _context2.sent;
								return _context2.abrupt('return', new Promise(function (resolve) {
									return resolve(result);
								}));

							case 16:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function playStep() {
				return _ref2.apply(this, arguments);
			}

			return playStep;
		}()
	}, {
		key: 'play',
		value: function play() {
			var _this2 = this;

			_logger2.default.debug('replay: start replaying events!');
			if (!(0, _state.stateIsReady)()) {
				_logger2.default.debug('state is not ready');
			}

			if (!this._replayObject) {
				_logger2.default.warn('Please load event see Replay.load');
				return;
			}

			var instance = this;
			return (0, _state.setStateReplay)().then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return _this2.playStep();

							case 2:
								if (_context3.sent) {
									_context3.next = 5;
									break;
								}

								_context3.next = 0;
								break;

							case 5:
								return _context3.abrupt('return', {
									total: _this2._totalEventCount,
									replayed: _this2._nextEventIndex
								});

							case 6:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, _this2);
			}))).then(function (_ref4) {
				var total = _ref4.total,
				    replayed = _ref4.replayed;

				if (total == replayed) {
					(0, _state.setStateReady)(true);
				}
				return {
					total: total,
					replayed: replayed
				};
			});
		}
	}, {
		key: '_replayObject',
		set: function set(replayObject) {
			window.localStorage.setItem(this.storageKey, JSON.stringify(replayObject));
		},
		get: function get() {
			return JSON.parse(window.localStorage.getItem(this.storageKey));
		}
	}, {
		key: '_nextEventIndex',
		set: function set(index) {
			var replayObject = this._replayObject;
			replayObject.nextEvent = index;
			this._replayObject = replayObject;
		},
		get: function get() {
			var replayObject = this._replayObject;
			return replayObject.nextEvent;
		}
	}, {
		key: '_totalEventCount',
		get: function get() {
			var replayObject = this._replayObject;
			return replayObject.eventObject.count;
		}
	}, {
		key: '_nextEvent',
		get: function get() {
			var replayObject = this._replayObject;
			var nextEventIndex = this._nextEventIndex;
			this._nextEventIndex = nextEventIndex + 1;
			return replayObject.eventObject.eventList[nextEventIndex];
		}
	}]);

	return Replay;
}();

exports.default = Replay;