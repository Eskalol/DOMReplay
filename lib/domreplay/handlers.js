'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handleInputEvent = exports.handleChangeEvent = exports.handleClickEvent = undefined;

var _state = require('./state');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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