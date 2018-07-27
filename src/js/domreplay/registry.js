import EventBaseClass from './eventbaseclass';
import { ProgrammingError } from './error'


class RegistrySingleton {
	static instance;

	constructor () {
		if (!this.instance) {
			this.instance = this;
			this._events = new Map()
		}
	}

	/**
	 * Register an event.
	 * Object passed should be an instance of EventBaseClass.
	 * @param {EventBaseClass} event
	 */
	registerEvent(event) {
		if (!(event instanceof EventBaseClass)) {
			throw new ProgrammingError('RegistrySingleton should only contain classes with EventBaseClass as superclass');
		}
		this._events.set(event.eventType, event);
	}

	/**
	 * Gets an event from registry by event type.
	 * @param {String} eventType
	 * @returns {String | undefined}
	 */
	getEvent(eventType) {
		return this._events.get(eventType);
	}

	/**
	 * Gets a list of events by tagname
	 * @param {String} tagname
	 * @returns {Array[]}
	 */
	getEventsByTagname(tagname) {
		let events = []
		for (let event of this._events.values()) {
			if (event.tagnames.includes(tagname)) {
				events.push(event);
			}
		}
		return events;
	}

	/**
	 * Delete an event from registry by event type.
	 * @param {String} eventType
	 */
	deleteEvent(eventType) {
		this._events.delete(eventType);
	}

	/**
	 * Clears all events from registry.
	 */
	clearAllEvents() {
		this._events.clear();
	}

	/**
	 * Gets event types in registry.
	 * @returns {IterableIterator<String>}
	 */
	getEventTypes() {
		return this._events.keys();
	}

	/**
	 * Gets tag names in registry.
	 * @returns {Array}
	 */
	getTagnames() {
		let tagnames = []
		for (let event of this._events.values()) {
			tagnames.push(...event.tagnames);
		}
		return tagnames;
	}

	/**
	 * Gets registry size
	 * @returns {number}
	 */
	get size() {
		return this._events.size;
	}

	/**
	 * Sets trail function for all events in registry.
	 * @param {function} trailFunc
	 */
	setTrailFuncForAllEventsInRegistry(trailFunc) {
		for (let event of this._events.values()) {
			event.trailFunc = trailFunc;
		}
	}

	/**
	 * Sets tracker function for all events in registry.
 	 * @param {function} trackerFunc
	 */
	setTrackerFuncForAllEventsInRegistry(trackerFunc) {
		for (let event of this._events.values()) {
			event.trackerFunc = trackerFunc
		}
	}
}


export default new RegistrySingleton();
