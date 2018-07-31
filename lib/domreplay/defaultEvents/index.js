'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clickEvent = require('./clickEvent');

Object.defineProperty(exports, 'ClickEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_clickEvent).default;
  }
});

var _inputEvent = require('./inputEvent');

Object.defineProperty(exports, 'InputEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_inputEvent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }