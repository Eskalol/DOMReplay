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

	get events() {
		return JSON.parse(window.localStorage.getItem(this.storageKey));
	}

	stop() {
		this.cancel = true;
	}

	updateReplayStorage(object) {
		window.localStorage.setItem(this.storageKey, JSON.stringify(object));
	}

	getCurrentEventIndex() {
		return this.events.currentEventIndex;
	}

	incrementCurrentEventIndedx() {
		this.updateReplayStorage({
			...this.events,
			currentEventIndex: this.getCurrentEventIndex() + 1
		})
	}

	getItem(index) {
		return this.events.events[index];
	}

	getTotalEvents() {
		return this.events.count;
	}

	clear() {
		window.localStorage.removeItem(this.storageKey);
		Logger.debug('Replay stoage cleared!');
	}

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

	async replay() {
		await setStateReplay()
			.then(() => {
				this._buildReplayChain();
			});
	}
}

export default new Replay();
