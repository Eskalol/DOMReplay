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

	registerEvent(event) {
		if (!(event instanceof EventBaseClass)) {
			throw new ProgrammingError('RegistrySingleton should only contain classes with EventBaseClass as superclass');
		}
		this._events.set(event.eventType, event);
	}

	getEvent(eventType) {
		return this._events.get(eventType);
	}

	getEventsByTagname(tagname) {
		let events = []
		for (let event of this._events.values()) {
			if (event.tagnames.includes(tagname)) {
				events.push(event);
			}
		}
		return events;
	}

	deleteEvent(eventType) {
		this._events.delete(eventType);
	}

	clearAllEvents() {
		this._events.clear();
	}

	getEventTypes() {
		return this._events.keys();
	}

	getTagnames() {
		let tagnames = []
		for (let event of this._events.values()) {
			tagnames.push(...event.tagnames);
		}
		return tagnames;
	}

	get size() {
		return this._events.size;
	}

	setTrailFuncForAllEventObjectsInRegistry(trailFunc) {
		for (let event of this._events.values()) {
			event.trailFunc = trailFunc;
		}
	}

	setTrackerFuncForAllEventObjectsInRegistry(trackerFunc) {
		for (let event of this._events.values()) {
			event.trackerFunc = trackerFunc
		}
	}
}


export default new RegistrySingleton();
