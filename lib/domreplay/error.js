'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Constants and error objects which is thrown
 */

var STATE_ERROR = exports.STATE_ERROR = 'STATE_ERROR';

var createStateError = exports.createStateError = function createStateError(message) {
	return {
		type: STATE_ERROR,
		message: message
	};
};

var STORAGE_ERROR = exports.STORAGE_ERROR = 'STORAGE_ERROR';

var createStorageError = exports.createStorageError = function createStorageError(message) {
	return {
		type: STORAGE_ERROR,
		message: message
	};
};