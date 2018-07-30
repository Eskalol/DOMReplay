import Storage from './storage';
import { ProgrammingError } from './error';
import { trail, tracker } from './domhound';
import { stateIsRecord } from './state'
import Logger from './logger';

/**
 * Extend this when implementing custom events that should be recorded/replayed.
 * @access public
 */
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
	 * @param args 							- arguments to be passed to the passed function.
	 * @returns {Promise} 			- resolves with function return value after function has been executed.
	 */
	executeTimingRelative(func, ratio = 1.0, ...args) {
		return new Promise(resolve => {
			setTimeout(() => {
				const retval = func(...args);
				resolve(retval);
			}, this.timing * ratio);
		});
	}

	/**
	 * Should return a string with event type, needs to be overridden by subclass.
	 * @abstract
	 */
	get eventType() {
		throw new ProgrammingError('Please override get eventType function to return a event type');
	}

	/**
	 * Should return a list og tagnames which handlers should be subscribed to.
	 * @abstract
	 */
	get tagnames() {
		throw new ProgrammingError('Please override get tagnames function to return list of tagnames');
	}

	/**
	 * add border to element.
	 * @param {HTMLElement} element 	- HTML element.
	 */
	addDomReplayBorderToElement(element) {
		element.classList.add(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	/**
	 * remove border from element.
	 * @param {HTMLElement} element		- HTML element.
	 */
	removeDomReplayBorderFromElement(element) {
		element.classList.remove(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	/**
	 * track element in HTML DOM by trail.
	 * @param {Object} trail
	 * @returns {*}
	 */
	trackElementOnTrail(trail) {
		return this._trackerFunc(trail);
	}

	/**
	 * make trail for element in HTML DOM.
	 * @param {HTMLElement} element
	 * @returns {*}
	 */
	makeTrailForElement(element) {
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
	 * @abstract
	 * @param {HTMLElement} element
	 */
	handler(element) {
		throw new ProgrammingError('Not Implemented Error, please implement handler function');
	}

	/**
	 * This is the function subscribed to the event.
	 * This ensures only to call this.handler when the framework is in record state.
	 * @param {HTMLElement} element
	 * @access private
	 */
	_handler(element) {
		if (stateIsRecord()) {
			Logger.debug(`handling ${this.eventType} event on ${element}`);
			this.handler(element);
		}
	}

	/**
	 * This should be overridden by subclass, and should do the correct
	 * replay sequence for the event.
	 * @abstract
	 * @param {Object} eventObject
	 */
	replay(eventObject) {
		throw new ProgrammingError('Not implemented Error, please implement replay function');
	}

	/**
	 * Gets the last stored event from storage.
	 * @returns {Object} an object of the last stored event.
	 */
	getLastStored() {
		return Storage.getLastStored();
	}

	/**
	 * Merge update the last stored event, useful when recording input events and such.
	 * @param {Object} updates 	- update object.
	 */
	updateLastStored(updates) {
		return Storage.updateLastStored(updates);
	}

	/**
	 * Should be called when event is about to be stored.
	 * @param {Object} eventObject
	 * @returns {*|Promise<object>}
	 */
	store(eventObject) {
		return Storage.store(this.eventType, eventObject)
			.catch(error => {
				throw error;
			});
	}

	/**
	 * waits for the promise returned by this.store to be resolved.
	 * @param {Object} eventObject
	 * @returns {Promise<object>}
	 */
	async syncStore(eventObject) {
		return await this.store(eventObject);
	}
}
