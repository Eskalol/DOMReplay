import Storage from './storage';
import { stateIsRecord } from './state';
import Logger from './logger';


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
	}
}

/**
 * Input Event handler
 * @param  {HTMLElement} element - the html element
 */
export const handleInputEvent = (element) => {
	if (stateIsRecord()) {
		Logger.debug('input event hander');
	}
}
