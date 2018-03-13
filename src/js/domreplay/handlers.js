import { stateIsRecord } from './state';
import Logger from './logger';


export default class Handler {
  constructor(main) {
    this.main = main;
    this.util = main.util;
    this.util.debug('Initializing DOM handlers');
  }

  addClickEvent(element) {
    this.util.debug('Adding click event');
    this.main.storage.addEvent(element, 'click', false);

  }

  addChangeEvent(element) {
    this.util.debug('Adding change event');
    this.main.storage.addEvent(element, 'event', true);
  }

  addInputEvent(element) {
    this.debug('Adding input event');
    this.main.storage.AddEvent(element, 'input', true);
  }
}


export const handleClickEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('click event handler');
	}
}

export const handleChangeEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('change event handler');
	}
}

export const handleInputEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('input event hander');
	}
}
