/**
 * Useful when we want to react on state change events in the ui.
 */

import Logger from './logger';

const DOMREPLAY_STATE_CHANGE_EVENT = 'DOMREPLAY_STATE_CHANGE_EVENT';
const DOMREPLAY_STORAGE_UPDATE_EVENT = 'DOMREPLAY_STORAGE_UPDATE_EVENT';
const DOMREPLAY_REPLAY_UPDATE_EVENT = 'DOMREPLAY_REPLAY_UPDATE_EVENT';

/**
 * Adds an event listener to the state change event.
 * @param  {function} func - the function to be called when the event has been dispached.
 * @access public
 */
export const addStateChangeEventListener = (func) => {
	Logger.debug('adding add state event listener');
	window.addEventListener(DOMREPLAY_STATE_CHANGE_EVENT, func);
}

/**
 * State change event dispatcher.
 * @param  {String} state - the current state.
 */
export const dispatchStateChangeEvent = (state) => {
	Logger.debug('dispatching state change event');
	const event = new CustomEvent(DOMREPLAY_STATE_CHANGE_EVENT, {
		detail: {
			state,
			message: `State has changed to ${state}`
		}
	});
	window.dispatchEvent(event);
}


/**
 * Adds an event listener to the storage update event.
 * @param  {function} func 	- the function to be called when the event has been dispatched.
 * @access public
 */
export const addStorageUpdateEventListener = (func) => {
	Logger.debug('adding storage update event listener');
	window.addEventListener(DOMREPLAY_STORAGE_UPDATE_EVENT, func);
}

/**
 * Storage update event dispatcher.
 * @param  {Object} update - object with update information.
 */
export const dispatchStorageUpdateEvent = (update) => {
	Logger.debug('dispatching storage update event');
	const event = new CustomEvent(DOMREPLAY_STORAGE_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
}

/**
 * Adds an event event listener to the replay update event.
 * @param {function} func - the function to be called when the event has been dispatched.
 * @access public
 */
export const addReplayUpdateEventListener = (func) => {
	Logger.debug('adding replay update event listener');
	window.addEventListener(DOMREPLAY_REPLAY_UPDATE_EVENT, func);
}

/**
 * Replay update event dispatcher
 * @param {Object} update - object with update information
 */
export const dispatchReplayUpdateEventListener = (update) => {
	Logger.debug('dispatching replay ipdate event');
	const event = new CustomEvent(DOMREPLAY_REPLAY_UPDATE_EVENT, {
		detail: update
	});
	window.dispatchEvent(event);
}
