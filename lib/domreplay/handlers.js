'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInputEvent = exports.handleChangeEvent = exports.handleClickEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = require('./state');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handler = function () {
  function Handler(main) {
    _classCallCheck(this, Handler);

    this.main = main;
    this.util = main.util;
    this.util.debug('Initializing DOM handlers');
  }

  _createClass(Handler, [{
    key: 'addClickEvent',
    value: function addClickEvent(element) {
      this.util.debug('Adding click event');
      this.main.storage.addEvent(element, 'click', false);
    }
  }, {
    key: 'addChangeEvent',
    value: function addChangeEvent(element) {
      this.util.debug('Adding change event');
      this.main.storage.addEvent(element, 'event', true);
    }
  }, {
    key: 'addInputEvent',
    value: function addInputEvent(element) {
      this.debug('Adding input event');
      this.main.storage.AddEvent(element, 'input', true);
    }
  }]);

  return Handler;
}();

exports.default = Handler;
var handleClickEvent = exports.handleClickEvent = function handleClickEvent(element) {
  if ((0, _state.stateIsRecord)()) {
    _logger2.default.debug('click event handler');
  }
};

var handleChangeEvent = exports.handleChangeEvent = function handleChangeEvent(element) {
  if ((0, _state.stateIsRecord)()) {
    _logger2.default.debug('change event handler');
  }
};

var handleInputEvent = exports.handleInputEvent = function handleInputEvent(element) {
  if ((0, _state.stateIsRecord)()) {
    _logger2.default.debug('input event hander');
  }
};