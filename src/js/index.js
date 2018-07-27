import {
	addStateChangeEventListener,
	addStorageUpdateEventListener,
	addReplayUpdateEventListener
} from './domreplay/dispatcher';

import {
	DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
} from './domreplay/state';

import {
	ClickEvent,
	InputEvent
} from './domreplay/defaultEvents'

export { domreplayIgnoreAttributeName as domreplayIgnoreAttributeName } from './domreplay/loader';

export const dispatcher = {
	addStateChangeEventListener,
	addStorageUpdateEventListener,
	addReplayUpdateEventListener
};

export const state = {
	DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
};

export const events = {
	ClickEvent,
	InputEvent
};

export { default as Storage } from './domreplay/storage';
export { default as Hud } from './hud';
export { DomReplay as default } from './domreplay/domreplay';
export { default as EventBaseClass } from './domreplay/eventbaseclass';
export { default as Registry } from './domreplay/registry';
