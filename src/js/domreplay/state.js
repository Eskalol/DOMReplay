/**
 * Store the Domreplay state in local storage and provides functions to
 * change state safely and check state.
 */
import { createStateError } from './error';
import { dispatchStateChangeEvent } from './dispatcher';


const DOMREPLAY_STATE_STORAGE_KEY = 'DOMREPLAY_STATE';
export const DOMREPLAY_STATE_REPLAY = 'DOMREPLAY_STATE_REPLAY';
export const DOMREPLAY_STATE_RECORD = 'DOMREPLAY_STATE_RECORD';
export const DOMREPLAY_STATE_READY = 'DOMREPLAY_STATE_READY';


/**
 * Gets the state from localstorage
 * @return {String} - current state
 */
const getState = () => {
	return window.localStorage.getItem(DOMREPLAY_STATE_STORAGE_KEY);
};

/**
 * Sets state
 * @param  {String} state - State to set
 */
const setState = (state) => {
	window.localStorage.setItem(DOMREPLAY_STATE_STORAGE_KEY, state);
};

/**
 * Clears the state storage
 */
export const clearStateStorage = () => {
	window.localstorage.removeItem(DOMREPLAY_STATE);
}

/**
 * returns true if state is empy
 * @return {Boolean} - true if state is empty otherwise false.
 */
const stateIsEmpty = () => {
	return !getState();
}

/**
 * True if state is Replay
 * @return {Boolean} - True if state is Replay
 */
export const stateIsReplay = () => {
	return getState() === DOMREPLAY_STATE_REPLAY;
};

/**
 * True if state is Record
 * @return {Boolean} - True if state is Record
 */
export const stateIsRecord = () => {
	return getState() === DOMREPLAY_STATE_RECORD;
}

/**
 * True if state is Ready
 * @return {Boolean} - True if state is Ready
 */
export const stateIsReady = () => {
	return getState() === DOMREPLAY_STATE_READY;
};

/**
 * Sets the state to ready.
 * Resolves when state has changed
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 */
export const setStateReady = (force=false) => {
	return new Promise((resolve, reject) => {
		if (force || stateIsEmpty()) {
			setState(DOMREPLAY_STATE_READY)
			dispatchStateChangeEvent(getState());
			resolve(getState());
		}
		else if (stateIsReady()) {
			resolve(DOMREPLAY_STATE_READY);
		} else {
			reject(createStateError(`Cannot change state from "${getState()}" to "${DOMREPLAY_STATE_READY}"`));
		}
	});
};

/**
 * Set state safely to record.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 * @return {Promise}        - Returns a Promise.
 */
export const setStateRecord = (force=false) => {
	return new Promise((resolve, reject) => {
		if (force || stateIsReady()) {
			setState(DOMREPLAY_STATE_RECORD);
			dispatchStateChangeEvent(getState());
			resolve(getState());
		} else if (stateIsReplay()) {
			resolve(DOMREPLAY_STATE_RECORD);
		}else {
			reject(createStateError(`Cannot change state from "${getState()}" to "${DOMREPLAY_STATE_RECORD}"`));
		}
	});
};

/**
 * Set state safely to replay.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force - no safe
 * @return {Promise}       - Returns a Promise.
 */
export const setStateReplay = (force=false) => {
	return new Promise((resolve, reject) => {
		if (force || stateIsReady()) {
			setState(DOMREPLAY_STATE_REPLAY);
			dispatchStateChangeEvent(getState());
			resolve(getState());
		} else if (stateIsReplay()) {
			resolve(DOMREPLAY_STATE_REPLAY);
		} else {
			reject(createStateError(`Cannot change state from "${getState()}" to "${DOMREPLAY_STATE_REPLAY}"`))
		}
	});
};












