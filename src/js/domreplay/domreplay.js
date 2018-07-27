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

	tryToContinueReplay() {
  	if (stateIsReplay()) {
  		Replay.replay();
		}
	}

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

  play() {
  	Replay.replay();
	}

	stopReplay() {
		Replay.stop();
  	setStateReady(true);
	}

	stop() {
  	if(stateIsRecord()) {
  		this.stopRecord();
		}
		else if (stateIsReplay()) {
  		this.stopReplay();
		}
	}


  loadEventsFromLocalStorage() {
  	Replay.load(Storage.events);
  }

  // play() {
  // 	this.replay.reset();
  // 	this.replay.play().then(status => {
  // 		Logger.debug(`replayed ${status.total} of ${status.replayed} events.`);
  // 	});
  // }
  //
  // playStep() {
  // 	this.replay.playStep()
  // 		.then(done => {
  // 			if (done) {
  // 				setStateReady(true);
  // 			}
  // 		});
  // }

  // /**
  //  * Sets your custom element tracker
  //  * @param {function} tracker - the function which finds the correct element according to its trail.
  //  * @param {function} trail   - the function that should create an unique selector for the element.
  //  */
  // setCustomElementTracker(tracker, trail) {
  // 	Storage.setCustomTrailFunction(trail);
  // 	this.replay.setCustomTrackerFunction(tracker);
  // }
}
