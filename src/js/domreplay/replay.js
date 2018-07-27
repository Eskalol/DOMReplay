import Logger from './logger';
import { setStateReplay, setStateReady } from './state'
import RegistrySingleton from './registry';
import { dispatchReplayUpdateEventListener } from './dispatcher'

class Replay {
	static storageKey;
	static instance;

	constructor() {
		this.storageKey = 'DOMREPLAY_REPLAY_EVENTS';
		if (!this.instance) {
			this.instance = this;
			this.cancel = false;
		}
		return this.instance;
	}

	/**
	 * Get event object stored in local storage.
	 * @returns {Object}
	 */
	get events() {
		return JSON.parse(window.localStorage.getItem(this.storageKey));
	}

	/**
	 * Stop replay execution.
	 */
	stop() {
		this.cancel = true;
	}

	/**
	 * update replay storage
	 * @param {Object} object object to store.
	 */
	updateReplayStorage(object) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(object));
	}

	/**
	 * Gets the current event index.
	 * @returns {*|number}
	 */
	getCurrentEventIndex() {
		return this.events.currentEventIndex;
	}

	/**
	 * Increment current event index.
	 */
	incrementCurrentEventIndedx() {
		this.updateReplayStorage({
			...this.events,
			currentEventIndex: this.getCurrentEventIndex() + 1
		})
	}

	/**
	 * Get event Item by Index.
	 * @param index
	 * @returns {Object}
	 */
	getItem(index) {
		return this.events.events[index];
	}

	/**
	 * Gets number of total evnets
	 * @returns {Number}
	 */
	getTotalEvents() {
		return this.events.count;
	}

	/**
	 * Clears the storage.
	 */
	clear() {
		window.localStorage.removeItem(this.storageKey);
		Logger.debug('Replay stoage cleared!');
	}

	/**
	 * Load events into storage.
	 * adds a currentEventIndex which will be used
	 * to keep track on which event we are currently playing.
	 * @param events
	 */
	load(events) {
		this.updateReplayStorage({
			...events,
			currentEventIndex: 0
		})
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
	 * @brief returns a promise which executes an event.
	 * Checks for cancellation which occurs when this.stop() has been called.
	 * Finds the event to be executed in replay storage.
	 * Increment the current event index.
	 * Finds the correct class based on event type in Registry.
	 * Execute the replay function on the event class and wait for it to resolve.
	 * @returns {Promise<Object> | Promise<undefined>}  returns a Promise which rejects to an error and resolves to undefined.
	 */
	playNextEvent() {
		return new Promise(async (resolve, reject) => {
				if (this.cancel) {
					this.cancel = false;
					Logger.debug('Replay promise chain cancelled.');
					reject('Cancelled by user');
				}
				const eventIndex = this.getCurrentEventIndex();
				const event = this.getItem(eventIndex);
				dispatchReplayUpdateEventListener({ number: eventIndex + 1, of: this.getTotalEvents()});
				Logger.debug(`Replaying event number ${eventIndex}`);
				this.incrementCurrentEventIndedx();
				const eventClass = RegistrySingleton.getEvent(event.type);
				await eventClass.replay(event)
					.then(() => {
						Logger.debug(`Done replaying event number ${eventIndex}`);
					})
					.catch(err => {
						return reject(err);
					});
				return resolve();
		});
	}

	/**
	 * Builds the promise chain for replaying events, so every event will be executed in
	 * correct order.
	 * @private
	 */
	_buildReplayChain() {
		const currentIndex = this.getCurrentEventIndex();
		const totalEvents = this.getTotalEvents();
		let promise = this.readyStateCheck();

		for(let i = currentIndex; i < totalEvents; i++) {
			promise = promise.then(() => this.playNextEvent());
		}
		promise.then(() => setStateReady(true));
		Logger.debug(`Done building replay chain`);
	}

	/**
	 * Replay events.
	 * @returns {Promise<void>}
	 */
	async replay() {
		await setStateReplay()
			.then(() => {
				this._buildReplayChain();
			});
	}
}

export default new Replay();
