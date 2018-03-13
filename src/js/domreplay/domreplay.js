import Util from './utils';
import Storage from './storage';
import Handler, { handleClickEvent, handleChangeEvent, handleInputEvent } from './handlers';
import Replay from './replay';
import ServerStorage from './serverstorage';
import DOMLoader, {domloader} from './dom_loader';
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
  constructor(config = {}) {
  	this.config = config;
    if (config.debugmode) {
    	Logger.logging = true;
    }

    this.util = new Util(config.debugmode);
    this.storage = new Storage(this);
    this.replay = new Replay(this);

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
			if (err === STATE_ERROR) {
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
