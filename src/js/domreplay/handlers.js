import { stateIsRecord } from './state';
import Logger from './logger';


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
