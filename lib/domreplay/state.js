'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStateReplay = exports.setStateRecord = exports.setStateReady = exports.stateIsReady = exports.stateIsRecord = exports.stateIsReplay = exports.clearStateStorage = exports.DOMREPLAY_STATE_READY = exports.DOMREPLAY_STATE_RECORD = exports.DOMREPLAY_STATE_REPLAY = undefined;

var _error = require('./error');

var _dispatcher = require('./dispatcher');

/**
 * Store the Domreplay state in local storage and provides functions to
 * change state safely and check state.
 */
var DOMREPLAY_STATE_STORAGE_KEY = 'DOMREPLAY_STATE';
var DOMREPLAY_STATE_REPLAY = exports.DOMREPLAY_STATE_REPLAY = 'DOMREPLAY_STATE_REPLAY';
var DOMREPLAY_STATE_RECORD = exports.DOMREPLAY_STATE_RECORD = 'DOMREPLAY_STATE_RECORD';
var DOMREPLAY_STATE_READY = exports.DOMREPLAY_STATE_READY = 'DOMREPLAY_STATE_READY';

/**
 * Gets the state from localstorage
 * @return {String} - current state
 */
var getState = function getState() {
  return window.localStorage.getItem(DOMREPLAY_STATE_STORAGE_KEY);
};

/**
 * Sets state
 * @param  {String} state - State to set
 */
var setState = function setState(state) {
  window.localStorage.setItem(DOMREPLAY_STATE_STORAGE_KEY, state);
};

/**
 * Clears the state storage
 */
var clearStateStorage = exports.clearStateStorage = function clearStateStorage() {
  window.localstorage.removeItem(DOMREPLAY_STATE);
};

/**
 * returns true if state is empy
 * @return {Boolean} - true if state is empty otherwise false.
 */
var stateIsEmpty = function stateIsEmpty() {
  return !getState();
};

/**
 * True if state is Replay
 * @return {Boolean} - True if state is Replay
 */
var stateIsReplay = exports.stateIsReplay = function stateIsReplay() {
  return getState() === DOMREPLAY_STATE_READY;
};

/**
 * True if state is Record
 * @return {Boolean} - True if state is Record
 */
var stateIsRecord = exports.stateIsRecord = function stateIsRecord() {
  return getState() === DOMREPLAY_STATE_RECORD;
};

/**
 * True if state is Ready
 * @return {Boolean} - True if state is Ready
 */
var stateIsReady = exports.stateIsReady = function stateIsReady() {
  return getState() === DOMREPLAY_STATE_READY;
};

/**
 * Sets the state to ready.
 * Resolves when state has changed
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 */
var setStateReady = exports.setStateReady = function setStateReady() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return new Promise(function (resolve, reject) {
    if (force || stateIsEmpty()) {
      setState(DOMREPLAY_STATE_READY);
      (0, _dispatcher.dispatchStateChangeEvent)(getState());
      resolve(getState());
    } else if (stateIsReady()) {
      resolve(DOMREPLAY_STATE_READY);
    } else {
      reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_READY + '"'));
    }
  });
};

/**
 * Set state safely to record.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force	- no safe
 * @return {Promise}        - Returns a Promise.
 */
var setStateRecord = exports.setStateRecord = function setStateRecord() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return new Promise(function (resolve, reject) {
    if (force || stateIsReady()) {
      setState(DOMREPLAY_STATE_RECORD);
      (0, _dispatcher.dispatchStateChangeEvent)(getState());
      resolve(getState());
    } else {
      reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_RECORD + '"'));
    }
  });
};

/**
 * Set state safely to replay.
 * Resolves when the state has changed.
 * It will reject whenever the current state is not ready.
 * @param  {Boolean} force - no safe
 * @return {Promise}        - Returns a Promise.
 */
var setStateReplay = exports.setStateReplay = function setStateReplay() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return new Promise(function (resolve, reject) {
    if (force || stateIsReady()) {
      setState(DOMREPLAY_STATE_REPLAY);
      (0, _dispatcher.dispatchStateChangeEvent)(getState());
      resolve(getState());
    } else {
      reject((0, _error.createStateError)('Cannot change state from "' + getState() + '" to "' + DOMREPLAY_STATE_REPLAY + '"'));
    }
  });
};