import Storage from './storage';
import { ProgrammingError } from './error';
import { trail, tracker } from './domhound';
import { stateIsRecord } from './state'
import Logger from './logger';


export default class EventBaseClass {
	static DOM_REPLAY_BORDER_CLASS = 'dom-replay-border';

	constructor() {
		if (new.target === EventBaseClass) {
			throw new TypeError('Cannot construct EventBaseClass instances directly');
		}
		this._trailFunc = trail;
		this._trackerFunc = tracker;
		this._replayTiming = 1000;
	}

	/**
	 * Sets the replay timing variable.
	 * @param {Number} ms 		- time in milliseconds.
	 */
	set timing(ms) {
		this._replayTiming = ms;
	}

	/**
	 * Gets the timing variable
	 * @returns {number} gets the timing.
	 */
	get timing() {
		return this._replayTiming;
	}

	/**
	 * Executes function after timeout
	 * @param func 							- function to call
	 * @param {float} ratio 		- relative to timing.
	 * @param args 							- function arguments
	 * @returns {Promise} 			- resolves with function return value after function has been executed.
	 * @private
	 */
	_executeTimingRelative(func, ratio = 1.0, ...args) {
		return new Promise(resolve => {
			setTimeout(() => {
				const retval = func(...args);
				resolve(retval);
			}, this.timing * ratio);
		});
	}

	/**
	 * Should return a string with event type, needs to be overridden by subclass.
	 */
	get eventType() {
		throw new ProgrammingError('Please override get eventType function to return a event type');
	}

	/**
	 * Should return a list og tagnames which handlers should be subscribed to.
	 */
	get tagnames() {
		throw new ProgrammingError('Please override get tagnames function to return list of tagnames');
	}

	/**
	 * add border to element.
	 * @param {HTMLElement} element 	- HTML element.
	 * @private
	 */
	_addDomReplayBorderToElement(element) {
		element.classList.add(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	/**
	 * remove border from element.
	 * @param {HTMLElement} element		- HTML element.
	 * @private
	 */
	_removeDomReplayBorderFromElement(element) {
		element.classList.remove(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	/**
	 * track element in HTML DOM by trail.
	 * @param {Object} trail
	 * @returns {*}
	 * @private
	 */
	_trackElementOnTrail(trail) {
		return this._trackerFunc(trail);
	}

	/**
	 * make trail for element in HTML DOM.
	 * @param {HTMLElement} element
	 * @returns {*}
	 * @private
	 */
	_makeTrailForElement(element) {
		return this._trailFunc(element);
	}

	/**
	 * Set trail function
	 * @param {function} trailFunc
	 */
	set trailFunc(trailFunc) {
		this._trailFunc = trailFunc;
	}

	/**
	 * set tracker function.
	 * @param {function} trackerFunc
	 */
	set trackerFunc(trackerFunc) {
		this._trackerFunc = trackerFunc;
	}

	/**
	 * This is handler called when event is dispatched.
	 * Should be overridden by subclass and store event to storage.
	 * @param {HTMLElement} element
	 */
	handler(element) {
		throw new ProgrammingError('Not Implemented Error, please implement handler function');
	}

	/**
	 * This is the function subscribed to the event.
	 * This ensures only to call this.handler when the framework is in record state.
	 * @param {HTMLElement} element
	 * @private
	 */
	_handler(element) {
		if (stateIsRecord()) {
			//TODO: dispatch event and tell something is being recorded
			Logger.debug(`handling ${this.eventType} event on ${element}`);
			this.handler(element);
		}
	}

	/**
	 * This should be overridden by subclass, and should do the correct
	 * replay sequence for the event.
	 * @param {Object} eventObject
	 */
	replay(eventObject) {
		throw new ProgrammingError('Not implemented Error, please implement replay function');
	}

	/**
	 * Gets the last stored event from storage.
	 * @returns {Object} an object of the last stored event.
	 * @private
	 */
	_getLastStored() {
		return Storage.getLastStored();
	}

	/**
	 * Merge update the last stored event, useful when recording input events and such.
	 * @param {Object} updates 	- update object.
	 * @private
	 */
	_updateLastStored(updates) {
		return Storage.updateLastStored(updates);
	}

	/**
	 * Should be called when event is about to be stored.
	 * @param {Object} eventObject
	 * @returns {*|Promise<object>}
	 * @private
	 */
	_store(eventObject) {
		return Storage.store(this.eventType, eventObject)
			.catch(error => {

			});
	}

	/**
	 * waits for the promise returned by this._store to be resolved.
	 * @param {Object} eventObject
	 * @returns {Promise<object>}
	 * @private
	 */
	async _syncStore(eventObject) {
		return await this.store(eventObject);
	}
}
