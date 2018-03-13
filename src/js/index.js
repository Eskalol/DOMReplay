import { addStateChangeEventListener } from './domreplay/dispatcher';
import {
	DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY,
	stateIsReplay,
	stateIsRecord,
	stateIsReady
} from './domreplay/state';

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

export const Hud = require('./hud').default;
export default require('./domreplay/domreplay').default;
