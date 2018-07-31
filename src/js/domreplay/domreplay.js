import Storage from './storage';
import ServerStorage from './serverstorage';
import UrlParser from './urlparser';
import Replay from './replay';
import { domloader } from './loader';
import Logger from './logger';
import { STATE_ERROR } from './error';
import {
	setStateReady,
	setStateRecord,
	stateIsReplay,
	stateIsRecord,
	getState
} from './state';

/**
 * @access public
 */
export class DomReplay {
	/**
	 * The core DomReplay class
	 * @param  {Boolean}  config.debugmode - if true, debug messages wil be logged.
	 * @return {DomReplay} an instance of DomReplay
	 */
  constructor(config = {}) {
  	this.config = config;
    if (config.debugmode) {
    	Logger.logging = true;
    }

    if (config.apiUrl) {
			ServerStorage.setApiUrl(config.apiUrl);
		}
  }

	/**
	 * @brief Initializes the framework.
	 * This will initialize all handlers and mutation observer.
	 * @returns {Promise<*>}
	 */
  async initialize() {
  	return await domloader()
			.then(() => setStateReady())
			.then(() => {
				const urlparser = new UrlParser();
				if (urlparser.containsId() && !!this.config.apiUrl) {
					if (urlparser.autoplay()) {
						this.autoplay = true;
					}
					return ServerStorage.load(urlparser.getId());
				}
				return null;
			})
			.then(response => {
				if (!!response) {
					Replay.load(response);
					if (this.autoplay) {
						Replay.replay();
					}
				}
			})
			.catch(err => {
				if (err.type === STATE_ERROR) {
					Logger.debug(`could not set ready state, current state is ${getState()}`);
				}
				if (stateIsReplay()) {
					this.tryToContinueReplay();
				}
			});
	}

	/**
	 * checks for replay state and try to continue replay
	 * usually happens after navigation event during replay.
	 */
	tryToContinueReplay() {
  	if (stateIsReplay()) {
  		Replay.replay();
		}
	}

	/**
	 * Start recording
	 */
  startRecord() {
  	setStateRecord()
  		.catch(err => {
  			if (err === STATE_ERROR) {
  				Logger.warning(err.message);
  			} else {
  				throw err;
  			}
  		});
  }

	/**
	 * Stop recording
	 */
	stopRecord() {
  	setStateReady(true)
  		.catch(err => {
  			if (err === STATE_ERROR) {
  				Logger.warning(err.message);
  			} else {
  				throw err;
  			}
  		});
  }

	/**
	 * Play events
	 */
	play() {
  	Replay.replay();
	}

	/**
	 * Stop replay
	 */
	stopReplay() {
		Replay.stop();
  	setStateReady(true);
	}

	/**
	 * Stop recording or replaying.
	 */
	stop() {
  	if(stateIsRecord()) {
  		this.stopRecord();
		}
		else if (stateIsReplay()) {
  		this.stopReplay();
		}
	}

	/**
	 * Load events from storage into replay storage.
	 */
  loadEventsFromLocalStorage() {
  	Replay.load(Storage.events);
  }

	/**
	 * Sets the replay speed divider.
	 * @param divider		- higher is faster, lower is slower.
	 */
  setReplaySpeed(divider) {
  	Replay.setReplaySpeed(divider);
	}

	/**
	 * Gets the current replay speed.
	 * @returns {*}
	 */
	getCurrentReplaySpeed() {
  	return Replay.getReplaySpeed();
	}

	/**
	 * Push storage data to server.
	 */
	pushStorageToServer() {
		return ServerStorage.push(Storage.events)
			.then(response => {
				return {
					url:`${new UrlParser().buildUrl(response.id, false)}`,
					autoplayUrl:`${new UrlParser().buildUrl(response.id, true)}`,
					id: response.id
				};
			});
	}
}
