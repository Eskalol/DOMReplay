import Storage from './storage';
import { ProgrammingError } from './error';
import { trail, tracker } from './domhound';


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

	set timing(ms) {
		this._replayTiming = ms;
	}

	get timing() {
		return this._replayTiming;
	}

	_executeTimingRelative(func, ratio = 1.0, ...args) {
		return new Promise(resolve => {
			setTimeout(() => {
				const retval = func(...args);
				resolve(retval);
			}, this.timing * ratio);
		});
	}

	get eventType() {
		throw new ProgrammingError('Please override get eventType function to return a event type');
	}

	get tagnames() {
		throw new ProgrammingError('Please override get tagnames function to return list of tagnames');
	}

	_addDomReplayBorderToElement(element) {
		element.classList.add(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	_removeDomReplayBorderFromElement(element) {
		element.classList.remove(EventBaseClass.DOM_REPLAY_BORDER_CLASS);
	}

	_trackElementOnTrail(trail) {
		return this._trackerFunc(trail);
	}

	_makeTrailForElement(element) {
		return this._trailFunc(element);
	}

	set trailFunc(trailFunc) {
		this._trailFunc = trailFunc;
	}

	set trackerFunc(trackerFunc) {
		this._trackerFunc = trackerFunc;
	}

	handler(element) {
		throw new ProgrammingError('Not Implemented Error, please implement handler function');
	}

	replay(eventObject) {
		throw new ProgrammingError('Not implemented Error, please implement replay function');
	}

	_getLastStored() {
		return Storage.getLastStored();
	}

	_updateLastStored(updates) {
		return Storage.updateLastStored(updates);
	}

	_store(eventObject) {
		return Storage.store(this.eventType, eventObject)
			.catch(error => {

			});
	}

	async _syncStore(eventObject) {
		return await this.store(eventObject);
	}
}
