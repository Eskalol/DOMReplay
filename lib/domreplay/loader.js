'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domloader = exports.domreplayIgnoreAttributeName = undefined;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _registry = require('./registry');

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