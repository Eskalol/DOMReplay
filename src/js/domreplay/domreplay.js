import Storage from './storage';
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
  }

	/**
	 * @brief Initializes the framework.
	 * This will initialize all handlers and mutation observer.
	 * @returns {Promise<*>}
	 */
  async initialize() {
  	return await domloader()
			.then(() => setStateReady())
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
}
