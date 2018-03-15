import Storage from './storage';
import { stateIsRecord } from './state';
import Logger from './logger';
import { trail } from './domhound'

/**
 * Click event handler
 * @param  {HTMLElement} element - the html element
 */
export const handleClickEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('click event handler');
		Storage.addEvent(element, 'click');
	}
}

/**
 * Change event handler
 * @param  {HTMLElement} element - the html element
 */
export const handleChangeEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('change event handler');
		Storage.addEvent(element, 'change');
	}
}

/**
 * Input Event handler
 * @param  {HTMLElement} element - the html element
 */
export const handleInputEvent = (element) => {
	if (stateIsRecord()) {
		let lastEvent = Storage.lastRecordedElement;
		if(lastEvent && JSON.stringify(trail(element, null, null)) === JSON.stringify(lastEvent.trail)) {
			Logger.debug('Updates last event');
			lastEvent.value = element.value;
			Storage.updateLastEvent = lastEvent;
		} else {
			console.log('Creating new input event record');
			Storage.addEvent(element, 'input', element.value);
		}
	}
}
