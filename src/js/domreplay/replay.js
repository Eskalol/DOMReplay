import Logger from './logger';
import { stateIsReady, setStateReplay, setStateReady } from './state';
import { tracker } from './domhound';


export default class Replay {
	static storageKey;


	constructor() {
		this.storageKey = 'DOMREPLAY_REPLAY_EVENTS';
	}

	/**
	 * Loads event object into replay storage
	 * @param  {Object} eventObject the event object to be replayed
	 */
	load(eventObject) {
		const replayObject = {
			nextEvent: 0,
			eventObject
		};
		this._replayObject = replayObject;
	}

	/**
	 * Clears the replay storage
	 */
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

	/**
	 * Resets events to be played.
	 */
	reset() {
		this._nextEventIndex = 0;
	}

	/**
	 * Gets the next step to be played.
	 * if there is no more events to be played it will
	 * resolve with null.
	 */
	getNextStep() {
		return new Promise(resolve => {
			if (this._nextEventIndex >= this._totalEventCount) {
				resolve(null);
			}
			else {
				resolve(this._nextEvent);
			}
		});
	}

	/**
	 * Executes click event and waits for 1 sec
	 * @param  {HTMLElement} element - element to perform click on.
	 * @return {Promise}     resolves when clicked.
	 */
	executeClickEvent(element) {
		return new Promise(resolve => {
			setTimeout(() => {
				element.click();
				resolve(false);
			}, 1000);
		});
	}

	/**
	 * executes focus on element
	 * @param  {HTMLElement} element - element to perform focus on.
	 * @return {Promise}     resolves when element has been focused.
	 */
	executeFocusElement(element) {
		return new Promise(resolve => {
			setTimeout(() => {
				element.focus();
				resolve(false);
			}, 1000);
		});
	}

	/**
	 * Executes Input event on element.
	 * it will type one character at a time and, liker normal typing.
	 * @param  {HTMLElement} element - html element to perform input events on.
	 * @param  {String} 		 value 	 - value to type in.
	 * @return {Promise}     returns Promise, resolves when done.
	 */
	async executeInputEvent(element, value) {
		await this.executeFocusElement(element);
		return new Promise(resolve => {
				let index = 0;
				const time = setInterval(() => {
					if (index == value.length) {
						clearInterval(time);
						resolve(false);
					}
					element.value = element.value + value.substring(index, index + 1);
					let event = new InputEvent('input', {bubbles: true, data: value[index], inputType: 'insertText' });
					let textInputEvent = new Event('textInput', {bubbles: true, data: value[index++]});
					element.dispatchEvent(event);
					element.dispatchEvent(textInputEvent);
				}, 100);
		});
	}

	/**
	 * Executes change event on element
	 * @param  {HTMLElement} element - element to perform change event on.
	 * @return {Promise}         resolves when done.
	 */
	executeChangeEvent(element) {
		return new Promise(resolve => {
			setTimeout(() => {
				const event = new Event('change', {bubbles: true});
				element.dispatchEvent(event);
				resolve(false);
			}, 1000);
		});
	}

	/**
	 * execute event proxy.
	 * It will check for which event to be executed and then
	 * return the correct promise.
	 * @param  {HTMLElement} element     - HTML element to preform event on.
	 * @param  {Object} eventObject      - event object which contains information about the event.
	 * @return {Promise}             	returns Promise according to the event.
	 */
	executeEvent(element, eventObject) {
		Logger.debug(`Executing ${eventObject.type} event.`);
		if (eventObject.type === 'click') {
			return this.executeClickEvent(element);
		} else if (eventObject.type === 'input') {
			return this.executeInputEvent(element, eventObject.value);
		} else if (eventObject.type === 'change') {
			return this.executeChangeEvent(element);
		}
	}

	/**
	 * Ready state check, checks wheter the document is ready.
	 * resolves when the document is ready.
	 * @return {Promise} resolves when document is ready.
	 */
	readyStateCheck() {
		return new Promise(resolve => {
			const time = setInterval(() => {
				if (document.readyState !== 'complete') {
					Logger.debug('Waiting for dom to complete loading after navigation');
					return;
				}
				clearInterval(time);
				resolve();
			}, 500);
		});
	}

	/**
	 * Plays a single step in the event queue.
	 * Resolves to true when there is noe event to be executed.
	 * Resolves to false when there is still events to be executed.
	 * @return {Promise} returns Promise, true if there is no events left, otherwise false.
	 */
	async playStep() {
		await this.readyStateCheck();
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

		element.classList.add('dom-replay-border');
		const result = await this.executeEvent(element, nextStep);
		element.classList.remove('dom-replay-border');
		return new Promise(resolve => resolve(result));
	}

	/**
	 * Play a sequence of events. stored in the replay storage.
	 * @return {Promise} eventually resolves with total events and played events.
	 */
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
					total: this._totalEventCount,
					replayed: this._nextEventIndex
				};
			}).then(({total, replayed}) => {
				if (total == replayed) {
					setStateReady(true);
				}
				return {
					total,
					replayed
				};
			});
	}
}
