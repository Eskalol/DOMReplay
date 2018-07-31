'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Registry = exports.EventBaseClass = exports.default = exports.Hud = exports.Storage = exports.events = exports.state = exports.dispatcher = exports.domreplayIgnoreAttributeName = undefined;

var _loader = require('./domreplay/loader');

Object.defineProperty(exports, 'domreplayIgnoreAttributeName', {
	enumerable: true,
	get: function get() {
		return _loader.domreplayIgnoreAttributeName;
	}
});

var _storage = require('./domreplay/storage');

Object.defineProperty(exports, 'Storage', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_storage).default;
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

var _eventbaseclass = require('./domreplay/eventbaseclass');

Object.defineProperty(exports, 'EventBaseClass', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_eventbaseclass).default;
	}
});

var _registry = require('./domreplay/registry');

Object.defineProperty(exports, 'Registry', {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_registry).default;
	}
});

var _dispatcher = require('./domreplay/dispatcher');

var _state = require('./domreplay/state');

var _defaultEvents = require('./domreplay/defaultEvents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatcher = exports.dispatcher = {
	addStateChangeEventListener: _dispatcher.addStateChangeEventListener,
	addStorageUpdateEventListener: _dispatcher.addStorageUpdateEventListener,
	addReplayUpdateEventListener: _dispatcher.addReplayUpdateEventListener
};

var state = exports.state = {
	DOMREPLAY_STATE_REPLAY: _state.DOMREPLAY_STATE_REPLAY,
	DOMREPLAY_STATE_RECORD: _state.DOMREPLAY_STATE_RECORD,
	DOMREPLAY_STATE_READY: _state.DOMREPLAY_STATE_READY,
	stateIsReplay: _state.stateIsReplay,
	stateIsRecord: _state.stateIsRecord,
	stateIsReady: _state.stateIsReady
};

var events = exports.events = {
	ClickEvent: _defaultEvents.ClickEvent,
	InputEvent: _defaultEvents.InputEvent
};