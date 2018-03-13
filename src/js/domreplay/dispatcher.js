/**
 * Useful when we want to react on state change events in the ui.
 */

import Logger from './logger';

const DOMREPLAY_STATE_CHANGE_EVENT = 'DOMREPLAY_STATE_CHANGE_EVENT'

/**
 * Adds a event listener to the state change event.
 * @param  {Func} func - the function to be called when event has been dispached.
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
