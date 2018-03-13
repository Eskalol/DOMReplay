import Util from './utils';
import Storage from './storage';
import Handler, { handleClickEvent, handleChangeEvent, handleInputEvent } from './handlers';
import Replay from './replay';
import ServerStorage from './serverstorage';
import DOMLoader, {domloader} from './dom_loader';
import Logger from './logger';
import {
	setStateReady,
	setStateRecord,
	setStateReplay,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
} from './state';


export default class DomReplay {
  constructor(config = {}) {
    this.config = config;
    if (this.config.debugmode) {
    	Logger.logging = true;
    }

    this.util = new Util(config.debugmode);

    this.PASSIVE_STATE = 0;
    this.RECORD_STATE = 1;
    this.REPLAY_STATE = 2;
    this.storage = new Storage(this);
    this.handler = new Handler(this);
    this.replay = new Replay(this);
    this.domLoader = new DOMLoader(this);

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
		.then(state => Logger.debug(`current State is: ${state}`));
  }

  setOperatingStateReplay() {
    this.currentOperatingState = this.REPLAY_STATE;
  }

  setOperatingStateRecord() {
    this.currentOperatingState = this.RECORD_STATE;
  }

  setOperatingStatePassive() {
    if (this.currentOperatingState === this.RECORD_STATE) {
      this.util.debug('Stopped recording, should store to server now!');
    }
    this.currentOperatingState = this.PASSIVE_STATE;
  }

  operatingSTateIsRecording() {
    return this.currentOperatingState === this.RECORD_STATE;
  }

  operatingStateIsReplaying() {
    return this.currentOperatingState === this.REPLAY_STATE;
  }

  operatingStateIsPassive() {
    return this.currentOperatingState === this.PASSIVE_STATE;
  }

  startTracking() {
    this.initializeTracking()
      .then(() => {
        console.log('success');
      })
      .catch(({message}) => {
        console.log('message');
      });
  }

  initializeTracking() {
    return new Promise((resolve, reject) => {
      if (this.operatingSTateIsRecording()) {
        this.util.debug('cancelling initialization of recording due to recording already being in progress.');
        reject({message: 'cancelling initialization of recording due to recording already being in progress.'})
      }

      const time = setInterval(() => {
        this.util.debug('running readyState-check');
        if (document.readyState !== 'complete') {
          this.util.debug('document not yet ready - postponing initialization');
          return
        }
        clearInterval(time);
        resolve(this.initializeModules());
      }, 100);
    });
  }

  initializeModules() {
    this.util.debug('running initialize_modules');
    this.domLoader.initializeEvents();
    this.domLoader.initializeMutationObserver();
    this.util.debug('all modules initialized');
    this.setOperatingStateRecord();
  }

  getPlaybackObject() {
    return this.replay;
  }

  pushToServer() {
    if (!this.config.server) {
      this.util.debug('Cannot push to server without server configuration!');
      return;
    }
    this.serverstorage.pushToServer();
  }

  loadFromServer() {
    if (!this.config.server) {
      this.util.debug('Cannot load to server without server configuration!');
      return;
    }
    this.serverstorage.loadFromServer();
  }

  resetStorage() {
    this.storage.reset();
  }
}
