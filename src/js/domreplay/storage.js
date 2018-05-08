import Logger from './logger';
import { stateIsRecord } from './state';
import { createStorageError } from './error';
import { dispatchStorageUpdateEvent } from './dispatcher';
import { trail, tracker } from './domhound';


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

	clear() {
		window.localStorage.removeItem(this.storageKey);
		Logger.debug('Event storage cleared!');
	}

	set updateStorage(eventObject) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(eventObject));
	}

	set updateLastEvent(object) {
		let eventObject = this.eventList;
		eventObject.eventList[eventObject.count - 1] = object;
		this.updateStorage = eventObject;
	}

	get lastRecordedElement() {
		let eventObject = this.eventList;
		if (!eventObject) {
			return null;
		}
		return eventObject.eventList[eventObject.count - 1];
	}

	_appendEvent(object) {
		let eventObject = JSON.parse(window.localStorage.getItem(this.storageKey));
		let eventList = [];
		if (!!eventObject) {
			eventList = eventObject.eventList;
		}
		else {
			eventObject = {};
			eventObject.count = 0;
			eventList = []
		}
		eventList.push(object);
		eventObject.eventList = eventList;
		eventObject.count++;
		Logger.debug(`Count: ${eventObject.count}, Event: type(${object.type}) id(${object.id}) value(${object.value})`);
		window.localStorage.setItem(this.storageKey, JSON.stringify(eventObject));
	}

	addEvent(element, type, value = null, extra = {}) {
		return new Promise((resolve, reject) => {
			if (!stateIsRecord()) {
				Logger.error('Tried to add event to localstorage, but domreplay is not in record state');
				reject(createStorageError('Tried to add event to localstorage, but domreplay is not in record state'));
			}
			let object = {
				type,
				location: window.location.href,
				trail: trail(element, null, null)
			}
			if (value) {
				object.value = value;
			}
			this._appendEvent(object);
			resolve(object);
		});
	}

	get eventList() {
		return JSON.parse(window.localStorage.getItem(this.storageKey));
	}
}

export default new Storage();
