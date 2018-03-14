import Storage from './storage';
import { handleClickEvent, handleChangeEvent, handleInputEvent } from './handlers';
import Replay from './replay';
import ServerStorage from './serverstorage';
import { domloader } from './dom_loader';
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


export default class DomReplay {
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
        }
      ];
    }

    if (this.config.server) {
      this.serverstorage = new ServerStorage(this);
    }

    domloader(this.config.events)
			.then(() => setStateReady())
			.catch(err => {
				if (err.type === STATE_ERROR) {
					if (stateIsReplay()) {
						console.log('WTF');
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
}
