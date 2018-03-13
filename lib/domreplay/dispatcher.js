'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dispatchStateChangeEvent = exports.addStateChangeEventListener = undefined;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMREPLAY_STATE_CHANGE_EVENT = 'DOMREPLAY_STATE_CHANGE_EVENT';

/**
 * Adds a event listener to the state change event.
 * @param  {Func} func - the function to be called when event has been dispached.
 */
/**
 * Useful when we want to react on state change events in the ui.
 */

var addStateChangeEventListener = exports.addStateChangeEventListener = function addStateChangeEventListener(func) {
	_logger2.default.debug('adding add state event listener');
	window.addEventListener(DOMREPLAY_STATE_CHANGE_EVENT, func);
};

/**
 * State change event dispatcher.
 * @param  {String} state - the current state.
 */
var dispatchStateChangeEvent = exports.dispatchStateChangeEvent = function dispatchStateChangeEvent(state) {
	_logger2.default.debug('dispatching state change event');
	var event = new CustomEvent(DOMREPLAY_STATE_CHANGE_EVENT, {
		detail: {
			state: state,
			message: 'State has changed to ' + state
		}
	});
	window.dispatchEvent(event);
};