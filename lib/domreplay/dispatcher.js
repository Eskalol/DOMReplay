'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dispatchReplayUpdateEventListener = exports.addReplayUpdateEventListener = exports.dispatchStorageUpdateEvent = exports.addStorageUpdateEventListener = exports.dispatchStateChangeEvent = exports.addStateChangeEventListener = undefined;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMREPLAY_STATE_CHANGE_EVENT = 'DOMREPLAY_STATE_CHANGE_EVENT'; /**
                                                                    * Useful when we want to react on state change events in the ui.
                                                                    */

var DOMREPLAY_STORAGE_UPDATE_EVENT = 'DOMREPLAY_STORAGE_UPDATE_EVENT';
var DOMREPLAY_REPLAY_UPDATE_EVENT = 'DOMREPLAY_REPLAY_UPDATE_EVENT';

/**
 * Adds an event listener to the state change event.
 * @param  {function} func - the function to be called when the event has been dispached.
 * @access public
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

/**
 * Adds an event listener to the storage update event.
 * @param  {function} func 	- the function to be called when the event has been dispatched.
 * @access public
 */
var addStorageUpdateEventListener = exports.addStorageUpdateEventListener = function addStorageUpdateEventListener(func) {
	_logger2.default.debug('adding storage update event listener');
	window.addEventListener(DOMREPLAY_STORAGE_UPDATE_EVENT, func);
};

/**
 * Storage update event dispatcher.
 * @param  {Object} update - object with update information.
 */
var dispatchStorageUpdateEvent = exports.dispatchStorageUpdateEvent = function dispatchStorageUpdateEvent(update) {
	_logger2.default.debug('dispatching storage update event');
	var event = new CustomEvent(DOMREPLAY_STORAGE_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
};

/**
 * Adds an event event listener to the replay update event.
 * @param {function} func - the function to be called when the event has been dispatched.
 * @access public
 */
var addReplayUpdateEventListener = exports.addReplayUpdateEventListener = function addReplayUpdateEventListener(func) {
	_logger2.default.debug('adding replay update event listener');
	window.addEventListener(DOMREPLAY_REPLAY_UPDATE_EVENT, func);
};

/**
 * Replay update event dispatcher
 * @param {Object} update - object with update information
 */
var dispatchReplayUpdateEventListener = exports.dispatchReplayUpdateEventListener = function dispatchReplayUpdateEventListener(update) {
	_logger2.default.debug('dispatching replay ipdate event');
	var event = new CustomEvent(DOMREPLAY_REPLAY_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
};