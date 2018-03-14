'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = exports.Hud = exports.state = exports.dispatcher = exports.domreplayIgnoreClassName = undefined;

var _dom_loader = require('./domreplay/dom_loader');

Object.defineProperty(exports, 'domreplayIgnoreClassName', {
	enumerable: true,
	get: function get() {
		return _dom_loader.domreplayIgnoreClassName;
	}
});

var _hud = require('./hud');

Object.defineProperty(exports, 'Hud', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_hud).default;
	}
});

var _domreplay = require('./domreplay/domreplay');

Object.defineProperty(exports, 'default', {
	enumerable: true,
	get: function get() {
		return _domreplay.DomReplay;
	}
});

var _dispatcher = require('./domreplay/dispatcher');

var _state = require('./domreplay/state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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