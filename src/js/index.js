import { addStateChangeEventListener } from './domreplay/dispatcher';
import {
	DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
} from './domreplay/state';
import { handleClickEvent, handleChangeEvent, handleInputEvent } from './domreplay/handlers';


export { domreplayIgnoreClassName as domreplayIgnoreClassName } from './domreplay/loader';

export const dispatcher = {
	addStateChangeEventListener
};

export const state = {
	DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
};



export const handlers = {
	handleClickEvent,
	handleInputEvent,
	handleChangeEvent
};

export { default as Storage } from './domreplay/storage';
export { default as Hud } from './hud';
export { DomReplay as default } from './domreplay/domreplay';
