'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Hud = exports.state = exports.dispatcher = exports.domreplayIgnoreClassName = undefined;

var _dispatcher = require('./domreplay/dispatcher');

var _state = require('./domreplay/state');

var domreplayIgnoreClassName = exports.domreplayIgnoreClassName = require('./domreplay/dom_loader').domreplayIgnoreClassName;

var dispatcher = exports.dispatcher = {
	addStateChangeEventListener: _dispatcher.addStateChangeEventListener
};

var state = exports.state = {
	DOMREPLAY_STATE_REPLAY: _state.DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD: _state.DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY: _state.DOMREPLAY_STATE_READY,
	stateIsReplay: _state.stateIsReplay,
	stateIsRecord: _state.stateIsRecord,
	stateIsReady: _state.stateIsReady
};

var Hud = exports.Hud = require('./hud').default;
exports.default = require('./domreplay/domreplay').default;