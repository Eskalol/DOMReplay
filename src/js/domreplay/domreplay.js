import Storage from './storage';
import { handleClickEvent, handleChangeEvent, handleInputEvent } from './handlers';
import Replay from './replay';
import { domloader } from './loader';
import Logger from './logger';
import { STATE_ERROR } from './error';
import {
	setStateReady,
	setStateRecord,
	setStateReplay,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
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
    this.replay = new Replay();

    if (!config.events) {
      this.config.events = [{
          type: 'click',
          tagnames: ['a', 'button'],
          handler: handleClickEvent,
        }, {
          type: 'input',
          tagnames: ['input', 'select', 'textarea'],
          handler: handleInputEvent
        }, {
        	type: 'change',
        	tagnames: ['input', 'select', 'textarea'],
        	handler: handleChangeEvent
        }
      ];
    }

    if (config.customTracker &&
    		config.customTracker.trackerFunc &&
    		config.customTracker.trailFunc) {
    	this.setCustomElementTracker(config.customTracker.trackerFunc, config.customTracker.trailFunc);
    }

    if (this.config.server) {
      this.serverstorage = new ServerStorage(this);
    }

    domloader(this.config.events)
			.then(() => setStateReady())
			.catch(err => {
				if (err.type === STATE_ERROR) {
					if (stateIsReplay()) {
						this.replay.play();
						return;
					}
					return;
				}
				throw err;
			});
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

  loadEventsFromLocalStorage() {
  	this.replay.load(Storage.eventList);
  }

  play() {
  	this.replay.reset();
  	this.replay.play().then(status => {
  		Logger.debug(`replayed ${status.total} of ${status.replayed} events.`);
  	});
  }

  playStep() {
  	this.replay.playStep()
  		.then(done => {
  			if (done) {
  				setStateReady(true);
  			}
  		});
  }

  /**
   * Sets your custom element tracker
   * @param {function} tracker - the function which finds the correct element according to its trail.
   * @param {function} trail   - the function that should create an unique selector for the element.
   */
  setCustomElementTracker(tracker, trail) {
  	Storage.setTrailFunction(trail);
  }
}
