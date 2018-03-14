import Logger from './logger';
import { stateIsReady, setStateReplay, setStateReady } from './state';
import { tracker } from './domhound';


export default class Replay {
	static storageKey;


	constructor() {
		this.storageKey = 'DOMREPLAY_REPLAY_EVENTS';
	}

	load(eventObject) {
		const replayObject = {
			nextEvent: 0,
			eventObject
		};
		this._replayObject = replayObject;
	}

	clear() {
		window.localStorage.removeItem(this.storageKey);
	}

	set _replayObject(replayObject) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(replayObject));
	}

	get _replayObject() {
		return JSON.parse(window.localStorage.getItem(this.storageKey));
	}

	set _nextEventIndex(index) {
		let replayObject = this._replayObject;
		replayObject.nextEvent = index;
		this._replayObject = replayObject;
	}

	get _totalEventCount() {
		let replayObject = this._replayObject;
		return replayObject.eventObject.count;
	}

	get _nextEventIndex() {
		let replayObject = this._replayObject;
		return replayObject.nextEvent;
	}

	get _nextEvent() {
		let replayObject = this._replayObject;
		let nextEventIndex = this._nextEventIndex;
		this._nextEventIndex = nextEventIndex + 1;
		return replayObject.eventObject.eventList[nextEventIndex];
	}

	reset() {
		this._nextEventIndex = 0;
	}

	getNextStep() {
		// const instance = this;
		return new Promise(resolve => {
			if (this._nextEventIndex >= this._totalEventCount) {
				resolve(null);
			}
			else {
				resolve(this._nextEvent);
			}
		});
	}


	executeEvent(element, eventObject) {
		return new Promise((resolve) => {
			setTimeout(() => {
				//Need to handle other event types aswell.
				element.click();
				resolve(false);
			}, 1000);
		});
	}

	async playStep() {
		const nextStep = await this.getNextStep();
		if (!nextStep) {
			return new Promise(resolve => resolve(true));
		}
		// We need a way to wait for the element to appear if the dom is loading
		// something from apis.
		const element = await tracker(nextStep.trail);
		if (!nextStep && !element) {
			return new Promise(resolve => resolve(true));
		}

		const result = await this.executeEvent(element, nextStep);
		return new Promise(resolve => resolve(result));
	}

	play() {
		Logger.debug('replay: start replaying events!');
		if (!stateIsReady()) {
			Logger.debug('state is not ready');
		}

		if (!this._replayObject) {
			Logger.warn('Please load event see Replay.load');
			return;
		}
		const instance = this;
		return setStateReplay()
			.then(async () => {
				while(!await this.playStep());
				return {
					totalEventCount: this._totalEventCount,
					replayedEvents: this._nextEventIndex
				}
			});
	}
}
