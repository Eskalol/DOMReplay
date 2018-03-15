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

var _domhound = require('./domhound');

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
		var lastEvent = _storage2.default.lastRecordedElement;
		if (lastEvent && JSON.stringify((0, _domhound.trail)(element, null, null)) === JSON.stringify(lastEvent.trail)) {
			_logger2.default.debug('Updates last event');
			lastEvent.value = element.value;
			_storage2.default.updateLastEvent = lastEvent;
		} else {
			console.log('Creating new input event record');
			_storage2.default.addEvent(element, 'input', element.value);
		}
	}
};