'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handleInputEvent = exports.handleChangeEvent = exports.handleClickEvent = undefined;

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _state = require('./state');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Click event handler
 * @param  {HTMLElement} element - the html element
 */
var handleClickEvent = exports.handleClickEvent = function handleClickEvent(element) {
	if ((0, _state.stateIsRecord)()) {
		_logger2.default.debug('click event handler');
		_storage2.default.addEvent(element, 'click');
	}
};

/**
 * Change event handler
 * @param  {HTMLElement} element - the html element
 */
var handleChangeEvent = exports.handleChangeEvent = function handleChangeEvent(element) {
	if ((0, _state.stateIsRecord)()) {
		_logger2.default.debug('change event handler');
	}
};

/**
 * Input Event handler
 * @param  {HTMLElement} element - the html element
 */
var handleInputEvent = exports.handleInputEvent = function handleInputEvent(element) {
	if ((0, _state.stateIsRecord)()) {
		_logger2.default.debug('input event hander');
	}
};