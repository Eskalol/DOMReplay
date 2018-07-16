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

	deleteEvent(eventType) {
		this._events.delete(eventType);
	}

	clearAllEvents() {
		this._events.clear();
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
