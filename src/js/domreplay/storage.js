import Logger from './logger';
import { stateIsRecord } from './state';
import { createStorageError } from './error';
import { dispatchStorageUpdateEvent } from './dispatcher';


class Storage {

	static storageKey;
	static instance;

	constructor() {
		if (!this.instance) {
			this.instance = this;
			this.storageKey = 'DOMREPLAY_EVENT_STORAGE';
		}
		return this.instance;
	}

	/**
	 * Clears the event storage.
	 */
	clear() {
		window.localStorage.removeItem(this.storageKey);
		Logger.debug('Event storage cleared!');
	}

	/**
	 * Updates storage
	 * @param {Object} eventObject
	 */
	updateStorage(eventObject) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(eventObject));
		dispatchStorageUpdateEvent(this.getLastStored());
	}

	/**
	 * Merge updates last stored event
	 * @param {Object} updates
	 */
	updateLastStored(updates) {
		let events = this.events;
		events.events[events.count - 1] = {...this.getLastStored(), ...updates};
		this.updateStorage(events);
	}

	/**
	 * Gets the last stored event in storage.
	 * @returns {Object}			- last stored event.
	 */
	getLastStored() {
		const events = this.events;
		if (!events) {
			return null;
		}
		return events.events[events.count - 1];
	}

	/**
	 * Appends event to storage and increment storage count.
	 * @param {Object} object 		- Object to append.
	 * @private
	 */
	_appendEvent(object) {
		let events = this.events;
		if (!events) {
			events = {};
			events.count = 0;
			events.events = []
		}
		events.events.push(object);
		events.count++;
		Logger.debug(`Count: ${events.count}, Event: type(${object.type}) id(${object.id}) value(${object.value})`);
		this.updateStorage(events);
	}

	/**
	 * Gets stored event by index.
	 * @param {Number} index
	 * @returns {Object} 		- event object
	 */
	getItem(index) {
		return this.events.events[index];
	}

	/**
	 * Gets storage object
	 * @returns {Object}
	 */
	get events() {
		return JSON.parse(window.localStorage.getItem(this.storageKey));
	}

	/**
	 * returns the size of Storage by event count.
	 * @returns {Number}
	 */
	get size() {
		return this.events.count;
	}

	/**
	 * store event object in storage.
	 * @param type
	 * @param eventObject
	 * @returns {Promise<Error> | Promise<Object>}
	 */
	store(type, eventObject) {
		return new Promise((resolve, reject) => {
			if (!stateIsRecord()) {
				Logger.error('Tried to add event to localstorage, but domreplay is not in record state');
				reject(createStorageError('Tried to add event to localstorage, but domreplay is not in record state'));
			}
			const objectToStore = {
				location: window.location.href,
				type,
				...eventObject
			};
			this._appendEvent(objectToStore);
			resolve(objectToStore);
		});
	}
}

export default new Storage();
