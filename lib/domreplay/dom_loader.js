'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domloader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(elementByTagNameIterator),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(getFlatElementIterator);

/**
 * Generator function that creates an iterator of
 * elements by tag name
 * @param {String} tagname     - HTML tag name
 * @yield {Element} Element
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
 * @param  {Array} events - list of events
 */
var initializeEvents = function initializeEvents(events) {
  _logger2.default.debug('Initializing existing events.');
  events.forEach(function (event) {
    event.tagnames.forEach(function (tagname) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var element = _step.value;

          element.addEventListener(event.type, function () {
            return event.handler(element);
          }, false);
        };

        for (var _iterator = elementByTagNameIterator(tagname)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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
    });
  });
};

function getFlatElementIterator(mutation, tagfilter) {
  var recursiveFlat, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, n;

  return regeneratorRuntime.wrap(function getFlatElementIterator$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          recursiveFlat = /*#__PURE__*/regeneratorRuntime.mark(function recursiveFlat(node) {
            var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, n;

            return regeneratorRuntime.wrap(function recursiveFlat$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(node instanceof HTMLElement && tagfilter.includes(node.tagName.toLowerCase()))) {
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

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 9;
                    _iterator2 = Array.from(node.childNodes)[Symbol.iterator]();

                  case 11:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context2.next = 17;
                      break;
                    }

                    n = _step2.value;
                    return _context2.delegateYield(recursiveFlat(n, tagfilter), 't0', 14);

                  case 14:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 11;
                    break;

                  case 17:
                    _context2.next = 23;
                    break;

                  case 19:
                    _context2.prev = 19;
                    _context2.t1 = _context2['catch'](9);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t1;

                  case 23:
                    _context2.prev = 23;
                    _context2.prev = 24;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }

                  case 26:
                    _context2.prev = 26;

                    if (!_didIteratorError2) {
                      _context2.next = 29;
                      break;
                    }

                    throw _iteratorError2;

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
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context3.prev = 4;
          _iterator3 = Array.from(mutation.addedNodes)[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context3.next = 12;
            break;
          }

          n = _step3.value;
          return _context3.delegateYield(recursiveFlat(n), 't0', 9);

        case 9:
          _iteratorNormalCompletion3 = true;
          _context3.next = 6;
          break;

        case 12:
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t1 = _context3['catch'](4);
          _didIteratorError3 = true;
          _iteratorError3 = _context3.t1;

        case 18:
          _context3.prev = 18;
          _context3.prev = 19;

          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }

        case 21:
          _context3.prev = 21;

          if (!_didIteratorError3) {
            _context3.next = 24;
            break;
          }

          throw _iteratorError3;

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
 * To ensure that the only top level element is captured in tagnames,
 * we need a filter. for example when a button contains an 'a' tag,
 * only the button is captured.
 * @param  {[type]} events [description]
 * @return {[type]}        [description]
 */
var flatTagnames = function flatTagnames(events) {
  var tagnames = [];
  events.forEach(function (event) {
    tagnames.push.apply(tagnames, _toConsumableArray(event.tagnames));
  });
  return tagnames;
};

/**
 * Initializes mutation observer,
 * when ever a new element has been added, it will automaticly
 * add event listener to the element.
 * @param  {Array} events - list of events
 */
var initializeMutationObserver = function initializeMutationObserver(events) {
  _logger2.default.debug('Initializing mutation observer.');
  var tagfilter = flatTagnames(events);
  var analyzeElement = function analyzeElement(element) {
    events.forEach(function (event) {
      if (event.tagnames.includes(element.tagName.toLowerCase())) {
        _logger2.default.debug('mutationobserver is adding a ' + event.type + '-listener to element ' + element.id);
        element.addEventListener(event.type, function () {
          return event.handler(element);
        }, false);
      }
    });
  };

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = getFlatElementIterator(mutation, tagfilter)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _element = _step4.value;

          analyzeElement(_element);
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
 * @param  {Array} events - list
 */
var domloader = exports.domloader = function domloader(events) {
  return new Promise(function (resolve, reject) {
    var time = setInterval(function () {
      if (document.readyState !== 'complete') {
        _logger2.default.debug('Ready-state check failed!');
        return;
      }
      clearInterval(time);
      initializeEvents(events);
      initializeMutationObserver(events);
      _logger2.default.debug('Done initializing events');
      resolve();
    }, 100);
  });
};

var DOMLoeader = function () {
  function DOMLoeader(main) {
    _classCallCheck(this, DOMLoeader);

    this.main = main;
    this.util = main.util;
    this.util.debug('running dom_loader initializations');
  }

  _createClass(DOMLoeader, [{
    key: 'addEventlistenerToElement',
    value: function addEventlistenerToElement(element, handler, event) {
      var _this = this;

      return element.addEventListener(event, function () {
        return handler(_this);
      }, false);
    }
  }, {
    key: 'initializeEvents',
    value: function initializeEvents() {
      var _this2 = this;

      var lol = function lol() {
        console.log('imba');
      };
      console.log(this.main.config.events);
      this.main.config.events.forEach(function (event) {
        event.tagnames.forEach(function (tagname) {
          var tagnames = document.getElementsByTagName(tagname);
          Array.from(tagnames).forEach(function (element) {
            console.log(element);
            _this2.addEventlistenerToElement(element, lol, event.type);
          });
        });
        console.log(event);
      });
    }
  }, {
    key: 'initializeMutationObserver',
    value: function initializeMutationObserver() {
      var _this3 = this;

      return;
      var AnalyzeElement = function AnalyzeElement(element) {
        _this3.util.debug('analyzing elemnt ' + element.id + ', ' + element.tagName);
        _this3.main.config.events.forEach(function (_ref) {
          var event = _ref.event,
              conf = _ref.conf;

          if (element.tagName.toLowerCase() in conf.tagnames) {
            _this3.util.debug('mutationobserver is adding a ' + event + '-listener to element ' + element.id);
            _this3.addEventlistenerToElement(element, conf.handler, event);
          }
        });
      };
      this.util.debug('initializing mutation_observer');
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.foreach(function (element) {
              return AnalyzeElement(element);
            });
          }
        });
      });
      var config = {
        childList: true,
        subtree: true
      };
      observer.observe(document.body, config);
    }
  }]);

  return DOMLoeader;
}();

exports.default = DOMLoeader;